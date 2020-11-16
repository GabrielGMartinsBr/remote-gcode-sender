import { Comp, Ref, On } from "src/app/framework/framework";
import { WSC } from "src/app/wsc/wsc";

@Comp()
export class MachineBaseCtrls {
    @Ref('tlBtn') tlBtn;
    @Ref('homeBtn') homeBtn;
    @Ref('homeXBtn') homeXBtn;
    @Ref('homeYBtn') homeYBtn;
    @Ref('homeZBtn') homeZBtn;
    @Ref('dirTBtn') dirTBtn;
    @Ref('dirRBtn') dirRBtn;
    @Ref('dirBBtn') dirBBtn;
    @Ref('dirLBtn') dirLBtn;

    constructor() {
        // console.log('class contr');
    }

    @On('click', 'tlBtn') onTl(e) {
        console.log('not implement yet');
        // WSC.send({ cmd: 'serialGetLog' });
        // console.log(this.myName);
        // console.log(this, e, this.myName);
    }

    @On('click', 'homeBtn') onHome() {
        WSC.send({ cmd: 'serialSendPresetCommand', data: 'Home' });
    }

    @On('click', 'homeXBtn') onHomeX() {
        console.log('homeX')
        WSC.send({ cmd: 'serialSendPresetCommand', data: 'HomeX' });
    }

    @On('click', 'homeYBtn') onHomeY() { 
        WSC.send({ cmd: 'serialSendPresetCommand', data: 'HomeY' });
    }

    @On('click', 'homeZBtn') onHomeZ() { 
        WSC.send({ cmd: 'serialSendPresetCommand', data: 'HomeZ' });
    }

    @On('click', 'dirTBtn') onDirT() { 
        WSC.send({ cmd: 'serialSendPresetCommand', data: 'DirTop1x' });
    }

    @On('click', 'dirRBtn') onDirR() { 
        WSC.send({ cmd: 'serialSendPresetCommand', data: 'DirRight1x' });
    }

    @On('click', 'dirBBtn') onDirB() { 
        WSC.send({ cmd: 'serialSendPresetCommand', data: 'DirBottom1x' });
    }

    @On('click', 'dirLBtn') onDirL() { 
        WSC.send({ cmd: 'serialSendPresetCommand', data: 'DirLeft1x' });
    }

}
