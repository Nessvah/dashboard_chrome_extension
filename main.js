import './src/css/reset.css'
import './src/css/main.css'



import {getGeoLocation, getQuoteAndAuthor, getWorldTime} from "./src/services/api.js";
import {
    renderQuote,
    renderPlaceField,
    renderTimeFields,
} from "./src/services/util.js";



function renderMainPage(){

    document.querySelector('#app').innerHTML = `
  <header class="quote-section" id="quote-section">
      <div class="quote-content">
         <h5 id="quote"></h5>
        <h5 id="author"></h5>
    </div>
    <button id="refresh" class="refresh-btn" aria-label="refresh">
        <img src="/desktop/icon-refresh.svg" alt="" width="18" height="18"/>
    </button>
</header>
<main>
  <section class="weather-section">
  <div class="weather__col">
   <div class="weather__current">
        <div class="icon" id="icon"></div>
        <div id="greeting"></div>
     </div>
    <div class="weather__hour" id="clock"></div>
    <div class="weather__location"><h3 id="location"></h3></div>
</div>
      <div class="btn">
          <span id="more-less">More</span> 
          <div class="arrow-icon" id="arrow-icon">
            <img id="icon-down" class="arrow-down" src="/desktop/icon-arrow-down.svg" alt="" width="12p" height="6"/>
            <img  id="icon-up" class="arrow-up" src="/desktop/icon-arrow-up.svg" alt="" width="12" height="6"/>
          </div>
      </div>
  </section>
</main>

 <footer><p>2023 &copy; Developed by <a href="https://github.com/Nessvah">Sílvia Vanessa</a></p>
 <p>Challenge from <a href="https://www.frontendmentor.io">Frontend Mentor</a></p></footer>
 
<section class="hidden more__info" id="more__info">
  <div class="time-year" id="time-container">
    <div class="individual">
      <h6>Current timezone</h6>
      <h2 id="timezone">Europe/London</h2>
    </div>
    <div class="year-days individual">
      <h6>Day of the year</h6>
      <h2 id="day-of-year">295</h2>
    </div>
  </div>
 
  <div class="time-year pl-9">
    <div class="individual">
      <h6>Day of the week</h6>
      <h2 id="day-of-week">5</h2>
    </div>
    <div class="individual">
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
        const { country, city } = place;
        renderPlaceField(country, city);
    }

}


async function awaitTimePromise(){
    const time = await getWorldTime();
    console.log(time)
    if(time.abbr === null){
        console.log('Undefined fields');
    } else {
        const { abbr, hour, minutes, dow, doy, timezone, weekNum } = time;

        renderTimeFields(abbr, hour, minutes, dow, doy, timezone, weekNum);
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

document.getElementById('arrow-icon').addEventListener('click', () => {
    // hide/show the header section and the more info section
    const quoteSection = document.getElementById('quote-section');
    const arrowUp = document.getElementById('icon-up')
    const arrowDown = document.getElementById('icon-down')
    const arrowText = document.getElementById('more-less')

    quoteSection.classList.toggle('hidden');

    if (quoteSection.classList.contains('hidden'))
    {
       arrowDown.style.display = 'none';
       arrowUp.style.display = 'block'
        moreInfoSection.classList.remove('hidden');
       arrowText.textContent = 'less'
    }

    if(!quoteSection.classList.contains('hidden'))
    {
        arrowDown.style.display = 'block';
        arrowUp.style.display = 'none'
        moreInfoSection.classList.add('hidden');
        arrowText.textContent = 'more'
    }

})


