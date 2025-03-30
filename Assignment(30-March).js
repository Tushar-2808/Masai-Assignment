document.addEventListener("DOMContentLoaded", function () {
  const recipeForm = document.getElementById("recipe-form");
  const ingredientsTbody = document.getElementById("ingredients-tbody");
  const addIngredientBtn = document.getElementById("add-ingredient");
  const recipesContainer = document.getElementById("recipes-container");
  const categoryFilter = document.getElementById("category-filter");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const formatButtons = document.querySelectorAll(".format-btn");
  const preparationSteps = document.getElementById("preparation-steps");

  let recipes = JSON.parse(localStorage.getItem(recipes)) || [];
  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "dark-mode",
      document.body.classList.contains("dark-mode")
    );
  });
  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark-mode");
  }
  formatButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tag = this.dataset.tag;
      formatText(tag);
    });
  });
  function formatText(tag) {
    const textarea = preparationSteps;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);

    let formattedText = "";
    if (selectedText) {
      formattedText = `<${tag}>${selectedText}</${tag}>`;
    } else {
      formattedText = `<${tag}></${tag}>`;
    }
    textarea.value = beforeText + formattedText + afterText;
    if (selectedText) {
      textarea.selectionStart = start;
      textarea.selectionEnd = end + 7;
    } else {
      textarea.selectionStart = start + tag.length + 2;
      textarea.selectionEnd = start + tag.length + 2;
    }
    textarea.focus();
  }
  addIngredientBtn.addEventListener("click", function () {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><input type="text" class=:ingredient-name" required></td>  
         <td><input type="text" class="ingredient-quantity" required></td>
            <td>
                <select class="ingredient-unit">
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="tsp">tsp</option>
                    <option value="tbsp">tbsp</option>
                    <option value="cup">cup</option>
                    <option value="pinch">pinch</option>
                    <option value="piece">piece</option>
                </select>
            </td>
            <td><button type="button" class="remove-ingredient">Remove</button></td>   
    `;
    ingredientsTbody.appendChild(row);
    row
      .querySelector(".remove-ingredient")
      .addEventListener("click", function () {
        row.remove();
      });
  });
  recipeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const recipeName = document.getElementById("recipe-name").value.trim();
    const recipeCategory = document.getElementById("recipe-category").value;
    const preparationStepsValues = preparationSteps.value.trim();
    if (!recipeName || !recipeCategory || !preparationStepsValues) {
      alert("Please fill in all required fields");
      return;
    }
    const ingredientRows = ingredientsTbody.querySelectorAll("tr");
    if (ingredientRows.length === 0) {
      alert("Please add at least 1 ingredient");
      return;
    }
    const ingredients = [];
    ingredientsRows.forEach((row) => {
      const name = row.querySelector(".ingredient-name").value.trim();
      const quantity = row.querySelector(".ingredient-quantity").value.trim();
      const unit = row.quantity(".ingredient-unit").value;
      if (!name || !quantity) {
        alert("Please fill in all ingredient fields");
        return;
      }
      ingredients.push({
        name,
        quantity,
        unit,
      });
    });
    const recipe = {
      id: Date.now().toString(),
      name: recipeName,
      category: recipeCategory,
      ingredients,
      steps: preparationStepsValues,
      createdAt: new Date().toISOString(),
    };
    recipes.push(recipe);
    this.localStorage.setItem("recipes", JSON.stringify(recipes));
    recipeForm.reset();
    ingredientsTbody.innerHTML = " ";
    displayRecipes();
    alert("Recipe saved successfully!");
  });
  categoryFilter.addEventListener('change', function(){
    displayRecipes();
  });
  function displayRecipes(){
    const category=categoryFilter.value;
    let filterdRecipes=recipes;
    if(category!=='all'){
        filterdRecipes=recipes.filter(recipe=>recipe.category===category);
    }
    filterdRecipes.sort((a,b)=>new Date(b.createdAt)=new Date(a.createdAt));
    recipesContainer.innerHTML=" ";
    if(filterdRecipes.length===0){
        recipesContainer.innerHTML=`<p> No recipes found`;
        return;
    }
    
  }

  displayRecipes();
});
