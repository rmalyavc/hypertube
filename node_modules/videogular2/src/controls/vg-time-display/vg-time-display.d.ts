import { ElementRef, OnInit, PipeTransform, OnDestroy } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { Subscription } from 'rxjs';
export declare class VgUtcPipe implements PipeTransform {
    transform(value: number, format: string): string;
}
export declare class VgTimeDisplay implements OnInit, OnDestroy {
    API: VgAPI;
    vgFor: string;
    vgProperty: string;
    vgFormat: string;
    elem: HTMLElement;
    target: any;
    subscriptions: Subscription[];
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    getTime(): number;
    ngOnDestroy(): void;
}
