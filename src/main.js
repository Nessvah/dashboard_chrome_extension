import './css/reset.css'
import './css/main.css'

import {getGeoLocation, getQuoteAndAuthor, getWorldTime} from "./services/api.js";
import {
    renderQuote,
    runRenderTimeFieldsEveryMin,
    renderPlaceField,
    renderTimeFields,
    awaitTimePromise
} from "./services/util.js";



function renderMainPage(){

    document.querySelector('#app').innerHTML = `
  <header class="quote-section">
      <div class="quote_content">
         <p id="quote"></p>
        <h4 id="author"></h4>
    </div>
    <button id="refresh" class="refresh-btn">
        <img src="assets/desktop/icon-refresh.svg" alt="" width="18" height="18"/>
    </button>
</header>
<main>
  <section class="weather-section">
    <div class="weather__current">
        <div id="icon"></div>
        <div id="greeting"></div>
     </div>
    <div class="weather__hour" id="clock"><p> 12:30 utc</p></div>
    <div class="weather__location"><p id="location">in London, UK.</p></div>
  </section>

  <button id="btn-more" class="btn">More</button>
</main>
<section class="hidden" id="more__info">
  <div class="time-year">
    <div class="timezone">
      <p>Current timezone</p>
      <p id="timezone">Europe/London</p>
    </div>
    <div class="year-days">
      <p>Day of the year</p>
      <p id="day-of-year">295</p>
    </div>
  </div>
  <div>
    <div>
      <p>Day of the week</p>
      <p id="day-of-week">5</p>
    </div>
    <div>
      <p>Week number</p>
      <p id="week-number">42</p>
    </div>
  </div>
</section>
`
}

renderMainPage();


// we need to wait for the promise to resolve before proceeding
// and handle any errors or null values that might arise

async function awaitPromise(){
    const quote = await getQuoteAndAuthor();

    if (quote.quoteAuthor === null || quote.quoteText === null)  {
        console.log("Fields undefined/null")
    } else {
        const { quoteAuthor, quoteText } = quote
        renderQuote(quoteText, quoteAuthor);
    }
}



async function awaitGeoLocationPromise(){
    const place = await getGeoLocation();

    if (place.country === null || place.city === null){
        throw new Error('Null values')

    } else {
        const { city, country } = place;
        renderPlaceField(city, country);
    }

}


document.addEventListener('DOMContentLoaded', () => {
    awaitPromise().catch((e) => console.error('Error on import file: ',e));
    awaitTimePromise().catch((e)=> console.error('Error on import file: ', e));
    runRenderTimeFieldsEveryMin(renderTimeFields);
})





