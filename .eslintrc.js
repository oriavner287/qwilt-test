module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
        jest: true,
        browser: true,
        amd: true
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            alias: {
                map: [
                    ['@oriavner', './src'],
                    ['@styles', './src/styles'],
                    ['@fonts', './src/public/fonts']
                ],
                extensions: ['.js', '.jsx', '.json']
            }
        }
    },
    globals: {
        __DEV__: false
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended'
    ],
    plugins: ['react', 'import', 'jsx-a11y', 'react-hooks', 'prettier'],
    rules: {
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']
            }
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-unused-vars': 'warn',
        'import/prefer-default-export': 0,
        'react/state-in-constructor': 0,
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error'
    }
}
