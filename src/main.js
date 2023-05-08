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
  <header class="quote-section" id="quote-section">
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
    <div class="weather__location"><h3 id="location"></h3></div>
  </section>

  <button class="btn">
      <p>More</p> 
      <div class="arrow-icon" id="more-less">
        <img id="icon-down" class="arrow-down" src="assets/desktop/icon-arrow-down.svg" alt="" width="12px" height="6px"/>
        <img  id="icon-up" class="arrow-up" src="assets/desktop/icon-arrow-up.svg" alt="" width="12px" height="6px"/>
      </div>
</button>
</main>
<section class="hidden more__info" id="more__info">
  <div class="time-year vertical-border">
    <div>
      <h6>Current timezone</h6>
      <h2 id="timezone">Europe/London</h2>
    </div>
    <div class="year-days">
      <h6>Day of the year</h6>
      <h2 id="day-of-year">295</h2>
    </div>
  </div>
  
  <div class="time-year pl-9">
    <div>
      <h6>Day of the week</h6>
      <h2 id="day-of-week">5</h2>
    </div>
    <div>
      <h6>Week number</h6>
      <h2 id="week-number">42</h2>
    </div>
  </div>
</section>
`
}

renderMainPage();

const moreInfoSection = document.getElementById('more__info');


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


// event listener to get new random quote
document.getElementById('refresh').addEventListener('click', () => {
    awaitQuotePromise().catch((e) => console.error('Error on import file: ',e));
});

document.getElementById('more-less').addEventListener('click', () => {
    // hide/show the header section and the more info section
    const quoteSection = document.getElementById('quote-section');
    const arrowUp = document.getElementById('icon-up')
    const arrowDown = document.getElementById('icon-down')
    const arrow = document.getElementById('more-less');

    quoteSection.classList.toggle('hidden');

    if (quoteSection.classList.contains('hidden'))
    {
       arrowDown.style.display = 'none';
       arrowUp.style.display = 'block'
        moreInfoSection.classList.remove('hidden');
    }

    if(!quoteSection.classList.contains('hidden'))
    {
        arrowDown.style.display = 'block';
        arrowUp.style.display = 'none'
        moreInfoSection.classList.add('hidden');
    }

})

