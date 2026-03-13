# Testes de Performance com Grafana k6

Este projeto contém testes de performance para uma API REST utilizando o [Grafana k6](https://k6.io/). Os testes cobrem cenários de **smoke**, **load** e **stress**, monitorando métricas de duração de requisições e taxas de erro.

---

## Glossário

### VUs (Virtual Users)
Usuários virtuais que simulam requisições simultâneas à API. Quanto mais VUs ativos, maior a carga sobre o sistema.

### Percentis (p90, p95, p99)
Os percentis medem a distribuição dos tempos de resposta das requisições:

| Percentil | Significado |
|-----------|-------------|
| **p90** | 90% das requisições foram mais rápidas que o valor definido; 10% foram mais lentas |
| **p95** | 95% das requisições foram mais rápidas que o valor definido; 5% foram mais lentas |
| **p99** | 99% das requisições foram mais rápidas que o valor definido; 1% foram mais lentas |

> **Exemplo prático:** Se o p95 for `2000ms`, significa que a grande maioria dos usuários (95%) teve uma resposta em menos de 2 segundos. O p99 captura os *worst-case scenarios*, útil para identificar gargalos que afetam uma minoria, mas que ainda impactam a satisfação do usuário.

- **p90** → Indica que 90% das solicitações ou transações são mais rápidas do que esse valor. É útil para compreender como a maioria dos usuários interage com o seu sistema.
- **p95** → Essa é uma medida mais rigorosa do que o p90 e é frequentemente utilizada no ajuste de desempenho e no planejamento de capacidade para identificar valores atípicos (outliers)
- **p99** → Representa a pior experiência para o 1% dos usuários com maior carga de uso. É fundamental para sistemas em que mesmo pequenos atrasos ou falhas podem ter consequências significativas.

### Executors
Definem a estratégia de como os VUs são criados e gerenciados durante o teste:

- **`constant-vus`** — Mantém uma quantidade fixa de VUs durante todo o tempo de duração do cenário
- **`ramping-vus`** — Aumenta ou diminui o número de VUs de acordo com estágios (`stages`) configurados

### Thresholds (Limites)
Critérios de aprovação/reprovação do teste. Se algum threshold for violado, o teste é marcado como **falho**. Exemplo:

```js
http_req_duration: ['p(95)<2000', 'p(99)<3000']
```
Significa que o p95 deve ser menor que 2000ms e o p99 menor que 3000ms.

---

## Cenários de Teste utilizados

### Smoke Test
**Objetivo:** Verificar se o sistema funciona corretamente sob uma carga mínima, validando que a API está operacional antes de testes mais pesados.

```
VUs: 2 (constante)
Duração: 1 minuto
Executor: constant-vus
```

Ideal para rodar antes de qualquer deploy ou como validação básica de sanidade do ambiente.

---

### Load Test
**Objetivo:** Verificar como o sistema se comporta sob uma carga típica de uso, simulando o tráfego esperado em produção.

```
Início: 1min 30s após o começo dos testes
Executor: ramping-vus

Estágios:
  1m  → subir até 100 VUs
  2m  → estabilizar em 100 VUs
  1m  → descer até 0 VUs
```

Avalia se o sistema sustenta a carga esperada com tempos de resposta aceitáveis.

---

### Stress Test
**Objetivo:** Verificar como o sistema se comporta sob uma carga extrema, identificando o ponto de ruptura (*breaking point*) da aplicação.

```
Início: 6 minutos após o começo dos testes
Executor: ramping-vus

Estágios:
  30s → subir até 100 VUs   (carga normal)
  1m  → estabilizar em 100 VUs
  15s → subir até 300 VUs   (acima do normal)
  45s → estabilizar em 300 VUs
  15s → subir até 500 VUs   (breaking point)
  2m  → descer até 0 VUs
```

Identifica até onde o sistema aguenta antes de degradar ou falhar.

---

## Métricas Customizadas

### Trends (Tempo de duração por operação)
Registram a distribuição dos tempos de resposta para cada tipo de operação:

| Métrica | Descrição |
|--------|-----------|
| `req_duration_time_get` | Tempo das requisições GET (listagem) |
| `req_duration_time_single_get` | Tempo das requisições GET por ID |
| `req_duration_time_post` | Tempo das requisições POST (criação) |
| `req_duration_time_put` | Tempo das requisições PUT (atualização) |
| `req_duration_time_delete` | Tempo das requisições DELETE |

### Counters (Contadores de eventos)
Contam ocorrências de erros e quantidade de amostras criadas ao decorrer do teste:

| Contador | Descrição |
|---------|-----------|
| `get_errors_counter` | Erros nas requisições GET |
| `post_errors_counter` | Erros nas requisições POST |
| `post_created_counter` | Registros criados com sucesso |
| `delete_errors_counter` | Erros nas requisições DELETE |
| `put_errors_counter` | Erros nas requisições PUT |

---

## Fluxo dos Testes

Cada iteração do teste executa os seguintes grupos em sequência:

1. **Fetch All Samples** — `GET /api/samples` — Lista todos os registros
2. **Create a new Sample** — `POST /api/samples` — Cria um novo registro com dados aleatórios
3. **Fetch Sample by ID** — `GET /api/samples/:id` — Busca o registro recém-criado
4. **Update Sample by ID** — `PUT /api/samples/:id` — Atualiza o registro
5. **Delete Sample by ID** — `DELETE /api/samples/:id` — Remove o registro

> Entre cada iteração, há um `sleep(1)` de 1 segundo para simular o comportamento real de um usuário.

---
 
## Thresholds Configurados
 
| Threshold | Critério |
|-----------|---------|
| `http_req_failed` | Taxa de erro < 1% |
| `http_req_duration` | p95 < 2000ms e p99 < 3000ms |
| `checks` | Taxa de checks aprovados > 95% |
| `get_errors_counter` | Menos de 1 erro |
| `post_errors_counter` | Menos de 1 erro |
| `delete_errors_counter` | Menos de 1 erro |
| `put_errors_counter` | Menos de 1 erro |
 
---
 
## Como Executar com Docker
 
> **Pré-requisito:** Docker e Docker Compose instalados na máquina.
 
### 1. Inicie o servidor da aplicação
 
No diretório raiz do projeto, suba os containers da aplicação:
 
```bash
docker compose up -d --build
```
 
### 2. Acesse o diretório de testes
 
```bash
cd /k6
```
 
### 3. Inicie os serviços necessários para o teste
 
Sobe os serviços de suporte ao k6 (grafana, prometheus, influxdb):
 
```bash
docker compose -f compose.stress.yml up -d
```
 
### 4. Execute o teste de estresse
 
```bash
docker compose -f .\compose.stress.yml run k6 run /scripts/samples.js
```
 
---

## Referências

- [Documentação oficial do k6](https://grafana.com/docs/k6/latest/)
- [k6 Metrics - Trend](https://grafana.com/docs/k6/latest/javascript-api/k6-metrics/trend/)
- [k6 Executors](https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/)