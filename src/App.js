import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Nav from "./Nav";
import Home from "./Home";
import Search from "./Search";
import Favorites from "./Favorites";
import DrinkForm from "./Drink/DrinkForm";
import NotFound from "./NotFound";

function App() {
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
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/react_spiel" element={<Navigate replace to={"/"}/>}/> */}
        <Route path="/search" element={<Search 
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />}/>
        <Route path="/favorites" element={<Favorites 
          favorites={favorites}
          removeFavorite={removeFavorite}
        />}/>
        <Route path="/drink/" element={<DrinkForm favorites={favorites} addFavorite={addFavorite}/>}/>
        <Route path="/drink/:drinkId" element={<DrinkForm favorites={favorites} addFavorite={addFavorite}/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
