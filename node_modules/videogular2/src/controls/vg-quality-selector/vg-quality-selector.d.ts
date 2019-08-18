import { ElementRef, OnInit, OnDestroy, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { VgAPI } from '../../core/services/vg-api';
import { Subscription } from 'rxjs';
import { BitrateOption } from '../../core/core';
export declare class VgQualitySelector implements OnInit, OnChanges, OnDestroy {
    API: VgAPI;
    bitrates: BitrateOption[];
    onBitrateChange: EventEmitter<BitrateOption>;
    bitrateSelected: BitrateOption;
    elem: HTMLElement;
    target: any;
    subscriptions: Subscription[];
    ariaValue: string;
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    selectBitrate(index: number): void;
    ngOnDestroy(): void;
}
