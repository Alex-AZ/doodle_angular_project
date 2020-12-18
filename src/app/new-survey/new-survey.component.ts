import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      title: '',
      subject: '',
      name: ''
    });
  }

  /* removeAt(i: number) {
    this.getChoices().removeAt(i);
  } */

  onSubmit() {
    const value = this.surveyForm.value;
    const newSurvey = new Survey();
    newSurvey.id = this.surveyService.getNewId();
    newSurvey.title = value['title'];
    newSurvey.subject = value['subject'];
    newSurvey.name = value['name'];
    
    this.surveyService.createNewSurvey(newSurvey);
    //this.router.navigate(['survey/view', { id: newSurvey.id }]);
    //this.router.navigate(['survey/view/' + newSurvey.id]);
    this.router.navigate(['survey/list']);
  }

  ngOnDestroy() {
    this.surveySubscription.unsubscribe();
  }
}
