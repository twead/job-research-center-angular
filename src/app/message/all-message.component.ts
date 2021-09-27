import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/service/token.service';
import { MessageService } from '../service/message.service';
import { NewMessage } from '../dto/new-message';
import { MessageRequestDto } from '../dto/message-request-dto';
import { MessageDto } from '../dto/message-dto';
import { MyMessagesDto } from '../dto/my-messages-dto';

@Component({
  selector: 'app-all-message',
  templateUrl: './all-message.component.html',
  styleUrls: ['./all-message.component.css']
})
export class AllMessageComponent implements OnInit {

  email: string;
  isEmployer: boolean;
  errorMessage: string;

  messages: MyMessagesDto[];
  messageRequestDto: MessageRequestDto;

  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
     private tokenService: TokenService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.email = this.tokenService.getEmail();
    this.isEmployer = this.tokenService.IsEmployer();
    this.getAllMessages();
  }

  getAllMessages(){
    this.messageRequestDto = new MessageRequestDto(null,this.tokenService.IsEmployer());
    this.messageService.getAllMessage(this.email, this.messageRequestDto).subscribe(
      data => {
        this.messages = data;
console.log(this.messages);
      }, error => {
        this.errorMessage = error.error.message;
        this.router.navigate(["/"]);
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });

      });
  }

  sendMessage(id: number) {
    this.router.navigate(['new_message', id]);
  }

}
