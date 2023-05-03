// API QUOTES (https://github.com/lukePeavey/quotable) //
////////////////////////////////////////////////////////

// Define the function to fecth quote and author
async function getQuoteAndAuthor(){
    const baseUrl = 'https://api.quotable.io/';

    // TODO: Get random quote
    // make GET request to the api to get the data
    const response = await fetch(baseUrl + 'random')
    const data = await response.json();

    // get the values
    const quoteText = data.content;
    const quoteAuthor = data.author;

    // save it into an obj
    return {
        quoteText,
        quoteAuthor
    };
}

export { getQuoteAndAuthor }