export class FileContentReader {

    static readContent(file: File) {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.addEventListener('load', () => {
                resolve(fr.result);
            });
            fr.addEventListener('error', (err) => {
                reject(err);
            });
            fr.readAsText(file);
        });
    }

}