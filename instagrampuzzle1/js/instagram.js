var userName,
	userPhotoUrl,
	userProfileUrl,
	userId,
	userCaption,
	photoId,
	accessToken = window.location.hash.slice(14),
	tagInputVal,
	ajax_response = {};

var getINSTAGRAM_URL = function(){
	return "https://api.instagram.com/v1/tags/"+tagInputVal()+"/media/recent?access_token="+accessToken+"&scope=likes+comments+relationships&callback=?"
}

// make arrays into mini-templates for HTML strings
Array.prototype.toHTMLString = function(){
	return this.join("")
}

var templates = {
	//displays P element with photo author username
	userName: function(locals){ return ['<p>','photo by ',locals.userName,'</p>']
	},

	// displays IMG elm with photo author user profile photo
	userPhoto: function(locals){ return ['<a href="', locals.userProfileUrl,'" target="_blank">',
															'<img src="',locals.userPhotoUrl,'"/>',
														'</a>'] },

	//creates an IMG element with heading "original photo" and IMG of what completed photo should look like.
	originalPhoto: function(locals){ return ['<p>original</p>',
																	'<a href="',locals.imgUrl,'" target="_blank">',
																		'<img width="150px" src="', locals.imgUrl, '"/>',
																	'</a>'] },

	//displays to original author's user profile
	userProfile: function(locals){ return ['<a href="',locals.userProfileUrl,'" target="_blank">here</a>'] },

	//displays photo caption info
	caption: function(locals){ return ['<p>',locals.userCaption,'</p>'] },

	// imagePieceBox template
	imagePieceBox: function(locals){ return ['<div class="box" style="" id="',locals.i+1,'">','&nbsp;','</div>'] },

	// boxes with IDs
	boxesWithIds: function(locals){ return ['<li class="',locals.i+1,'" style="z-index:-2;"></li>']}
}

var boxWidth = function(){
	return $('#widthInput').slider('value');
}

var tagInputVal = function(){
	return $('#tagInput').attr("value");
}

var setUserData = function(data){
	userName = data.data[index].user.username;
	userPhotoUrl = data.data[index].user.profile_picture;
	userProfileUrl = data.data[index].link;
	userId = "";
	userCaption= data.data[index].caption.text;
	photoId = data.data[index].id;
}

var getPhotoDataCallback = function(data){  

		// console.log(data);
		ajax_response = data;

		index = Math.floor((Math.random()*10)+1);  //finds random integer btwn 1-10
		imgUrl = data.data[index].images.standard_resolution.url;  //Instagram IMG URL from JSON
		boxNumTotal = boxWidth()*boxWidth();
		
		boxOrigSeqArr = new Array(boxNumTotal);		//makes array with sequence of original IDs
			for(var i=0;i<boxNumTotal;i++){
			boxOrigSeqArr[i] = i;
			};
		
		boxRandSeqArr = new Array(boxNumTotal);    //makes array with for randomized IDs sequence
			for(var i=0;i<boxNumTotal;i++){
			boxRandSeqArr[i] = i;
			};
		//Randomize the order of the array:
		boxRandSeqArr.sort(function() {return  Math.round( Math.random() )}) //Array elements now scrambled	

		for (var i=0;i<boxNumTotal;i++){   //creates box LIs with IDs of i

			$('ul #boxes').append( templates.boxesWithIds({i: i}).toHTMLString() );
		};

		for (var i=0; i< boxNumTotal ;i++) { 
			$("#wrapper", function(){
	    $("<img/>").attr("src", imgUrl).appendTo("#container");        
		});

		$('img').height("600px");
		$('img').width("600px");

		//creates a boxes with id as i

		$('ul #boxes li:eq('+boxRandSeqArr[i]+')').append( templates.imagePieceBox({i: i}).toHTMLString() ); //adds .box div to random li from boxRandSeqArr

		var boxNum = (i+1)+'';  //turns i into ID that is also a string

		var unitWidth = 600 / boxWidth();		//calculates (in pixels) box unit Width
		var positionX = ((i+1)%boxWidth())*(unitWidth* -1);  //calculates X pos of boxSprite --NEED FIX
		 
		if ((i+1) == boxNumTotal) {		//corrects issue with "empty" box.
			var positionY = 0;
		} else {
			var positionY = (Math.floor((i+1)/boxWidth()))*(unitWidth * -1);   //calculates Y pos of box Sprite
		};

		$('#'+boxNum+'').css({
				backgroundRepeat: "no-repeat",
				backgroundImage: "url('"+imgUrl+"')",
				backgroundSize: "600px 600px",
				height: unitWidth+'px',
				width: unitWidth+'px',
				backgroundPosition: positionX+'px '+positionY+'px'
			});    // formats wrapper DIV to 600x600px
		};

	// ----- pulls photo-meta data from Instagram's JSON

	setUserData(data);

	$('#userName').html( templates.userName({
														userName: userName
												}).toHTMLString() );

	$('#userPhoto').html( templates.userPhoto({
													userProfileUrl: userProfileUrl,
													userPhotoUrl: userPhotoUrl 
												}).toHTMLString() ); 

	$('#originalPhoto').html( templates.originalPhoto({
													imgUrl: imgUrl
												}).toHTMLString() );  
	$('#userProfile').html( templates.userProfile({
													userProfileUrl: userProfileUrl
												}).toHTMLString() );  
	$('#caption').html( templates.caption({
													userCaption: userCaption
												}).toHTMLString() );  

}


$(document).ready(function(){  


	$('#boxes').sortable();

	/*   //this disables touch scrolling on iOS for #boxes element

	$('#boxes').bind('touchmove', function(e) {
	   e.preventDefault();
	}, false);
	 
	*/

	$('#widthInput').slider({
		value:2,
		min:2,
		max:32,
		step:2,
		slide: function( event, ui ) {
        $( "#puzzleWidth" ).val(ui.value+"x"+ui.value+" boxes");
				return ui.value;
			}
		});

	// set default puzzle width value
	$( "#puzzleWidth" ).val("2x2 boxes");

	//instruction button callback
	$('#instButton').click(function(){

		if ( $('#instructions').css('display') == "none" ){  //checks if instructions are hidden
			$('#instructions').show(50);
		} else {
			$('#instructions').hide(50);  //hides instructions
		};
	});

	// instButton Hover Callback
	$('#instButton').hover(  //when mouse hovers over instButton...
		function(){    //on function to fire
			$('#instButton').css({
				color: 'black',
				backgroundColor: 'white'
			});
		},
		function(){    //off function to fire
			$('#instButton').css({
				color: 'white',
				backgroundColor: 'black'
			});
		}
	);


	// generate button click callback
	$('#generate').click(function(e){  //---- change 'p' to submit button.

		e.preventDefault()

		$('ul #boxes').empty();  //empties existing LI elements in box region
		$('#instructions').hide(50);  //hides instructions

		// regex for spaces
		var spaceFilter = / /g;	

		if(spaceFilter.test(tagInputVal()) == true){
			alert('Please remove any spaces from your keyword or tag!');
		} else if (tagInputVal() == "") {   // checks if tagInputVal is empty
			alert('Please enter a keyword or tag!');   // prompts if empty tagInputVal
		} else {
				;
				$.getJSON(getINSTAGRAM_URL(), getPhotoDataCallback);   // ---- end JSON data grab----

				$('#info').show(50).css('border','5px solid black');

		} // --- end of form-validation if/else statement

	});  // ----- end "get photo and data" function" -----

	$('#likeButton').click(function(){
		alert('coming soon!')
	});

	$('#doneButton').click(function(){
		for (var i=1;i<=boxNumTotal;i++){
			if (i == $('#boxes li:eq('+i+') div').attr('id')) {
				continue;
			} else if (i == boxNumTotal) {
				alert('You win!');
			} else { 
				alert('Please try again!');
				break;
			};
		};
	});

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
-remove consolelogs
*/