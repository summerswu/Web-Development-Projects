var action;
var list = [];

function printItems(element, index, array){
	console.log( index+": "+element);
}

window.setTimeout(function() {
  while(action!=="quit"){
  	action = prompt("What would you like to do");
  	if (action==="new") {
  		var newItem = prompt("Add the new item here");
  		list.push(newItem);
  	}
  	else if(action==="list"){
  		list.forEach(printItems);
  	}

  	if (action==="delete") {
  		var index = prompt("enter the index of the item");
  		list.splice(index, 1);
  	}

  }
}, 500);

var movies = [
    {	name: "WarDogs", 
		rating:9,
		haveWatched: true
	},
   {	name: "bumble", 
		rating:9,
		haveWatched: false,
	},
	{	name: "WarDogs", 
		rating:9,
		haveWatched: true
	}
];

function print(object, index){
	if (object.haveWatched===true) {
		console.log("You have watched "+object.name+" - "+object.rating+" stars");
	}
	else{
		console.log("You have yet to watched "+object.name+" - "+object.rating+" stars");
	}
}

movies.forEach(print);
