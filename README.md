# The Good™ Bank UI

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)
[![Npm](https://badgen.net/badge/icon/npm?icon=npm&label)](https://https://npmjs.com/)

This repository is part of The Good Bank Project. More general info on the project can be found in our [API docs](https://github.com/Good-Banking/Backend#readme).

## How to run

In order to run locally you'll need to do some initial setup. In order to ensure compatability with backend dev environment, local versions of this repo will need a `.env` file added the the root of the directory that contains the following contents:

```
REACT_APP_API_URL=http://localhost:8080
```

You'll also need to run the command:

### `npm install` 

in the root directory to download the project dependencies.

---

Once setup is complete, In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
