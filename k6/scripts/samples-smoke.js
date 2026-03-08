import { check, sleep, group, fail } from 'k6';
import http from 'k6/http';
import uuid from './libs/uuid.js';
import { randomString } from './libs/string-utils.js'

export const options = {
    vus: 1,
    duration: '1m',
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% das reqs devem ter um tempo de duração menor quer 2 segundos.
        http_req_failed: ['rate<0.01'] // Rate de error precisa ser menor que 1%.
    }
};

const BASE_URL = "http://localhost:3002/api";

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

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default () => {
    let URL = `${BASE_URL}/samples`;

    group('01. Create a new Sample', () => {
        const payload = generatePostPayload();

        const headers = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = http.post(URL, payload, headers);

        if (check(res, { 'Sample created correctly': (r) => r.status === 201 })) {
            URL = `${URL}/${res.json('id')}`;
        } else {
            console.log(`Unable to create Sample ${res.status} ${res.body}`);
            return;
        }
    });

    group('02. Fetch created sample', () => {
        const res = http.get(URL);
        check(res, { 'Retrieve single sample status is 200': (r) => r.status === 200 });
    });

    group('03. Fetch All samples', () => {
        const res = http.get(`${BASE_URL}/samples`);
        check(res, { 'Retrieve all samples status is 200': (r) => r.status === 200 });
    });


    // Sleep for 1 second to simulate real-world usage
    sleep(1);
}