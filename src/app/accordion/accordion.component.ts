import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('closed', style({
        height: '0',
        minHeight: '0',
        opacity: '0',
        padding: '0'
      })),
      state('open', style({
        height: '*',
        opacity: '1'
      })),
      transition('closed => open', [
        group([
          animate('200ms ease-out', style({ height: '*' })),
          animate('300ms ease-out', style({ opacity: 1 })),
          animate('300ms ease-out', keyframes([
            style({ transform: 'translateY(-5%)', offset: 0 }),
            style({ transform: 'translateY(2%)', offset: 0.7 }),
            style({ transform: 'translateY(0)', offset: 1.0 })
          ]))
        ])
      ]),
      transition('open => closed', [
        group([
          animate('200ms ease-in', style({ opacity: 0 })),
          animate('300ms ease-in', style({ height: '0', padding: '0' })),
          animate('300ms ease-in', keyframes([
            style({ transform: 'translateY(0)', offset: 0 }),
            style({ transform: 'translateY(-2%)', offset: 0.3 }),
            style({ transform: 'translateY(-5%)', offset: 1.0 })
          ]))
        ])
      ])
    ]),
    trigger('rotateIcon', [
      state('closed', style({ transform: 'rotate(0)' })),
      state('open', style({ transform: 'rotate(180deg)' })),
      transition('closed <=> open', animate('300ms ease-out'))
    ]),
    trigger('highlight', [
      state('active', style({ 
        background: 'linear-gradient(to right, #e3f2fd, #bbdefb)'
      })),
      state('inactive', style({ 
        background: 'linear-gradient(to right, #ffffff, #f8f9fa)'
      })),
      transition('inactive => active', animate('200ms ease-out')),
      transition('active => inactive', animate('200ms ease-in'))
    ])
  ]
})
export class AccordionComponent {
  activeSection: number = -1;

  toggleAccordion(section: number): void {
    this.activeSection = this.activeSection === section ? -1 : section;
  }

  getState(section: number): string {
    return this.activeSection === section ? 'active' : 'inactive';
  }
}
