export class NotFoundPokemon extends Error {
  private readonly _pokemon: string;
  constructor({ pokemon }: { pokemon: string }) {
    super(`The ${pokemon} was not found, check the name`);
    this._pokemon = pokemon;
  }
}
