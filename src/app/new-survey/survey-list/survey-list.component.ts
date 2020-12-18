import { Component, OnInit, OnDestroy } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { Subscription } from 'rxjs';
import { SurveyService } from 'src/app/services/survey.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit, OnDestroy {

  surveys: Survey[];
  //survey: Survey;
  surveysSubscription: Subscription;

  constructor(
    private surveyService: SurveyService, 
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.surveysSubscription = this.surveyService.surveySubject.subscribe(
      (surveys: Survey[]) => {
        this.surveys = surveys;
      }
    );
    this.surveyService.getSurveys();
  }

  onDeleteSurvey(survey: Survey) {
    this.surveyService.removeSurvey(survey);
  }

  onViewSurvey(survey: Survey) {
    this.router.navigate(['survey/view/' + survey.id]);
  }

  ngOnDestroy() {
    this.surveysSubscription.unsubscribe();
  }
}
