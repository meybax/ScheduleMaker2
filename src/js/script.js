function loadToDoList(type) { localStorage.setItem("list-type", type); }

function changeTemplateName(nameInput, listItem) {
    $(".alert").alert('close');
    if (nameInput.value != "") {
        var templateNames = JSON.parse(localStorage.getItem("template-names"));
        for (var i = 0; i < templateNames[i]; i++) {
            if (nameInput.value == templateNames[i]) {
                raiseTemplateAlert(nameInput, listItem);
                return;
            }
        }
        var temp = listItem.id;
        listItem.id = "templateID-" + nameInput.value;
        moveTemplateData(temp, listItem.id);
    }
}
function raiseTemplateAlert(nameInput, listItem) {
    var prev = listItem.id.substring(11);
    if (nameInput.value != prev) {
        nameInput.value = prev;
        var alert = document.createElement("DIV");
        alert.style = "text-align: center; margin-bottom: 0px";
        alert.classList.add("alert", "alert-danger", "alert-dismissible", "show")
        alert.setAttribute("role", "alert");
        alert.innerHTML = "<strong>Name already exists</strong>. Please use a new name." +
            "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
                "<span aria-hidden=\"true\">&times;</span>" +
            "</button>";
        $(listItem).after(alert);  
    }
}
function moveTemplateData(prev, curr) {

}
// function updateTemplateNames(prev, curr) {
//     var names = JSON.parse(localStorage.getItem("template-names"));
//     names[getIndex(prev.substring(11), names)] = curr.substring(11);
//     localStorage.setItem("template-names", JSON.stringify(names));
// }

function inputValueArray(list, inputClass) {
    var a = [];
    var inputs = list.getElementsByClassName(inputClass);
    for (var i = 0; i < inputs.length; i++) { a.push(inputs[i].value); }
    return a;
}

// function to return the index value of a child node
function getIndex(node, list) {
    for (i = 0; i < list.length; i++) { if (node == list[i]) break; }
    return i;
}

// function to return the last element of a list with shorter syntax
function last(list) {
    return list[list.length-1];
}

// function to retrieve the input element with shorter syntax
function getInput(listItem, className) { return listItem.getElementsByClassName(className)[0]; }