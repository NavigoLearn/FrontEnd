/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SEGMENT_PROD_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
