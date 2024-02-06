import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TodoSocketService } from './todo-socket.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private updateCategoriesSubject = new Subject<boolean>()
  private updateTaskDetailSubject = new Subject<boolean>()
  private updateTaskListSubject = new Subject<boolean>()

  subscription = new Subscription()

  constructor(
    private todoSocketService: TodoSocketService
  ) {
    this.subscription = todoSocketService.onUpdate().subscribe((data) => {
      if (data?.update_event) {
        if (data?.update_event == "category") {
          this.announceCategoriesUpdate(true)
        }
        else if (data?.update_event == "task_detail") {
          this.announceTaskDetailUpdate(true)
          this.announceCategoriesUpdate(true)
        } 
        else if (data?.update_event == "task_list") {
          this.announceTaskListUpdate(true)
        } 
        
      }
      console.log("socker subscribed")
    })
   }

  updateCategoriesAnnounced$ = this.updateCategoriesSubject.asObservable()
  updateTaskDetailAnnounced$ = this.updateTaskDetailSubject.asObservable()
  updateTaskListAnnounced$ = this.updateTaskDetailSubject.asObservable()

  announceCategoriesUpdate(update: boolean){
    this.updateCategoriesSubject.next(update)
  }

  announceTaskDetailUpdate(update: boolean) {
    this.updateTaskDetailSubject.next(update)
  }

  announceTaskListUpdate(update: boolean) {
    this.updateTaskListSubject.next(update)
  }

  ngOnInit(): void {
    this.todoSocketService.onUpdate().subscribe((data) => {
      console.log('Received update:', data);
      this.updateTaskDetailSubject.next(true)
    });
  }

}
