//*****************************************************************************
//
const url = "https://newsapi.org/";
const apiKey = "e9644e4dd16e4a40b6b993673e9bfa14";


//*****************************************************************************
//
const currentDate = document.getElementById("currentDate");

const txtKeywords = document.getElementById('txtKeywords');
const dateStart = document.getElementById('dateStart');
const dateEnd = document.getElementById('dateEnd');

const selectCategory = document.getElementById('selectCategory');
const selectCountry = document.getElementById('selectCountry');
const selectLanguage = document.getElementById('selectLanguage');


//*****************************************************************************
// language
// The 2-letter ISO-639-1 code of the language you want to get headlines for.
// Possible options:
//    ar,de,en,es,fr,he,it,nl,no,pt,ru,se,ud,zh.
const languages = [
    { key: "ar", value: "العربية" },
    { key: "de", value: "Deutsch" },
    { key: "en", value: "English" },
    { key: "es", value: "Español" },
    { key: "fr", value: "Français" },
    { key: "he", value: "עברית" },
    { key: "it", value: "Italiano" },
    { key: "nl", value: "Nederlands" },
    { key: "no", value: "Norsk" },
    { key: "pt", value: "Português" },
    { key: "ru", value: "русский" },
    { key: "se", value: "Davvisámegiella" },
    // { key: 'ud', value: '' },
    { key: "zh", value: "中文" }
];


//*****************************************************************************
// country
// The 2-letter ISO 3166-1 code of the country you want to get headlines for.
// Possible options:
//     ae,ar,at,au,be,bg,br,ca,ch,cn,co,cu,cz,de,eg,fr,gb,gr,hk,hu,id,ie,il,in,it,jp,kr,
//     lt,lv,ma,mx,my,ng,nl,no,nz,ph,pl,pt,ro,rs,ru,sa,se,sg,si,sk,th,tr,tw,ua,us,ve,za
const countries = [
    { key: "ae", value: "United Arab Emirates" },
    { key: "ar", value: "Argentina" },
    { key: "at", value: "Austria" },
    { key: "au", value: "Australia" },
    { key: "be", value: "Belgium" },
    { key: "bg", value: "Bulgaria" },
    { key: "br", value: "Brazil" },
    { key: "ca", value: "Canada" },
    { key: "ch", value: "Suisse" },
    { key: "cn", value: "China" },
    { key: "co", value: "Columbia" },
    { key: "cu", value: "Cuba" },
    { key: "cz", value: "Czechia" },
    { key: "de", value: "Germany" },
    { key: "eg", value: "Egypt" },
    { key: "fr", value: "France" },
    { key: "gb", value: "United Kingdom" },
    { key: "gr", value: "Greece" },
    { key: "hk", value: "Hong Kong" },
    { key: "hu", value: "Hyngary" },
    { key: "id", value: "Indonesia" },
    { key: "ie", value: "Ireland" },
    { key: "il", value: "Israel" },
    { key: "in", value: "India" },
    { key: "it", value: "Italy" },
    { key: "jp", value: "Japan" },
    { key: "kr", value: "Korea (South)" },
    { key: "lt", value: "Lithuania" },
    { key: "lv", value: "Latvia" },
    { key: "ma", value: "Marocco" },
    { key: "mx", value: "Mexico" },
    { key: "my", value: "Malaysia" },
    { key: "ng", value: "Nigeria" },
    { key: "nl", value: "Netherlands" },
    { key: "no", value: "Norway" },
    { key: "nz", value: "New Zealand" },
    { key: "ph", value: "Philippines" },
    { key: "pl", value: "Poland" },
    { key: "pt", value: "Portugal" },
    { key: "ro", value: "Romania" },
    { key: "rs", value: "Serbia" },
    { key: "ru", value: "Russian Federation" },
    { key: "sa", value: "Saudi Arabia" },
    { key: "se", value: "Sweden" },
    { key: "sg", value: "Singapore" },
    { key: "si", value: "Slovenia" },
    { key: "sk", value: "Slovakia" },
    { key: "th", value: "Thailand" },
    { key: "tr", value: "Turkey" },
    { key: "tw", value: "Taiwan" },
    { key: "ua", value: "Ukraine" },
    { key: "us", value: "USA" },
    { key: "ve", value: "Venezuela" },
    { key: "za", value: "South Africa" }
];


//*****************************************************************************
//
const now = new Date();
currentDate.textContent = now.toLocaleString('de', {
    weekday: 'long', // long, short, narrow
    day: '2-digit', // numeric, 2-digit
    month: '2-digit', // numeric, 2-digit, long, short, narrow
    year: 'numeric' // numeric, 2-digit
});


if (dateStart != null) {
    let start = new Date();
    start.setMonth(start.getMonth() - 1);
    dateStart.value = start.toISOString().slice(0, 10);
    dateStart.max = now.toISOString().slice(0, 10);
}

if (dateEnd != null) {
    dateEnd.value = now.toISOString().slice(0, 10);
    dateEnd.max = now.toISOString().slice(0, 10);
}

if (selectCountry != null)
    addOptions(selectCountry, countries);

if (selectLanguage != null)
    addOptions(selectLanguage, languages);

function addOptions(parentSelect, dataArray) {
    dataArray.forEach(elt => {
        let option = document.createElement('option');
        option.value = elt.key;
        option.textContent = elt.value;
        parentSelect.appendChild(option);
    });
}


//everything set, now get the news
updateNews();




//*****************************************************************************
//
class Article {
    // source      object  The identifier id and a display name name for the source this
    //                     article came from.
    // author      string  The author of the article
    // title       string  The headline or title of the article.
    // description string  A description or snippet from the article.
    // url         string  The direct URL to the article.
    // urlToImage  string  The URL to a relevant image for the article.
    // publishedAt string  The date and time that the article was published, in UTC(+000)
    // content     string  The unformatted content of the article, where available.This is
    //                     truncated to 200 chars.
    constructor(article) {
        Object.keys(article).forEach(key => {
            this[key] = article[key];
        });
    }

    pushNews() {
        document.querySelector('article').innerHTML += `
        <section>
            <h1>${this.title}</h1>
            <h2>${this.author}</h2>
            <p>${this.date.toLocaleString('de',
            {
                weekday: 'short', // long, short, narrow
                day: '2-digit', // numeric, 2-digit
                month: '2-digit', // numeric, 2-digit, long, short, narrow
                year: 'numeric', // numeric, 2-digit
                hour: 'numeric', // numeric, 2-digit
                minute: 'numeric' // numeric, 2-digit
            })}
            </p>
            <p>${this.description}</p>
            <img src="${this.image}">
        </section>`;
    }
}




async function updateNews() {

    fetchJsonData(buildApiUrl());
}

function buildApiUrl() {

    // the base of all
    let apiUrl = url;

    // news for the 'everything' endpoint
    //apiUrl += "/v2/everything";

    // news for the 'top-headlines' endpoint
    apiUrl += "/v2/top-headlines";

    /*
    const txtKeywords = document.getElementById('txtKeywords');
    const dateStart = document.getElementById('dateStart');
    const dateEnd = document.getElementById('dateEnd');
    
    const selectCategory = document.getElementById('selectCategory');
    const selectCountry = document.getElementById('selectCountry');
    const selectLanguage = document.getElementById('selectLanguage');
    */
    if (dateStart.value > dateEnd.value) {
        let h = dateStart.value;
        dateStart.value = dateEnd.value;
        dateEnd.value = h;
    }
    apiUrl += `&from=${dateStart.value}`;
    apiUrl += `&to=${dateEnd.value}`;


    if (selectCountry != null) {

    }

    if (selectLanguage != null) {

    }

    // last but not least append the personal apiKey
    apiUrl += `&apiKey=${apiKey}`;

    return apiUrl;
}


async function fetchJsonData(url) {

    await fetch(url)
        .then(response => response.json())
        .then(data => console.log(data));


    // await fetch(url)
    //     .then(response => response.json())
    //     .then(data => {

    //         let newsArticles = data.articles;
    //         document.querySelector('article').innerHTML = "";
    //         newsArticles.forEach(article => {

    //             let author = article.author;
    //             let title = article.title;
    //             let description = article.description;
    //             let date = article.publishedAt;
    //             let image = article.urlToImage;

    //             let newsArticle = new NewsArticle(author, title, description, date, image).pushNews();
    //             // newsArticle.pushNews();

    //             // let newsArticleAuto = new NewsArticleAuto(article);
    //             // console.log(newsArticleAuto);

    //         });
    //     });
}