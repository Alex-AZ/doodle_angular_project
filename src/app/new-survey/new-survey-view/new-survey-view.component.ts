import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, ValidatorFn, AbstractControl, Form } from '@angular/forms';
import firebase from 'firebase/app'
import { Choice } from 'src/app/models/choice.model';
@Component({
  selector: 'app-new-survey-view',
  templateUrl: './new-survey-view.component.html',
  styleUrls: ['./new-survey-view.component.scss']
})
export class NewSurveyViewComponent implements OnInit {

  //Survey
  @Input() surveyChoice: string;
  @Input() index: number;
  survey: Survey;

  //Choices:
  choicesForm: FormGroup;

  //choicesForm: FormGroup;
  //choicesSubject = new Subject<FormGroup[]>();

  /* emitChoices() {
    this.choicesSubject.next();
  } */

  getChoices(): FormArray {
    return this.choicesForm.get('choices') as FormArray;
  }

  constructor(
    private surveyService: SurveyService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    //Survey:
    const id = this.route.snapshot.params['id'];
    this.survey = this.surveyService.findSurveyById(+id);

    //Choices:
    if (this.survey !== undefined) { //Si le survey est différent de undefined alors on est redirigé vers la page view. 
      this.choicesForm = this.formBuilder.group({
        choices: this.formBuilder.array([])
      })

      if (this.survey.choices.length === 0) {
        this.getChoices().push(this.formBuilder.group({
          name: this.formBuilder.control('', [Validators.required]),
          choice: this.formBuilder.control('', [this.choiceValidator()])
        }));
      }

      this.survey.choices.forEach(choice => {
        this.getChoices().push(this.formBuilder.group({
          name: this.formBuilder.control(choice.name, [Validators.required]),
          choice: this.formBuilder.control(choice.choice, [this.choiceValidator()])
        }));
      });
    } else { //Sinon on est redirigé vers le path vide donc la page new.
      this.router.navigate(['']);
    }
  }

  /* saveChoices() {
    firebase.database().ref('/survey').set(this.choicesForm);
  } */

  /* createNewChoices(newChoices: FormGroup) {
    this.getChoices().push(newChoices);
    this.saveChoices();
    //this.emitChoices();
  } */

  private choiceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => { //Ligne par défaut de ValidatorFn
      if (control.value === undefined || control.value === '' || control.value === null) {
        return {
          undefined: {
            value: ''
          }
        };
      } else {
        return null;
      }
    };
  }

  //Toggle buttons:
  onToggleYes(formGroup: FormGroup) {
    if (formGroup.value.choice === true) {
      formGroup.controls.choice.setValue(undefined);
    } else {
      formGroup.controls.choice.setValue(true);
    }
  }

  onToggleNo(formGroup: FormGroup) {
    if (formGroup.value.choice === false) {
      formGroup.controls.choice.setValue(undefined);
    } else {
      formGroup.controls.choice.setValue(false);
    }
  }

  onAddChoice() {
    this.getChoices().push(this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      choice: this.formBuilder.control('', [this.choiceValidator()])
    }));
  }

  onRemoveChoice(i: number) {
    this.getChoices().removeAt(i);
  }

  onSubmitChoices() {
    const choices = this.choicesForm.controls.choices.value;

    this.survey.choices = [];

    choices.forEach(choice => {
      const newChoice = new Choice();
      newChoice.name = choice.name;
      newChoice.choice = choice.choice;

      this.survey.addChoice(newChoice);
    });

    console.log(this.survey);
    this.surveyService.editSurvey(this.survey);
  }
  

  /* onViewSurvey(id: number) {
    this.router.navigate(['survey/new', 'survey/view', id])
  } */

}
