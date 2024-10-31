/* eslint-disable @typescript-eslint/no-explicit-any -- здесь это контролируемо */
/// <reference types="vite/client" />

// https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript
interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

type OptionalRecord<K extends keyof any, T> = Partial<Record<K, T>>;
