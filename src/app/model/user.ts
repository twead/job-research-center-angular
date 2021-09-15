import { Role } from './role';
import { Employer } from './employer';

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
        public role: Role = null,
        public employer: Employer = null
        ){}
    
    
}
