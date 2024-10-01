import { $api } from './api';

$api.interceptors.request.use(
    (config) => {
        config.headers.Authorization =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImV4cG' +
            'lyZWQiOiIyMDI0LTEwLTAyVDE2OjIwOjI1LjQ0OTM5OTE2NyswNTowMCIsImlkIjoxLCJsb2dpbi' +
            'I6ImFkbWluIiwicGVyc29uX2ZpbyI6ItCQ0JTQnNCY0J3QmNCh0KLQoNCQ0K' +
            'LQntCgIiwicGVyc29uX2lkIjoxLCJyb2xlX2lkIjoxMywidHlwZSI6IndlYiJ9LCJzdWIiOiIxIn0.8i84o-C' +
            'DulOTy2zqZhmxE4VCmZJoFUGl4IfPgn1xKvg';

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

$api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.resolve({ data: { success: false, error: error } });
    },
);
