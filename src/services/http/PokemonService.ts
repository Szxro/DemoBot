import { Pokemon } from "../../models/pokemon.model";
import { HttpServiceFactory } from "./HttpServiceFactory";

export class PokemonService extends HttpServiceFactory<Pokemon> {
  //Custom methods

  async getPokemonByName({ pokeName }: { pokeName: string }) {
    return await this.get({ url: `${process.env.POKE_URL}/${pokeName}` });
  }
}
