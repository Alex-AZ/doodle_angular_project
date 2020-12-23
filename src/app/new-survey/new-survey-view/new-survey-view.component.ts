import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Choice } from 'src/app/models/choice.model';

@Component({
  selector: 'app-new-survey-view',
  templateUrl: './new-survey-view.component.html',
  styleUrls: ['./new-survey-view.component.scss']
})
export class NewSurveyViewComponent implements OnInit {

  //Survey
  survey: Survey;

  //Choices:
  choicesForm: FormGroup;

  getChoices(): FormArray {
    return this.choicesForm.get('choices') as FormArray;
  }

  constructor(
    private surveyService: SurveyService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    //Survey:
    const id = this.route.snapshot.params['id'];
    this.survey = this.surveyService.findSurveyById(+id);

    //Choices:
    //Si le sondage est différent de undefined alors on est redirigé vers la page view (page des votes) * 
    if (this.survey !== undefined) { 
      this.choicesForm = this.formBuilder.group({
        choices: this.formBuilder.array([])
      })

      //Si le tableau des choix est vide alors on rentre des donées
      if (this.survey.getChoices().length === 0) {
        this.getChoices().push(this.formBuilder.group({
          name: this.formBuilder.control('', [Validators.required]),
          choice: this.formBuilder.control('', [this.choiceValidator()])
        }));
      }

      //Sinon une fois les choix enregistrés on peut retourner sur le sondage 
      //et revenir sur les choix pour les modifier
      this.survey.getChoices().forEach(choice => {
        this.getChoices().push(this.formBuilder.group({
          name: this.formBuilder.control(choice.getName(), [Validators.required]),
          choice: this.formBuilder.control(choice.getChoices(), [this.choiceValidator()])
        }));
      });

      //Sinon on est redirigé vers le path vide donc la page new (création du sondage) *
    } else { 
      this.router.navigate(['']);
    }
  }

  //Validator Custom
  private choiceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => { //Ligne par défaut de ValidatorFn
      if (control.value === undefined || control.value === '' || control.value === null) {
        return {
          undefined: {
            value: ''
          }
        };
      } else {
        return null;
      }
    };
  }

  //Boutons oui ou non:
  onToggleYes(formGroup: FormGroup) {
    if (formGroup.value.choice === true) {
      formGroup.controls.choice.setValue(undefined);
    } else {
      formGroup.controls.choice.setValue(true);
    }
  }

  onToggleNo(formGroup: FormGroup) {
    if (formGroup.value.choice === false) {
      formGroup.controls.choice.setValue(undefined);
    } else {
      formGroup.controls.choice.setValue(false);
    }
  }

  //Ajouter un vote:
  onAddChoice() {
    this.getChoices().push(this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      choice: this.formBuilder.control('', [this.choiceValidator()])
    }));
  }

  onRemoveChoice(i: number) {
    this.getChoices().removeAt(i);
  }

  onSubmitChoices() {
    const choices = this.choicesForm.controls.choices.value;

    this.survey.setChoices([]);

    choices.forEach(choice => {
      const newChoice = new Choice();
      newChoice.setName(choice.name);
      newChoice.setChoices(choice.choice);

      this.survey.addChoice(newChoice);
    });

    this.surveyService.editSurvey(this.survey);
  }
}
