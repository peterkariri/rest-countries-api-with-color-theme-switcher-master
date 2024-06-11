
document.addEventListener('DOMContentLoaded', () => {
    let searchButton = document.getElementById("search-btn");
    let searchInput = document.getElementById('search');
    let countriesContainer = document.querySelector('.countries');
    let countriesData = [];
  
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        countriesData = data; // Save the data to a global variable
        const initialCountries = data.slice(0, 12); // Display only 12 countries initially
        renderCountries(initialCountries);
      })
      .catch(error => console.log('Error:', error));
  
    searchButton.addEventListener("click", () => {
      let countryName = searchInput.value.toLowerCase();
      const filteredCountries = countriesData.filter(country => country.name.toLowerCase().includes(countryName));
      renderCountries(filteredCountries);
    });
  
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredCountries = countriesData.filter(country => country.name.toLowerCase().includes(searchTerm));
      renderCountries(filteredCountries);
    });
  
    function renderCountries(countries) {
      countriesContainer.innerHTML = '';
      countries.forEach(country => {
        const countryHTML = `
          <div class="country">
            <img src="${country.flag}" alt="${country.name}">
            <h1>${country.name}</h1>
            <span>Population: ${country.population.toLocaleString()}</span>
            <span>Region: ${country.region}</span>
            <span>Capital: ${country.capital}</span>
          </div>
        `;
        countriesContainer.innerHTML += countryHTML;
      });
  
      if (countries.length === 1) {
        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.style.color="red"
        backButton.addEventListener('click', () => {
          renderCountries(countriesData.slice(0, 12));
        });
        countriesContainer.appendChild(backButton);
      }
    }
  });

  