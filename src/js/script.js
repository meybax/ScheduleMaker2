// function to read name input for templates and change if valid
function changeTemplateName(nameInput, listItem) {
    $(".alert").alert("close");
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
// function to raise an alert if name input for a template is not valid
function raiseTemplateAlert(nameInput, listItem) {
    var prev = listItem.id.substring(11);
    if (nameInput.value != prev) {
        nameInput.value = prev;
        var alert = document.createElement("DIV");
        alert.style = "text-align: center; margin-bottom: 0px";
        alert.classList.add("alert", "alert-danger", "alert-dismissible", "show")
        alert.setAttribute("role", "alert");
        alert.innerHTML = "<strong>Name already exists.</strong> Please use a new name." +
            "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
                "<span aria-hidden=\"true\">&times;</span>" +
            "</button>";
        $(listItem).after(alert);  
    }
}
// function to move template data from one name to the other
function moveTemplateData(prev, curr) {
    if (localStorage.getItem("store-start-" + prev)) {
        localStorage.setItem("store-start-" + curr, localStorage.getItem("store-start-" + prev));
        localStorage.setItem("store-name-" + curr, localStorage.getItem("store-name-" + prev));
        removeTemplateData("store-start-" + prev);
        removeTemplateData("store-name-" + prev);

    }
}
// function to delete the data assigned to a template name
function removeTemplateData(id) {
    if (localStorage.getItem("store-start-" + id)) {
        localStorage.removeItem("store-start-" + id);
        localStorage.removeItem("store-name-" + id);
    }
}

// function to return the index value of a child node
function getIndex(node, list) {
    for (i = 0; i < list.length; i++) { 
        if (node === list[i]) {
            break; 
        }
    }
    return i;
}

// function to return the last element of a list with shorter syntax
function last(list) {
    return list[list.length-1];
}

// function to retrieve the input element with shorter syntax
function getInput(listItem, className) { 
    return listItem.getElementsByClassName(className)[0]; 
}

// function to retrieve input values
function inputValueArray(list, inputClass) {
    var a = [];
    var inputs = list.getElementsByClassName(inputClass);
    for (var i = 0; i < inputs.length; i++) { 
        a.push(inputs[i].value); 
    }
    return a;
}

// function to convert duration time input to string
function durationNumToStr(hr, min) {
    var time;
    hr = parseInt(hr);
    min = parseInt(min);
    if (hr == 0) {
        time = min + " min";
    }
    else if (min == 0) {
        time = hr + " hr";
    }
    else {
        time = hr + " hr " + min + " min";
    }
    return time;
}
// function to convert string to time input
function durationStrToNum(str) {
    str = str.replace(/\s+/g, '');
    var hr = "00";
    var min = "00";
    if (str.length == 3) {
        if (str.substring(1, 3) === "hr") {
            // single hr ---
            hr = parseInt(str.substring(0, 1));
            if (isNaN(hr)) {
                return false;
            }
        } else {
            return false;
        }
    } else if (str.length == 4) {
        if (str.substring(2, 4) === "hr") {
            // double hr ---
            hr = parseInt(str.substring(0, 2));
            if (isNaN(hr)) {
                return false;
            }
        } else if (str.substring(1, 4) === "min") {
            // single min ---
            min = parseInt(str.substring(0, 1));
            if (isNaN(min)) {
                return false;
            }
        } else {
            return false;
        }
    } else if (str.length == 5) {
        if (str.substring(2, 5) === "min") {
            // double min ---
            min = parseInt(str.substring(0, 2));
            if (isNaN(min)) {
                return false;
            }
        } else {
            return false;
        }
    } else if (str.length == 7) {
        if (str.substring(1, 3) === "hr" && str.substring(4, 7) === "min") {
            // single hr single min ---
            hr = parseInt(str.substring(0, 1));
            min = parseInt(str.substring(3, 4));
            if (isNaN(hr) || isNaN(min)) {
                return false;
            }
        } else {
            return false;
        }
    } else if (str.length == 8) {
        if (str.substring(5, 8) === "min") {
            if (str.substring(1, 3) === "hr") {
                // single hr double min ---
                hr = parseInt(str.substring(0, 1));
                min = parseInt(str.substring(3, 5));
                if (isNaN(hr) || isNaN(min)) {
                    return false;
                }
            } else if (str.substring(2, 4) === "hr") {
                // double hr single min ---
                hr = parseInt(str.substring(0, 2));
                min = parseInt(str.substring(4, 5));
                if (isNaN(hr) || isNaN(min)) {
                    return false;
                }
            }
        } else {
            return false;
        }
    } else if (str.length == 9) {
        if (str.substring(2, 4) === "hr" && str.substring(6, 9) === "min") {
            // double hr double min ---
            hr = parseInt(str.substring(0, 2));
            min = parseInt(str.substring(4, 6));
            if (isNaN(hr) || isNaN(min)) {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
    return getClockTime(hr, min);
}

// function to check if an input value is a valid time
function isValidTimeInput(input) {
    if (!input.value) {
        return false;
    }
    if (input.value.length != 5) { 
        if (input.value.length == 4) {
            input.value = "0" + input.value;
        }
        else {
            return false; 
        }
    }
    if (input.value[2] != ":") {
        return false;
    }
    hrInput = input.value.substring(0, 2);
    minInput = input.value.substring(3, 5);
    if (isNaN(hrInput) || isNaN(minInput)) {
        return false;
    }
    if (hrInput < 0 || hrInput > 23 || minInput < 0 || minInput > 59) {
        return false;
    }
    return true;
}
