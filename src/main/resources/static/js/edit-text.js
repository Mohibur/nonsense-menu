window.fox;
class InputWithEditBox {
	innerText;
	parentDiv;
	textWindow;
	editButton;
	constructor(innerText, div) {
		this.innerText = innerText;
		this.parentDiv = mm.getDivObject(div);
		$(this.parentDiv).addClass("menu-descripntion");
		$(this.parentDiv).html("");
		this.textWindow = document.createElement("div");
		this.renderSpan();
		$(this.textWindow).css("float", "left");

		this.editButton = document.createElement("div");
		$(this.editButton).addClass("edit-box");
		this.parentDiv.appendChild(this.textWindow);
		this.parentDiv.appendChild(this.editButton);
		this.parentDiv.appendChild(mm.clearBothDiv());
	}

	renderSpan() {
		$(this.textWindow).html("");
		var sp = document.createElement("span");
		$(sp).text("Menu Desc: ");
		this.textWindow.appendChild(sp);
		var sp2 = document.createElement("span");
		$(sp2).css("color", "red");
		$(sp2).text(this.innerText);
		this.textWindow.appendChild(sp2);
	}

	onedit(fnc) {
		if(typeof fnc != "function") {
			throw "Something went wrong";
		}
		this.editButton.onclick = function (thisobj) {
			return function() {
				var blockDiv = document.createElement("div");
				$(blockDiv).css("position", "absolute");
				$(blockDiv).css("left", "0");
				$(blockDiv).css("top", "0");
				$(blockDiv).css("height", $( window ).height() + "px");
				$(blockDiv).css("width", $( window ).width() + "px");
				$(blockDiv).css("background", "#acacac40");
				document.body.appendChild(blockDiv);
				var textArea = document.createElement("textarea");
				blockDiv.appendChild(textArea);
				$(textArea).css("position", "absolute");
				var h = 100;
				var w = 250;
				$(textArea).css("height", h + "px");
				$(textArea).css("width", w + "px");
				$(textArea).css("left", (($(window).height() - h)/2) + "px");
				$(textArea).css("top", (($(window).width() - w)/2) + "px");
				$(textArea).val(thisobj.innerText);
				textArea.onkeyup = function (thisobj) {
					return function(e) {
						if(e.key === "Escape") {
							document.body.removeChild(blockDiv);
							return false;
					    } else if(e.key === "Enter") {
					    	thisobj.innerText = $(this).val();
					    	document.body.removeChild(blockDiv);
					    	thisobj.renderSpan();
					    	fnc();
					    	return false;
					    }
					}
				}(thisobj);
			}
		} (this);

	}
}
