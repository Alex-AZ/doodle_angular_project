import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../models/survey.model';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss']
})
export class NewSurveyComponent implements OnInit {

  choicesList: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

  surveyForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.surveyForm = this.formBuilder.group({
      title: '',
      choices: this.formBuilder.array([]),
      name: ''
    });
  }

  getChoices(): FormArray {
    return this.surveyForm.get('choices') as FormArray;
  }

  onAddChoice() {
    const newChoiceControl = this.formBuilder.control(null, Validators.required);
    this.getChoices().push(newChoiceControl);
  }

  onSubmit() {
    const value = this.surveyForm.value;
    const newSurvey = new Survey(
      value['title'],
      value['choices'],
      value['name']
    );
    this.surveyService.addSurvey(newSurvey);
  }

}
