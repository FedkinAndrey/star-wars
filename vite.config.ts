import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	const apiUrl = env.VITE_API_URL;

	if (!apiUrl) {
		console.error('VITE_API_URL is not defined in the .env file');
		process.exit(1);
	}

	return {
		plugins: [react()],
		base: '/star-wars/',
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		server: {
			proxy: {
				'/api': {
					target: apiUrl,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
		test: {
			environment: 'jsdom',
			setupFiles: './src/setupTests.ts',
			globals: true,
		},
	};
});
