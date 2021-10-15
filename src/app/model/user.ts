import { Role } from './role';
import { Employer } from './employer';
import { Application } from './application';
import { Message } from './message';

export class User {
    constructor(
        public id: number = null,
        public email: string = null,
        public password: string = null,
        public name: string = null,
        public dateOfBorn: Date = null,
        public phoneNumber: string = null,
        public activation: string = null,
        public isEnabled: boolean = true,
        public loginVerification: boolean = true,
        public loginVerificationCode: string = null,
        public role: Role = null,
        public employer: Employer = null,
        public application: Application = null,
        public message: Message = null
    ) { }


}
