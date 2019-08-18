import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { VgAPI } from '../core/services/vg-api';
import { IPlayable } from '../core/vg-media/i-playable';
import { Subscription } from 'rxjs';
export declare class VgBuffering implements OnInit, OnDestroy {
    API: VgAPI;
    vgFor: string;
    elem: HTMLElement;
    target: IPlayable;
    checkInterval: number;
    currentPlayPos: number;
    lastPlayPos: number;
    subscriptions: Subscription[];
    isBuffering: boolean;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    onUpdateBuffer(isBuffering: any): void;
    ngOnDestroy(): void;
}
