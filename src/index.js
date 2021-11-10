import './sass/main.scss';
import { debounce } from 'lodash';
import nameCountryTpl from './templates/nameCountry.hbs'
import cardCountryTpl from './templates/cardCountry.hbs'
import fetchCountry from './js/fetchCountries.js';
import { error, alert, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const countryCardContainer = document.querySelector('.country');
const searchCountry = document.querySelector('#input');

searchCountry.addEventListener('input', debounce(onSerchCountry, 500))

const myStack = new Stack({
  dir1: 'up',
});

function onSerchCountry(event) {
  fetchCountry(event)
    .then((data) => {
      countryCardContainer.innerHTML = '';
      if (data.length === 1) {
        return countryCardContainer.insertAdjacentHTML('beforeend', cardCountryTpl(data[0]))
      } if (data.length < 11) {
        return countryCardContainer.insertAdjacentHTML('beforeend', nameCountryTpl(data))
      } if (data.length > 10 || data.length < 1) {
        return onAlert();
      }
    })
    .catch(onError)
};

function onAlert() {
  alert({
          title: 'Attention!',
          text: 'Маловато символов!',
          stack: myStack
        });
}

function onError() {
  error({
        title: 'Error!!!',
        text: 'Давай по новой',
        stack: myStack,
      })
}