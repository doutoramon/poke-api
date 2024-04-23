import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'src/app/services/poke-api/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  pokemon: any;

  constructor(private route: ActivatedRoute, private pokeApi: PokeApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadPokemonDetails(id);
    });
  }

  loadPokemonDetails(id: string): void {
    this.pokeApi.getPokemonDetails(id).subscribe(details => {
      this.pokemon = details;
    });
  }
}
