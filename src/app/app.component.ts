import { Component, OnInit, OnDestroy } from '@angular/core';
import { Survey } from './models/survey.model';
import { Subscription } from 'rxjs';
import { SurveyService } from './services/survey.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  surveys: Survey[];
  surveySubscription: Subscription;

  constructor(private surveyService: SurveyService) {}

  ngOnInit() {
    this.surveySubscription = this.surveyService.surveySubject.subscribe(
      (surveys: Survey[]) => {
        this.surveys = surveys;
      }
    );
    this.surveyService.emitSurveys();
  }

  ngOnDestroy() {
    this.surveySubscription.unsubscribe();
  }
}
