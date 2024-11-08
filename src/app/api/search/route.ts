'use server';

import { NextResponse } from 'next/server';
import { BACKEND_SERVER_URL } from '@/env';
import { getCachedToken } from '@/user-token/mcToken';
import { nextResponseFromResponseHeaders } from '../_generics/responseHeaders';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getCachedToken();
  if (!token) {
    return NextResponse.redirect('/');
  }

  const field = req.nextUrl.searchParams.get('query');
  const encodedUrl = encodeURI(`${BACKEND_SERVER_URL}/search?query=${field}`);

  const response = await fetch(encodedUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  });

  return nextResponseFromResponseHeaders(
    NextResponse.json(await response.json(), { status: response.status }),
    response
  );
}