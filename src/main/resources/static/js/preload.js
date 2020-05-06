function LoadImages (imageName) {
	new Image("/images/" + imageName + ".png");
	new Image("/images/" + imageName + ".active.png");
	new Image("/images/" + imageName + ".hover.png");
} 
LoadImages("ok2");
LoadImages("cancel2");
LoadImages("remove");
LoadImages("edit");