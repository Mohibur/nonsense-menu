function LoadImage(imageName) {
	var tmObj = new Image();
	tmObj.src = imageName;
	delete tmObj;
}

function LoadImagesSet (imageName) {
	LoadImage("/images/" + imageName + ".png")
	LoadImage("/images/" + imageName + ".active.png");
	LoadImage("/images/" + imageName + ".hover.png");
}

LoadImagesSet("ok2");
LoadImagesSet("cancel2");
LoadImagesSet("remove");
LoadImagesSet("edit");