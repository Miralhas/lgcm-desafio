import { check, fail, group, sleep } from 'k6';
import { browser } from 'k6/browser';
import http from 'k6/http';
import { Counter, Trend } from 'k6/metrics';
import { randomString } from './libs/string-utils.js';
import uuid from './libs/uuid.js';

// p90 (90th percentile): 90% de todas as requisições foram mais rápidas do que o valor estabelecido e 10% foram mais lentas.
// p95 (95th percentile): 95% de todas as requisições foram mais rápidas do que o valor estabelecido e 5% foram mais lentas.
// p99 (99th percentile): 99% de todas as requisições foram mais rápidas do que o valor estabelecido e 1% foram mais lentas.

// Caso o p95 seja 2000ms, significa que 95% dos usuários experienciaram um tempo de resposta menor que 2000ms
// e 5% dos usuários experienciaram um tempo de resposta maior que 2000ms

// p95 representa a experiencia da maioria dos usuários.
// p99 captura os worst-case scenarios, que afetam a satisfação do usuário.

// https://grafana.com/docs/k6/latest/javascript-api/k6-metrics/trend/
const reqDurationTimeGet = new Trend('req_duration_time_get', true); // true to use 'milliseconds'
const reqDurationTimeSingleGet = new Trend('req_duration_time_single_get', true);
const reqDurationTimePost = new Trend('req_duration_time_post', true);
const reqDurationTimeDelete = new Trend('req_duration_time_delete', true);
const reqDurationTimePut = new Trend('req_duration_time_put', true);

// Counter for counting event occurrences, like errors.
const getCounterErrors = new Counter('get_errors_counter');
const postCounterErrors = new Counter('post_errors_counter');
const postCounterCreated = new Counter('post_created_counter');
const deleteCounterErrors = new Counter('delete_errors_counter');
const putCounterErrors = new Counter('put_errors_counter');

export const options = {
    scenarios: {
        // smoke: { // Smoke é um cenário de teste que verifica como o sistema funciona sob uma carga mínima de requisições.
        //     executor: "constant-vus", // Vai manter uma quantidade de VUs constante durante o tempo de duração do cenário
        //     vus: 2,
        //     duration: '1m',
        //     exec: "protocolTest",
        // },
        browser: {
            executor: 'per-vu-iterations',
            exec: "browserTest",
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
        // load: { // Load é um cenário que verifica como o sistema funciona sob uma carga típica. 
        //     executor: "ramping-vus", // Dispara o número de VUs de acordo com os estágios estabelecidos
        //     stages: [
        //         { duration: '1m', target: 100 }, // 1 minuto para fazer 100 requisições
        //         { duration: '2m', target: 100 }, // estabilizar 100 requisições simultâneas por 2 minutos
        //         { duration: '1m', target: 0 }, // 1 minuto para diminuir o número de requisições simultâneas para zero.

        //     ],
        //     startTime: "1m30s"
        // },
        // stress: { // Verifica como o sistema funciona sob uma carga extrema.
        //     executor: "ramping-vus",
        //     stages: [
        //         { duration: '30s', target: 100 }, // normal load
        //         { duration: '1m', target: 100 },
        //         { duration: '15s', target: 300 }, // above normal load
        //         { duration: '45s', target: 300 },
        //         { duration: '15s', target: 500 }, // breaking point
        //         { duration: '2m', target: 0 },
        //     ],
        //     startTime: "6m"
        // }
    },
    thresholds: {
        // Rate de error precisa ser menor que 1%.
        http_req_failed: ['rate<0.01'],
        // Requerimento de performance entre todos os cenários
        http_req_duration: ['p(95)<2000', 'p(99)<3000'],
        // Vai falhar caso os check rates sejam menor que 95%
        checks: ["rate > 0.95"],
        get_errors_counter: ['count<1'], // less than 1 error fetching
        post_errors_counter: ['count<1'], // less than 1 error creating
        delete_errors_counter: ['count<1'], // less than 1 error deleting
        put_errors_counter: ['count<1']
    }
};

const SERVER_BASE_URL = "http://host.docker.internal:3002/api";
const CLIENT_BASE_URL = "http://host.docker.internal:4173"

const generatePostPayload = () => JSON.stringify({
    name: `K6 - ${randomString(3).toUpperCase()}`,
    variants: [
        {
            id: `Va-${uuid.v4()}-K6`,
            gene: "BRCA1",
            classification: "pathogenic"
        },
        {
            id: `Vb-${uuid.v4()}-K6`,
            gene: "EGFR",
            classification: "benign"
        }
    ]
});

const getTableRowsLength = async (page) => {
    const locator = await page.locator("//table[@data-slot='table']/tbody/tr").all();
    return locator.length;
}

export const browserTest = async () => {
    let checkData;
    const page = await browser.newPage();

    try {
        // Home Page
        await page.goto(CLIENT_BASE_URL);

        checkData = await page.locator('h1').textContent();
        check(page, {
            header: checkData === 'LGCM - Samples',
        });

        const prePostRowsLength = await getTableRowsLength(page);

        // Samples Form
        const sampleNameLocator = page.locator('#name');
        await sampleNameLocator.type(`B S - ${uuid.v4()}`);

        const variantNameLocator = page.locator('#variants-array-0-id');
        await variantNameLocator.type(`B V - ${uuid.v4()}`);

        const variantGeneLocator = page.locator('#variants-array-0-gene');
        await variantGeneLocator.type(`B G - ${uuid.v4()}`);

        await page.locator('button', { hasText: 'Create' }).click();

        await page.waitForTimeout(500);

        const afterPostRowsLength = await getTableRowsLength(page);

        console.log(prePostRowsLength);
        console.log(afterPostRowsLength);
    } catch (error) {
        fail(`Browser iteration failed: ${error.message}`);
    } finally {
        await page.close();
    }

    sleep(1);
}

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export const protocolTest = () => {
    let URL = `${SERVER_BASE_URL}/samples`;
    let newSampleId;

    group('01. Fetch All samples', () => {
        const res = http.get(`${SERVER_BASE_URL}/samples`);
        const responseDuration = res.timings.duration;
        reqDurationTimeGet.add(responseDuration);
        if (!check(res, { 'Retrieve single sample status is 200': (r) => r.status === 200 })) {
            getCounterErrors.add(1);
        }
    });

    group('02. Create a new Sample', () => {
        const payload = generatePostPayload();

        const headers = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = http.post(URL, payload, headers);
        const postResponseTime = res.timings.duration;
        reqDurationTimePost.add(postResponseTime);

        if (check(res, { 'Sample created correctly': (r) => r.status === 201 })) {
            newSampleId = res.json('id');
            postCounterCreated.add(1);
        } else {
            console.log(`Unable to create Sample ${res.status} ${res.body}`);
            postCounterErrors.add(1);
            return;
        }
    });

    if (newSampleId) {
        group('03. Fetch sample by ID', () => {
            const res = http.get(`${URL}/${newSampleId}`);
            const responseDuration = res.timings.duration;
            reqDurationTimeSingleGet.add(responseDuration);
            if (!check(res, { 'Retrieve single sample status is 200': (r) => r.status === 200 })) {
                getCounterErrors.add(1);
            }
        });
    }

    if (newSampleId) {
        group('04. Update sample by ID', () => {
            const payload = JSON.stringify({ name: `Updated - ${randomString(3).toUpperCase()}` });

            const headers = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const res = http.put(`${URL}/${newSampleId}`, payload, headers);
            const responseDuration = res.timings.duration;
            reqDurationTimePut.add(responseDuration);
            if (!check(res, { 'Update sample status is 200': (r) => r.status === 200 })) {
                putCounterErrors.add(1);
            }
        });
    }

    if (newSampleId) {
        group('05. Delete sample by ID', () => {
            const res = http.del(`${URL}/${newSampleId}`);
            const responseDuration = res.timings.duration;
            reqDurationTimeDelete.add(responseDuration);
            if (!check(res, { 'Delete sample status is 204': (r) => r.status === 204 })) {
                deleteCounterErrors.add(1);
            }
        });
    }

    // Sleep for 1 second to simulate real-world usage
    sleep(1);
}