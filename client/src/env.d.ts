/// <reference types="vite/client" />

// Extend/declare any custom env vars (prefix with VITE_ to be exposed to client)
interface ImportMetaEnv {
	readonly VITE_APP_NAME?: string;
	// add more as needed, e.g. readonly VITE_API_BASE_URL: string;
}
interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// SFC module declaration (co-located here so vue-tsc picks it up reliably)
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
	export default component;
}
