import { Injectable } from '@angular/core';
import { Survey } from '../models/survey.model';
import { Subject } from 'rxjs';
import firebase from 'firebase/app'
import DataSnapshot = firebase.database.DataSnapshot;
import { Choice } from '../models/choice.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private surveys: Survey[] = [];
  surveySubject = new Subject<Survey[]>();

  constructor() { }

  emitSurveys() {
    this.surveySubject.next(this.surveys);
  }

  getNewId(): number {
    if (!this.surveys.length) {
      return 1;
    }
    return this.surveys.sort((a, b) => a.getId() - b.getId())[this.surveys.length - 1].getId() + 1;
  }

  findSurveyById(id: number): Survey | undefined {
    return this.surveys.find(survey => survey.getId() === id);
  }

  saveSurvey() {
    firebase.database().ref('/survey').set(this.surveys);
  }

  getSurveys() {
    // On va chercher les données des sondages sur Firebase
    firebase.database().ref('/survey').on('value', (data: DataSnapshot) => {
      // La constante récupère les datas des valeurs, s'il n'y en a pas > tab vide
      const surveys = data.val() ? data.val() : [];

      // On initialise les sondages à un tab vide pour pouvoir le parcourir ensuite
      this.surveys = [];

      // On parcours les sondages et on crée un nouveau sondage,
      // en initialisant les élélments avec les bonnes valeurs
      surveys.forEach(surveyResponse => {
        const survey = new Survey();
        survey.setId(surveyResponse.id);
        survey.setTitle(surveyResponse.title);
        survey.setSubject(surveyResponse.subject);
        survey.setName(surveyResponse.name);

        // Si les sondages on un élément 'choices' alors il parcours le tab des choix,
        // et en crée un nouveau en initialisant les élélments avec les bonnes valeurs
        if (surveyResponse.hasOwnProperty('choices')) {
          surveyResponse.choices.forEach(choiceResponse => {
            const choice = new Choice();
            choice.setName(choiceResponse.name);
            choice.setChoices(choiceResponse.choice);

            // On pousse ce nouveau tab de choix dans le sondage
            survey.addChoice(choice);
          });
        }
        // On pousse ce nouveau sondage dans les tab de sondages
        this.surveys.push(survey);
      });
      // Et on émet ce nouveau tab de sondages
      this.emitSurveys();
    });
  }

  createNewSurvey(newSurvey: Survey) {
    this.surveys.push(newSurvey);
    this.saveSurvey();
    this.emitSurveys();
  }

  editSurvey(survey: Survey) {
    this.surveys = this.surveys.map(surveyElement => {
      if (surveyElement.getId() === survey.getId()) {
        return survey;
      }

      return surveyElement;
    });

    this.emitSurveys();
    this.saveSurvey();
  }

  removeSurvey(survey: Survey) {
    const surveyIndexToRemove = this.surveys.findIndex(
      (surveyEl) => {
        if (surveyEl === survey) {
          return true;
        }
      }
    );
    this.surveys.splice(surveyIndexToRemove, 1);
    this.saveSurvey();
    this.emitSurveys();
  }
}
