$(document).ready(function(){  

var accessToken = window.location.hash.slice(14);
var photoId = "";
var tagInputVal = "";

console.log(accessToken);

$('#boxes').sortable();

/*   //this disables touch scrolling on iOS for #boxes element

$('#boxes').bind('touchmove', function(e) {
   e.preventDefault();
}, false);
 
*/

// ----- begin "get photo and data" function" -----

$('#generate').click(function(){  //---- change 'p' to submit button.

	$('ul #boxes').empty();  //empties existing LI elements in box region

	var tagInputVal = $('#tagInput').attr("value");
	var boxWidth = $('#widthInput').attr("value");
	var spaceFilter = / /g;	

	if(spaceFilter.test(tagInputVal) == true){

		alert('Please remove any spaces from your keyword or tag!');

	} else if(tagInputVal == ""){   // checks if tagInputVal is empty
		alert('Please enter a keyword or tag!');   // prompts if empty tagInputVal
	} else {
$.getJSON("https://api.instagram.com/v1/tags/"+tagInputVal+"/media/recent?access_token="+accessToken+"&scope=likes&callback=?",function(data){   //--- begin JSON data grab---

	console.log(data);

	var index = Math.floor((Math.random()*10)+1);  //finds random integer btwn 1-10
	var imgUrl = data.data[index].images.standard_resolution.url;  //Instagram IMG URL from JSON
	var boxNumTotal = boxWidth*boxWidth;
		for (var i=1;i<=boxNumTotal;i++){   //creates box LIs

		$('ul #boxes').append('<li><div class="box" style="">&nbsp;</div></li>');

		};

	$('#wrapper div').attr('style','background-repeat:no-repeat;background-image:url('+imgUrl+');background-size:600px 600px;');    // formats wrapper DIV to 600x600px

	$("#wrapper", function(){
            $("<img/>").attr("src", imgUrl).appendTo("#container");        
	});

	$('img').height("600px");
	$('img').width("600px");

	for (var i=0; i<= boxNumTotal ;i++) {  //creates a boxes with id as i
	var boxId = i+1;
	$('.box:eq('+i+')').attr('id',''+boxId+'');	
	$('#boxes li:eq('+i+')').attr('id',''+boxId+'');
	};



	for (var i=0; i<= boxNumTotal ;i++) {   //sets bg-image sprites for each box
	var boxId = $('#'+i+'').attr('id');
	var unitWidth = 600 / boxWidth;		//calculates (in pixels) box unit Width
	var posX = ((boxId%boxWidth))* (unitWidth*-1);  //calculates X pos of boxSprite --NEED FIX
/* right most column is totally messed up */
	var posY = (Math.floor(boxId/boxWidth))* (unitWidth*-1);  //calculates Y pos of box Sprite
	$('#'+boxId+' .box').attr('style','height:'+unitWidth+'px;width:'+unitWidth+'px;background-position:'+posX+'px '+posY+'px;background-image:url('+imgUrl+');background-size:600px 600px;');
	};



	for (var c=0; c<= boxNumTotal ;c++) { //re-sorts boxes randomly

	$('#'+c+' div').appendTo('li #'+boxRandSeqArray[c]+''); 
	console.log('Source is '+c+'Destination is '+boxRandSeqArray[c]);
	$('li #'+c+'').empty();  //clears the content of the LI frame box was moved from

	};

	var userName = data.data[index].user.username;
	var userPhotoUrl = data.data[index].user.profile_picture;
	var userProfileUrl = data.data[index].link;
	var userId = "";
	var userCaption= data.data[index].caption.text;
	var photoId = data.data[index].id;

	$('#userName').html('<p>by '+userName+'</p>');

	$('#userPhoto').html('<a href="'+userProfileUrl+'" target="_blank">'+'<img src="'+userPhotoUrl+'" url=></img></a>');

	$('#userProfile').html('<a href="'+userProfileUrl+'" target="_blank">here</a>');

	$('#caption').html('<p>'+userCaption+'</p>');

	console.log("1 "+photoId);


});   // ---- end JSON data grab----

}; // --- end of form-validation if/else statement

	return false;  // <---- must add this when "submit button" is made.



});  // ----- end "get photo and data" function" -----


});

// ----- things to do: ---------

/* 

-create "submit" button
-style the page
-feature: search only photos by their friends
-feature: search by tag
-check to see if you are logged in (i.e. if auth_token is not null)
-feature: determine box size
		
	-user enters box size
	-box div height/width is calculated

	-note: if user selects a number of units of a number (puzzleSize) that, when divided by 612(px) (instragram image widths), leaves a remainder, subtract the remainder from 612. then set the new image width to 612-remainder and add an padding to the container DIV equal to 0.5 of the remainder.

	-create an object called boxes that contains an indexNumsArray with a total number of values = puzzleSize^2 
	-for boxes[n] add the following properties id, html

	-create loop that makes an LI (inside the main UL) each with DIV and ID matching it's index# +1.  Repeat for a puzzleSize^2 number of DIVs.
	-for each boxNum and adds appropriate sprite coordinates for 	box based on formula
	-perhaps make each "box" an object or array with several properties (spriteX,spriteY,vNum,hNum)

	-randomize order of DIVs (perhaps get the style and id .attr() of each div

	-perhaps use $('#source').detach().prependTo('#destination'); inside of a loop to move or "Scramble" the DIVs for each id# in the indexArray ... ?  More info: http://www.elated.com/articles/jquery-removing-replacing-moving-elements/

	

-feature: if/else statement that checks each row of the boxNums for a certain sum see (use http://betterexplained.com/articles/techniques-for-adding-the-numbers-1-to-100/ for each row, n = right-most DIV id# - the sum of all previous rows' totals.)
and returns "win" function.
 
-feature: scoreboard
	create a "last high score" cookie.
-feature add photo "comments" and "like" buttons from your account to this photo.
-feature: "see original photo by its author" (opens in a new window0
-randomize box arrangement
-remove console.logs


*/