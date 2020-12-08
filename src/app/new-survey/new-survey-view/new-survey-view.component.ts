import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-survey-view',
  templateUrl: './new-survey-view.component.html',
  styleUrls: ['./new-survey-view.component.scss']
})
export class NewSurveyViewComponent implements OnInit {

  //Survey
  @Input() index: number;
  survey: Survey;

  //Choices:
  /* choices: Choice[];
  choiceSubscription: Subscription;
  choicesForm: FormGroup; */
  /* choicesForm = this.formBuilder.group({
    choices: this.formBuilder.array([
      this.formBuilder.control('')
    ])
  })
  //Switch button:
  yes: boolean;
  no: boolean; */

  /* getChoices(): FormArray {
    return this.choicesForm.get('choices') as FormArray;
  }
 */
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
    /* this.choiceSubscription = this.surveyService.choiceSubject.subscribe(
      (choices: Choice[]) => {
        this.choices = choices;
      }
    );
    this.surveyService.emitChoices(); */
  }

  //Choices:
  /* initFormChoices() {
    this.choicesForm = this.formBuilder.group({
      choices: this.formBuilder.array([
        this.formBuilder.control('')
      ])
    });
  } */
  //Toggle buttons:
  /* onToggleYes() {
    if (this.yes === undefined || this.yes === false) {
      this.yes = true;
      this.no = false;
    } else {
      this.yes = false
    }
  } */

 /*  onToggleNo() {
    if (this.no === undefined || this.no === false) {
      this.no = true;
      this.yes = false;
    } else {
      this.no = false;
    }
  } */

  /* onAddChoice() {
    const newChoiceControl = this.formBuilder.control(null, Validators.required);
    this.getChoices().push(this.formBuilder.control(''));
  } */

  /* onSubmitChoices() {
    const formValue = this.choicesForm.value;
    /* const newChoice = new Choice(
      formValue['participantName']
    );
    //this.surveyService.addChoice(newChoice);
  } */

  /* ngOnDestroy() {
    this.choiceSubscription.unsubscribe();
  } */

  /* onViewSurvey(id: number) {
    this.router.navigate(['survey/new', 'survey/view', id])
  } */

}
