export class Survey {
    constructor(
        public id: number,
        public title: string,
        public choices: string[],
        public name: string
    ) {}
}