import axios from 'axios';

export class FileCtrl {
    static fileInput: HTMLInputElement;
    static fileCode: HTMLInputElement;
    static printBtn: HTMLElement;

    static init() {
        this.bind();
    }

    static bind() {
        this.fileInput = this.getRef('FileInput') as HTMLInputElement;
        this.fileCode = this.getRef('FileCode') as HTMLInputElement;
        this.printBtn = this.getRef('PrintBtn');

        this.printBtn.addEventListener('click', this.print.bind(this));

        this.watchInput();
    }

    static print() {
        if (!this.fileInput) return null;
        const file = this.fileInput.files[0];
        this.uploadFile(file);
    }

    static watchInput() {
        if (!this.fileInput) return null;
        this.fileInput.addEventListener('change', async () => {
            const file = this.fileInput.files[0];
            if (file) {
                const data = await this.readFile(file)
                this.onData(data);
            } else {
                this.onData('');
            }
        })
    }

    static onData(data: string) {
        this.fileCode.value = data;
    }


    private static readFile(file): Promise<string> {
        if (!file) return null;
        return new Promise((res, rej) => {
            const fr = new FileReader();
            fr.addEventListener('error', error => rej(error));
            fr.addEventListener('loadend', () => res(fr.result as string));
            fr.readAsText(file);
        })
    }

    private static async uploadFile(file) {
        const formData = new FormData();
        formData.append('gcode', file);
        const headers = { 'Content-Type': 'multipart/form-data' };
        const res = await axios.post('/machine/gcode', formData, { headers })
        console.log(res);
    }

    private static getRef(str): HTMLElement | HTMLInputElement {
        return document.querySelector(`.section-file [ref${str}]`);
    }

}
