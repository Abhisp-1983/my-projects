import { Component, Input } from '@angular/core';
import { trigger, style, animate, transition, state, keyframes } from '@angular/animations';

interface Quote {
  text: string;
  author: string;
  category: string;
}

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
  animations: [
    trigger('fadeScale', [
      transition(':enter', [
        style({ 
          opacity: 0,
          transform: 'translateY(30px) scale(0.9)'
        }),
        animate('0.6s cubic-bezier(0.4, 0.0, 0.2, 1)', 
          keyframes([
            style({ 
              opacity: 0.5,
              transform: 'translateY(20px) scale(0.95)',
              offset: 0.3
            }),
            style({ 
              opacity: 0.8,
              transform: 'translateY(-5px) scale(1.02)',
              offset: 0.8
            }),
            style({ 
              opacity: 1,
              transform: 'translateY(0) scale(1)',
              offset: 1
            })
          ])
        )
      ]),
      transition(':leave', [
        animate('0.5s cubic-bezier(0.4, 0.0, 0.2, 1)', 
          keyframes([
            style({ 
              opacity: 1,
              transform: 'translateY(0) scale(1)',
              offset: 0
            }),
            style({ 
              opacity: 0.5,
              transform: 'translateY(-10px) scale(0.95)',
              offset: 0.3
            }),
            style({ 
              opacity: 0,
              transform: 'translateY(-20px) scale(0.9)',
              offset: 1
            })
          ])
        )
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(20px)'
        }),
        animate('0.5s cubic-bezier(0.4, 0.0, 0.2, 1)', 
          keyframes([
            style({ 
              opacity: 0.5,
              transform: 'translateY(10px)',
              offset: 0.5
            }),
            style({ 
              opacity: 1,
              transform: 'translateY(0)',
              offset: 1
            })
          ])
        )
      ]),
      transition(':leave', [
        animate('0.5s cubic-bezier(0.4, 0.0, 0.2, 1)', 
          keyframes([
            style({ 
              opacity: 1,
              transform: 'translateY(0)',
              offset: 0
            }),
            style({ 
              opacity: 0,
              transform: 'translateY(-20px)',
              offset: 1
            })
          ])
        )
      ])
    ])
  ]
})
export class QuoteComponent {
  private _quotes: Quote[] = [];
  loading = true;
  @Input() set quotes(value: Quote[]) {
    this._quotes = value;
    this.loading = false;
  }
  get quotes(): Quote[] {
    return this._quotes;
  }
  private hoveredQuotes: Set<Quote> = new Set();
  currentPage = 0;
  quotesPerPage = 3;

  get totalPages(): number {
    return Math.ceil(this.quotes.length / this.quotesPerPage);
  }

  get displayedQuotes(): Quote[] {
    const start = this.currentPage * this.quotesPerPage;
    return this.quotes.slice(start, start + this.quotesPerPage);
  }

  get canGoNext(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  get canGoPrevious(): boolean {
    return this.currentPage > 0;
  }

  nextPage(): void {
    if (this.canGoNext) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.canGoPrevious) {
      this.currentPage--;
    }
  }

  onQuoteHover(quote: Quote) {
    this.hoveredQuotes.add(quote);
  }

  onQuoteLeave(quote: Quote) {
    this.hoveredQuotes.delete(quote);
  }

  isQuoteHovered(quote: Quote): boolean {
    return this.hoveredQuotes.has(quote);
  }

  onShareQuote(quote: Quote) {
    // Add share functionality
    navigator.share?.({
      title: 'Inspiring Quote',
      text: `"${quote.text}" - ${quote.author}`,
    }).catch(console.error);
  }

  onCopyQuote(quote: Quote) {
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
  }
}
