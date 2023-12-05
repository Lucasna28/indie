const form = document.querySelector(".contactForm");
let success;

form.addEventListener("submit", submitHandler);

function submitHandler(event) {
	event.preventDefault();
	success = true;

	Array.from(event.target.elements).forEach(validate);

	if (success) {
		event.target.submit();
	}
}

function validate(field) {
	if (field.nodeName === "BUTTON") return; // guard clause

	field.nextElementSibling.textContent = "";

	if (field.required && !field.value) {
		field.nextElementSibling.textContent = "Feltet må ikke være tomt!";
		success = false;
	}

	if (field.type === "text" && !field.value) {
		// input fejl
		field.nextElementSibling.textContent = field.dataset.errormsg;
		success = false;
	}

	if (field.type === "email") {
		const indexOfAt = field.value.indexOf("@")
		const indexOfDot = field.value.indexOf(".")

		if (indexOfAt === -1
				|| indexOfAt === 0
				|| indexOfAt === field.value.length - 1
				|| indexOfDot === -1
				|| indexOfDot === 0
				|| indexOfDot === field.value.length - 1
				|| indexOfDot < indexOfAt
				|| indexOfAt === indexOfDot - 1) {
			field.nextElementSibling.textContent = field.dataset.errormsg
			success = false
		}
	}

	if (field.type === "tel") {
		if (!/^\+?\d{8,}$/.test(field.value)) {
			field.nextElementSibling.textContent = "Du skal skrive et korrekt telefonnummer!"
			success = false
		}
	}

	if (field.type === "textarea") {
		if (field.value.length < 15
			|| field.value.length > 255) {
				field.nextElementSibling.textContent = "Din besked er dum!"
				success = false
			}
	}
}
