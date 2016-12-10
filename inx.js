if (window.inmail) {
} else {
    window.inmail = true;
    linkedin_search_render();
    window.setInterval(periodical_check, 3000);
}

function periodical_check() {
	if (!document.querySelector("span.inmail_checkbox_div")) {
			linkedin_search_render();
	}
}

function create_static_button() {
	if (document.getElementById('inmail_action_div')) {
		return;
	}
	var div = document.createElement('DIV');
	div.id = 'inmail_action_div';
	var html = '<img src="http://inmail.io/static/lp/startup/common-files/img/header/maillogo.png" width="75" style="padding-left: 12px;"/><br/>';
	html += '<div id="inmail_number_selected" style="text-align: center"><span id="inmail_number_selected_value">0</span><br/>contacts selected</div>'
	html += '<button id="add_to_inmail_button">Add to InMail</button>';
	div.innerHTML = html;
	document.body.appendChild(div);
}

function showNotification() {
	var div = document.createElement('DIV');
	div.id = "inmail_added_notification";
	div.innerHTML = "Contacts have been added to the contact list. You can now proceed with the checkout by clicking on InMail icon in the Chrome toolbar.";
	document.body.appendChild(div);	
	setTimeout(function() {
		document.body.removeChild(div);
	}, 5000);
}

function linkedin_search_render() {
	create_static_button();
	get_add_to_inmail_button().onclick = function() {
		add_to_inmail();
	};
	var people_results = get_people_results();
	for (var i = 0; i < people_results.length; i++) {
		var buttonDiv = people_results[i].querySelector('div.srp-actions.blue-button');
		buttonDiv.innerHTML += '<span class="inmail_checkbox_div"><input type="checkbox" checked class="inmail_checkbox"/> <span style="color: #0099cc">InMail</span></span>';
	}
	Array.prototype.slice.call(document.querySelectorAll("input.inmail_checkbox")).map(function(item) {
		item.onchange = function() {inmail_checkbox_change();};
	});
	inmail_checkbox_change();
}

function inmail_checkbox_change() {
	var number_of_contacts = document.querySelectorAll('input.inmail_checkbox:checked').length;
	document.querySelector('span#inmail_number_selected_value').innerHTML = number_of_contacts;
	if (number_of_contacts === 0) {
		get_add_to_inmail_button().disabled = true;
	} else {
		get_add_to_inmail_button().disabled = false;
	}
}

function add_to_inmail() {
	var people_results = get_people_results();
	var people = [];
	for (var i = 0; i < people_results.length; i++) {
		var checkbox = people_results[i].querySelector("input.inmail_checkbox");
		if (checkbox && checkbox.checked) {
			var person = {
				'name': people_results[i].querySelector('a.title').text,
				'headline': people_results[i].querySelector('div.description').innerText,
				'img_url': people_results[i].querySelector('img.entity-img').src,
				'profile_url': people_results[i].querySelector('a.title').href
			}
			people.push(person);
			people_results[i].querySelector("span.inmail_checkbox_div").innerHTML = '<span style="color: #999;">Added to InMail</span>';
		}
	}
	chrome.runtime.sendMessage({'inmail_add_all': people});
	console.log("Sent to InMail: " + people);
	inmail_checkbox_change();
	showNotification();
}

function get_people_results() {
	return document.querySelectorAll('li.mod.result.people');
}

function get_add_to_inmail_button() {
	return document.querySelector("button#add_to_inmail_button");
}