# Student Registration Portal

A small React application where a student enters their details through a registration form and views the submitted information on a separate page.

## What the application does
Students open the Home page, click "Register Now", fill in the form, and are shown a "Registration Successful" page with their details.

## Pages created
- **Home**: application title, short description, "Register Now" link
- **Registration**: form with Student Name, Email, Department, Year and a Register button
- **Success**: displays the submitted student information

## How React Router is used
`BrowserRouter` wraps the app in `main.jsx`. `Routes` and `Route` in `App.jsx` map `/`, `/register` and `/success`. `Link` and `useNavigate` move between pages without reloading the browser (SPA behavior).

## How the registration form works
Inputs are controlled components whose values live in React state. On submit, `preventDefault()` stops the page reload, the values are saved in App-level state, and the user is redirected to `/success` where the data is displayed.

## How to run the project
```bash
npm install
npm run dev
```
Open the URL shown in the terminal (usually http://localhost:5173).

## Technologies
React, JavaScript, HTML, CSS, React Router
