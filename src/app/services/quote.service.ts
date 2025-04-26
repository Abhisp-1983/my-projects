import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Quote {
  text: string;
  author: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  // Using the Type.fit API as a backup
  private apiUrl = 'https://type.fit/api/quotes';

  constructor(private http: HttpClient) {}

  getQuotes(): Observable<Quote[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(response => response.slice(0, 12).map(quote => ({
        text: quote.text,
        author: quote.author || 'Unknown',
        category: 'Inspiration'
      }))), // Properly closing the map operator
      catchError(error => {
        console.error('Error fetching quotes:', error);
        // Fallback to static quotes if API fails
        return of(this.getFallbackQuotes());
      })
    );
  }

  private getFallbackQuotes(): Quote[] {
    return [
      {
        text: "Life is what happens while you're busy making other plans.",
        author: "John Lennon",
        category: "Life"
      },
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "Success"
      },
      {
        text: "Be the change you wish to see in the world.",
        author: "Mahatma Gandhi",
        category: "Inspiration"
      },
      {
        text: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair",
        category: "Motivation"
      },
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "Success"
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "Dreams"
      },
      {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu",
        category: "Journey"
      },
      {
        text: "Don't count the days, make the days count.",
        author: "Muhammad Ali",
        category: "Motivation"
      },
      {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
        category: "Journey"
      },
      {
        text: "Yesterday is not ours to recover, but tomorrow is ours to win or lose.",
        author: "Lyndon B. Johnson",
        category: "Time"
      },
      {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker",
        category: "Future"
      },
      {
        text: "In three words I can sum up everything I've learned about life: it goes on.",
        author: "Robert Frost",
        category: "Life"
      }
    ];
  }
}
