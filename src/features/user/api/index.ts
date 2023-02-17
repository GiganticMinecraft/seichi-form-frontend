import { getMcProfile } from './getMcProfile';
import { hasMcAccount } from './hasMcAccount';
import { requireMcAccessToken } from './requireMcAccessToken';
import { requireMsAccountAccessToken } from './requireMsAccountAccessToken';
import { requireXblToken } from './requireXblToken';
import { requireXstsToken } from './requireXstsToken';

export const getMinecraftGameProfile = async ([
  instance,
  account,
  scopes,
]: Parameters<typeof requireMsAccountAccessToken>) => {
  const msAccessToken = await requireMsAccountAccessToken(
    instance,
    account,
    scopes,
  );
  const xblToken = await requireXblToken(msAccessToken);
  const xstsToken = await requireXstsToken(xblToken);
  const mcAccessToken = await requireMcAccessToken(xstsToken);
  const hasMc = await hasMcAccount(mcAccessToken);
  // TODO: ここの条件分岐がfalseになる（MCアカウントをもっている）のに、getMcProfileが404になる場合がある
  // これは、アカウントをもっているにも関わらず、アカウント名を設定していないため
  if (!hasMc) {
    throw new Error("The Microsoft account doesn't own Minecraft.");
  }

  return getMcProfile(mcAccessToken);
};
