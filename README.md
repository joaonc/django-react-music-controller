# Django+React music controller
Django backend + React frontend web app

Following tutorial in
https://www.youtube.com/watch?v=JD-age0BPVo&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j

## Development
### IDE setup
#### JetBrains Pycharm
1. Checkout project from GitHub
2. Set Python interpreter  
   This project was created with Python 3.10, but other versions should work.  
   Steps below in the terminal should be executed in the virtual environment (PyCharm activates it
   automatically).
3. `pip install -r requirements-dev.txt`  
   This will also install dependencies from `requirements.txt`
4. `pre-commit install`  
   Only needs to be done once.
5. `PyCharm -> Preferences -> Languages & Frameworks -> Django -> Enable Django Support`  
   Requires PyCharm Professional.  
   Project can be worked on with the Community edition as well, but some limitations will come up.

#### VS Code and others
Not going into the setup of other IDEs.

### Install
#### Python / Django
Note: Best to work on a virtual environment.
This page doesn't go into how to do that.

Install the development packages:
```
python -m pip install -r dev-requirements.txt
```

This project uses [pyinvoke](https://www.pyinvoke.org/) to facilitate common tasks.
For a list of tasks:
```
inv --list
```

#### Javascript / React
```
cd music_controller/frontend
npm install
```

### Run
In separate terminal/tabs, execute the following:

**Backend:**
```
cd music_controller
python manage.py runserver
```
Note: Use `inv sys.alias` to set the alias `dm = python manage.py` or have it set in the terminal's
start scripts.

**Frontend:**
```
cd music_controller/frontend
npm run dev
```

## Notes
Installed React 18, whereas the tutorial uses 17 (see
[package.json](https://github.com/techwithtim/Music-Controller-Web-App-Tutorial/blob/main/Tutorial%201%20-%204/frontend/package.json)
). Other `npm` packages are also newer.

There's a new version for the Material UI for React 18+ and the name of the `npm` package is different and may result
in different code.

Also, the tutorial uses class based React components, but this project is implemented using
functional components.

### NPM Package
[package.json](https://github.com/techwithtim/Music-Controller-Web-App-Tutorial/blob/main/Tutorial%201%20-%204/frontend/package.json)
explained [here](https://youtu.be/6c2NqDyxppU?t=733).

Some versions in this repo are different, these are the most significant ones:
* React 18 vs 17
* Material UI 5 vs 4.  
  - Package names are different.
  - `@emotion/react` and `@emotion/styled` need to be installed separately
    ```
    cd music_controller/frontend
    npm i @emotion/react @emotion/styled
    ```
* React Router 6 vs 5.  
  Difference in imports and usage. See
  [documentation](https://reactrouter.com/en/6.4.5/upgrading/v5).

### Babel
[babel.config.json](https://github.com/techwithtim/Music-Controller-Web-App-Tutorial/blob/main/Tutorial%201%20-%204/frontend/babel.config.json)
explained [here](https://youtu.be/6c2NqDyxppU?t=542).

### Webpack bundling
[webpack.config.js](https://github.com/techwithtim/Music-Controller-Web-App-Tutorial/blob/main/Tutorial%201%20-%204/frontend/webpack.config.js)
explained [here](https://youtu.be/6c2NqDyxppU?t=605).

### index.html
[templates/frontend/index.html](https://github.com/techwithtim/Music-Controller-Web-App-Tutorial/blob/main/Tutorial%201%20-%204/frontend/templates/frontend/index.html)
explained [here](https://youtu.be/6c2NqDyxppU?t=876), going over each of the imports
[here](https://youtu.be/6c2NqDyxppU?t=974).

### Overall installation
The installation steps in this tutorial went step by step, explaining along the way. This shows
everything that's going. There are more straightforward ways to do these steps but it's a bit more
black box.

* `npm init -y`
* `npm i webpack webpack-cli --save-dev`  
  Pack/Bundle JS code (transpile into a single JS file)
* `npm i @babel/core bable-loader @babel/preset-env @babel/preset-react --save-dev`  
  Transpiler
* `npm i react react-dom --save-dev`  
  React
* `npm i @material-ui/core` (React <18)  
  `npm i @mui/material` (React >=18)  
  Material UI theme
* `npm i @babel/plugin-proposal-class-properties`  
  Use async/await in JS
* `npm i react-router-dom`  
  Routing in react
* `npm i @material-ui/icons` (React <18)  
  `npm i @mui/icons-material` (React >= 18)  
  Icons for Material UI theme
* `npm i @emotion/react @emotion/styled`
  Material UI dependencies (v6+)
