/********************************************************************************************************
Everything (/v2/everything)

Search through millions of articles from over 80,000 large and small news sources and blogs.

This endpoint suits article discovery and analysis
*/

/********************************************************************************************************
Request parameters:

apiKey          Your API key. Alternatively you can provide this via the X-Api-Key HTTP header.
(REQUIRED )

q               Keywords or phrases to search for in the article title and body.
                Advanced search is supported here:
                Surround phrases with quotes (") for exact match.
                Prepend words or phrases that must appear with a + symbol. Eg: +bitcoin
                Prepend words that must not appear with a - symbol. Eg: -bitcoin
                Alternatively you can use the AND / OR / NOT keywords, and optionally group these with
                parenthesis. Eg: crypto AND (ethereum OR litecoin) NOT bitcoin.
                The complete value for q must be URL-encoded.

qInTitle        Keywords or phrases to search for in the article title only.
                Advanced search is supported here:
                Surround phrases with quotes (") for exact match.
                Prepend words or phrases that must appear with a + symbol. Eg: +bitcoin
                Prepend words that must not appear with a - symbol. Eg: -bitcoin
                Alternatively you can use the AND / OR / NOT keywords, and optionally group these with
                parenthesis. Eg: crypto AND (ethereum OR litecoin) NOT bitcoin.
                The complete value for qInTitle must be URL-encoded.

sources         A comma-seperated string of identifiers (maximum 20) for the news sources or blogs you
                want headlines from. Use the /sources endpoint to locate these programmatically or look
                at the sources index.

domains         comma-seperated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com) to 
                restrict the search to.

excludeDomains  A comma-seperated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com) to 
                remove from the results.

from            A date and optional time for the oldest article allowed. This should be in ISO 8601 
                format (e.g. 2021-09-08 or 2021-09-08T11:21:52)
                Default: the oldest according to your plan.

to              A date and optional time for the newest article allowed. This should be in ISO 8601 
                format (e.g. 2021-09-08 or 2021-09-08T11:21:52)
                Default: the newest according to your plan.

language        The 2-letter ISO-639-1 code of the language you want to get headlines for.
                Possible options:
                    ar,de,en,es,fr,he,it,nl,no,pt,ru,se,ud,zh.
                Default: all languages returned.

sortBy          The order to sort the articles in.
                Possible options:
                    * relevancy = articles more closely related to q come first.
                    * popularity = articles from popular sources and publishers come first.
                    * publishedAt = newest articles come first.
                Default: publishedAt

pageSize        The number of results to return per page.
int             Default: 100. Maximum: 100.

page            Use this to page through the results.
int             Default: 1.
*/
class RequestEverything {

    constructor(...param) {

    }

    buildRequestString = () => {

    }
}










/********************************************************************************************************
Response object:

status          string          If the request was successful or not. Options: ok, error.
                                In the case of error a code and message property will be populated.

totalResults    int             The total number of results available for your request. Only a
                                limited number are shown at a time though, so use the page parameter
                                in your requests to page through them.

articles        article[]       The results of the request.

---------------------------------------------------------------------------------------------------------
article:

source          object          The identifier id and a display name name for the source this article
                                came from.

author          string          The author of the article

title           string          The headline or title of the article.

description     string          A description or snippet from the article.

url             string          The direct URL to the article.

urlToImage      string          The URL to a relevant image for the article.

publishedAt     string          The date and time that the article was published, in UTC (+000)

content         string          The unformatted content of the article, where available. This is
                                truncated to 200 chars.
*/
