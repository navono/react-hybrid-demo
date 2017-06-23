module.exports = {
    "extends": "standard",
    "plugins": [
        "standard",
        "promise",
        "react"
    ],
    "ecmaFeatures": {
        "jsx": true
    },
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
            2
        ],
        "quotes": [
            "error",
            "single"
        ],
        "no-unused-vars": 0,
        "no-mixed-spaces-and-tabs": 2,
        "indent": [2, 2, {"SwitchCase": 1}],
        "no-useless-constructor": 0
    }
};