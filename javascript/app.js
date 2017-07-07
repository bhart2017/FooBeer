"Use Strict"
/*need a function to display recipe's based on what user input
*food2fork - api key= dd239160abdf30e4ce96d29d2dab4aaa
*@param
*@return
*/
//when the user clicks the submit button recipe displays
$("#submit").on("click", displayRecipes);


function displayRecipes() {
    var text = $("#user-input").val().toLowerCase()
    var searchRecipeURL = 'https://food2fork.com/api/search?key=dd239160abdf30e4ce96d29d2dab4aaa&q='+ text;
    

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
			var getRecipeUrl = "http://food2fork.com/api/get?key=dd239160abdf30e4ce96d29d2dab4aaa&rId=" + recipeId;

			$.ajax({
		    	url: getRecipeUrl,
		    	method: "GET"
    		}).done(function(response) {
    			var ingredients = JSON.parse (response).recipe.ingredients;


    			var ulHtml = $("<ul>")
				for (var i=0; i<ingredients.length; i++){
					var liHtml = $("<li>").text(ingredients[i])
					ulHtml.append(liHtml)

    			}
    			$(".recipes").append(ulHtml)		
    		})





    	}
})};
    
    
    
    