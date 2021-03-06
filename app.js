
// Searching item by name or letter....


const searchItem = () => {
  const itemName = document.getElementById("search").value;
  document.getElementById("search").value = "";
  if (itemName == "") {
    alert("Please, write any item name to search!");
  } else {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + itemName)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("meal-div").innerHTML = "";   
        document.getElementById("meal-details").innerHTML = "";  
        displayItems(data);
      });
  }
};


//  Search based items result...


const displayItems = (items) => {
  let mealItems = items.meals;
  if (mealItems !== null) {
    const mealDiv = document.getElementById("meal-div");
    mealItems.forEach((item) => {
      const mealItemDiv = document.createElement("div");
      const mealInfo = `
      <img onclick="mealDetails('${item.strMeal}')" src="${item.strMealThumb}">
      <h4 onclick="mealDetails('${item.strMeal}')">${item.strMeal}</h4>
      `;
      const mealStyle = `border: 1px solid goldenrod;
      width:260px;
      border-radius: 3px;
      padding: 5px;`;
      mealItemDiv.style = mealStyle;
      mealItemDiv.innerHTML = mealInfo;
      mealDiv.appendChild(mealItemDiv);
    });
  } 
    else {
      alert("Sorry! We couldn't find this item.Please try again!");
    }
};


//  Click on item name showing details..


const mealDetails = (name) => {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + name)
      .then((res) => res.json())
      .then((data) => {
        showDetails(data.meals[0]);
      });
};

const showDetails = (clickedItem) => {
    const mealDiv = document.getElementById("meal-details");
    document.getElementById("meal-details").innerHTML = "";
    const mealInnerDiv = document.createElement("div");
    const ingredient = [];
    for (let i = 1; i <= 20; i++) {
      if (clickedItem[`strIngredient${i}`]) {
        ingredient.push(
          `<li><i class="fas fa-check-square bg-white text-danger"></i> ${
            clickedItem[`strMeasure${i}`]
          } ${clickedItem[`strIngredient${i}`]}</li>`
        );
      }
    }
  mealInnerDiv.innerHTML = `
    <img src="${clickedItem.strMealThumb}">
    <h3>Name: ${clickedItem.strMeal}</h3>
    <h5>Ingredients:</h5>
    <ul>
      ${ingredient.join("")}
    </ul>
    <button class="btn btn-danger" id="close" style="margin-left: 290px; margin-bottom:20px;" >Close</button>
    `;

  const mealInnerDivStyle = `text-align:justify;
      border: 1px solid goldenrod;
      width:380px;
      border-radius: 3px;
      padding: 5px;
    `;
  mealInnerDiv.style = mealInnerDivStyle;
  mealDiv.appendChild(mealInnerDiv);
    document.getElementById("close").addEventListener("click", function () {
      document.getElementById("meal-details").innerHTML = "";
    });
};
