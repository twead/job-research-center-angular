import { Advertisement } from "../model/advertisement";
import { Application } from "../model/application";
import { User } from "../model/user";

export class ApplicationDto {
    application: Application;
    advertisement: Advertisement;
    user: User;
    employeeId: number;

    constructor(application: Application, advertisement: Advertisement, user: User, employeeId: number) {
        this.application = application;
        this.advertisement = advertisement;
        this.user = user;
        this.employeeId = employeeId;
    }
}
