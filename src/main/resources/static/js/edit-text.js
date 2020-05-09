window.fox;
class InputWithEditBox {
	innerText;
	parentDiv;
	textWindow;
	editButton;
	constructor(innerText, div) {
		this.innerText = innerText;
		this.parentDiv = mm.getDivObject(div, true);
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
			function makeTextHolderDiv(blockDiv) {
				var div = document.createElement("div");
				var h = 150;
				var w = 250;
				$(div).css("position", "absolute");
				$(div).css("height", h + "px");
				$(div).css("width", w + "px");
				$(div).css("left", (($(window).width() - w)/2) + "px");
				$(div).css("top", (($(window).height() - h)/4) + "px");
				blockDiv.appendChild(div);
				return div;
			}
			function makeTitleForHolderDiv(textHolderDiv, title, blockDiv) {
				var div = document.createElement("div");
				$(div).addClass("popup-title");
				var spleft = document.createElement("div");
				$(spleft).css("float", "left");
				$(spleft).css("display", "inline");
				$(spleft).text(title);
				var spright = document.createElement("div");
				$(spright).addClass("close-button");
				spright.onclick = function() {
					document.body.removeChild(blockDiv);
				}
				
				div.appendChild(spleft);
				div.appendChild(spright);
				div.appendChild(mm.clearBothDiv());
				
				textHolderDiv.appendChild(div);
				return div;
			}
			return function() {
				var blockDiv = document.createElement("div");
				$(blockDiv).css("position", "absolute");
				$(blockDiv).css("left", "0");
				$(blockDiv).css("top", "0");
				$(blockDiv).css("height", $( window ).height() + "px");
				$(blockDiv).css("width", $( window ).width() + "px");
				$(blockDiv).css("background", "#acacac40");
				document.body.appendChild(blockDiv);
				var textHolderDiv = makeTextHolderDiv(blockDiv);
				makeTitleForHolderDiv(textHolderDiv, "Edit Text", blockDiv);
				var textArea = document.createElement("textarea");
				textHolderDiv.appendChild(textArea);
				$(textArea).addClass("floating-text");
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
					    	fnc(thisobj.innerText);
					    	return false;
					    }
					}
				}(thisobj);
			}
		} (this);

	}
}
