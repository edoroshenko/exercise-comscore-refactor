function calculatevalueandaddtohtmlobject (a, b, c) {
	// a is a parent container that will serve to hold the calculated value
	var tBody = this.domElement.querySelector(a);
	var frag = document.createDocumentFragment().appendChild(tBody.cloneNode(false));

	while(tBody.firstChild) {
		tBody.removeChild(tBody.firstChild);
	}

	// b holds the parameters for the calculation. The parameters
	// are objects that have type, value, name, enum values
	// the parameter type can be CSV_2_TO_10, CSV_2_TO_INF, CSV_1_TO_INF
	// ENUM, BOOLEAN and COUNTRY
	var parameters = b.parameters;
	for(var i = 0, parameter; parameter = parameters[i++];) {
		var value = parameter.value;
		var csv = parameter.type == "CSV_2_TO_10" || parameter.type == "CSV_2_TO_INF" || parameter.type == "CSV_1_TO_INF";
		if (csv) {
			var chunks = value.split(",");
			for (var i=0, len=chunks.length, chunk; i < len; i++) {
				chunk = chunks[i];
				if (chunk.length > 50) {
					if (text.length > 5) {
						for (var j=0, len= chunk.length; j <= len; j += 5) {
							wrapperText += chunk.substring(j, j + 5) + "\u200B";
						}
					} else {
					wrapperText = chunk;
					}
				}
			}
			value = chunks.join(", ");
		}
		if(parameter.type == "ENUM") {
			if(parameter.enumValues[parameter.value-1]){
				value = parameter.enumValues[parameter.value-1].displayName;
			} else {
				value = "";
			} 
		} else if(parameter.type == "COUNTRY") {
			value = getCountryDisplayNameByCode(parameter.value) || "";
		} else if(parameter.type == "BOOLEAN") {
			value = (parameter.value && (parameter.value != "0") ? "%STATICTEXT_YES%" : "%STATICTEXT_NO%");
		}

		frag.appendChild(ample.query("<tr/>").append(ample.query("<td/>").text((parameter.name || "").htmlSpecialChars())).append(ample.query("<td/>").text((value || "").htmlSpecialChars()))[0]);
	};

	tBody.parentNode.replaceChild(frag, tBody);
};