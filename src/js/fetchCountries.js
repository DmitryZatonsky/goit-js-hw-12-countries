export default function fetchCountries(evt) {

  const searchQuery = evt.target.value;
  
  return fetch(`https://restcountries.com/v2/name/${searchQuery}`)
    .then(response => {
      return response.json()
    })
  
}