import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Convert the id param to a number
 */
export const ParamId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    return Number(ctx.switchToHttp().getRequest().params.id);
  },
);
