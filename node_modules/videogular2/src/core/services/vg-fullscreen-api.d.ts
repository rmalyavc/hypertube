import { EventEmitter, QueryList } from '@angular/core';
import { VgMedia } from '../vg-media/vg-media';
import { Subscription } from 'rxjs';
export declare class VgFullscreenAPI {
    polyfill: any;
    onchange: string;
    onerror: string;
    nativeFullscreen: boolean;
    isFullscreen: boolean;
    isAvailable: boolean;
    videogularElement: HTMLElement;
    medias: QueryList<VgMedia>;
    fsChangeSubscription: Subscription;
    onChangeFullscreen: EventEmitter<any>;
    constructor();
    init(elem: HTMLElement, medias: QueryList<VgMedia>): void;
    onFullscreenChange(): void;
    toggleFullscreen(element?: any): void;
    request(elem: any): void;
    enterElementInFullScreen(elem: any): void;
    exit(): void;
}
