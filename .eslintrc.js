module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': ['error', 'unix'],
        "prefer-destructuring": ["error", {"object": true, "array": false}],
        "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
        indent: ['error', 4],
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
