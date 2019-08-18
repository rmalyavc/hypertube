import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { Subscription } from 'rxjs';
export declare class VgMute implements OnInit, OnDestroy {
    API: VgAPI;
    vgFor: string;
    elem: HTMLElement;
    target: any;
    currentVolume: number;
    subscriptions: Subscription[];
    ariaValue: string;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    onClick(): void;
    onKeyDown(event: KeyboardEvent): void;
    changeMuteState(): void;
    getVolume(): any;
    ngOnDestroy(): void;
}
