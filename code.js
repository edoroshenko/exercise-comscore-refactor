/**
 * Renders data into element by selector. Deprecated
 * @param String selector
 * @param Object data
 */
function calculatevalueandaddtohtmlobject(selector, data) {
	// a is a parent container that will serve to hold the calculated value

	// b holds the parameters for the calculation.
	// The parameters are objects that have type, value, name, enum values.
	// The parameter type can be CSV_2_TO_10, CSV_2_TO_INF, CSV_1_TO_INF, ENUM, BOOLEAN and COUNTRY

	renderFormattedTo(data.parameters, selector);
};

/**
 * Renders data into element by selector
 * @param Object parameters
 * @param String selector
 */
function renderFormattedTo(parameters, selector) {
	var tBody = document.querySelector(selector);
	var frag  = document.createDocumentFragment().appendChild(tBody.cloneNode(false));

	while (tBody.firstChild) {
		tBody.removeChild(tBody.firstChild);
	}
	var parameter;
	var value;
	var i;
	for (i = 0; i < parameters.length; i++) {
		parameter = parameters[i];
		value = getValueFormated(parameter);
		frag.appendChild(
			ample.query("<tr/>")
				.append(ample.query("<td/>").text((parameter.name || "").htmlSpecialChars()))
				.append(ample.query("<td/>").text((value || "").htmlSpecialChars()))[0]
		);
	};

	tBody.parentNode.replaceChild(frag, tBody);
};

/**
 * Returns formatted value
 * @param Object parameter
 */
function getValueFormated(parameter) {
	var value = parameter.value;
	var csv = parameter.type == "CSV_2_TO_10" || parameter.type == "CSV_2_TO_INF" || parameter.type == "CSV_1_TO_INF";
	if (csv) {
		var chunks = value.split(",");
		var chunk;
		var i;
		for (i = 0, len = chunks.length; i < len; i++) {
			chunk = chunks[i];
			if (chunk.length > 50) {
				var wrapperText;
				var j;
				for (j = 0; j < chunk.length; j += 5) {
					// save this line after the operator
					wrapperText += chunk.substring(j, j + 5) + "\u200B";
				}
				chunk = wrapperText;
			}
		}
		value = chunks.join(", ");
	}
	if (parameter.type == "ENUM") {
		if (parameter.enumValues[parameter.value - 1]) {
			value = parameter.enumValues[parameter.value - 1].displayName;
		} else {
			value = "";
		}
	} else if (parameter.type == "COUNTRY") {
		value = getCountryDisplayNameByCode(parameter.value) || "";
	} else if (parameter.type == "BOOLEAN") {
		value = (parameter.value && (parameter.value != "0") ? "%STATICTEXT_YES%" : "%STATICTEXT_NO%");
	}

	return value;
}