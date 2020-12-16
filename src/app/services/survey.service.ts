import { Injectable } from '@angular/core';
import { Survey } from '../models/survey.model';
import { Subject } from 'rxjs';
import firebase from 'firebase/app'
import DataSnapshot = firebase.database.DataSnapshot;


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor() { }

  //Surveys:
  private surveys: Survey[] = [];
  surveySubject = new Subject<Survey[]>();

  //Surveys:
  emitSurveys() {
    this.surveySubject.next(this.surveys);
  }

  saveSurvey() {
    firebase.database().ref('/survey').set(this.surveys);
  }

  createNewSurvey(newSurvey: Survey) {
    this.surveys.push(newSurvey);
    this.saveSurvey();
    this.emitSurveys();
  }

  getSurvey(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/survey/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /* {
    id: 1,
    name: 'Alexis',
    subject: '42',
    title: 'test',
    choices:
    [
      {
        name: 'Toto',
        choice: true
      },
      {
        name: 'Tata',
        choice: false
      }
    ]
  } */

  /* addSurvey(survey: Survey) {
    this.surveys.push(survey);
    this.emitSurveys();
  } */

  findSurveyById(id: number): Survey | undefined {
    console.log(this.surveys);
    console.log(this.surveys.find(survey => survey.id === id));
    
    return this.surveys.find(survey => survey.id === id);
  }

  getNewId(): number {
    if (!this.surveys.length) {
      return 1;
    }
    return this.surveys.sort((a, b) => a.id - b.id)[this.surveys.length - 1].id + 1;
  }

  editSurvey(survey: Survey) {
    this.surveys = this.surveys.map(surveyElement => {
      if (surveyElement.id === survey.id) {
        return survey;
      }

      return surveyElement;
    });

    this.emitSurveys();
    this.saveSurvey();
    console.log(this.surveys);
  }


  //Choices:
  /* emitChoices() {
    this.choiceSubject.next(this.choices);
  } */

  //Utile ?
  /* addChoice(newChoice: Choice) {
    this.choices.push(newChoice);
    this.emitChoices();
  } */

  /* removeChoice(i: Survey) {
    const choiceIndexToRemove = this.surveys.findIndex(
      (i1) => {
        if (i1 === i) {
          return true;
        }
      }
    );
    this.surveys.splice(choiceIndexToRemove, 1);
    this.emitSurveys();
  } */

}
