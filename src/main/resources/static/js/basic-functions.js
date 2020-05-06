mm = new function () {
	this.getDivObject = function (idobj) {
		if(typeof idobj === "string") {
			return document.getElementById(id);
		} else if(typeof idobj === "object" && idobj.tagName == "DIV") {
			return idobj;
		}
	}

	this.clearBothDiv = function () {
		var floatClear = document.createElement("div");
		$(floatClear).css("clear", "both");
		return floatClear;
	}

	// build input form
	function _buildInputForm(idobj) {
		this._mother = mm.getDivObject(idobj);
		this._mother.className = "org-table";
		this.inputBoxes = new Object();
		this.subButtons = new Object();
		this.buttonDivs = new Object();

		this._title = function(_obj) {
			var t = document.createElement("div");
			t.className = "display-none";
			_obj._mother.appendChild(t);
			return t;
		}(this);
		
		this.addTitle = function(title) {
			$(this._title).html(title);
			t.className = "org-tr";
		}


		this.createNewButtonDiv = function(div_id) {
			var buttonDivHolder = document.createElement("div");
			buttonDivHolder.className = "button-grandpa";
			buttonDivHolder.clearDivObj = mm.clearBothDiv();
			buttonDivHolder.appendChild(buttonDivHolder.clearDivObj);
			buttonDivHolder.buttonChilds = new Object();
			buttonDivHolder.buttonCount = 0;
			this.buttonDivs[div_id] = buttonDivHolder;
			this._reAppendButtonDivs();
		}

		this._reAppendButtonDivs = function () {
			for(var divId in this.buttonDivs) {
				this._mother.appendChild(this.buttonDivs[divId]);
			}
		}
		// possible data objects
		// WORKING TODO
		this.addUpdateButton = function (data) {
			{ // fix the fucking data;
				if(data == null || typeof data != "object") throw "data is no good";
				if(data["parentId"] == null) throw "data is no good. parentId needed";
				if(data["buttonId"] == null) throw "data is no good. buttonId needed"
				if(data["className"] == null) data["className"] =  "okbutton";
				if(data["text"] == null) data["text"] =  "OK";
				
			}
			var actualButton = null;
			var buttonLevelGrandpa = this.buttonDivs[data.parentId];
			
			if(this.buttonDivs[data.parentId].buttonChilds[data.buttonId] == null) {
				var clearObj = this.buttonDivs[data.parentId].clearDivObj;
				actualButton = document.createElement("div");
				this.buttonDivs[data.parentId].buttonChilds[data.buttonId] = actualButton;
				actualButton.id = data.buttonId; 
				buttonLevelGrandpa.buttonCount++;
				//  Append Button to right //
				// create the div that holds the fucking button
				var buttonLevelPapa = document.createElement("div");
				buttonLevelPapa.className = "button-child";
				buttonLevelGrandpa.appendChild(buttonLevelPapa);
				buttonLevelGrandpa.appendChild(clearObj);
				var buttonLevelChild = document.createElement("div");
				buttonLevelChild.className = "button-grand-child";
				buttonLevelChild.appendChild(actualButton);
				buttonLevelPapa.appendChild(buttonLevelChild);
				
				if(data["fnc"] == null) {
					actualButton.onclick = function() {
						alert("No action is set");
					} 
				} else if(typeof data["fnc"]["onclick"] == "function") {
					actualButton.onclick = data["fnc"]["onclick"];
				} 
			} else {
				actualButton = this.buttonDivs[data.parentId].buttonChilds[data.buttonId];
				if(data["fnc"] != null) 
					actualButton.onclick = data["fnc"];
			}
			// common works
			buttonLevelGrandpa.buttonChilds[data.buttonId].className =  data["className"];
			$(buttonLevelGrandpa.buttonChilds[data.buttonId]).text(data["text"]);
			var buttonWidth = 100 / buttonLevelGrandpa.buttonCount;
			// make sure each button object has proper width
			[...buttonLevelGrandpa.getElementsByClassName("button-child")].forEach(function(item) {
				$(item).css("width", buttonWidth + "%");
			})
			this.subButtons[data["buttonId"]] = actualButton;
		}

		this.addInput = function (msg, inpId, readonly, fncs) {
			var tr = document.createElement("div");
			tr.className = "org-tr";
			var td1 = document.createElement("div");
			td1.className = "org-td";
			tr.appendChild(td1);
			var td2 = document.createElement("div");
			td2.className = "org-td";
			var inputBox = document.createElement("input")
			inputBox.id = inpId;
			inputBox.type='text';
			if(readonly === true) {
				inputBox.readOnly = true;
				inputBox.className = 'read-only'
			}
			td2.appendChild(inputBox);
			tr.appendChild(td2);
			tr.appendChild(mm.clearBothDiv());
			$(td1).html(msg);
			if(fncs!=null) {
				if(fncs["onchange"] != null) {
					inputBox.onchange = fncs["onchange"];
				}
				if(fncs["onkeyup"] != null) {
					inputBox.onkeyup = fncs["onkeyup"];
				}
			}
			this.inputBoxes[inpId] = inputBox;
			this._mother.appendChild(tr);
		}
		
		this.addHiddenInput = function (inpId, value) {
			var inputBox = document.createElement("input")
			inputBox.id = inpId;
			inputBox.type = "hidden";
			inputBox.value = value;
			this.inputBoxes[inpId] = inputBox;
			this._mother.appendChild(inputBox);
		}
		return this;
	}
	// exposed functions
	this.inputForm = function (idobj) {
		return new _buildInputForm(idobj);
	}

}


