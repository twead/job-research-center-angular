export class NewAdvertisement {
    title: string;
    type: string;
    city: string;
    payment: number;
    description: string;

    constructor(title: string, type: string, city: string, payment: number, description: string) {
        this.title = title;
        this.type = type;
        this.city = city;
        this.payment = payment;
        this.description = description;
    }
}
