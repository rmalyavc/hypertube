import { EventEmitter, ElementRef, QueryList, AfterContentInit, OnDestroy } from '@angular/core';
import { VgAPI } from '../services/vg-api';
import { VgFullscreenAPI } from '../services/vg-fullscreen-api';
import { VgMedia } from '../vg-media/vg-media';
import { Subscription } from 'rxjs';
import { VgControlsHidden } from '../services/vg-controls-hidden';
export declare class VgPlayer implements AfterContentInit, OnDestroy {
    api: VgAPI;
    fsAPI: VgFullscreenAPI;
    private controlsHidden;
    elem: HTMLElement;
    isFullscreen: boolean;
    isNativeFullscreen: boolean;
    areControlsHidden: boolean;
    zIndex: string;
    onPlayerReady: EventEmitter<any>;
    onMediaReady: EventEmitter<any>;
    medias: QueryList<VgMedia>;
    subscriptions: Subscription[];
    constructor(ref: ElementRef, api: VgAPI, fsAPI: VgFullscreenAPI, controlsHidden: VgControlsHidden);
    ngAfterContentInit(): void;
    onChangeFullscreen(fsState: boolean): void;
    onHideControls(hidden: boolean): void;
    ngOnDestroy(): void;
}
