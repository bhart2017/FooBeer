//check to see if we have user input if not display function doesn't work
if (typeof(Storage) !== "undefined" && localStorage.getItem("userInput") !== undefined && localStorage.getItem("userInput") !== null) {
    displayRecipes()
} 
else{
     window.location.href = "../../index.html"
}



function displayRecipes() {
    var food2ForkApiKey = "2144f04907f7ca547884e45cf1553a26";
    var userInput = localStorage.getItem("userInput")    
    var searchRecipeURL = 'https://food2fork.com/api/search?key=' + food2ForkApiKey + '&q=' + userInput;
    
    $.ajax({
    	url: searchRecipeURL,
    	method: "GET"
    }).done(function(response) {
    	var data = JSON.parse (response);
    	var recipes = data.recipes
/*create loops that will pull the title, picture, recipe, link to instructions and post to page 
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


			var getRecipeUrl = 'http://food2fork.com/api/get?key=' + food2ForkApiKey + '&rId=' + recipeId;

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

                //source url is the location of the recipe instructions in <span itemprop="recipeInstructions">
                var sourceUrl = JSON.parse (response).recipe.source_url;
                var getSourceUrl = 'http://food2fork.com/api/get?key=' + food2ForkApiKey + '&rId=' + sourceUrl;
                
                var recipeInstructionLink = $("<a>").attr("href", sourceUrl).text("Click here for Recipe Instructions")
                $("#" + recipeId).append(recipeInstructionLink)
    	
                //var beerUrl = JSON.parse (response).;
                var getBeerUrl = "http://api.brewerydb.com/v2/menu/styles?key=bfc8275fcb6730dbec9204c6139055a1/beers";
                
                $.ajax({
                    url: getBeerUrl,
                    method: "GET"
                }).done(function(response) {
                    console.log(getBeerUrl)
                })
                    
        })


}})}