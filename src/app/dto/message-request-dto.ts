export class MessageRequestDto {
    id: number;
    isEmployer: boolean;

    constructor(id: number, isEmployer: boolean) {
        this.id = id;
        this.isEmployer = isEmployer;
    }
}
