import { OnInit, ElementRef, OnDestroy } from '@angular/core';
import { VgAPI } from '../core/services/vg-api';
import { Subscription } from 'rxjs';
import { VgFullscreenAPI } from '../core/services/vg-fullscreen-api';
import { VgControlsHidden } from '../core/services/vg-controls-hidden';
export declare class VgOverlayPlay implements OnInit, OnDestroy {
    API: VgAPI;
    fsAPI: VgFullscreenAPI;
    private controlsHidden;
    vgFor: string;
    elem: HTMLElement;
    target: any;
    isNativeFullscreen: boolean;
    areControlsHidden: boolean;
    subscriptions: Subscription[];
    isBuffering: boolean;
    constructor(ref: ElementRef, API: VgAPI, fsAPI: VgFullscreenAPI, controlsHidden: VgControlsHidden);
    ngOnInit(): void;
    onPlayerReady(): void;
    onUpdateBuffer(isBuffering: any): void;
    onChangeFullscreen(fsState: boolean): void;
    onHideControls(hidden: boolean): void;
    onClick(): void;
    getState(): string;
    ngOnDestroy(): void;
}
