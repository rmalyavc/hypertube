import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { Subscription } from 'rxjs';
export declare class VgPlaybackButton implements OnInit, OnDestroy {
    API: VgAPI;
    vgFor: string;
    elem: HTMLElement;
    target: any;
    playbackValues: Array<string>;
    playbackIndex: number;
    subscriptions: Subscription[];
    ariaValue: number;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    onClick(): void;
    onKeyDown(event: KeyboardEvent): void;
    updatePlaybackSpeed(): void;
    getPlaybackRate(): number;
    ngOnDestroy(): void;
}
