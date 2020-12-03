import { Injectable } from '@angular/core';
import { Survey } from '../models/survey.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private surveys: Survey[] = [];
  surveySubject = new Subject<Survey[]>();

  emitSurveys() {
    this.surveySubject.next(this.surveys);
  }

  addChoice(newChoice: Survey) {
    this.surveys.push(newChoice);
    this.emitSurveys();
  }

  removeChoice(choice: Survey) {
    const choiceIndexToRemove = this.surveys.findIndex(
      (choice1) => {
        if (choice1 === choice) {
          return true;
        }
      }
    );
    this.surveys.splice(choiceIndexToRemove, 1);
    this.emitSurveys();
  }


  constructor() { }
}
