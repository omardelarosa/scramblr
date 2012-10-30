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


//instruction button begins
$('#instButton').click(function(){

	if ( $('#instructions').css('display') == "none" ){  //checks if instructions are hidden
		$('#instructions').show(200);
	} else {
		$('#instructions').hide(200);  //hides instructions
	};
});

$('#instButton').hover(  //when mouse hovers over instButton...
	function(){    //on function to fire
	$('#instButton').css('color','black');
	$('#instButton').css('background-color','white');
	},
	function(){    //off function to fire
	$('#instButton').css('color','white');
	$('#instButton').css('background-color','black');
	}
);


//end instructions button

// ----- begin "get photo and data" function" -----

$('#generate').click(function(){  //---- change 'p' to submit button.

	$('ul #boxes').empty();  //empties existing LI elements in box region
	$('#instructions').hide();  //hides instructions

	var tagInputVal = $('#tagInput').attr("value");
	var boxWidth = $('#widthInput').attr("value");
	var spaceFilter = / /g;	
	


	if(spaceFilter.test(tagInputVal) == true){

		alert('Please remove any spaces from your keyword or tag!');

	} else if(tagInputVal == ""){   // checks if tagInputVal is empty
		alert('Please enter a keyword or tag!');   // prompts if empty tagInputVal
	} else {
$.getJSON("https://api.instagram.com/v1/tags/"+tagInputVal+"/media/recent?access_token="+accessToken+"&scope=likes&callback=?",function(data){   //--- begin JSON data grab---

	var index = Math.floor((Math.random()*10)+1);  //finds random integer btwn 1-10
	var imgUrl = data.data[index].images.standard_resolution.url;  //Instagram IMG URL from JSON
	var boxNumTotal = boxWidth*boxWidth;
	
	var boxOrigSeqArr = new Array(boxNumTotal);		//makes array with sequence of original IDs
		for(var i=0;i<boxNumTotal;i++){
		boxOrigSeqArr[i] = i;
		};
	
	var boxRandSeqArr = new Array(boxNumTotal);    //makes array with for randomized IDs sequence
		for(var i=0;i<boxNumTotal;i++){
		boxRandSeqArr[i] = i;
		};
	//Randomize the order of the array:
	boxRandSeqArr.sort(function() {return  Math.round( Math.random() )}) //Array elements now scrambled	
	console.log(boxRandSeqArr);

	for (var i=0;i<boxNumTotal;i++){   //creates box LIs with IDs of i
		$('ul #boxes').append('<li class="'+(i+1)+'" style="z-index:-2;"></li>');
		};

	
	for (var i=0; i< boxNumTotal ;i++) { 

		$("#wrapper", function(){
            $("<img/>").attr("src", imgUrl).appendTo("#container");        
	});
	$('img').height("600px");
	$('img').width("600px");

	//creates a boxes with id as i
	


	$('ul #boxes li:eq('+boxRandSeqArr[i]+')').append('<div class="box" style="" id="'+(i+1)+'">&nbsp;</div>'); //adds .box div to random li from boxRandSeqArr

	console.log("Destination LI index is "+boxRandSeqArr[i]+"and source DIV is "+(i+1)+"");

	var boxNum = (i+1)+'';  //turns i into ID that is also a string

	var unitWidth = 600 / boxWidth;		//calculates (in pixels) box unit Width
	var positionX = ((i+1)%boxWidth)*(unitWidth* -1);  //calculates X pos of boxSprite --NEED FIX
	var positionY = Math.floor((i+1)/boxWidth)*(unitWidth * -1);  //calculates Y pos of box Sprite

	$('#'+boxNum+'').attr('style','background-repeat:no-repeat;background-image:url('+imgUrl+');background-size:600px 600px;height:'+unitWidth+'px;width:'+unitWidth+'px;background-position:'+positionX+'px '+positionY+'px;');    // formats wrapper DIV to 600x600px
	

	};

// ----- pulls photo-meta data from Instagram's JSON

	var userName = data.data[index].user.username;
	var userPhotoUrl = data.data[index].user.profile_picture;
	var userProfileUrl = data.data[index].link;
	var userId = "";
	var userCaption= data.data[index].caption.text;
	var photoId = data.data[index].id;

//------ populates photo meta data info on sidebar----

	$('#userName').html('<p>by '+userName+'</p>');  //displays P element with photo author username

	$('#userPhoto').html('<a href="'+userProfileUrl+'" target="_blank">'+'<img src="'+userPhotoUrl+'"></img></a>');  // displays IMG elm with photo author user profile photo

	$('#originalPhoto').html('<p>original photo</p><a href="'+imgUrl+'" target="_blank">'+'<img width="150px" src="'+imgUrl+'"></img></a>');  //creates an IMG element with heading "original photo" and IMG of what completed photo should look like.

	$('#userProfile').html('<a href="'+userProfileUrl+'" target="_blank">here</a>');  //displays to original author's user profile

	$('#caption').html('<p>'+userCaption+'</p>');  //displays photo caption info

	console.log("1 "+photoId); //checks photo Id

//----- end meta data populating

});   // ---- end JSON data grab----

}; // --- end of form-validation if/else statement

	return false;  // <---- must add this when "submit button" is made.



});  // ----- end "get photo and data" function" -----


});

// ----- things to do: ---------

/* 

-style the page
-feature: search only photos by their friends
-check to see if you are logged in (i.e. if auth_token is not null)
-feature: determine box size
		
-feature user can pull from their own photos

-move selections form to a DIV that appears (and hides) from above the photo puzzle square via higher z-index.

-turn photo construction functions into "Global" functions that can be called via different types of JSON data grabs

-feature: if/else statement that checks each row of the boxNums for a certain sum see (use http://betterexplained.com/articles/techniques-for-adding-the-numbers-1-to-100/ for each row, n = right-most DIV id# - the sum of all previous rows' totals.)
and returns "win" function.
 
-feature: scoreboard
	create a "last high score" cookie.
-feature add photo "comments" and "like" buttons from your account to this photo.
-feature: "see original photo by its author" (opens in a new window0
-randomize box arrangement
-remove console.logs


*/