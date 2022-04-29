import { useState, useEffect } from "react";
import { getRecipes } from "./utils";
import Drink from "./Drink/Drink";
export default function Search({favorites, addFavorite, removeFavorite}){
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(()=>{
        if(searchTerm.length > 0){
            getRecipes(searchTerm).then(setResults);
        } else{
            setResults([]);
        }
    },[searchTerm]);

    // function search(term){
    //     setSearchTerm(term);
    //     if(term.length > 0){
    //         getRecipes(term).then(setResults);
    //     } else{
    //         setResults([]);
    //     }
    // }

    return <div className = "search">
        <label htmlFor="search-text">Search</label>
        <input id="search-text" 
            type={"text"} 
            value={searchTerm} 
            onChange={e=>setSearchTerm(e.target.value)}/>
        {results.sort((a, b) => a.name.localeCompare(b.name))
            .map(drink => <Drink 
            key={drink.id} 
            drink={drink}
            isFavorite={!!favorites[drink.id]}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
        />)}
    </div>
}