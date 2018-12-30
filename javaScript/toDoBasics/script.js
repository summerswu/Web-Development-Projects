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
  		list.splice(index, index);
  	}

  }
}, 500);