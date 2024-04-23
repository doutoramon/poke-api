import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemonList(limit: number = 20, offset: number = 0): Observable<any> {
    const url = `${this.apiUrl}pokemon?limit=${limit}&offset=${offset}`;
    return this.http.get<any>(url);
  }

  getPokemonDetails(idOrName: string): Observable<any> {
    const url = `${this.apiUrl}pokemon/${idOrName}`;
    return this.http.get<any>(url);
  }

  getPokemonImage(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  searchPokemon(name: string): Observable<any> {
    const url = `${this.apiUrl}pokemon/${name}`;
    return this.http.get<any>(url);
  }
}
