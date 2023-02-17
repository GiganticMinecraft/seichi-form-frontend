import { z } from 'zod';

// TODO: add descriptions

export type MsAccessToken = {
  token: string;
};

export const requireXboxTokenResponse = z.object({
  Token: z.string(),
  DisplayClaims: z.object({
    xui: z.array(z.object({ uhs: z.string() })),
  }),
});

export type XboxToken = {
  token: string;
  userHash: string;
};

export type McAccessToken = {
  token: string;
};

export type McProfile = {
  id: string;
  name: string;
};