"Use Strict"
/*need a function to display recipe's based on what user input
*food2fork - api key= dd239160abdf30e4ce96d29d2dab4aaa
*@param
*@return
*/
//when the user clicks the submit button recipe displays
$("#submit").on("click", navigateToRecipesPage );

function navigateToRecipesPage() {
    //store user input to local storage before moving to new page
    var text = $("#user-input").val().toLowerCase()
    localStorage.setItem("userInput", text);    
    window.location.href = "assets/html/recipes.html"
}




    
    
    