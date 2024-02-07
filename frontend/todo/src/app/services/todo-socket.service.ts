import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() { 
    const user_id = localStorage.getItem("user_id")
    this.socket$ = webSocket(`${environment.socketServerUrl}/${user_id}/`);

}

  // Example: send a message to the WebSocket server
  sendMessage(message: string): void {
    this.socket$.next({ message: message});
  }

  // Example: listen for 'update' events
  onUpdate(): Observable<any> {
    return this.socket$.asObservable();
}

}
