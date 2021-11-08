import './sass/main.scss';
import { debounce } from 'lodash';
import nameCountryTpl from './templates/nameCountry.hbs'
import cardCountryTpl from './templates/cardCountry.hbs'
import fetchCountry from './js/fetchCountries.js';

const countryCardContainer = document.querySelector('.country');
const searchCountry = document.querySelector('#input');

searchCountry.addEventListener('input', debounce(onSerchCountry, 500))

function onSerchCountry(event) {
  fetchCountry(event)
    .then((data) => {
      countryCardContainer.innerHTML = '';
      if (data.length === 1) {
        return countryCardContainer.insertAdjacentHTML('beforeend', cardCountryTpl(data[0]))
      } if (data.length < 11) {
        return countryCardContainer.insertAdjacentHTML('beforeend', nameCountryTpl(data))
      } if (data.length > 10) {
        return console.log('Перебор!!!');
      }
    })
};

