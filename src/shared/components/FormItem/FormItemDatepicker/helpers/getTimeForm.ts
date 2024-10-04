import dayjs from 'dayjs';

export const getTimeForm = (time: string) => {
    try {
        return dayjs(time)
    } catch (e) {
        return ''
    }
}