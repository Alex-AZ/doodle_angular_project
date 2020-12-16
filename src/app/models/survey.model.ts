import { Choice } from './choice.model';

export class Survey {
    public id: number;
    public title: string;
    public subject: string;
    public name: string;
    public choices: Choice[] = [];

    addChoice(choice: Choice) {
        this.choices.push(choice);
    }
}


/* [
    {
        "doodle_id": "mon-id674743487",
        "doodle_title": "Titre de mon premier Doodle",
        "choices": [
            "Choix 1", "Choix 2", "Choix 3"
        ],
        "users": [
            {
                "name": "Julien",
                "choices": [
                    {
                        "Choix 1": true
                    },
                    {
                        "Choix 2": false
                    },
                    {
                        "Choix 3": true
                    }
                ]
            },
            {
                "name": "Alexis",
                "choices": [
                    {
                        "Choix 1": true
                    },
                    {
                        "Choix 2": true
                    },
                    {
                        "Choix 3": false
                    }
                ]
            }
        ]
    },
    {
        "doodle_id": "mon-id87534788",
        "doodle_title": "Titre de mon deuxième Doodle",
        "choices": [
            "Choix 1", "Choix 2", "Choix 3"
        ],
        "users": [
            {
                "name": "Julien",
                "choices": [
                    {
                        "Choix 1": true
                    },
                    {
                        "Choix 2": false
                    },
                    {
                        "Choix 3": true
                    }
                ]
            },
            {
                "name": "Alexis",
                "choices": [
                    {
                        "Choix 1": true
                    },
                    {
                        "Choix 2": true
                    },
                    {
                        "Choix 3": false
                    }
                ]
            }
        ]
    }
] */