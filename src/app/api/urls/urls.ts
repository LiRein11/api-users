import { Server, ServerEnum } from './urls.config';

export class Urls {
    static version = '1.0.0';
    static location: ServerEnum = ServerEnum.test;
    static server = new Server(Urls.location);

    static get = (url: string) => `${Urls.server.http}://${Urls.server.domain}${url}`;
}
