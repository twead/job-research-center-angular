import { Role } from './role';

export class User {
    constructor(
        public id: number = null,
        public email: string = null,
        public password: string = null,
        public name: string = null,
        public dateOfBorn: Date = null,
        public phoneNumber: string = null,
        public activation: string = null,
        public isenabled: boolean = false,
        public role: Role = null
        ){}
    
    
}
