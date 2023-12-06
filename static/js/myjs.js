document.addEventListener('DOMContentLoaded', function() {
    // Move the imageInput definition inside the function
    function addTrip() {
        const imageInput = document.getElementById('image'); // Define imageInput here

        // Get form values
        const location = document.getElementById('location').value;
        const date = document.getElementById('date').value;
        const memorableMoments = document.getElementById('memorableMoments').value;
        const section = document.getElementById('section').value;

        // Create a new entry
        const entry = document.createElement('div');
        entry.className = 'entry';

        // Create elements for the entry
        const image = document.createElement('img');

        // Check if an image is selected
        if (imageInput.files.length > 0) {
            const imageURL = URL.createObjectURL(imageInput.files[0]);
            image.src = imageURL;
        } else {
            // If no image is selected, use a default placeholder
            image.src = 'images/placeholder.png';
        }

        image.alt = 'New Trip';

        const heading = document.createElement('h2');
        heading.textContent = `${location}`;

        const dateParagraph = document.createElement('p');
        dateParagraph.textContent = `Date: ${date}`;

        const momentsParagraph = document.createElement('p');
        momentsParagraph.textContent = `${memorableMoments}`;

        // Append elements to the entry
        entry.appendChild(image);
        entry.appendChild(heading);
        entry.appendChild(dateParagraph);
        entry.appendChild(momentsParagraph);

        // Append the new entry to the selected section
        const targetSection = document.querySelector(`.${section}`);
        targetSection.appendChild(entry);

        // Clear the form
        document.getElementById('tripForm').reset();
    }

    // Attach the addTrip function to the button click event
    const addButton = document.querySelector('.add-trip button');

    if (addButton) {
        addButton.addEventListener('click', addTrip);
    }
});
