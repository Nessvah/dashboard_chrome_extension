import './css/reset.css'
import './css/main.css'

import {getGeoLocation, getQuoteAndAuthor, getWorldTime} from "./services/api.js";
import {
    renderQuote,
    renderPlaceField,
    renderTimeFields,
} from "./services/util.js";



function renderMainPage(){

    document.querySelector('#app').innerHTML = `
  <header class="quote-section">
      <div class="quote-content">
         <h5 id="quote"></h5>
        <h5 id="author"></h5>
    </div>
    <button id="refresh" class="refresh-btn">
        <img src="assets/desktop/icon-refresh.svg" alt="" width="18" height="18"/>
    </button>
</header>
<main>
  <section class="weather-section">
    <div class="weather__current">
        <div class="icon" id="icon"></div>
        <div id="greeting"></div>
     </div>
    <div class="weather__hour" id="clock"></div>
    <div class="weather__location"><h3 id="location">in London, UK.</h3></div>
  </section>

  <button id="btn-more" class="btn">
      <p>More</p> 
      <div class="arrow-icon">
        <img src="assets/desktop/icon-arrow-down.svg" alt="" width="12px" height="6px"/>
      </div>
</button>
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

async function awaitQuotePromise(){
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


async function awaitTimePromise(){
    const time = await getWorldTime();

    if(time.abbr === null){
        console.log('Undefined fields');
    } else {
        const { abbr, hour, minute, dow, doy, timezone, weekNum } = time;
        renderTimeFields(abbr, hour, minute, dow, doy, timezone, weekNum);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    awaitQuotePromise().catch((e) => console.error('Error on import file: ',e));
    awaitTimePromise().catch((e)=> console.error('Error on import file: ', e));
    awaitGeoLocationPromise().catch((e) => console.error('Error on import file: ', e))
    // reRenderTimeFieldsEveryMin(renderTimeFields); - can't make calls to the api every minute
})





