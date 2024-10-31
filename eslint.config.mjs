import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.strictTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
			jsxA11y.flatConfigs.recommended,
			reactPlugin.configs.flat?.recommended ?? {},
			reactPlugin.configs.flat?.['jsx-runtime'] ?? {},
			eslintConfigPrettier,
		],
		files: ['**/*.{ts,tsx}'],
		settings: { react: { version: '18.3' } },
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2020,
			globals: { ...globals.browser, ...globals.jest },
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			'react-hooks': fixupPluginRules(reactHooksPlugin),
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooksPlugin.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'@typescript-eslint/restrict-template-expressions': [
				'error',
				{
					allowNumber: true,
				},
			],
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
		},
	},
	{
		name: 'jest',
		files: ['**/*.test.ts?(x)'],
		...jest.configs['flat/recommended'],
		...jest.configs['flat/style'],
		rules: {
			...jest.configs['flat/recommended'].rules,
			...jest.configs['flat/style'].rules,
		},
	},
);
