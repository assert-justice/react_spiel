import { useState } from "react";
import { Link } from "react-router-dom";

export default function Drink({drink, isFavorite, addFavorite, removeFavorite}){
    const [open, setOpen] = useState(false);

    function edit(){
        if(!isFavorite) addFavorite(drink);
    }

    const contents = open ? <div>
        <img className="thumbnail" src={drink.thumbnail} alt={drink.name}/>
        <p>Ingredients</p>
        <ul>
            {drink.ingredients.map(({name, measure},idx) => <li key = {idx}>
                {measure} {name}
            </li>)}
        </ul>
        <p>{drink.instructions}</p>
        <p>Served in a {drink.glass}</p>
        <p>{drink.alcoholic}</p>
        <Link onClick={edit} to={`/drink/${drink.id}`}>Edit</Link>
    </div> : "";

    function handleClick(){
        if(isFavorite){
            removeFavorite(drink.id);
        } else{
            addFavorite(drink);
        }
        // hack but it works
        setOpen(open => !open)
    }

    return <div className="drink"
        onClick={()=>setOpen(open => !open)}>
            {/* <h3>{drink.name} 
            </h3> */}
            {drink.name}
                <button onClick={handleClick}>{isFavorite?"unfavorite":"favorite"}</button>
            {contents}
            </div>
}