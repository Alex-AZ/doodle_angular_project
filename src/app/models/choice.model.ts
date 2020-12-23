export class Choice {
    protected name: string;
    protected choices: boolean;

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getChoices(): boolean {
        return this.choices;
    }

    setChoices(choice: boolean) {
        this.choices = choice;
    }
}