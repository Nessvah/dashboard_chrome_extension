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
        // handle if we get a response other than OK
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // get the values
        const quoteText = data.content;
        // check for null values
        const quoteAuthor = data ? data.author : null;

        // save it into an obj
        return {
            quoteText,
            quoteAuthor
        };
    }catch (error) {
        // handle errors
        console.error('Erro: ', error)
       return null
    }

}

export { getQuoteAndAuthor }