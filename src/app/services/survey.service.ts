import { Injectable } from '@angular/core';
import { Survey } from '../models/survey.model';
import { Subject } from 'rxjs';
import firebase from 'firebase/app'
import DataSnapshot = firebase.database.DataSnapshot;
import { MatDialog } from '@angular/material/dialog';
import { Choice } from '../models/choice.model';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private surveys: Survey[] = [];
  surveySubject = new Subject<Survey[]>();

  constructor(public dialog: MatDialog) { }

  emitSurveys() {
    this.surveySubject.next(this.surveys);
  }

  getNewId(): number {
    console.log(this.surveys.length);
    
    if (!this.surveys.length) {
      return 1;
    }
    return this.surveys.sort((a, b) => a.id - b.id)[this.surveys.length - 1].id + 1;
  }

  findSurveyById(id: number): Survey | undefined {
    return this.surveys.find(survey => survey.id === id);
  }

  saveSurvey() {
    console.log(this.surveys);
    
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
      surveys.forEach(surveyElement => {
        const survey = new Survey();
        survey.id = surveyElement.id;
        survey.title = surveyElement.title;
        survey.name = surveyElement.name;
        survey.subject = surveyElement.subject;

        // Si les sondages on un élément 'choices' alors il parcours le tab des choix,
        // et en crée un nouveau en initialisant les élélments avec les bonnes valeurs
        if (surveyElement.hasOwnProperty('choices')) {
          surveyElement.choices.forEach(choiceElement => {
            const choice = new Choice();
            choice.name = choiceElement.name;
            choice.choice = choiceElement.choice;
            
            // On pousse ce nouveau tab de choix dans le sondage
            survey.choices.push(choice);
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
      if (surveyElement.id === survey.id) {
        return survey;
      }

      return surveyElement;
    });

    this.emitSurveys();
    this.saveSurvey();
  }

  removeSurvey(survey: Survey) {
    /* const message = "Êtes-vous sur de vouloir supprimer ce sondage ?"

    const dialogData = new ConfirmDialogModel() */
    
    /* confirmDialog(): void {
      const message = `Are you sure you want to do this?`;
  
      const dialogData = new ConfirmDialogModel("Confirm Action", message);
  
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData
      });
  
      dialogRef.afterClosed().subscribe(dialogResult => {
        this.result = dialogResult;
      });
    } */
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
