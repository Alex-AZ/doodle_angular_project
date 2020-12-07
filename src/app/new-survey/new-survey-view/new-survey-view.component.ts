import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-survey-view',
  templateUrl: './new-survey-view.component.html',
  styleUrls: ['./new-survey-view.component.scss']
})
export class NewSurveyViewComponent implements OnInit {

  @Input() surveyChoice: string;
  @Input() index: number;
  survey: Survey;
  yes: boolean;
  no: boolean;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.survey = this.surveyService.findSurveyById(+id);

    //this.surveyService.emitSurveys();
  }

  onToggleYes() {
    if (this.yes === undefined || this.yes === false) {
      this.yes = true;
      this.no = false;
    } else {
      this.yes = false;
    }
  }

  onToggleNo() {
    if (this.no === undefined || this.no === false) {
      this.no = true;
      this.yes = false;
    } else {
      this.no = false;
    }
  }

  /* onViewSurvey(id: number) {
    this.router.navigate(['survey/new', 'survey/view', id])
  } */

}
