
const ingredients = [
    // Fix the path of the images, all are in the same folder. For example, the Kiwi path is `pages/ingredients/static/media/photos/Kiwi.png`




    { name: "Kiwi", image: `...media/photos/Kiwi.png`, type: "Fruits" },
    { name: "Salmon", image: "photos/salmon.jpeg", type: "Fish" },
    { name: "Basmati Rice", image: "photos/basmati_rice.jpeg", type: "Pantry Essentials"},
    { name: "Carrot", image: "photos/carrot.jpeg", type: "Vegetables" },
    { name: "Butter", image: "photos/butter.jpeg", type: "Dairy & Eggs" },
    { name: "Dijon Mustard", image: "photos/dijon_mustard.jpeg", type: "Pantry Essentials" },
    { name: "Lettuce", image: "photos/Lettuce.jpeg", type: "Vegetables" },
    { name: "Chicken Breast", image: "photos/chicken_breast_new.jpeg", type: "Meat" },
    { name: "Green Apple", image: "photos/Green_Apple.png", type: "Fruits" },
    { name: "Flour", image: "photos/flour_new.jpeg", type: "Pantry Essentials" },
    { name: "Vanilla", image: "photos/vanilla-1.png", type: "Pantry Essentials" },
    { name: "Whipped Cream", image: "photos/whipped cream.jpeg", type: "Dairy & Eggs" },
    { name: "Ground Cumin" , image: "photos/ground_cumin.jpeg", type: "Spices" },
    { name: "Sweet Paprika", image: "photos/sweet_paprika.jpg", type: "Spices" },
    { name: "Olive Oil", image: "photos/olive_oil.jpeg", type: "Pantry Essentials" },
    { name: "Honey", image: "photos/Honey.jpeg", type: "Pantry Essentials" },
    { name: "Chicken Egg", image: "photos/chick_egg_final.jpeg", type: "Dairy & Eggs" },
    { name: "Strawberry", image: "photos/strawberry_new.jpeg", type: "Fruits" },
    { name: "Baking Powder", image: "photos/backing powder.jpeg", type: "Pantry Essentials" },
    { name: "Parmesan Cheese", image: "photos/parmesan_good.jpeg", type: "Dairy & Eggs" },




];

const ingredientGrid = document.querySelector('.ingredient-grid');

ingredients.forEach(ingredient => {
    const ingredientCard = document.createElement('div');
    ingredientCard.classList.add('ingredient-card');
    ingredientCard.dataset.type = ingredient.type;

    const ingredientImage = document.createElement('img');
    ingredientImage.src = ingredient.image;
    ingredientImage.alt = ingredient.name;

    const ingredientName = document.createElement('h3');
    ingredientName.textContent = ingredient.name;
    ingredientName.classList.add('ingredient-name'); // Ofri - Added this line to make the name of the ingredient centered.

    const applyButton = document.createElement('button');
    applyButton.textContent = 'Add';
    applyButton.classList.add('IngAddButton');
    // Ofri - This event listener will help us later when we will do backend and Add the ingredients to the user's List.
    applyButton.addEventListener('click', () => {
    if (applyButton.style.backgroundColor === 'rgb(98, 205, 20)') { // //Ofri - IF already green cause was clicked before
        applyButton.style.backgroundColor = '#6D31EDFF';
    } else { //Ofri - If not green cause was not clicked before
        applyButton.style.backgroundColor = '#62CD14';
    }
});

    ingredientCard.append(ingredientImage, ingredientName, applyButton);
    ingredientGrid.append(ingredientCard);
});