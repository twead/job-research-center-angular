import { Advertisement } from "./advertisement";
import { User } from "./user";

export class Employer {
    constructor(
      public id: number = null,
      public validated: boolean = null,
      public picture: string = null,
      public user: User = null,
      public advertisement: Advertisement = null
    ){}

}