import { Pokemon } from "../../models/pokemon.model";
import { HttpServiceFactory } from "./HttpServiceFactory";

export class PokemonService extends HttpServiceFactory<Pokemon> {
  //Custom methods

  constructor({ pokeName, url }: { pokeName: string; url: string }) {
    super({
      itemRequest: pokeName,
      url,
    });
  }
}
