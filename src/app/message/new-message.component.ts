import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';
import { MessageService } from '../service/message.service';
import { NewMessage } from '../dto/new-message';
import { MessageRequestDto } from '../dto/message-request-dto';
import { MessageDto } from '../dto/message-dto';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  id: number;
  email: string;
  message: string;
  isEmployer: boolean;
  errorMessage: string;

  form: FormGroup = new FormGroup({});
  newMessage: NewMessage;
  messageRequestDto: MessageRequestDto;
  messages: MessageDto;
  isFirstMessage = false;

  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
    private fb: FormBuilder, private tokenService: TokenService, private messageService: MessageService) {
    this.form = fb.group({
      message: ['', [Validators.nullValidator]]
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.email = this.tokenService.getEmail();
    this.isEmployer = this.tokenService.IsEmployer();
    this.getMessages();
  }

  getMessages() {
    this.messageRequestDto = new MessageRequestDto(this.id, this.tokenService.IsEmployer());
    this.messageService.getMessages(this.email, this.messageRequestDto).subscribe(
      data => {
        this.messages = data;
        if (this.messages.messages.length == 0) {
          this.isFirstMessage = true;
        }
      }, error => {
        this.errorMessage = error.error.message;
        this.router.navigate(["/"]);
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });

      });
  }

  save(): void {
    this.newMessage = new NewMessage(this.id, this.message, this.isEmployer);
    console.log(this.newMessage);
    this.messageService.addMessage(this.email, this.newMessage).subscribe(
      data => {
        this.toastr.success('Üzenetet sikeresen elküldted!', 'OK', {
          timeOut: 2000, positionClass: 'toast-top-center'
        });
        this.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'Üzenet elküldése nem sikerült!', {
          timeOut: 2000, positionClass: 'toast-top-center',
        });

      }
    );
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
  }

  reload() {
    this.form.reset();
    window.location.reload();
  }

  backToList() {
    this.router.navigate(["all_message"])
  }

}
