import { Application } from "./application";
import { Employer } from "./employer";

export class Advertisement {

    constructor(
        public id: number = null,
        public city: string = null,
        public dateOfUpload: Date = null,
        public description: string = null,
        public payment: number = null,
        public title: string = null,
        public type: string = null,
        public available: boolean = null,
        public employer: Employer = null,
        public application: Application = null
    ) { }

}
