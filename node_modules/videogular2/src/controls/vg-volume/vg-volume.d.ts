import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { Subscription } from 'rxjs';
export declare class VgVolume implements OnInit, OnDestroy {
    API: VgAPI;
    vgFor: string;
    volumeBarRef: ElementRef;
    elem: HTMLElement;
    target: any;
    isDragging: boolean;
    mouseDownPosX: number;
    ariaValue: number;
    subscriptions: Subscription[];
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    onClick(event: {
        clientX: number;
    }): void;
    onMouseDown(event: {
        clientX: number;
    }): void;
    onDrag(event: {
        clientX: number;
    }): void;
    onStopDrag(event: {
        clientX: number;
    }): void;
    arrowAdjustVolume(event: KeyboardEvent): void;
    calculateVolume(mousePosX: number): number;
    setVolume(vol: number): void;
    getVolume(): number;
    ngOnDestroy(): void;
}
