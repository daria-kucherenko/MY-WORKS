var $qs = function (selectorString) {
    return document.querySelector(selectorString);
}

var $attr = function (targetElement, attrString) {
    var attrValue = -1;
    for (var i = 0; i < targetElement.attributes.length; i++) {
        if (targetElement.attributes[i].name === attrString) {
            attrValue = targetElement.attributes[i].value;
            break;
        }
    }
    return attrValue;
}


