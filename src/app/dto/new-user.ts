export class NewUser {

  email: string;
  password: string;
  name: string;
  dateOfBorn: Date;
  phoneNumber: string;
  isEmployer: Boolean;

  constructor(email: string, password: string, name: string, dateOfBorn: Date, phoneNumber: string, isEmployer: Boolean) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.dateOfBorn = dateOfBorn;
    this.phoneNumber = phoneNumber;
    this.isEmployer = isEmployer;
  }
}
