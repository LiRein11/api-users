import axios from 'axios';
import { Urls } from 'app/api/urls/urls';

export const $api = axios.create({
    baseURL: Urls.get('/archive_server/api/dictionaries'),
});
