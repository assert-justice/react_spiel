import { useState, useEffect } from "react";
import { getRecipes } from "./utils";
import Drink from "./Drink/Drink";
export default function Search({favorites, addFavorite, removeFavorite, searchTerm, setSearchTerm}){
    const [results, setResults] = useState([]);
    
    useEffect(()=>{
        if(searchTerm.length > 0){
            getRecipes(searchTerm).then(setResults);
        } else{
            setResults([]);
        }
    },[searchTerm]);

    return <div className = "search">
        <label htmlFor="search-text">Search</label>
        <br/>
        <input id="search-text" 
            type={"text"} 
            value={searchTerm} 
            onChange={e=>setSearchTerm(e.target.value)}/>
        {results.map(drink => <Drink 
            key={drink.id} 
            drink={drink}
            isFavorite={!!favorites[drink.id]}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
        />)}
    </div>
}