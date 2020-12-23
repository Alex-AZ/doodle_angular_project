import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../models/survey.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss']
})
export class NewSurveyComponent implements OnInit, OnDestroy {

  @Input() survey: Survey;

  surveys: Survey[];
  surveySubscription: Subscription;

  surveyForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private surveyService: SurveyService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();

    this.surveySubscription = this.surveyService.surveySubject.subscribe(
      (surveys: Survey[]) => {
        this.surveys = surveys;
      }
    );
    this.surveyService.emitSurveys();
  }

  initForm() {
    this.surveyForm = this.formBuilder.group({
      title: [ '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      subject: [ '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      name: [ '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  /* removeAt(i: number) {
    this.getChoices().removeAt(i);
  } */

  onSubmit() {
    const value = this.surveyForm.value;
    const newSurvey = new Survey();
    newSurvey.setId(this.surveyService.getNewId());
    newSurvey.setTitle(value['title']);
    newSurvey.setSubject(value['subject']);
    newSurvey.setName(value['name']);
    
    this.surveyService.createNewSurvey(newSurvey);
    //this.router.navigate(['survey/view', { id: newSurvey.id }]);
    //this.router.navigate(['survey/view/' + newSurvey.id]);
    this.router.navigate(['survey/list']);
  }

  ngOnDestroy() {
    this.surveySubscription.unsubscribe();
  }
}
