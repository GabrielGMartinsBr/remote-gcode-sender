import { Subject, firstValueFrom } from 'rxjs';

export class FileBrowser {

    constructor() {
        this.input = this.createInputElement();
        this.files$ = new Subject();

        this.bindEventHandlers();
    }

    browserFiles(): Promise<FileList | null> {
        this.input.click();
        return firstValueFrom(this.files$);
    }

    clear() {
        console.log('clear', this.input.value);
        this.input.value = '';
    }


    // Private

    private input: HTMLInputElement;
    private files$: Subject<FileList | null>;

    private createInputElement() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.gcode,.txt';
        return input;
    }

    private bindEventHandlers() {
        this.input.addEventListener('input', () => {
            this.handleInput();
        });
    }

    private handleInput() {
        const files = this.input.files;
        this.files$.next(files);
    }

}