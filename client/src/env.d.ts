/// <reference types="vite/client" />

// Extend/declare any custom env vars (prefix with VITE_ to be exposed to client)
interface ImportMetaEnv {
	readonly VITE_APP_NAME?: string;
	// add more as needed, e.g. readonly VITE_API_BASE_URL: string;
}
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
