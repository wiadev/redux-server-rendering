# Admin web app ( Redux integrated with server-rendering )

## How to work with this project
  1. Pull down the repo, make sure you have Node > 5 and npm > 3
  2. Run `npm install`
  3. Open `localhost:3001` in the browser
  4. Run `npm run build -- --release` for production build and then `npm run deploy` to deploy
  5. Run `npm run lint` to check the source code for syntax errors and potential issues
  6. Run `npm test` or `npm run test:watch` for unit testing
  7. If you're using Atom editor, install these linting packages `apm install linter linter-eslint react linter-stylelint`


## How the project is organized
  1. It is React/Redux app powered by express.js and server side rendering
  2. This app uses GraphQL for getting the data from the outside services (APIs)
  3. This app uses Universal Router and not React Router
  4. The styleguide for this project can be [found here]('https://github.com/EcmaStack/javascript')  

## How to deploy to staging (all commands are in the terminal)
  1. `ssh-add ~/.ssh/id_rsa`
  2. `source ~/.bashrc`, create .bashrc profile if you don't have one
  3. `bizly-util`
  4. `cd dev/Bizly-Deploy-Utils`
  5. `fab adminserver.build:dev`
  6. `fab deploy:development adminserver.deploy:<tag>` (where tag is generated from the previous step)
  7. `ssh dev-admin1-ny3`
  8. `cd /opt/bizly/admin/current/`
  9. `npm run master` or `npm start`


## Packages
---


---
