To run program on a Debian-based Linux machine:
    1. Install Python and the Python packeages listed below
    2. Install Node/NPM
    3. Run "sudo npm i" in top level of project directory
    4. Ensure that semantic-ui-react and semantic-ui-css are properly installed
    5. Install Ngrok and change any references in the project that are currently "zellipsoid.ngrok.io" (should be one in App.js) to the ngrok URL you were given
    6. Laucnh Ngrok, forwarding port 5000
    7. Run "npm run dev"
    8. Open the Ngrok url you were given 

Python packages used:
    flask_socketio
    flask_login
    sqlite3
    passlib
    datetime
    flask_sslify
Node modules used:
    "@babel/core": "7.2.2",
    "@svgr/webpack": "4.1.0",
    "babel-core": "7.0.0-bridge.0",
    "babel-eslint": "9.0.0",
    "babel-jest": "23.6.0",
    "babel-loader": "8.0.5",
    "babel-plugin-named-asset-import": "^0.3.1",
    "babel-preset-react-app": "^7.0.2",
    "bfj": "6.1.1",
    "case-sensitive-paths-webpack-plugin": "2.2.0",
    "css-loader": "1.0.0",
    "dotenv": "6.0.0",
    "dotenv-expand": "4.2.0",
    "eslint": "5.12.0",
    "eslint-config-react-app": "^3.0.8",
    "eslint-loader": "2.1.1",
    "eslint-plugin-flowtype": "2.50.1",
    "eslint-plugin-import": "2.14.0",
    "eslint-plugin-jsx-a11y": "6.1.2",
    "eslint-plugin-react": "7.12.4",
    "file-loader": "2.0.0",
    "fs-extra": "7.0.1",
    "html-webpack-plugin": "4.0.0-alpha.2",
    "identity-obj-proxy": "3.0.0",
    "jest": "23.6.0",
    "jest-pnp-resolver": "1.0.2",
    "jest-resolve": "23.6.0",
    "jest-watch-typeahead": "^0.2.1",
    "mini-css-extract-plugin": "0.5.0",
    "optimize-css-assets-webpack-plugin": "5.0.1",
    "pnp-webpack-plugin": "1.2.1",
    "postcss-flexbugs-fixes": "4.1.0",
    "postcss-loader": "3.0.0",
    "postcss-preset-env": "6.5.0",
    "postcss-safe-parser": "4.0.1",
    "qrcode.react": "^0.9.3",
    "react": "^16.8.6",
    "react-app-polyfill": "^0.2.2",
    "react-confetti": "^2.7.3",
    "react-dev-utils": "^8.0.0",
    "react-dom": "^16.8.6",
    "react-qr-reader": "^2.2.1",
    "resolve": "1.10.0",
    "sass-loader": "7.1.0",
    "semantic-ui-css": "^2.4.1",
    "semantic-ui-react": "^0.86.0",
    "socket.io-client": "^2.2.0",
    "style-loader": "0.23.1",
    "terser-webpack-plugin": "1.2.2",
    "typescript": "^3.4.3",
    "url-loader": "1.1.2",
    "webpack": "4.28.3",
    "webpack-dev-server": "3.1.14",
    "webpack-manifest-plugin": "2.0.4",
    "workbox-webpack-plugin": "3.6.3"