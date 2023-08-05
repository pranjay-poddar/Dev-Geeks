// Initialising global variables
const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
			createMeal(res.meals[0]);
		});
});

const createMeal = (meal) => {
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	}

	const newInnerHTML = `
		<div class="row1">
			<div class="columns five">
				<img src="${meal.strMealThumb}" alt="Meal Image">
				${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<hr>
			<div class="columns seven">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		<hr>
		${meal.strYoutube ? `
		<div class="row2">
			<h1>Video Recipe</h1>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>` : ''}
	`;

	meal_container.innerHTML = newInnerHTML;
}
