import { CommandInteraction } from "discord.js";
import { NotFoundException } from "../../exceptions/NotFoundException";
import { InternalErrorException } from "../../exceptions/InternalErrorException";

export class ExceptionService<TRequest> {
  private readonly _fun: () => Promise<TRequest>;
  private readonly _ctx: CommandInteraction;
  constructor({
    fun,
    ctx,
  }: {
    fun: () => Promise<TRequest>;
    ctx: CommandInteraction;
  }) {
    this._fun = fun;
    this._ctx = ctx;
  }
  async executeRequest() {
    try {
      return await this._fun();
    } catch (error: unknown) {
      this.handleException(error);
    }
  }

  async handleException(err: unknown) {
    if (
      err instanceof NotFoundException ||
      err instanceof InternalErrorException
    ) {
      await this._ctx.editReply({ content: err.message });
      return;
    }

    console.error(err);

    await this._ctx.editReply({
      content: "Something happen to the request check the logger",
    });
  }
}
