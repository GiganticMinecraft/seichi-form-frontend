/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_BACKEND_API_URL: string;
    readonly NEXT_PUBLIC_MS_APP_CLIENT_ID: string;
    readonly NEXT_PUBLIC_MS_APP_REDIRECT_URL: string;
  }
}
