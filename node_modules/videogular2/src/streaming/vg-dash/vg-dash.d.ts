import { ElementRef, SimpleChanges, OnChanges, OnDestroy, OnInit, EventEmitter } from "@angular/core";
import { VgAPI } from '../../core/services/vg-api';
import { Subscription } from 'rxjs';
import { IDRMLicenseServer } from '../streaming';
import { BitrateOption } from '../../core/core';
export declare class VgDASH implements OnInit, OnChanges, OnDestroy {
    private ref;
    API: VgAPI;
    vgDash: string;
    vgDRMToken: string;
    vgDRMLicenseServer: IDRMLicenseServer;
    onGetBitrates: EventEmitter<BitrateOption[]>;
    vgFor: string;
    target: any;
    dash: any;
    subscriptions: Subscription[];
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    ngOnChanges(changes: SimpleChanges): void;
    createPlayer(): void;
    setBitrate(bitrate: BitrateOption): void;
    destroyPlayer(): void;
    ngOnDestroy(): void;
}
