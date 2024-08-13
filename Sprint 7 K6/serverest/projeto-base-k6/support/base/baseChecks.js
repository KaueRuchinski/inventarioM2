import { check } from "k6";

export class BaseChecks {
    checkStatusCode(response, expectedStatus = 200) {
        check( response, {
            'status code check': (r) => r.status === expectedStatus
        })
    }
}

