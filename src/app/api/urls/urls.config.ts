export enum ServerEnum {
    test,
}

export class Server {
    http: string;
    domain: string;

    constructor(server: ServerEnum) {
        switch (server) {
            case ServerEnum.test:
                this.http = 'http';
                this.domain = '89.218.134.251';
                break;
        }
    }
}
