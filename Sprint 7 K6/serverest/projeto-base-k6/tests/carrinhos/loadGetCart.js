import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../support/base/baseTest.js';
import { productGenerate, userGenerate } from '../../data/dynamic/dados.js';

export const options = testConfig.options.loadThreshold;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}

export function setup() {
    let data = [];
    for (let i = 0; i < 500; i++) {
        const uPayload = userGenerate();
        const userRes = baseRest.post(ENDPOINTS.USER_ENDPOINT, uPayload);
        const userId = userRes.json()._id;

        baseChecks.checkStatusCode(userRes, 201);

        const lPayload = { email: uPayload.email, password: uPayload.password };
        const loginRes = baseRest.post(ENDPOINTS.LOGIN_ENDPOINT, lPayload);

        baseChecks.checkStatusCode(loginRes, 200);

        const authToken = loginRes.json().authorization;

        const prodPayload = productGenerate();
        const productRes = baseRest.post(ENDPOINTS.PRODUCTS_ENDPOINT, prodPayload, { 'Authorization': `${authToken}` });
        baseChecks.checkStatusCode(productRes, 201);

        const prodId = productRes.json()._id;
        const cartPayload = {
            produtos: [{
                idProduto: prodId,
                quantidade: 1
            }]
        };
        const cartRes = baseRest.post(ENDPOINTS.CARTS_ENDPOINT, cartPayload, { 'Authorization': `${authToken}` });
        baseChecks.checkStatusCode(cartRes, 201);

        data.push({ authToken, userId, prodId });
    }
    return data;
}

export default function (data) {
    let iteration = __ITER; // Uso de variável fornecida pelo k6 para obter a iteração
    try {
        const authToken = data[iteration].authToken;
        const delRes = baseRest.del(ENDPOINTS.CARTS_ENDPOINT + 'cancelar/compra', null, { headers: { 'Authorization': `${authToken}` } });
        console.log(delRes.body);
        baseChecks.checkStatusCode(delRes, 200);
        baseChecks.checkResTime(delRes, 500);
    } catch (error) {
        console.error(`Erro ao realizar DELETE em carrinho: ${error}`);
    }

    sleep(1);
}

export function teardown(data) {
    try {
        for (let i = 0; i < data.length; i++) {
            const { authToken, prodId, userId } = data[i];
            const delCartRes = baseRest.del(ENDPOINTS.CARTS_ENDPOINT + 'cancelar/compra', null, { headers: { 'Authorization': `${authToken}` } });
            baseChecks.checkStatusCode(delCartRes, 200);

            const delProdRes = baseRest.del(`${ENDPOINTS.PRODUCTS_ENDPOINT}/${prodId}`, null, { headers: { 'Authorization': `${authToken}` } });
            baseChecks.checkStatusCode(delProdRes, 200);
            console.log(`Produto ${prodId} excluído: ${delProdRes.json().message}`);

            const delUserRes = baseRest.del(`${ENDPOINTS.USER_ENDPOINT}/${userId}`, null, { headers: { 'Authorization': `${authToken}` } });
            baseChecks.checkStatusCode(delUserRes, 200);
            console.log(`Usuário ${userId} excluído: ${delUserRes.json().message}`);
        }
    } catch (error) {
        console.error(`Erro ao realizar operações no teardown: ${error}`);
    }
}
