module.exports = exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "root": true,
  "extends": [ "react-app" , "airbnb" ],
  "plugins": [ "react" ],
  "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules":true
        }
    },
  "rules": {
      // enable additional rules
      //"indent": ["error", 4],
      //"linebreak-style": ["error", "windows"],
      //"quotes": ["error", "double"],
      "semi": ["warn", "always"],
      "react/prefer-stateless-function": "warn",
      "react/jsx-filename-extension":"warn" ,
      // override default options for rules from base configurations
      "react/prop-types":[1],
      "comma-dangle": ["warn", "always-multiline"],
      "no-cond-assign": ["warn", "always"],
      "no-unused-vars": ["warn"],
      "no-undef": ["warn"],
      'no-confusing-arrow': ['off'],
      'arrow-parens': 'off',
      "no-restricted-syntax": ["warn"],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/prop-types": [1, {ignore: ['match'], skipUndeclared:true}],
      'react/prefer-stateless-function': 'warn',
      'react/forbid-prop-types': 'warn',
      "react/jsx-first-prop-new-line": 'warn',
      'react/jsx-indent': 'warn',
      "no-underscore-dangle": "off",
      "jsx-a11y/no-static-element-interactions": "warn",
      "space-before-function-paren": "warn",
      //"arrow-body-style": "warn",
      // disable rules from base configurations
      "no-console": "off",
      "react/jsx-no-bind":"off",
      "max-len": "off",
      "react/require-default-props": "off",
  }

}
