const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1"

function formatDrink(drink){
    const {idDrink, 
        strAlcoholic, 
        strDrink, 
        strDrinkThumb, 
        strGlass,
        strInstructions,
    } = drink;
    const ingredients = [];
    for (let i = 1; i < 16; i++) {
        const name = drink["strIngredient" + i];
        let measure = drink["strMeasure" + i];
        if(!name) break;
        if(measure)measure = measure.trim();
        ingredients.push({name, measure});
    }
    return{
        id: idDrink,
        name: strDrink,
        alcoholic: strAlcoholic,
        thumbnail: strDrinkThumb,
        glass: strGlass,
        instructions: strInstructions,
        ingredients
    };
}

function getRecipes(term){
    const url = `${apiUrl}/search.php?s=${term}`;
    return fetch(url)
        .then(res=>res.json())
        .then(res=>res.drinks.map(formatDrink));
}

function idGen(keys){
    const chars = "abcdefghijklmnopqerstuvxyz0123456789!@#$%^&*";
    while(true){
        const key = [];
        for (let i = 0; i < 16; i++) {
            const idx = Math.floor(Math.random() * chars.length);
            key.push(chars[idx]);
        }
        var id = key.join("");
        if(!keys[id]) return id;
    }
}

export {getRecipes, idGen};