import './css/reset.css'
import './css/main.css'

import {getQuoteAndAuthor} from "./services/api.js";


document.querySelector('#app').innerHTML = `
  <header id="quote" class="quote-section">
  <div class="quote__text"> Quote goes here </div>
  <div class="quote__author">Author goes here </div>
</header>
<main>
  <section class="weather-section">
    <div class="weather__current">
      <p> Sunny, where, it's currently </p></div>
    <div class="weather__hour"><p> 12:30 utc</p></div>
    <div class="weather__location"><p>in London, UK.</p></div>
  </section>

  <button id="btn-more" class="btn">More</button>
</main>
<section class="hidden" id="more__info">
  <div class="time-year">
    <div class="timezone">
      <p>Current timezone</p>
      <p>Europe/London</p>
    </div>
    <div class="year-days">
      <p>Day of the year</p>
      <p>295</p>
    </div>
  </div>
  <div>
    <div>
      <p>Day of the week</p>
      <p>5</p>
    </div>
    <div>
      <p>Week number</p>
      <p>42</p>
    </div>
  </div>
</section>
`

// call the getQuoteAndAuthor function and store the value into a variable
const { quoteText, quoteAuthor } = await getQuoteAndAuthor();

console.log(quoteText, quoteAuthor)