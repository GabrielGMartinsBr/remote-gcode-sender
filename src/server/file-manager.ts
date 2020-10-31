import * as path from 'path';
import * as fs from 'fs';

export class FileManager {
    static baseDir: string;
    static appdataPath: string;
    static libPath: string;
    static confPath: string;
    static workbenchPath: string;

    static async setupDirs() {
        this.baseDir = this.getEnvPath();
        this.appdataPath = path.join(this.baseDir, 'appdata');
        this.libPath = path.join(this.appdataPath, 'lib');
        this.confPath = path.join(this.appdataPath, 'conf');
        this.workbenchPath = path.join(this.appdataPath, 'workbench');

        await this.makeDirIf(this.appdataPath);
        await this.makeDirIf(this.libPath);
        await this.makeDirIf(this.confPath);
        await this.makeDirIf(this.workbenchPath);
    }

    private static getEnvPath() {
        const filepath = process.env.appdata;
        if (!filepath) {
            return path.resolve('./');
        }
        else if (filepath[0] === '~') {
            return path.join(process.env.HOME, filepath.slice(1));
        }
        return path.resolve(filepath);
    }

    private static async makeDirIf(strPath) {
        try {
            await fs.promises.readdir(strPath);
        } catch (ex) {
            if (!ex || ex.code !== 'ENOENT') {
                throw ex;
            }
            fs.promises.mkdir(strPath);
        }
    }

    static async getFile(fileName: string) {
        try {
            const filePath = path.join(this.workbenchPath, fileName);
            const res = await fs.promises.readFile(filePath);
            return res.toString();
        } catch (ex) {
            console.error(ex);
            return null;
        }
    }

}
