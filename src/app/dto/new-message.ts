export class NewMessage {
    id: number;
    message: string;
    isEmployer: boolean;

    constructor(id: number, message: string) {
        this.id = id;
        this.message = message;
    }

}
