export const loginPlaceholder = 'Login';
export const passwordPlaceholder = 'Password';
export const passwordConfirmPlaceholder = 'Confirm Password';
export const attention = 'Внимание'
export const validationError = 'Validation error'
export const authorized = 'Authorized'

export function validateEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}