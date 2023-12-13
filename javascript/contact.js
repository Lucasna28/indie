const form = document.querySelector(".contactForm");
let success;

form.addEventListener("submit", submitHandler);

function submitHandler(event) {
    event.preventDefault();
    success = true;

    const formData = {}; // Object to store form data

    // Capture form data
    Array.from(event.target.elements).forEach((field) => {
        if (field.type !== "submit") {
            formData[field.name] = field.value;
        }
    });

    Array.from(event.target.elements).forEach(validate);

    if (success) {
        // Show the success popup
        document.getElementById("successPopup").style.display = "block";

        // Update the content of the popup with form data
        updatePopupContent(formData);
    }
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Inside the updatePopupContent function
function updatePopupContent(formData) {
    const formDataContainer = document.getElementById("formDataContainer");

    // Clear previous content
    formDataContainer.innerHTML = "";

    // Display form data in the popup
    for (const [key, value] of Object.entries(formData)) {
        const dataItem = document.createElement("p");

        // Capitalize the first letter of the key and append to the <p> element
        dataItem.innerHTML = `${capitalizeFirstLetter(key)}: `;

        // Create a span for the user input
        const userInputSpan = document.createElement("span");
        userInputSpan.textContent = value;

        // Append the user input span to the <p> element
        dataItem.appendChild(userInputSpan);

        // Append the <p> element to the container
        formDataContainer.appendChild(dataItem);
    }
}

// Add an event listener to close the popup when the "Close" button is clicked
document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("successPopup").style.display = "none";
});

// Update the validate function to use the statusMessage class and add different classes for different messages
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

