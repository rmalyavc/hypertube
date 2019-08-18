import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { VgAPI } from '../../../core/services/vg-api';
import { Subscription } from 'rxjs';
export declare class VgScrubBarBufferingTime implements OnInit, OnDestroy {
    API: VgAPI;
    vgFor: string;
    elem: HTMLElement;
    target: any;
    subscriptions: Subscription[];
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    getBufferTime(): string;
    ngOnDestroy(): void;
}
