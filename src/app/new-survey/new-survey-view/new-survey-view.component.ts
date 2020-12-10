import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

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
  /* choices: Choice[];
  choiceSubscription: Subscription;
  choicesForm: FormGroup; */

  choicesForm: FormGroup;

  getChoices(): FormArray {
    return this.choicesForm.get('choices') as FormArray;
  }

  constructor(
    private surveyService: SurveyService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //Survey:
    const id = this.route.snapshot.params['id'];
    this.survey = this.surveyService.findSurveyById(+id);

    //Choices:
    this.choicesForm = this.formBuilder.group({
      choices: this.formBuilder.array([
        this.formBuilder.group({
          name: this.formBuilder.control('', [Validators.required]),
          choice: this.formBuilder.control('', [this.choiceValidator()])
        })
      ])
    })

    /* this.choiceSubscription = this.surveyService.choiceSubject.subscribe(
      (choices: Choice[]) => {
        this.choices = choices;
      }
    );
    this.surveyService.emitChoices(); */
  }

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
    console.log(this.choicesForm.value);

    /* const formValue = this.choicesForm.value;
    const newChoice = new Choice(
      formValue['participantName']
    ); */
    //this.surveyService.addChoice(newChoice);
  }

  /* ngOnDestroy() {
    this.choiceSubscription.unsubscribe();
  } */

  /* onViewSurvey(id: number) {
    this.router.navigate(['survey/new', 'survey/view', id])
  } */

}
