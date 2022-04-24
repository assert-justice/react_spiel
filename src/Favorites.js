import Drink from "./Drink/Drink"

export default function Favorites({favorites, removeFavorite}){
    const faves = Object.entries(favorites);
    if (faves.length === 0) return <h1>Add some favorites!</h1>
    return <>
    {faves.map(([id,drink])=><Drink 
        key = {id}
        drink={drink} 
        isFavorite={true}
        removeFavorite={removeFavorite}
        />)}
    </>
}