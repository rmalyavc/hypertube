import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { VgFullscreenAPI } from '../../core/services/vg-fullscreen-api';
import { Subscription } from 'rxjs';
export declare class VgFullscreen implements OnInit, OnDestroy {
    API: VgAPI;
    fsAPI: VgFullscreenAPI;
    elem: HTMLElement;
    vgFor: string;
    target: Object;
    isFullscreen: boolean;
    subscriptions: Subscription[];
    ariaValue: string;
    constructor(ref: ElementRef, API: VgAPI, fsAPI: VgFullscreenAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    onChangeFullscreen(fsState: boolean): void;
    onClick(): void;
    onKeyDown(event: KeyboardEvent): void;
    changeFullscreenState(): void;
    ngOnDestroy(): void;
}
