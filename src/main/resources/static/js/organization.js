window.VALIDATE_STRING = /^[a-z0-9-]{3}[a-z0-9-]*$/;
window.VALIDATE_NUMBER = /^[0-9-]+$/;
function validate_proper_id(value) {
	if (value.trim().match(window.VALIDATE_STRING) == null) {
		return "Individual input, only accepted a-z, A-Z, 0-9, '-' and minimum 3 char long";
	}
	if (value.trim().match(window.VALIDATE_NUMBER) != null) {
		return "Number only is not acceptable";
	}
	return true;
}

class MenuStructure {
	constructor() {
		this.menuName = "";
		this.menuDesc = "";
		this.hasAdmin = false;
		this.parentMenu = null;
		this.isNew = true;	// null or false is not new
		this.children = [];
	}
}



// This action when clicked on left menu organization button
$("#organizations").click(
function() {
	// in this case this object is #organizations 
	if ($(this).attr("--data-process") === true) {
		if (!confirm("There are changes; do you really want to lose chagnes?")) {
			return;
		}
	}
	
	var addEditWindow = document.createElement("div");
	var addMenuWindow = document.createElement("table");
	/*
	* Adding left Organization window
	*/
	var	addOrganizationListPanel = function() {
		var currentListPanel = document.createElement("div");
		$(currentListPanel).addClass("current-list-panel");
		return currentListPanel;
	}();
	
	var addEditPanel = document.createElement("div");
	$(addEditPanel).css("float", "left");
	addEditPanel.appendChild(addEditWindow);
	addEditPanel.appendChild(addMenuWindow);

	// building input box
	var orgInputForm = mm.inputForm(addEditWindow);
	// add required input boxes
	orgInputForm.addInput("Auto Id", "id", true);
	orgInputForm.addInput(
			"Organization Id", 
			"org-id",
			false,	
			{
				onchange: function() {
					// this object is the input box that we are adding in this function
					this.value = this.value.toLocaleLowerCase();
					var valid = validate_proper_id(this.value);
					if( valid !== true ) {
						$(this).addClass("bad-input");
						return;
					}
				},
				onkeyup: function() {
					// this object is the input box that we are adding in this function
					$(this).removeClass("bad-input");
				}
			}
		); // function params ends
	orgInputForm.addInput(
		"Organization Name", 
		"org-name", 
		false, 
		{
			onchange: function() {
				if( this.value.match(VALIDATE_NUMBER) != null ) {
					$(this).addClass("bad-input");
					return;
				}
			},
			onkeyup: function() {
				$(this).removeClass("bad-input");
			}
		}
	);// function params ends
		
	// add buttons
	orgInputForm.createNewButtonDiv("button_layer_1");

	/*
	 * Adding new Button for submit purpose
	*/
	orgInputForm.addUpdateButton({// function params begins
		parentId: "button_layer_1",
		buttonId: "addUpdate",
		text: "Add New",
		fnc : {
			onclick: function() {
				var validate = window.validate_proper_id(orgInputForm.inputBoxes["org-id"].value);
				if(validate!==true) {
					alert(validate);
					return;
				}
				var data = {
					orgName: orgInputForm.inputBoxes["org-name"].value
				};

				var url;
				if (orgInputForm.inputBoxes["id"].value === "" || 
						orgInputForm.inputBoxes["id"].value === null) {
					url = "/org/add";
					data["orgId"] = orgInputForm.inputBoxes["org-id"].value;
				} else {
					url = "/org/update";
					data["id"] = orgInputForm.inputBoxes["id"].value;
				}

				$.ajax({
					url : url,
					method : "post",
					data : data,
					success : function(jsondata) {
						if (jsondata.success != true) {
							alert(jsondata.message);
						} else {
							orgInputForm.inputBoxes["id"].value = "";
							orgInputForm.inputBoxes["org-id"].value = "";
							$(orgInputForm.inputBoxes["org-id"]).removeClass("bad-input");
							orgInputForm.inputBoxes["org-name"].value = "";
							$(orgInputForm.inputBoxes["org-name"]).removeClass("bad-input");
							addItemToList(jsondata.data, null, true);
						}
					}
				});
			}
		}
	}); //function ends: addUpdateButton

	// DELETE FUNCITON
	var _delete_function = function() {
		if(orgInputForm.inputBoxes["id"].value == "") {
			return;
		}
		if (!confirm("This is about to get Deleted")) {
			return;
		}
		var id = orgInputForm.inputBoxes["id"].value;
		$.ajax({
			url : "/org/remove",
			method : "post",
			data : {
				id : id
			},
			success : function(jsonObj) {
				if (jsonObj.success != true) {
					alert(jsonObj.message);
				} else {
					orgInputForm.inputBoxes["org-id"].value = "";
					orgInputForm.inputBoxes["org-name"].value = "";
					orgInputForm.inputBoxes["id"].value = "";
					// truncating
					var delObj = document.getElementById(id);
					delObj.className = "organization-default-deleted";
					delObj.onclick = function() {
						delObj.parentElement.removeChild(delObj);
					}
				}
			},
			error : function(err) {
				alert(err.responseText);
			}
		});
	}
	
	orgInputForm.addUpdateButton({
		parentId : "button_layer_1",
		buttonId : "remove",
		text : "Remove",
		className: "cancelbutton",
		fnc : {
			onclick: _delete_function
		}
	});
	
	var bodyPanel = document.getElementById("body-panel");
	$(bodyPanel).html("");
	bodyPanel.appendChild(addOrganizationListPanel);
	bodyPanel.appendChild(addEditPanel);
	bodyPanel.appendChild(mm.clearBothDiv());
	// This is to reset the last overridden color;
	var lastNewInList = null;

		// add each item to list
	var addItemToList = function(jsonData, func, isNew) {
		var dev = document.createElement("div");
		dev.className = "organization-default";
		$(dev).html(jsonData.organizationName);
		$(dev).attr("title", jsonData.organizationName);
		if (jsonData.organizationName.length > 20 && jsonData.organizationName.length <= 25) {
			$(dev).css("font-size", "small");
		} else if (jsonData.organizationName.length > 25 && jsonData.organizationName.length <= 30) {
			$(dev).css("font-size", "x-small");
		} else if (jsonData.organizationName.length > 30 && jsonData.organizationName.length <= 35) {
			$(dev).css("font-size", "xx-small");
		} else if (jsonData.organizationName.length > 35) {
			$(dev).html(jsonData.organizationName.substr(0, 32)	+ "...");
			$(dev).css("font-size", "xx-small");
		}

		if (typeof (func) == "function") {
			dev.onclick = func;
		} else {
			// if no id then that shit is +
			dev.id = jsonData.id;
			dev.jsonData = jsonData;
			dev.onclick = function() {
				orgInputForm.inputBoxes["id"].value = this.jsonData.id;
				orgInputForm.inputBoxes["org-id"].value = this.jsonData.organizationId;
				orgInputForm.inputBoxes["org-name"].value = this.jsonData.organizationName;
				orgInputForm.addUpdateButton({
					"parentId" : "button_layer_1",
					"buttonId" : "addUpdate",
					"text" : "Update"
				});
			}
		}

		if (isNew == true) {
			dev.className = "organization-default-last-new";
			if (lastNewInList != null) {
				lastNewInList.className = "organization-default";
			}
			lastNewInList = dev;
		}
		addOrganizationListPanel.appendChild(dev);
	}

		// Load the entire list to the window
	var loadOrgList = function() {
		$(addOrganizationListPanel).html("");
		addItemToList(
			{ "organizationName" : " + " },
			function() {
				orgInputForm.inputBoxes["id"].value = "";
				orgInputForm.inputBoxes["org-id"].value = "";
				orgInputForm.inputBoxes["org-name"].value = "";
				orgInputForm.addUpdateButton({
					"parentId" : "button_layer_1",
					"buttonId" : "addUpdate",
					"text" : "Add New"
				});
				orgInputForm.addUpdateButton({
					"parentId" : "button_layer_1",
					"buttonId" : "remove",
					"text" : "Remove",
					"className": "cancelbutton"
				});
			});
		$.ajax({
			url : "/org/list",
			success : function(jsonData) {
				for ( var i in jsonData) {
					addItemToList(jsonData[i]);
				}
			},
			error : function(error) {
			}
		});
	}

	loadOrgList();

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////Play With Menus///////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// play with this now.
	//var // TODO fix this shit 
	ms = new Object();
	ms.motherMenuArray = new Array();
	// if current Object is null it means
	ms.curMenuObj = null;
	ms.currentMenuArray = ms.motherMenuArray;

	//addMenuWindow = document.createElement("table");
	addMenuWindow.border = 0;
	addMenuWindow.colSpacing = 0;
	addMenuWindow.className = "addMenuWindow";
	$(addMenuWindow).css("background", "#88888830");

	var inputRow = addMenuWindow.insertRow();	
	var inputCol = inputRow.insertCell();
	inputCol.colSpan = 3;
	var titleRow = addMenuWindow.insertRow();
	// title row
	var cellParent = titleRow.insertCell();
	$(cellParent).html("Mother Menu And Siblings");
	$(cellParent).addClass("menu-window-title");
	$(cellParent).attr("valign", "top");

	var cellCurrent = titleRow.insertCell();
	$(cellCurrent).html("Selected Control");
	$(cellCurrent).addClass("menu-window-title");
	$(cellCurrent).attr("valign", "top");
	
	var cellDesc = titleRow.insertCell();
	$(cellDesc).html("Description");
	$(cellDesc).addClass("menu-window-title-desc");
	$(cellDesc).attr("valign", "top");
	$(cellDesc).attr("align", "left");

	var menuRow = addMenuWindow.insertRow();
	
	var parentCol = menuRow.insertCell(); 
	$(parentCol).addClass("menu-td");
	parentCol.align = "left";
	
	var currentCol = menuRow.insertCell();
	$(currentCol).addClass("menu-td");
	currentCol.align = "left";
	
	var descCol = menuRow.insertCell();
	$(descCol).addClass("menu-td");
	descCol.align = "left";
	
	var menuMother = document.createElement("div");
	var currentSelect = document.createElement("div");
	inputCol.appendChild(menuMother);
	currentCol.appendChild(currentSelect);
	
	var menuInputDiv = document.createElement("div");
	menuMother.appendChild(menuInputDiv);
	var menuDisplayDiv = document.createElement("div");
	var menuInputForm = mm.inputForm(menuInputDiv);
	menuInputForm.addInput("Menu Name","menu-name",false,	
		{
			onchange: function() {
				// this object is the input box that we are adding in this function
				this.value = this.value.toLocaleLowerCase();
				var valid = validate_proper_id(this.value);
				if( valid !== true ) {
					$(this).addClass("bad-input");
					return;
				}
			},
			onkeyup: function() {
				// this object is the input box that we are adding in this function
				$(this).removeClass("bad-input");
			}
		});
	menuInputForm.addInput("Description", "menu-desc",false);
	menuInputForm.createNewButtonDiv("button_layer_for_menu");
	menuInputForm.addUpdateButton({
		parentId: "button_layer_for_menu",
		buttonId: "addUpdate",
		text: "Add",
		fnc: {
			onclick: function() {
				if(orgInputForm.inputBoxes["id"].value.trim() == "") {
					alert ("You need to select a organization");
					return;
				}
				if(menuInputForm.inputBoxes["menu-name"].value.trim() == "" || 
					menuInputForm.inputBoxes["menu-name"].value.match(window.VALIDATE_STRING) == null) {
					$(menuInputForm.inputBoxes["menu-name"]).addClass("bad-input");
					return;
				}
				// TODO
				var newMenu = new MenuStructure();
				newMenu.menuName = menuInputForm.inputBoxes["menu-name"].value;
				newMenu.menuDesc = menuInputForm.inputBoxes["menu-desc"].value;
				menuInputForm.inputBoxes["menu-name"].value = "";
				menuInputForm.inputBoxes["menu-desc"].value = "";
				newMenu.hasAdmin = false;
				newMenu.parentMenu = ms.curMenuObj;
				newMenu.children = [];
				ms.currentMenuArray.push(newMenu);
				renderCurrentList(ms.currentMenuArray.length - 1);
			}
		}
	});
	var lastSelectedDiv = null;
	// add an individual menu to given menu;
	function cd(data) {
		var possid = "menu_construct_" + data.obj.menuName
		var divTop = document.getElementById(possid);
		if(divTop == null) {
			divTop = document.createElement("div");
			divTop.id = possid;
		}
		$(divTop).html("");
		$(divTop).addClass("menu-holder");
		divTop.menuObject = data.obj;
		divTop.onclick = function() {
			if(lastSelectedDiv != null) {
				$(lastSelectedDiv).removeClass("menu-holder-selected");
			}
			$(this).addClass("menu-holder-selected");
			lastSelectedDiv = this;
			renderDescriptionWindow(this);
		};
		// main window //
		var divTemp = document.createElement("div");
		divTop.appendChild(divTemp);
		$(divTemp).css('float', 'left');

		var ttl = "";
		if(data.obj.menuDesc.trim() == "") {
			ttl = data.obj.menuName		
		} else {
			ttl = data.obj.menuName + " [" + data.obj.menuDesc + "]";
		}
		$(divTemp).html(ttl);
		$(divTemp).attr("title", data.obj.menuName);
		if(data.clsName == null || data.clsName == "") {
			$(divTemp).addClass("common-child");
		} else {
			$(divTemp).addClass(data.clsName);
		}
		
		
		// cross button //
		var divClose = document.createElement("div");
		divTop.appendChild(divClose);
		$(divClose).addClass("close-menu");
		divClose.onclick = function(idx) {
			return function() {
				if(!confirm("confirm to remove")) {
					return;
				} 
				this.parentElement.parentElement.removeChild(this.parentElement);
				
				ms.currentMenuArray.splice(idx);
			}
		} ();
		divTop.appendChild(mm.clearBothDiv());
		
		data.app.appendChild(divTop);
		return divTop;
	}
	
	var renderParentList = function () {
		//parentCol>>currentCol>>descCol
	}
	
	var renderDescriptionWindow = function(obj) {
		//parentCol>>currentCol>>descCol
		$(descCol).html("");
		var divMenuName = document.createElement("div");
		$(divMenuName).addClass("menu-descripntion");
		var addSpan = function(text) {
			var sp = document.createElement("span");
			$(sp).text(text);
			divMenuName.appendChild(sp);
			return sp;
		}
		addSpan("Menu Name:");
		$(addSpan(obj.menuObject.menuName)).css("color", "red");
		descCol.appendChild(divMenuName);
		// div description
		var divMenuDesc = document.createElement("div");
		descCol.appendChild(divMenuDesc);
		var button = new InputWithEditBox(obj.menuObject.menuDesc, divMenuDesc).onedit(
				function () {
					// TODO WORKING HERE NOW
				}
				);
	}

	var renderCurrentList = function (idx) {
		//parentCol>>currentCol>>descCol
		$(currentCol).attr("valign", "top");
		if(idx == null) {
			// reconstructing the shit;
			$(currentCol).html("");
			ms.currentMenuArray.forEach(function(obj, index) {
				cd({"app": currentCol, "obj": obj, "index": index});
			})
		} else {
			return cd({"app": currentCol, "obj": ms.currentMenuArray[idx], "index": idx});
		}
	}
})
