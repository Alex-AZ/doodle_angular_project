import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SurveyService } from './services/survey.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { NewSurveyComponent } from './new-survey/new-survey.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NewSurveyViewComponent } from './new-survey/new-survey-view/new-survey-view.component';
import { SurveyListComponent } from './new-survey/survey-list/survey-list.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

const appRoutes: Routes = [
  { path: 'survey/new', component: NewSurveyComponent },
  { path: 'survey/list', component: SurveyListComponent },
  { path: 'survey/view/:id', component: NewSurveyViewComponent},
  { path: '', redirectTo: 'survey/new', pathMatch:'full' },
  { path: '**', redirectTo: 'survey/new' }
]

@NgModule({
  declarations: [
    AppComponent,
    NewSurveyComponent,
    NewSurveyViewComponent,
    SurveyListComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    SurveyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
