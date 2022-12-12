# Django+React music controller
Django backend + React frontend web app

Following tutorial in
https://www.youtube.com/watch?v=JD-age0BPVo&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j

## Development
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
#### Python / Django
```
cd music_controller
python manage.py runserver
```
Note: Use `inv sys.alias` to set the alias `dm = python manage.py`.

#### Javascript / React
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

### NPM Package
[package.json](https://github.com/techwithtim/Music-Controller-Web-App-Tutorial/blob/main/Tutorial%201%20-%204/frontend/package.json)
explained [here](https://youtu.be/6c2NqDyxppU?t=733).

Some versions in this repo are different:
* React 18 vs 17
* Material UI 5 vs 4

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
