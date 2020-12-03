import { Component, OnInit, OnDestroy } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-survey-view',
  templateUrl: './new-survey-view.component.html',
  styleUrls: ['./new-survey-view.component.scss']
})
export class NewSurveyViewComponent implements OnInit, OnDestroy {

  surveyTitle: string = 'Test';
  surveyChoice: string = 'Test';
  surveyName: string = 'Test';

  surveys: Survey[];
  surveysSubscription: Subscription;

  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    this.surveysSubscription = this.surveyService.surveySubject.subscribe(
      (surveys: Survey[]) => {
        this.surveys = surveys;
      }
    );
   this.surveyService.emitSurveys();
  }

  ngOnDestroy() {
    this.surveysSubscription.unsubscribe;
  }

}
