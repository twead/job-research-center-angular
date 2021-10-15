export class NewMessage {
    id: number;
    message: string;
    isEmployer: boolean;

    constructor(id: number, message: string, isEmployer: boolean) {
        this.id = id;
        this.message = message;
        this.isEmployer = isEmployer;
    }

}
