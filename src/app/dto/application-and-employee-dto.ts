import { Advertisement } from "../model/advertisement";
import { Application } from "../model/application";
import { User } from "../model/user";

export class ApplicationAndEmployeeDto {
    application: Application;
    user: User;
    employer: User;
    advertisement: Advertisement;

    constructor(application: Application, user: User, employer: User, advertisement: Advertisement) {
        this.application = application;
        this.user = user;
        this.employer = employer;
        this.advertisement = advertisement;
    }
}
