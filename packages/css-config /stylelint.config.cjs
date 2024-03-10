module.exports = {
	overrides: [
		{
			files: ['**/*.scss'],
			customSyntax: 'postcss-scss',
		},
	],
	extends: ['stylelint-config-standard'],
	rules: {
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['tailwind', 'unocss', 'apply', 'variants', 'responsive', 'screen'],
			},
		],
	},
};
