/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard', 'stylelint-prettier'],
	rules: {
		'selector-class-pattern': null,
		'declaration-block-no-redundant-longhand-properties': null,
		'declaration-no-important': true,
		'declaration-empty-line-before': null,
	},
};
