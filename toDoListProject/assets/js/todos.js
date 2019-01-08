$("ul").on("click", "li", function(){
	$(this).toggleClass("strike");
});

$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(600, function(){
		$(this).remove();
	});
	event.stopPropagation();
});

$("input[type = 'text']").keypress(function(event){
	if(event.which===13){
		var toDoText = $(this).val();
		$(this).val("");
		$("ul").append( "<li><span><i class='fa fa-trash'> </i></span>" + toDoText + "</li>");
	}
});

$(".plus").click(function(){
	$("input[type = 'text']").fadeToggle();
});