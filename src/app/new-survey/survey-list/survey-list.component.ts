import { Component, OnInit, OnDestroy } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { Subscription } from 'rxjs';
import { SurveyService } from 'src/app/services/survey.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit, OnDestroy {

  surveys: Survey[];
  survey: Survey;
  surveysSubscription: Subscription;

  constructor(
    private surveyService: SurveyService, 
    private router: Router,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.surveysSubscription = this.surveyService.surveySubject.subscribe(
      (surveys: Survey[]) => {
        this.surveys = surveys;
      }
    );
    this.surveyService.getSurveys();
  }

  onDeleteSurvey() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Êtes-vous sûr de vouloir supprimer ce sondage ?'
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.surveyService.removeSurvey(this.survey);
        this.ngOnInit();
      }
    });
  }

  onViewSurvey(survey: Survey) {
    this.router.navigate(['survey/view/' + survey.getId()]);
  }

  ngOnDestroy() {
    this.surveysSubscription.unsubscribe();
  }
}
