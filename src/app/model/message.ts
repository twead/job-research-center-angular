import { Employer } from "./employer";
import { User } from "./user";

export class Message {
  constructor(
    public id: number = null,
    public dateOfSending: Date = null,
    public message: string = null,
    public fromEmployer: boolean = null,
    public employer: Employer = null,
    public user: User = null,
  ) { }
}
