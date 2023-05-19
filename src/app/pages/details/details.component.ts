import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

//Service
import { PokeapiService } from 'src/app/service/pokeapi.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;
  public isLoading: boolean = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private PokeApiService: PokeapiService
  ) {}

  ngOnInit(): void {
    this.getPokemon;  
  }

  get getPokemon(){
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.PokeApiService.apiGetPokemons(`${this.urlPokemon}/${id}`);
    const name = this.PokeApiService.apiGetPokemons(`${this.urlName}/${id}`);

    forkJoin([pokemon, name]).subscribe(
      res => {
        this.pokemon = res;
    })

    return console.log(id);
  }

}