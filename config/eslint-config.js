module.exports = {
	"env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "modules": true,
            "spread" : true,
            "restParams" : true
        },
        "sourceType": "module"
    },
    rules: {
    	// "indent": [2, 'tab', {SwitchCase: 1, VariableDeclarator: 1}],
    	"no-console": 0,
        "no-redeclare": 1,
        "no-undef": 0,
        "no-unused-vars": [1, {"args": "none"}],
    	"one-var-declaration-per-line": [2, "always"],
    	"no-mixed-spaces-and-tabs": 0,
    	"semi": 2,
        "no-extra-boolean-cast": 0
    },
    "globals": {
        "ActiveXObject": true,
    }
};