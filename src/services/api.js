import {extractHourAndMin} from "./util.js";


// API QUOTES (https://github.com/lukePeavey/quotable) //
////////////////////////////////////////////////////////

// Define the function to fecth quote and author
async function getQuoteAndAuthor(){
    try {
        const baseUrl = 'https://api.quotable.io/';
        const endpoint = 'random';


        // TODO: Get random quote
        // make GET request to the api to get the data
        const response = await fetch(baseUrl + endpoint)
        // handle if we get a response like 404
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // get the values
        const quoteText = data.content;
        // check for null values
        const quoteAuthor = data.author;

        // save it into an obj
        return {
            quoteText,
            quoteAuthor
        };
    }catch (error) {
        // handle errors
        console.error('Main error: ', error)
       return null
    }
}


// API WORLD TIME (http://worldtimeapi.org/) //
//////////////////////////////////////////////

// data needed from this api - datetime (hour , minutes), timezone, abbreviation, day of the year,
// day of the week, week number

async function getWorldTime(){
    try {
        const baseUrl = 'https://worldtimeapi.org/api';
        const endpoint = '/ip';

        const response = await fetch(baseUrl + endpoint);

        // handle error status
        if (!response.ok){
            throw new Error("Network response is not ok");
        }
        const data = await response.json();

        // get the needed values
        /*
        const abbreviation = data.abbreviation;
        const dateString = data.datetime;
        const dayOfWeek = data.day_of_week
        const dayOfYear = data.day_of_year
        ... */

        // lets use destructuring
        const { abbreviation: abbr, datetime: dateString, day_of_week: dow, day_of_year: doy, timezone: timezone,
            week_number: weekNum } = data;

        // TODO: instead of days of the week in numbers, translate into monday ....

        // separate the dateString into hours and minutes
        const time = extractHourAndMin(dateString);
        const { hour, minute} = time;

        return {
            abbr,
            hour,
            minute,
            dow,
            doy,
            timezone,
            weekNum
        };
    }catch(error){
        console.error('Main error: ', error);
        return null;
    }

}


// API GEOLOCATION (https://ipgeolocation.io/) //
/////////////////////////////////////////////

async function getGeoLocation(){

    //https://api.ipgeolocation.io/ipgeo?apiKey=0bd95ccc5a714b58b7dd080f04af9183
    try {
        const baseUrl = 'https://api.ipgeolocation.io/ipgeo';
        const locationApiKey = '0bd95ccc5a714b58b7dd080f04af9183';

        const response = await fetch(baseUrl + '?apiKey=' + locationApiKey)
        const data = await response.json();

        const country = data.country_code2;
        const city = data.city;

        return {
            country,
            city
        }

    } catch(error){
        console.error('Error on main function: ', error);
        return null;
    }
}

export { getQuoteAndAuthor, getWorldTime , getGeoLocation }