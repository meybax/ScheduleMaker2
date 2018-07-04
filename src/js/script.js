function loadToDoList(type) { localStorage.setItem("list-type", type); }

function changeTemplateName(nameInput, listItem) {
    $(".alert").alert('close');
    if (nameInput.value != "") {
        var templateNames = JSON.parse(localStorage.getItem("template-names"));
        for (var i = 0; i < templateNames.length; i++) {
            if (nameInput.value == templateNames[i]) {
                raiseTemplateAlert(nameInput, listItem);
                return;
            }
        }
        var temp = listItem.id;
        listItem.id = "templateID-" + nameInput.value;
        moveTemplateData(temp, listItem.id);
        return temp;
    } else nameInput.value = listItem.id.substring(11);
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
    if (localStorage.getItem("store-start-"+prev)) {
        localStorage.setItem("store-start-"+curr, localStorage.getItem("store-start-"+prev));
        localStorage.setItem("store-name-"+curr, localStorage.getItem("store-name-"+prev));
        removeTemplateData("store-start-"+prev);
        removeTemplateData("store-name-"+prev);

    }
}
function removeTemplateData(id) {
    if (localStorage.getItem("store-start-"+id)) {
        localStorage.removeItem("store-start-"+id);
        localStorage.removeItem("store-name-"+id);
    }
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