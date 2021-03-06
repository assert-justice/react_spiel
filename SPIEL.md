# React Spiel
Under protest I have written the following whirlwind tour of react and a bit of its ecosystem.

We'll be building an app called Barkeeper's Bestie. It will enable users to search for, favorite, edit, and create beverage recipes.

To facilitate this we'll be using the api [here](https://www.thecocktaildb.com/api.php)

## Setup
Before we can go mucking around we need to create a react app. Ideally you will create a directory that is a base react template. You can make it just how you like and then copy paste that directory whenever you want to create a new app. Let's start from the beginning though.
### Installation
There are a few ways to do this but the most user friendly is to use the npx script that our Facebook overlords have granted us.

`npx create-react-app [your app name]`

This might take a minute so get yourself a cup of a caffeinated/adult beverage of your choice.

The core react module is pretty limited. The other major dependency we'll be using is react router, imported like so:

`npm i react-router-dom`

Now run `npm start` to make sure everything works. You should be greeted by the react logo and some encouraging words.

### Pop Quiz!
Super. Now we already have a bunch of files. It might be a good idea to refresh on the following:
1. What is node.js? What language is it written in?
1. What is npm? What does it do for us?
1. What is npx? How is it different from npm?
1. What is the package.json for? What about the package-lock.json?
1. When you run `npm start` what happens? What steps are being automated for you?

### Rip out the crap
The npx script we use generates a lot of files we don't need. 

- Delete everything from the public folder besides the index.html
- Delete everything from the src folder besides index.js and App.js
- Clean up index.js to look like the following:
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```
Note that we wrapped the app in a browser router component. It's easy to forget.
- Clean up App.js to look like the following:
```javascript
function App() {
  return (
    <div className="App">
      Ayyyyy we got a basic react template ova here!
    </div>
  );
}

export default App;
```

Go ahead and run `npm start` again. We will be greeted by a much more... minimal sight.

You know what let's add a little css to spare our poor eyes.

```css
/*index.css*/
body{
    background-color: #06001d;
    color: white;
    padding-left: 10%;
    padding-right: 10%;
}
```
Add `import "./index.css"` to the top of our index.js file. That's better. 

## Nav and Routes
We want to define a few routes:
- Home
- Search
- Favorites
- About

Let's start by creating a nav component. You can see it imports links from react-router-dom. If you use bare anchor tags that will cause the page to reload and we'll lose all of our precious state. Because I'm too lazy to build a backend for this project that means we would lose everything. So let's not.

We'll add a bit of styling to spruce things up. A little bit goes a long way.

Now we need to create the routes. This is slightly different in React v6. 
- They have renamed the Switch component to Routes which is hella confusing but whatever.
- They have "enhanced" the path matching algorithm such that "exact" is no longer needed. The new wildcard path is "*".
- You no longer make a component appear on a route by making it a child. That was too obvious and flexible. Now you set the element prop of the route to be the component or jsx the route should render.

## State and Web Requests

Let's add some state to our app. We'll be keeping track of the users favorite recipes as an array of objects. Let's add it to app.

```javascript
const [favorites, setFavorites] = useState({});

function removeFavorite(drinkId){
  const fav = {...favorites};
  delete fav[drinkId];
  setFavorites(fav);
}
function addFavorite(drink){
  const fav = {...favorites};
  fav[drink.id] = drink;
  setFavorites(fav);
}
```

A few things to note:

When we call use state we pass it a default value to start with. In this case an empty object.

The useState hook returns an array with two entries. The first is the current value of the state. The second is a function we can use to set the state to a new value.

> Note: it's very important not to mutate the value in state directly. You'll see in the code I'm always creating a new object by using the spread operator. If you don't set the state to a new value react can get confused and not render the page correctly.

We have two helper functions to add and remove drinks from the favorites object. Note that the addFavorite function will overwrite an entry that already exists, allowing us to edit an existing entry.

## That useEffect Jawn

The finest foot-gun in react has to be useEffect. It's got all sorts of thorny bits. Let's take a look at the search component. Take a look ath that handsome devil.

Now it's worth pointing out we don't *have* to use useEffect. I wrote a search function to demonstrate.

So use effect will call the function we pass it when the component mounts *or* the value of one of the dependencies. I dunno this hook is bonkers, it has too many jobs. But what are you gonna do?

## Forms managed components, sharing components



## Now What?