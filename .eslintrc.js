module.exports = {
    "extends": "standard",
    "installedESLint": true,
    "plugins": [
        "standard",
        "promise"
    ],
    "env": {
        "browser": true,
        "es6": true
    // "commonjs": true,
    // "jquery": true
    },
    "parserOptions": {
        "jsx": true
    },
    "rules": {
        //0:关闭，1:警告，2:异常
        "semi": 0,
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "single"
        ],
        "no-unused-vars": 1,
        "no-mixed-spaces-and-tabs": 2,
        "indent": [2, 4, {"SwitchCase": 1}],
        "no-useless-constructor": 0
    }
};