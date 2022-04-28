import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { idGen } from "../utils";

const baseDrink = {
    id: "",
    name: "",
    alcoholic: "",
    thumbnail: "",
    glass: "",
    instructions: "",
    ingredients: []
}

export default function DrinkForm({favorites, addFavorite}){
    const [drink, setDrink] = useState(baseDrink);

    const {drinkId} = useParams();

    useEffect(()=>{
        if(drinkId && favorites[drinkId]){
            setDrink(favorites[drinkId]);
        }
    },[drinkId]);

    const navigate = useNavigate();

    function changeField(e){
        let {name, value} = e.target;
        if(name === "alcoholic"){
            value = !value?"Alcoholic":"Non Alcoholic";
        }
        setDrink({...drink, [name]: value});
    }

    function handleSubmit(){
        if(!drink.id){
            drink.id = idGen(favorites);
        }
        addFavorite(drink);
        navigate("/favorites");
    }

    function addIngredient(){
        const ingredients = [...drink.ingredients, {name:"",measure:""}];
        setDrink({...drink, ingredients});
    }
    function removeIngredient(){
        const ingredients = [...drink.ingredients];
        if(ingredients.length > 0) ingredients.pop();
        setDrink({...drink, ingredients});
    }
    function editIngredient(e, idx){
        const ingredients = [...drink.ingredients];
        ingredients[idx] = {...ingredients[idx], [e.target.name]: e.target.value};
        setDrink({...drink, ingredients});
    }
    return <form onSubmit={e=>e.preventDefault()}>
        <h1>Edit Drink</h1>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type={"text"} value={drink.name} onChange={changeField}/> <br/>
        <label htmlFor="image">Image Url:</label>
        <input id="image" name="thumbnail" type={"url"} value={drink.thumbnail} onChange={changeField}/> <br/>
        <label htmlFor="glass">Glass:</label>
        <input id="glass" name="glass" type={"text"} value={drink.glass} onChange={changeField}/> <br/>
        <label>Ingredients:</label>
        <div className="ingredients">
            { drink.ingredients.length > 0?
            <ul>
                {drink.ingredients.map((ing, idx) => {
                    return <li key = {idx}>
                        <label htmlFor={`ing-name-${idx}`}>Name</label>
                        <input id={`ing-name-${idx}`} 
                            type="text"
                            name="name" value={ing.name} 
                            onChange={(e)=>editIngredient(e, idx)}/>
                        <label htmlFor={`ing-measure-${idx}`}>Measure</label>
                        <input id={`ing-measure-${idx}`} 
                            type="text"
                            name="measure" value={ing.measure} 
                            onChange={(e)=>editIngredient(e, idx)}/>
                    </li>
                })}
            </ul>:
            <p>Add some ingredients!</p>
            }
            <button onClick={addIngredient}>Add Ingredient</button>
            <button onClick={removeIngredient}>Remove</button>
        </div>
        <label htmlFor="instructions">Instructions:</label> <br/>
        <textarea id="instructions" name="instructions" rows="10" cols="30" value={drink.instructions} onChange={changeField}/> <br/>
        <label htmlFor="alcoholic">Alcoholic:</label>
        <input id="alcoholic" name="alcoholic" type={"checkbox"} value={drink.alcoholic === "Alcoholic"} onChange={changeField}/> <br/>
        <button onClick={handleSubmit}>Submit</button>
        {/* <input type={"submit"} value="Submit"/> */}
    </form>
}