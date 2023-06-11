# money-trail
This repository contains a fully functionnal deployable project for the Heroku Platform. (ReactJS + Node.js wrapped together)

[standalone app that also acts as an API for the frontend](#heroku-deployment-backend)

However, I've chosen to deploy the React App, that is inside client/ folder, to GitHub Pages because of Heroku limitations for hobby usage (free):
- gh-pages can enforces HTTPS.
- gh-pages, unlike Heroku, does not sleep. I can show a Loading screen while the Heroku App is waking up.

[frontend only](#github-pages-deployment-frontend)

## Heroku Deployment (Backend)
Inside the project folder, connect it to a heroku-hosted git remote (https://git.heroku.com/my-money-trail.git), run:
```
heroku git:remote -a my-money-trail
```
To push the code changes, run:
```
git push heroku main
```

## GitHub Pages Deployment (Frontend)
Inside the project ./client/ folder, I've installed the github pages dependency:
```
npm install gh-pages --save-dev
```
Then, In ./client/package.json, I've added:
```
...
"homepage": "https://samitamerarar.github.io/money-trail",
...
"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
},
...
```
In App.js, 
1. to use the current url as root path for the React Router (e.g. https://samitamerarar.github.io/), modify Router component:
```
<Router basename={process.env.PUBLIC_URL}>
```
2. to use the API hosted on Heroku, add default base URL to Axios:
```
axios.defaults.baseURL = 'https://my-money-trail.herokuapp.com/';
```

### Deploy to gh-pages
To ONLY push the CLIENT, a branch called gh-pages must ONLY contain the client repository.
Steps:
1. git add, git commit, git push the changes on **main** branch
2. create a new branch with the react app only by running on **main** branch:
    ```
    git subtree push --prefix client/ origin gh-pages
    ```
3. checkout to branch **gh-pages**, npm install dependencies if needed, then run:
    ```
    npm run deploy
    ```
#### One liner deploy (Command Prompt)
> git push origin --delete gh-pages & git subtree push --prefix client/ origin gh-pages && git checkout gh-pages && npm install && npm run deploy && git checkout main && git branch -d gh-pages
