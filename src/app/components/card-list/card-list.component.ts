import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeApiService } from 'src/app/services/poke-api/poke-api.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit{
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  currentPage: number = 1;
  pageSize: number = 20;
  searchNoResults: boolean = false;

  constructor(private pokeApi: PokeApiService, private router: Router) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    const offset = (this.currentPage - 1) * this.pageSize;
    this.pokeApi.getPokemonList(this.pageSize, offset).subscribe(response => {
      this.pokemons = response.results;
      this.filteredPokemons = this.pokemons;
      this.loadPokemonDetails();
    }, error => {

    });
  }

  loadPokemonDetails() {
    for (let pokemon of this.pokemons) {
      const id = pokemon.url.split('/').filter((segment: any) => !!segment).pop();
      pokemon.id = id;
      this.pokeApi.getPokemonDetails(pokemon.name).subscribe(details => {
        pokemon.types = details.types.map((type: any) => type.type.name);
        pokemon.image = this.pokeApi.getPokemonImage(id);
        pokemon.name = this.capsFirstLetter(pokemon.name);
      }, error => {

      });
    }
  }

  capsFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  searchPokemon(name: string) {
    if (name.trim() === '') {
      this.filteredPokemons = this.pokemons;
      this.searchNoResults = false;
      return;
    }

    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(name.toLowerCase())
    );

    this.searchNoResults = this.filteredPokemons.length === 0;
  }

  goToDetail(id: string): void {
    this.router.navigate(['/pokemon', id]);
  }

  nextPage() {
    this.currentPage++;
    this.getPokemons();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPokemons();
    }
  }
}
