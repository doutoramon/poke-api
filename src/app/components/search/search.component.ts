import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PokeApiService } from 'src/app/services/poke-api/poke-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange(event: any): void {
    this.search.emit(event.target.value.trim().toLowerCase());
  }
}
