//check to see if we have user input if not display function doesn't work
if (typeof(Storage) !== "undefined" && localStorage.getItem("userInput") !== undefined && localStorage.getItem("userInput") !== null) {
    displayRecipes()
} 
else{
     window.location.href = "../../index.html"
}
function displayRecipes() {
    var userInput = localStorage.getItem("userInput")    
    var searchRecipeURL = 'https://food2fork.com/api/search?key=dd239160abdf30e4ce96d29d2dab4aaa&q='+ userInput;
    
    $.ajax({
    	url: searchRecipeURL,
    	method: "GET"
    }).done(function(response) {
    	var data = JSON.parse (response);
    	var recipes = data.recipes
/*create loops that will pull the title, picture and recipe and post to page 
*
*@param
*@return
*/    	
    	for (var i=0; i<recipes.length; i++){
            var title = recipes[i].title
            var titlehtml = $("<h3>").text(title)
            $(".recipes").append(titlehtml)

            var image = recipes[i].image_url
            var imagehtml = $("<img>").attr("src", image)
            $(".recipes").append(imagehtml)

    		
    		var recipeId = recipes[i].recipe_id
            
            //empty div with recipe ID to be used a container to store recipes from get recipe api
            var recipeContainer = $("<div>").attr("id", recipeId)
            $(".recipes").append(recipeContainer)


			var getRecipeUrl = "http://food2fork.com/api/get?key=dd239160abdf30e4ce96d29d2dab4aaa&rId=" + recipeId;

			$.ajax({
		    	url: getRecipeUrl,
		    	method: "GET"
    		}).done(function(response) {


                var recipeId = JSON.parse (response).recipe.recipe_id;
    			var ingredients = JSON.parse (response).recipe.ingredients;
                    console.log

    			var ulHtml = $("<ul>")
				for (var i=0; i<ingredients.length; i++){
					var liHtml = $("<li>").text(ingredients[i])
					ulHtml.append(liHtml)

    			}
    			$("#" + recipeId).append(ulHtml)		
    		})





    	}
})};