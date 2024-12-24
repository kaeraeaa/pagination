let API_KEY = "ef68229ce265404297756ab484a60121"
let API_URL = "https://newsapi.org/v2/everything"

let news = ""
let pages = 1

let input = document.querySelector(".block__input")
let button = document.querySelector(".button__block")
let ul = document.querySelector(".block__news")
let span = document.querySelector(".span")
let btnNext = document.querySelector(".btn_2")
let btnBack = document.querySelector(".btn_1")

button.addEventListener("click", function(){
    let inpt = input.value
    if(inpt && inpt !== news ){
        news = inpt
        pages = 1
        
    }

    fetchNews()
})

function fetchNews(){
    let ask = `${API_URL}?q=${news}&page=${pages}&apiKey=${API_KEY}`
    fetch(ask)
.then(Response => {
    return Response.json()
})
.then(data => {
    ul.innerHTML = ""
     data.articles.forEach((article) => {
        let newLi = document.createElement("li")
        newLi.classList.add("article-item")
        newLi.innerHTML = `<a href="${article.url}" target="_blank" rel="noopener noreferrer">
                                <article>
                                    <img src="${article.urlToImage || 'https://via.placeholder.com/480'}" alt="${article.title}">
                                    <h2 class="link">${article.title}</h2>
                                    <p class="link">Posted by: ${article.author || 'Unknown'}</p>
                                    <p class="link">${article.description || 'No description available'}</p>
                                </article>
                            </a>`
        ul.appendChild(newLi)
     })
    
     if(data.articles.length === 0){
        ul.innerHTML = '<li>Новини не знайдено</li>'
     }
    
     Pagination(data.totalResults)

   

})
.catch(error => {
    console.error(error)
})

}




function Pagination (totalResults){
    let pagesNum = Math.ceil(totalResults / 6)
    span.textContent = `Сторінка ${pages}`
    btnBack.disabled = pages === 1
    btnNext.disabled = pages === 5


    if (pages === pagesNum) {
        btnNext.style.display = "none"
    } else {
        btnNext.style.display = "block"
    }

    if (pages === pagesNum) {
        btnBack.style.display = "none"
    } else {
        btnBack.style.display = "block"
    }

}

btnNext.addEventListener("click", function(){
        pages++
        fetchNews()
    
})

btnBack.addEventListener("click", function(){
    if(pages > 1){
        pages--
        fetchNews()
    }
})




// btnNext.addEventListener("click", function(){
//     if(pages > 5){
//         pages --
//         fetchNews()
//     }
// })




// function addPages(){
//     pages += 1
// }
// function resetPages(){
//     pages = 1
// }


