import {Component} from '@angular/core';
import {remote} from "electron";

@Component({
    selector: 'window-controls',
    template: `
        <button class="fa" (click)="minimize()">&#xf2d1;</button>
        <button class="fa" (click)="maximize()" *ngIf="isMaximized()">&#xf2d2;</button>
        <button class="fa" (click)="maximize()" *ngIf="!isMaximized()">&#xf2d0;</button>
        <button class="fa" (click)="close()">&#xf00d;</button>
    `,
    styles: [`
        :host {
            display: flex;
            margin-left: 10px;
            margin-right: 10px;
            position: absolute;
        }
        
        .left:host {
            left: 0;
            flex-direction: row-reverse;
        }
        
        .right:host {
            right: 0;
            flex-direction: row;
        }
        
        button {
            -webkit-app-region: no-drag;
            margin: 2px;
            font-size: 0.75em;
            line-height: 1.5em;
        }
    `],
    host: {
        "[class.left]": "getControlsSide() == 'left'",
        "[class.right]": "getControlsSide() == 'right'"
    }
})
export class WindowControlsComponent {
    public minimize(): void {
        remote.getCurrentWindow().minimize();
    }

    public maximize(): void {
        let remoteWindow = remote.getCurrentWindow();
        if (!remoteWindow.isMaximized()) {
            remoteWindow.maximize();
        } else {
            remoteWindow.unmaximize();
        }
    }

    public isMaximized(): boolean {
        return remote.getCurrentWindow().isMaximized();
    }

    public close(): void {
        remote.getCurrentWindow().close();
    }

    public getControlsSide(): String {
        if (process.platform == "darwin") {
            return "left";
        }
        return "right";
    }
}