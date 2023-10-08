import { z } from 'zod';

export const xboxLiveTokenResponseJsonSchema = z.object({
  Token: z.string(),
  DisplayClaims: z.object({
    xui: z.array(z.object({ uhs: z.string() })).nonempty(),
  }),
});
