import Layout from "./components/layout/Layout.tsx";
import {useEffect, useState} from "react";
import {Recipe} from "./types/Recipe.ts";
import axios from "axios";
import RecipesPage from "./pages/RecipesPage.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import RecipeDetailsPage from "./pages/RecipeDetailsPage.tsx";
import AddRecipePage from "./pages/AddRecipePage.tsx";

export default function App() {
    const [recipes, setRecipes] = useState<Recipe[] | null | undefined>(undefined);
    const [recipe, setRecipe] = useState<Recipe | null | undefined>(undefined);

    function fetchRecipes() {
        axios.get("/api/recipes")
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error("Error fetching recipes", error)
            })
    }

    useEffect(() => {
        fetchRecipes();
        return () => {
        };
    }, []);

    if (recipes === null) {
        return <div>No Recipes found :(</div>;
    }

    if (recipes === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <Routes>
                <Route path={"/"} element={<HomePage recipes={recipes}/>}/>
                <Route path="/recipes" element={<RecipesPage recipes={recipes}/>}/>
                <Route path="/recipes/:id" element={<RecipeDetailsPage recipe={recipe} setRecipe={setRecipe}/>}/>
                <Route path="/recipes/add" element={<AddRecipePage recipes={recipes} fetchRecipes={fetchRecipes}/>}/>
            </Routes>
        </Layout>
    )
}


