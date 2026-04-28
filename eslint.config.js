import js from '@eslint/js';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import _noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import pluginVue from 'eslint-plugin-vue';
import pluginVueScopedCss from 'eslint-plugin-vue-scoped-css';
import globals from 'globals';

// eslint-plugin-no-relative-import-paths uses context.getCwd()/getFilename() removed in ESLint v10
const noRelativeImportPaths = {
  ..._noRelativeImportPaths,
  rules: Object.fromEntries(
    Object.entries(_noRelativeImportPaths.rules).map(([name, rule]) => [
      name,
      {
        ...rule,
        create(context) {
          const compat = new Proxy(context, {
            get(target, prop) {
              if (prop === 'getCwd') return () => target.cwd;
              if (prop === 'getFilename') return () => target.filename;
              return typeof target[prop] === 'function' ? target[prop].bind(target) : target[prop];
            },
          });
          return rule.create(compat);
        },
      },
    ]),
  ),
};

export default [
  {
    ignores: ['dist/', 'coverage/', 'ios/', 'android/'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/strongly-recommended'],
  ...vueTsEslintConfig({
    supportedScriptLangs: {
      ts: true,
      js: false,
    },
  }),
  ...pluginVueScopedCss.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        extraFileExtensions: ['.vue'],
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-var': 'error',
      semi: 'error',
      'no-useless-return': 'error',
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'prefer-const': 'error',
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],
      indent: ['error', 2, { SwitchCase: 1 }],
      camelcase: 'error',
      'max-len': ['error', 140],
      quotes: ['error', 'single', { avoidEscape: true }],
      eqeqeq: 'error',
      'dot-notation': 'error',
      'no-alert': 'error',
      'comma-spacing': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_[a-z]\\S*$',
        },
      ],
      'eol-last': 'error',
      'no-useless-concat': 'error',
      'prefer-template': 'error',
      'spaced-comment': [
        'error',
        'always',
        {
          block: { balanced: true },
        },
      ],
      'array-bracket-spacing': 'error',
      'arrow-parens': 'error',
      'arrow-spacing': 'error',
      'block-spacing': 'error',
      'brace-style': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/html-indent': ['error', 2],
      'vue/no-deprecated-slot-attribute': 'off',
      'vue/component-name-in-template-casing': [
        'error',
        'kebab-case',
        {
          registeredComponentsOnly: false,
        },
      ],
      'vue/block-tag-newline': [
        'error',
        {
          singleline: 'always',
          multiline: 'always',
          maxEmptyLines: 0,
        },
      ],
      'vue/padding-line-between-blocks': 'error',
      'vue/no-spaces-around-equal-signs-in-attribute': 'error',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
        },
      ],
      'vue/singleline-html-element-content-newline': 'off',
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          allowSameFolder: false,
          prefix: '@',
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
];
