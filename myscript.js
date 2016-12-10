if (!window.inmail) {
    window.inmail = true;
    linkedin_search_render();
    window.setInterval(periodical_check, 3000);
}
function periodical_check() {
    if (!document.querySelector("#sendx-button")) {
        linkedin_search_render();
    }
}
function linkedin_search_render() {
    var newline = document.querySelectorAll('div.secondary-actions-trigger');
    newline.innerHTML+= '<br><br>';
    var p = document.querySelectorAll('div.srp-actions.blue-button');
    for (var i = 0; i < p.length; i++) {
        var DOMobject = document.createElement('BUTTON');
        DOMobject.setAttribute('ID', 'sendx-button');
        DOMobject.setAttribute('CLASS', 'primary-action-button label hover');
        DOMobject.setAttribute('VALUE', '+SendX');
        DOMobject.setAttribute('onclick', 'alert("aaid");');
        DOMobject.innerHTML = '+SendX';
        p[i].appendChild(DOMobject);
    }
}

var x = get_people_results();
console.log(x);

function get_people_results() {
    return document.querySelectorAll('li.mod.result.people');
}
