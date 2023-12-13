const form = document.querySelector(".contactForm");
let success;

form.addEventListener("submit", submitHandler);

function submitHandler(event) {
    event.preventDefault();
    success = true;

    const formData = {}; 

    Array.from(event.target.elements).forEach((field) => {
        if (field.type !== "submit") {
            formData[field.name] = field.value;
        }
    });

    Array.from(event.target.elements).forEach(validate);

    if (success) {
        document.getElementById("successPopup").style.display = "block";

        updatePopupContent(formData);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function updatePopupContent(formData) {
    const formDataContainer = document.getElementById("formDataContainer");

    formDataContainer.innerHTML = "";

    for (const [key, value] of Object.entries(formData)) {
        const dataItem = document.createElement("p");

        dataItem.innerHTML = `${capitalizeFirstLetter(key)}: `;

        const userInputSpan = document.createElement("span");
        userInputSpan.textContent = value;

        dataItem.appendChild(userInputSpan);

        formDataContainer.appendChild(dataItem);
    }
}

document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("successPopup").style.display = "none";
});

function validate(field) {
    if (field.nodeName === "BUTTON") return; // guard clause

    const statusMessage = field.nextElementSibling;

    statusMessage.textContent = "";

    if (field.required && !field.value) {
        statusMessage.textContent = "Feltet må ikke være tomt!";
        statusMessage.classList.add("error");
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
			field.nextElementSibling.textContent = field.dataset.errormsg
			success = false
		}
	}

	if (field.type === "textarea") {
		if (field.value.length < 15
			|| field.value.length > 300) {
                field.nextElementSibling.textContent = field.dataset.errormsg
				success = false
			}
	}
	
}


const textarea = document.querySelector('textarea');
const statusMessage = document.querySelector('.textarea-field .statusMessage');

textarea.addEventListener('input', () => {
    statusMessage.textContent = `${textarea.value.length} characters`;
});

