import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageDto } from '../dto/message-dto';
import { MessageRequestDto } from '../dto/message-request-dto';
import { MyMessagesDto } from '../dto/my-messages-dto';
import { NewMessage } from '../dto/new-message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageURL = environment.messageURL;

  constructor(private httpClient: HttpClient) { }

  public addMessage(email: string, newMessage: NewMessage): Observable<any> {
    return this.httpClient.post<any>(this.messageURL + 'new_message/' + email, newMessage);
  }

  public getMessages(email: string, messageRequestDto: MessageRequestDto): Observable<any> {
    return this.httpClient.post<any>(this.messageURL + 'get_messages/' + email, messageRequestDto);
  }

  public getAllMessage(email: string, messageRequestDto: MessageRequestDto): Observable<any> {
    return this.httpClient.post<Array<MyMessagesDto>>(this.messageURL + 'all_message/' + email, messageRequestDto);
  }

}
