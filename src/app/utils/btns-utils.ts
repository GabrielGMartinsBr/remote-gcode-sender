export class BtnsUtils {

    static disableBtnTemp(e: Event) {
        const target = e.target as HTMLElement;
        target.setAttribute('disabled', 'true');
        setTimeout(() => {
            target.removeAttribute('disabled');
        }, 2e3);
    }

}