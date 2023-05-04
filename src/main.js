import './css/reset.css'
import './css/main.css'

import {getQuoteAndAuthor, getWeatherIcon, getWorldTime} from "./services/api.js";
import {renderQuote, renderTimeFields} from "./services/util.js";



function renderMainPage(){

    document.querySelector('#app').innerHTML = `
  <header class="quote-section">
  <div class="quote__text" id="quote">quote</div>
  <div class="quote__author" id="author">author</div>
</header>
<main>
  <section class="weather-section">
    <div class="weather__current" id="greeting">
       
      <p>where, it's currently </p></div>
    <div class="weather__hour" id="clock"><p> 12:30 utc</p></div>
    <div class="weather__location"><p>in London, UK.</p></div>
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

async function awaitWeatherIconPromise(){
    const iconUrl = await getWeatherIcon();

    if (iconUrl == null){
        console.error('Icon undefined')
    }

    document.getElementById('greeting').innerHTML += `<img src='${iconUrl}' width="60px" />`
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
    awaitPromise().catch((e) => console.error('Error on import file: ',e));
    awaitWeatherIconPromise().catch((e)=> console.error('Error on import file,', e))
    awaitTimePromise().catch((e)=> console.error('Error on import file: ', e))

})



