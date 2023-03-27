import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';


const DEBOUNCE_DELAY = 300;

 const input = document.querySelector('#search-box');
 const countryInfo = document.querySelector('.country-info');
 const countryList = document.querySelector('.country-list');

 
 const cleanMarkup = ref => (ref.innerHTML = '');
 
 
 
 const onSourch = e => {
  e.preventDefault();
    const textInput = e.target.value.trim();
  
    if (!textInput) {
      cleanMarkup(countryList);
      cleanMarkup(countryInfo);
      return
    }
  
    fetchCountries(textInput)
      .then(data => {
        console.log(data);
        if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name'
          );
          return;
        }
        createResult(data);
      })
      .catch(error => {
        cleanMarkup(countryList);
        cleanMarkup(countryInfo);
        Notify.failure('Oops, there is no country with that name');
      });
  };

const creatList = country => {
    return country
      .map(
        ({ name, flags }) =>
          `<li class="link"><img src="${flags.png}" alt="${name.official}" width="60" height="40"> <p class = "list-name";>${name.official}</p></li>`
      )
      .join('');
  };

const creatInfo = country => {
    return country.map(
      ({ name, capital, population, flags, languages }) =>
        ` <div class="cauntry-items">  <img src="${flags.png}" alt="${name.official}" width="200" height="100">
        <h1>${name.official}</h1>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages)}</p></div>`
    );
  };

const createResult = country => {
    if (country.length === 1) {
        cleanMarkup(countryList);
      countryInfo.innerHTML = creatInfo(country);
    } else {
        cleanMarkup(countryInfo);
      countryList.innerHTML = creatList(country);
    }
  };



 input.addEventListener('input', debounce(onSourch, DEBOUNCE_DELAY ));



