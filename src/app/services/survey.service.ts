import { Injectable } from '@angular/core';
import { Survey } from '../models/survey.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private surveys: Survey[] = [
    new Survey('Test', ['Samedi', 'Dimanche'], 'Alexis')
  ];
  surveySubject = new Subject<Survey[]>();

  emitSurveys() {
    this.surveySubject.next(this.surveys);
  }

  addSurvey(survey: Survey) {
    this.surveys.push(survey);
    this.emitSurveys();
  }


  constructor() { }
}
