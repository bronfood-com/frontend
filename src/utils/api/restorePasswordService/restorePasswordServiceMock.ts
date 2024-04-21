import { RestorePasswordService, requestChangePasswordResponse, requestChangePasswordResponseError, completeChangePasswordResponse } from './restorePasswordService';

export class RestorePasswordServiceMock implements RestorePasswordService {
    async _wait(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }

    getPhoneNumber(phoneNumber: string) {
        return '' + phoneNumber;
    }

    generateTempDataCode(phoneNumber: string) {
        return `ok${phoneNumber[5]}kjh23a;bn%`;
    }

    async queryPhoneNumber(phone: string): Promise<requestChangePasswordResponse | requestChangePasswordResponseError> {
        await this._wait(300);
        const phoneNumber = this.getPhoneNumber(phone);
        const temp_data_code = this.generateTempDataCode(phone);
        if (phoneNumber && temp_data_code) {
            return { status: 'success', data: { temp_data_code: `${temp_data_code}` } };
        } else {
            return { status: 'error', error_message: 'something goes wrong' };
        }
    }

    async setNewPassword(password: string, password_confirm: string, temp_data_code: string): Promise<requestChangePasswordResponse | requestChangePasswordResponseError> {
        await this._wait(300);
        if (password === password_confirm) {
            return { status: 'success', data: { temp_data_code } };
        } else {
            return { status: 'error', error_message: "passwords don't match" };
        }
    }

    async verifyPasswordChange(temp_data_code: string, confirmation_code: string): Promise<completeChangePasswordResponse | requestChangePasswordResponseError> {
        await this._wait(300);
        if (temp_data_code && confirmation_code) {
            return { status: 'success', message: 'Password updated' };
        } else {
            return { status: 'error', error_message: 'confirmation_code or temp_data_code is empty' };
        }
    }
}
