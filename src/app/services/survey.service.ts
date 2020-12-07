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

  removeChoice(i: Survey) {
    const choiceIndexToRemove = this.surveys.findIndex(
      (i1) => {
        if (i1 === i) {
          return true;
        }
      }
    );
    this.surveys.splice(choiceIndexToRemove, 1);
    this.emitSurveys();
  }

  findSurveyById(id: number): Survey | undefined {
    const survey = this.surveys.find(
      (surveyId) => {
        return surveyId.id === id;
      }
    );
    return survey;
  }

  getNewId(): number {
    if (!this.surveys.length) {
      return 1;
    }
    return this.surveys.sort((a, b) => a.id - b.id)[this.surveys.length - 1].id + 1;
  }

  constructor() { }
}
