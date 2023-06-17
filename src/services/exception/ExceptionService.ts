import { CommandInteraction } from "discord.js";
import { NotFoundException } from "../../exceptions/NotFoundException";
import { InternalErrorException } from "../../exceptions/InternalErrorException";

export class ExceptionService<TRequest> {
  private readonly _next: () => Promise<TRequest>;
  private readonly _context: CommandInteraction;
  constructor({
    next,
    context,
  }: {
    next: () => Promise<TRequest>;
    context: CommandInteraction;
  }) {
    this._next = next;
    this._context = context;
  }
  async executeRequest() {
    try {
      return await this._next();
    } catch (error: unknown) {
      this.handleException(error);
    }
  }

  async handleException(err: unknown) {
    if (
      err instanceof NotFoundException ||
      err instanceof InternalErrorException
    ) {
      await this._context.editReply({ content: err.message });
      return;
    }

    console.error(err);

    await this._context.editReply({
      content: "Something happen to the request check the logger",
    });
  }
}
