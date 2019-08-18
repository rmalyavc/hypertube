import { Observable } from 'rxjs';
export declare class VgControlsHidden {
    isHidden: Observable<boolean>;
    private isHiddenSubject;
    constructor();
    state(hidden: boolean): void;
}
