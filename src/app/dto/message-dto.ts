import { Message } from "../model/message";
import { User } from "../model/user";

export class MessageDto {
    requester: User;
    otherPerson: User;
    messages: Message[];

    constructor(requester: User, otherPerson: User, messages: Message[],) {
        this.messages = messages;
        this.requester = requester;
        this.otherPerson = otherPerson;
    }
}
