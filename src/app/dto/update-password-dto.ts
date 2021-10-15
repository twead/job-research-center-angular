export class UpdatePasswordDto {
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}