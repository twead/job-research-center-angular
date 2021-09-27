import { Message } from "../model/message";
import { User } from "../model/user";

export class MyMessagesDto {
    requester: User;
    otherPerson: User;
    lastMessage: Message;

    constructor(requester: User, otherPerson: User, lastMessage: Message) {
        this.lastMessage = lastMessage;
        this.requester = requester;
        this.otherPerson = otherPerson;
    }
}
