import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-survey-view',
  templateUrl: './new-survey-view.component.html',
  styleUrls: ['./new-survey-view.component.scss']
})
export class NewSurveyViewComponent implements OnInit {

  survey: Survey;

  constructor(private surveyService: SurveyService,
              private router: Router) { }

  ngOnInit() {
    /* this.survey = new Survey('', [], '');
    const id = this. */

  }

}
