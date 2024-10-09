import { $api } from './api';
import { LocalNotification } from '../../modules/notifications/notifications';

$api.interceptors.request.use(
    (config) => {
        config.headers.Authorization =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey' +
            'JpbmZvIjp7ImV4cGlyZWQiOiIyMDI0LTEwLTAzVDEyOjQzOjUzLjQ5MjQ2Njg3Kz' +
            'A1OjAwIiwiaWQiOjU5NiwibG9naW4iOiJ0ZXN0X2xvZ2luIiwicGVyc29uX2ZpbyI6ItCi0LXR' +
            'gdGCINCi0LXRgdGC0L7QstC40YciLCJwZXJzb25faWQiOjIzNDgsInJvbGVfaWQiOjEsInR5cGUiOiJ3ZWIifSw' +
            'ic3ViIjoiNTk2In0.kw0z0VugWFaAxkcgxG-ZJPpLmngGx7aLqBoxk46bcso';

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
        console.log(error);
        LocalNotification.error({
            title: 'Ошибка',
            description: error?.response?.data?.error ?? 'ERROR',
        });
        return Promise.resolve({
            data: { success: false, error: error.response.data.error || 'Unknown error' },
        });
    },
);
