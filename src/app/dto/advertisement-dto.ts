import { Advertisement } from "../model/advertisement";
import { User } from "../model/user";

export class AdvertisementDto {

    user: User;
    advertisement: Advertisement;
    constructor(user: User, advertisement: Advertisement) {
        this.user = user;
        this.advertisement = advertisement;
    }

}
