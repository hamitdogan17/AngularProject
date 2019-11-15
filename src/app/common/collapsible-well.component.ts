import { Component, Input } from '@angular/core';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'collapsible-well',
  template: `
    <div (click)="toggleContent()" class="well pointable">
      <ng-content select="[well-title]"></ng-content>
      <ng-content *ngIf="visible" select="[well-body]"></ng-content>
    </div>
  `
})

export class CollapsibleWellComponent {
  @Input() title: string;
  visible = true;

  toggleContent() {
    this.visible = !this.visible;
  }
}
