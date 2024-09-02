document.getElementById('search-button').addEventListener('click', async () => {
    const ingredients = document.getElementById('ingredient-input').value.trim();
    const apiKey = '1a7cd22eb1194123a7b9769bb807b13c'; // Your API key
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const recipes = await response.json();
        displayRecipes(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
});

async function getRecipeDetails(recipeId) {
    const apiKey = '1a7cd22eb1194123a7b9769bb807b13c'; // Your API key
    const detailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    try {
        const response = await fetch(detailsUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const details = await response.json();
        return details;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('recipe-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (recipes.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center text-gray-700">No recipes found. Please try different ingredients.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card bg-white p-4 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-32 object-cover rounded-lg mb-4 transition-transform duration-300 ease-in-out hover:scale-110">
            <h2 class="text-xl font-semibold mb-2 font-['Poppins']">${recipe.title}</h2>
            <button class="details-button bg-blue-500 text-white p-2 rounded-lg font-['Poppins'] transition-colors duration-300 hover:bg-blue-600">View Details</button>
            <div class="details-content mt-4 hidden"></div>
        `;
        resultsContainer.appendChild(recipeCard);

        const detailsButton = recipeCard.querySelector('.details-button');
        const detailsContent = recipeCard.querySelector('.details-content');

        detailsButton.addEventListener('click', async () => {
            if (detailsContent.innerHTML === '') {
                const details = await getRecipeDetails(recipe.id);
                detailsContent.innerHTML = `
                    <p class="text-gray-700 font-[sans-serif] mb-2">${details.instructions ? details.instructions : "No instructions available"}</p>
                    <p class="text-gray-500 font-['Poppins']">Servings: ${details.servings}</p>
                    <p class="text-gray-500 font-['Poppins']">Ready in ${details.readyInMinutes} minutes</p>
                `;
            }
            detailsContent.classList.toggle('hidden');
        });
    });
}
