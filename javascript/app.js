"Use Strict"
/*need a function to display recipe's based on what user input
*food2fork - api key= dd239160abdf30e4ce96d29d2dab4aaa
*@param
*@return
*/
function displayRecipes() {
    var text = $(this).text().toLowerCase();
    var queryURL = 'http://food2fork.com/api/search?key=dd239160abdf30e4ce96d29d2dab4aaa&q='+ text;
    
    $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
    console.log(response); 

    })}


    
    