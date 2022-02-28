const searchFood=()=>{
    const searchfield=document.getElementById('search-field');
    const searchText=searchfield.value;
    if(searchText=='')
    {
        const searchResult=document.getElementById('search-result');
        searchResult.textContent='';
        const mealDetails=document.getElementById('meal-details');
        mealDetails.textContent='';
        const div=document.createElement('div');
        div.classList.add('w-50','mx-auto');
        div.style.backgroundColor='black';
        div.innerHTML=`
           <p style="color:red;text-align:center;padding-top:10px;">Please!!! Search something</p>
        `;
        searchResult.appendChild(div);

    }
    else{
        const searchResult=document.getElementById('search-result');
        searchResult.textContent='';
        const mealDetails=document.getElementById('meal-details');
        mealDetails.textContent='';
        searchfield.value='';
        const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        //console.log(url);
        fetch(url)
          .then(res=>res.json())
          .then(data=>displaymeanlresult(data.meals))
        }
}
const displaymeanlresult= meals =>
{
    if(meals=== null)
    {
        const searchResult=document.getElementById('search-result');
        searchResult.textContent='';
        const mealDetails=document.getElementById('meal-details');
        mealDetails.textContent='';
        const div=document.createElement('div');
        div.classList.add('w-50','mx-auto');
        div.style.backgroundColor='black';
        div.innerHTML=`
           <p style="color:red;text-align:center;padding-top:10px;">Enter a valid food name please!!!!</p>
        `;
        searchResult.appendChild(div);
    }
    else
    {
        const searchResult=document.getElementById('search-result');
        searchResult.textContent='';
        const mealDetails=document.getElementById('meal-details');
        mealDetails.textContent='';
        for(const meal of meals)
        {
            const div=document.createElement('div');
            div.classList.add('col');
            div.innerHTML=`
            <div class="card h-100">
                  <img src="${meal.strMealThumb}" class="card-img-top h-50" alt="...">
                <div class="card-body h-25">
                   <h3 class="card-title">${meal.strMeal}</h3>
                   <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
                </div>
                <button onclick="loadId('${meal.idMeal}')"style="font-weight:700;background-color:yellowgreen;"class=" rounded">Details</button>
          </div>
            `;
            searchResult.appendChild(div);
        
    }
    }
   
}
const loadId= id =>{
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
      .then(res=>res.json())
      .then(data=>displayDetails(data.meals[0]));

}
function displayDetails(val){
      const mealDetails=document.getElementById('meal-details');
      mealDetails.textContent='';
      const searchResult=document.getElementById('search-result');
      searchResult.textContent='';
      const div=document.createElement('div');
      div.classList.add('card','m-3','mx-auto','w-50');
      div.classList.add('meal-card');
      div.innerHTML=`
          <img src="${val.strMealThumb}" class="card-img-top h-75" alt="...">
          <div class="card-body">
             <h3 class="card-title">${val.strMeal}</h3>
             <p class="card-text">${val.strInstructions.slice(0,150)}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${val.strIngredient5}</li>
            <li class="list-group-item">${val.strIngredient4}</li>
            <li class="list-group-item">${val.strIngredient3}</li>
          </ul>
          <div class="justify-content-evenly d-flex p-2">
             <div>
               <a target=_blank href="${val.strSource}" class="card-link search-button btn">Recipe Blog</a>
             </div>
             <div class="ps-2">
               <a target=_blank href="${val.strYoutube}" class="card-link btn search-button">Follow YouTube</a>
            </div>
          </div>
      `;
      mealDetails.appendChild(div);
}