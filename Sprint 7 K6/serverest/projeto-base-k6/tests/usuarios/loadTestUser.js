import { sleep } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import {BaseChecks, BaseRest, ENDPOINTS, testConfig,} from '../../support/base/baseTest.js';

export const options = testConfig.options.loadThreshold;

const base_uri = testConfig.environment.hml.url;
const baseRest = new BaseRest(base_uri);
const baseChecks =  new BaseChecks();


export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}

export default function(){
    const urlRes = baseRest.get( ENDPOINTS.USER_ENDPOINT);

    baseChecks.checkStatusCode(urlRes, 200);
    baseChecks.checkResTime(urlRes, 3500);

    sleep(1)
}
