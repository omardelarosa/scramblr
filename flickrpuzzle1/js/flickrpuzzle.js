
/* ----- to do list-----

	-add photo looping element
	-add CSS styles to make photo huge
	-add search box function for variable tags, etc.


*/

$(document).ready(function(){  

//--------- Part 0 - create search boxes for tags and size of puzzle ---

// ---------Part 1 - start random cat photo generator --------------- //

	$('#boxes').sortable();

	$.getJSON("http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=65dd532cec7b2de5d3f2ba506462108a&tags=cats&format=json&nojsoncallback=1&auth_token=72157631430333496-cedf2f2825aeb4c9&api_sig=42b64b9da92d50c916d521aa1fcebb61",function(data){

//	console.log(data);

	var index = Math.floor((Math.random()*100)+1);  //finds random integer btwn 1-100

	var farmId = data.photos.photo[index].farm;
	var serverId = data.photos.photo[index].server;
	var id = data.photos.photo[index].id;
	var secret = data.photos.photo[index].secret;     //binds photo URL elements to variables

//	console.log(farmId,serverId,id,secret);

	var imgUrl = "http://farm"+farmId+".staticflickr.com/"+serverId+"/"+id+"_"+secret+".jpg";

	$('#wrapper div').attr('style','background-repeat:no-repeat;background-image:url('+imgUrl+');background-size:600px 600px;');

/*	$("#wrapper", function(){
            $("<img/>").attr("src", "http://farm"+farmId+".staticflickr.com/"+serverId+"/"+id+"_"+secret+".jpg").appendTo("#container");        
	});
	$('img').height("600px");
	$('img').width("600px");

*/
	
});


	


//----------- end random cat photo generator ---------- //

//----------- Part 2 - assign image's sprite coordinates to DIVs----

/*

box# = (left, top)

box 1 = 0,0
box 2 = 200,0
box 3 = 400,0
box 4 = 0,200
box 5 = 200,200
box 6 = 400,200
box 7 = 0,400
box 8 = 200,400
box 9 = 400,400

box 1 - box 2 - box 3

box 4 - box 5 - box 6

box 7 - box 8 - box 9

*/


//----------- Part 3 - randomize assortment of DIVs


$('#wrapper').mousedown(function(){

	var boxNum = Math.floor((Math.random()*10)+1);
	var boxPos = 'piece'+boxNum+'';
//	var firstPos = [];
	var pieceNum;
	var b;

/*	function(){

		for(i=1,i<10,)
		

	};
*/
	console.log(shuffle([0,1,2,3,4,5,6,7,8,9]));

	$('li div').each(function(){

		var currentClass = this.className || undefined;

		console.log(currentClass);

		if(currentClass != undefined){
			
			$(this).removeClass();
			$(this).addClass(boxPos);
		} else {

		$(this).addClass(boxPos);

		};	

});

	console.log('Hey!');

});



//----------- Part 4 - determine conditions of winning ---- //

//-----------

});