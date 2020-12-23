import { Choice } from './choice.model';

export class Survey {
    // Todo: passer les attributs en protected et implémenter les getters et setters

    protected id: number;
    protected title: string;
    protected subject: string;
    protected name: string;
    protected choices: Choice[] = [];

    getId(): number {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string) {
        this.title = title;
    }

    getSubject(): string {
        return this.subject;
    }

    setSubject(subject: string) {
        this.subject = subject;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getChoices(): Choice[] {
        return this.choices;
    }

    setChoices(choices: Choice[]) {
        this.choices = choices;
    }

    addChoice(choice: Choice) {
        this.choices.push(choice);
    }
}