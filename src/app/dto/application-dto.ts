import { Advertisement } from "../model/advertisement";
import { Application } from "../model/application";
import { User } from "../model/user";

export class ApplicationDto {
    application: Application;
    advertisement: Advertisement;
    user: User;

    constructor(application: Application, advertisement: Advertisement, user: User) {
        this.application = application;
        this.advertisement = advertisement;
        this.user = user;
    }
}
