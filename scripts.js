document.addEventListener('DOMContentLoaded', () => {
    const fetchAllButton = document.getElementById('fetchAll');
    const filterForm = document.getElementById('filterForm');
    const resultsDiv = document.getElementById('results');

    const apiURL = 'https://rickandmortyapi.com/api/character/';

    // Function to fetch all characters
    fetchAllButton.addEventListener('click', async () => {
        try {
            const response = await fetch(apiURL);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            displayCharacters(data.results);
        } catch (error) {
            displayError(error);
        }
    });

    // Function to fetch characters with filters
    filterForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(filterForm);
        const query = new URLSearchParams(formData).toString();
        try {
            const response = await fetch(`${apiURL}?${query}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            displayCharacters(data.results);
        } catch (error) {
            displayError(error);
        }
    });

    // Function to display characters
    function displayCharacters(characters) {
        resultsDiv.innerHTML = '';
        characters.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.className = 'character';
            characterDiv.innerHTML = `
                <h3>${character.name}</h3>
                <p>Status: ${character.status}</p>
                <p>Species: ${character.species}</p>
                <p>Type: ${character.type}</p>
                <p>Gender: ${character.gender}</p>
                <img src="${character.image}" alt="${character.name}">
            `;
            resultsDiv.appendChild(characterDiv);
        });
    }

    // Function to display error messages
    function displayError(error) {
        resultsDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
});
