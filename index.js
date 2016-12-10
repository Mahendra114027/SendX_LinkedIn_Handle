if (!window.SendX) {
    window.SendX = true;
    linkedin_search_render();
    window.setInterval(periodical_check, 3000);
}

function periodical_check() {
	if (!document.querySelector("span.SendX_button_div")) {
			linkedin_search_render();
	}
}

//Create button to add to sendx to be replaced with modal window

function create_static_button() {
	if (document.getElementById('SendX_action_div')) {
		return;
	}
	var div = document.createElement('DIV');
	div.id = 'SendX_action_div';
	var html = '<img src="Assets/IMAGES/popuplogo.jpg" width="75" style="padding-left: 12px;"/><br/>';
	html += '<div id="SendX_number_selected" style="text-align: center"><span id="SendX_number_selected_value">0</span><br/>contacts selected</div>'
	html += '<button id="add_to_SendX_button">Add to SendX</button>';
	div.innerHTML = html;
	document.body.appendChild(div);
}

//Show notification
function showNotification() {
	var div = document.createElement('DIV');
	div.id = "SendX_added_notification";
	div.innerHTML = "Contacts have been added to the contact list. You can now proceed with the checkout by clicking on SendX icon in the Chrome toolbar.";
    alert("yappa");
	document.body.appendChild(div);	
	setTimeout(function() {
		document.body.removeChild(div);
	}, 5000);
}

//Function to inject button 
function linkedin_search_render() {
	create_static_button();
	get_add_to_SendX_button().onclick = function() {
		add_to_SendX();
	};
	var people_results = get_people_results();
	for (var i = 0; i < people_results.length; i++) {
		var buttonDiv = people_results[i].querySelector('div.srp-actions.blue-button');
		buttonDiv.innerHTML += '<style>#sendx-button{padding-right:1.8px;padding-left:1.8px;}</style><br><br><span class="primary-action-button label"><input id="sendx-button" type="button" value="+SendX" checked class="primary-action-button label hover"/><span style="color: #0099cc"></span></span>';
	}
	Array.prototype.slice.call(document.querySelectorAll("input.SendX_button")).map(function(item) {
		item.onchange = function() {SendX_button_change();};
	});
	SendX_button_change();
}

function SendX_button_change() {
	var number_of_contacts = document.querySelectorAll('input.SendX_button:checked').length;
	document.querySelector('span#SendX_number_selected_value').innerHTML = number_of_contacts;
	if (number_of_contacts === 0) {
		get_add_to_SendX_button().disabled = true;
	} else {
		get_add_to_SendX_button().disabled = false;
	}
}

function add_to_SendX() {
	var people_results = get_people_results();
	var people = [];
	for (var i = 0; i < people_results.length; i++) {
		var check_button = people_results[i].querySelector("input.SendX_button");
		if (check_button && check_button.checked) {
			var person = {
				'name': people_results[i].querySelector('a.title').text,
				'headline': people_results[i].querySelector('div.description').innerText,
				'img_url': people_results[i].querySelector('img.entity-img').src,
				'profile_url': people_results[i].querySelector('a.title').href
			}
			people.push(person);
			people_results[i].querySelector("span.SendX_button_div").innerHTML = '<span style="color: #999;">Added to SendX</span>';
		}
	}
	chrome.runtime.sendMessage({'SendX_add_all': people});
	console.log("Sent to SendX: " + people);
	SendX_button_change();
	showNotification();
}

function get_people_results() {
	return document.querySelectorAll('li.mod.result.people');
}

function get_add_to_SendX_button() {
	return document.querySelector("button#add_to_SendX_button");
}