const loadData = (foodName) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.meals))
}

const displayData = meals =>{
    const foodContainer = document.getElementById('food_container');
    foodContainer.innerText = '';
    
    for(const meal of meals){
        const mealDiv = document.createElement('div');
        mealDiv.innerHTML = `
        <div class="card card-side bg-base-100 h-[18.75rem] shadow-xl">
            <figure class= "w-[40%]"><img src="${meal.strMealThumb}"/></figure>
            <div class="card-body w-[60%]">
              <h2 class="card-title">${meal.strMeal}</h2>
             <p>Food Region : ${meal.strArea}</p>
                    
             <!-- The button to open modal -->
             <label onclick="loadModal(${meal.idMeal})" for="my-modal-6" class="btn btn-error">open modal</label>

           
            </div>
      </div>
        `;

        foodContainer.appendChild(mealDiv);
        // console.log(meal)
    }
        
    };

const searchFood = (value) =>{
    const searchInput = document.getElementById('search_field');
    const searchInputValue = document.getElementById('search_field').value;
  
    loadData(searchInputValue);
    searchInput.value = '';

    
    
    
} 

const loadModal = value =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const modalContainer = document.getElementById('modal_container');
        const h3 = document.getElementById('modal_h3');
        h3.innerText = `${data.meals[0].strMeal}`;

        const p1 = document.getElementById('modal_p1');
        p1.innerHTML =`<span class="font-bold"> Ingredients</span> : ${data.meals[0].strIngredient1} , ${data.meals[0].strIngredient2} , ${data.meals[0].strIngredient3} , ${data.meals[0].strIngredient4} , ${data.meals[0].strIngredient5} , ${data.meals[0].strIngredient6}`;

        const p2 = document.getElementById('modal_p2');
        p2.innerHTML = `<span class="font-bold"> Instructions</span> : ${data.meals[0].strInstructions}`;

        const a = document.getElementById('modal_a');
        a.innerText = `Youtube Link`;
        a.href = `${data.meals[0].strYoutube}`;
        

        console.log(data.meals[0])
    })
}






loadData('burger');