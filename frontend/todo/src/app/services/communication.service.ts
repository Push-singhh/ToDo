import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private updateCategoriesSubject = new Subject<boolean>()
  private updateTaskDetailSubject = new Subject<boolean>()

  constructor() { }

  updateCategoriesAnnounced$ = this.updateCategoriesSubject.asObservable()
  updateTaskDetailAnnounced$ = this.updateTaskDetailSubject.asObservable()

  announceCategoriesUpdate(update: boolean){
    this.updateCategoriesSubject.next(update)
  }

  announceTaskDetailUpdate(update: boolean) {
    this.updateTaskDetailSubject.next(update)
  }

}
