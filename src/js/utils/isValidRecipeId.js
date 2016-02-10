var padNumber = require('pad-number');

const isValidRecipeId = (id, numberOfRecipes) => {
	let recipeNumber = parseInt(id,10);

	if (recipeNumber > 0 && recipeNumber <= numberOfRecipes) {
		if (padNumber(recipeNumber, 3) === id) return true;
	}

	// console.warn(id + ' is not a valid recipeId');
	return false;
};

export default isValidRecipeId;
