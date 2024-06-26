module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:storybook/recommended',
        'plugin:prettier/recommended',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
        {
            files: ['slice.{ts,js}'],
            rules: {
                'no-param-reassign': 'off',
                'consistent-return': 'off',
            },
        },
    ],
    ignorePatterns: ['**/_trash/*'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'no-restricted-syntax': [
            'error',
            {
                selector: 'CallExpression[callee.name=useSelector]',
                message:
                    'useSelector should not be used. Use its type-safe version: useAppSelector',
            },
            {
                selector: 'CallExpression[callee.name=useDispatch]',
                message:
                    'useDispatch should not be used. Use its type-safe version: useAppDispatch',
            },
        ],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                'newlines-between': 'always',
            },
        ],
        'react/react-in-jsx-scope': 0,
        'no-return-assign': 0,
        'react/prop-types': 0,
        'react/require-default-props': 0,
        'react/function-component-definition': 0,
        'react/no-unescaped-entities': 0,
        '@typescript-eslint/no-shadow': 0,
        'react/jsx-props-no-spreading': 0,
        'react/no-unknown-property': 1,
        'import/prefer-default-export': 0,
        'no-plusplus': 0,
        'max-classes-per-file': 0,
        'spaced-comment': 0,
        'react/jsx-no-useless-fragment': 1,
        '@typescript-eslint/no-use-before-define': 1,
    },
}
