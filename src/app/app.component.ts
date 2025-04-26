import { Component, OnInit } from '@angular/core';
import { QuoteService } from './services/quote.service';
import { Quote } from './services/quote.service';

@Component({
  selector: 'app-root',
  template: `
    <app-quote [quotes]="quotes"></app-quote>
  `
})
export class AppComponent implements OnInit {
  quotes: Quote[] = [];

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.quoteService.getQuotes().subscribe({
      next: (quotes) => {
        this.quotes = quotes;
        console.log('Quotes loaded:', quotes); // for debugging
      },
      error: (error) => {
        console.error('Error loading quotes:', error);
      }
    });
  }
}
