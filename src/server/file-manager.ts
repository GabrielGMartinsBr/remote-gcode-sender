import * as path from 'path';
import * as fs from 'fs';

export class FileManager {
    static baseDir: string;
    static appDataPath: string;
    static libPath: string;
    static confPath: string;
    static workbenchPath: string;

    static async setupDirs() {
        this.baseDir = this.getEnvPath();
        this.appDataPath = path.join(this.baseDir, 'appData');
        this.libPath = path.join(this.appDataPath, 'lib');
        this.confPath = path.join(this.appDataPath, 'conf');
        this.workbenchPath = path.join(this.appDataPath, 'workbench');

        await this.makeDirIf(this.appDataPath);
        await this.makeDirIf(this.libPath);
        await this.makeDirIf(this.confPath);
        await this.makeDirIf(this.workbenchPath);
    }

    private static getEnvPath() {
        const filepath = process.env.appData;
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

    static async workbenchFiles() {
        try {
            return await fs.promises.readdir(this.workbenchPath);
        } catch (ex) {
            console.error(ex);
            return null;
        }
    }

}
