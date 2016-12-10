
var people_results = get_people_results();

for (var i = 0; i < people_results.length; i++)
{
    var buttonDiv = people_results[i].querySelector('div.srp-actions.blue-button');
    var btn = document.createElement("BUTTON");        // Create a <button> element
    var t = document.createTextNode("+SendX");       // Create a text node
    btn.appendChild(t);                                // Append the text to <button>
    document.div.srp-actions.blue-button.appendChild(btn);                    // Append <button> to <body>
}
function sendx_button_change() {
    alert("Game Wars");
}
function get_people_results() {
    return document.querySelectorAll('li.mod.result.people');
}
**************************************
for(i=0;i<11;i++)

people_results = get_people_results();
for(var j=0;j < people_results.length; j++)
{
    document.getElementById("sendx-button").addEventListener("click", sendx_button_change);

}

********************************

linkedin_search_render();
function linkedin_search_render()
{
    var people_results = get_people_results();
    for (var i = 0; i < people_results.length; i++) {
        var buttonDiv = people_results[i].querySelector('div.srp-actions.blue-button');
        buttonDiv.innerHTML += '<style>#sendx-button{padding-right:1.8px;padding-left:1.8px;}</style><br><br>' +
            '<span class="primary-action-button label">' +
            '<input id="sendx-button" type="button" value="+SendX" checked class="primary-action-button label hover"/>' +
            '<span style="color: #0099cc"></span></span>';
    }

    Array.prototype.slice.call(document.querySelectorAll("input.sendx-button")).map(function (item) {
        item.onchange = function () {
            sendx_button_change();
        };
    });
}
function sendx_button_change() {
    alert("Game Wars");
}
function get_people_results() {
    return document.querySelectorAll('li.mod.result.people');
}

*****************************************************

document.head.appendChild(document.createElement('script').text = 'function sendx_button_change() {alert("Game Wars");}' );
**************************************************************
<style>#sendx-button{padding-right:1.8px;padding-left:1.8px;}</style>
    ******************************


// var people_results = get_people_results();
//
// linkedin_search_render();
// function linkedin_search_render()   {
//     for (var i = 0; i < people_results.length; i++) {
//         var buttonDiv = people_results[i].querySelector('div.srp-actions.blue-button');
//         buttonDiv.innerHTML += '<span class="inmail_checkbox_div"><button id="sendx-button" value="+SendX" checked class="primary-action-button label hover"></button></span>';
//         document.getElementById("sendx-button").addEventListener("click", function(){alert("Hello World!");});
//     }
// }



// people_results = get_people_results();
// for(var j=0;j<people_results.length;j++){
//     var mark=document.getElementsByTagName("data-li-position").length;
//     if(mark==(j+1))
//     {
//         document.getElementsById("sendx-button").addEventListener("click", sendx_button_change)
//     }
// }
//