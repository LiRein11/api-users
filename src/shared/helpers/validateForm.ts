export const validateIIN = (value: string) => {
    if (value.length !== 12) {
        return 'ИИН должен состоять из 12 символов';
    }
    return '';
};
