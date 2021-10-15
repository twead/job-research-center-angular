export class LoginVerificationDto {
    email: string;
    password: string;
    loginVerificationCode: string;

    constructor(email: string, password: string, loginVerificationCode: string) {
        this.email = email;
        this.password = password;
        this.loginVerificationCode = loginVerificationCode;
    }
}
