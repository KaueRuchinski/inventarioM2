export class BaseService {
    constructor(base_uri) {
        this.base_uri = base_uri;
        this.respose;
    }

    getResponse() {
        return this.respose;
    }
}