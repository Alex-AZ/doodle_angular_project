import { Choice } from './choice.model';

export class Survey {
    // Todo: passer les attributs en protected et implémenter les getters et setters

    public id: number;
    public title: string;
    public subject: string;
    public name: string;
    public choices: Choice[] = [];

    //Cette méthode ce déclenche au moment de l'enregistrement des choix
    addChoice(choice: Choice) {
        this.choices.push(choice);
    }
}