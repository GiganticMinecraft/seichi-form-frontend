import {
  BrowserAuthError,
  IPublicClientApplication,
  ServerError,
} from '@azure/msal-browser';
import {
  andThenAsyncForResult,
  andThenForResult,
  createErr,
  createOk,
  isOk,
  mapErrForResult,
  unwrapOk,
} from 'option-t/lib/PlainResult';
import { tryCatchIntoResultWithEnsureErrorAsync } from 'option-t/lib/PlainResult/tryCatchAsync';

import { getMcProfile } from './getMcProfile';
import { hasMcAccount } from './hasMcAccount';
import { requireMcAccessToken } from './requireMcAccessToken';
import { requireMsAccountAccessToken } from './requireMsAccountAccessToken';
import { requireXblToken } from './requireXblToken';
import { requireXstsToken } from './requireXstsToken';

import { loginRequest } from '../config/msal';
import {
  MsAccountOwnsNoMcAccount,
  UserCancelledMsSignIn,
  UserDeniedAccess,
} from '../types';

const getMinecraftGameProfile = async (
  params: Parameters<typeof requireMsAccountAccessToken>,
) => {
  const msAccessToken = await requireMsAccountAccessToken(...params);
  const xblToken = await andThenAsyncForResult(msAccessToken, requireXblToken);
  const xstsToken = await andThenAsyncForResult(xblToken, requireXstsToken);
  const mcAccessToken = await andThenAsyncForResult(
    xstsToken,
    requireMcAccessToken,
  );
  const hasMc = await andThenAsyncForResult(mcAccessToken, hasMcAccount);
  if (isOk(hasMc) && !unwrapOk(hasMc)) {
    return createErr(new MsAccountOwnsNoMcAccount());
  }

  return andThenAsyncForResult(mcAccessToken, getMcProfile);
};

export const loginAndGetGameProfile = async (
  instance: IPublicClientApplication,
) => {
  const loginResult = await tryCatchIntoResultWithEnsureErrorAsync(() =>
    instance.loginPopup(loginRequest),
  );
  const result = mapErrForResult(loginResult, (e) => {
    if (e instanceof BrowserAuthError && e.errorCode === 'user_cancelled') {
      return new UserCancelledMsSignIn();
    }
    if (e instanceof ServerError && e.errorCode === 'access_denied') {
      return new UserDeniedAccess();
    }

    return e;
  });

  return andThenAsyncForResult(
    andThenForResult(result, (r) => {
      if (!r.account) {
        return createErr(new Error('Failed to fetch account info.'));
      }

      return createOk(r.account);
    }),
    (account) =>
      getMinecraftGameProfile([instance, account, loginRequest.scopes]),
  );
};
