import { Advertisement } from "./advertisement";
import { User } from "./user";

export class Application {

    constructor(
        public id: number = null,
        public comment: string = null,
        public dateOfApplication: Date = null,
        public pdf: string = null,
        public key: string = null,
        public available: boolean = null,
        public advertisement: Advertisement = null,
        public user: User = null
    ) { }
}
