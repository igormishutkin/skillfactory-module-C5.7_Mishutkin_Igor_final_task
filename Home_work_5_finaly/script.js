'use strict';

const btnNode = document.querySelector('.btn');
const contentNode = document.querySelector('#content');

function useRequest(page, limit) {
    return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
        .then(response => response.json())
        .catch(() => {
            console.log('error');
            contentNode.innerHTML = '<p>Что-то пошло не так</p>';
        })
}

function displayContent(apiData){
    let cards = '';

    apiData.forEach(item => {
        const cardBlock = `
      <div class="card">
        <img class="card_image" src="${item.download_url}" alt="image">
        <p>${item.author}</p>
      </div>`;
        cards = cards + cardBlock;
    });

    contentNode.innerHTML = cards;
}

function displayNoContent(page, limit){
    if ((page < minSize || page > maxSize) && (limit < minSize || limit > maxSize)){
        contentNode.innerHTML = `<h2>Номер страницы и лимит вне диапазона от ${minSize} до ${maxSize}</h2>`;
    } else if ((page < minSize || page > maxSize)){
        contentNode.innerHTML = `<h2>Номер страницы вне диапазона от ${minSize} до ${maxSize}</h2>`;
    } else {
        contentNode.innerHTML = `<h2>Лимит вне диапазона от ${minSize} до ${maxSize}</h2>`;
    }
}

const minSize = 1,
    maxSize = 10;

if (localStorage.lastJson){
    const json = JSON.parse(localStorage.getItem('lastJson'));
    displayContent(json);
}

btnNode.addEventListener('click', async () => {
    const inputPage = document.querySelector('#page').value;
    const inputLimit = document.querySelector('#limit').value;
    localStorage.setItem('page', inputPage);
    localStorage.setItem('limit', inputLimit);
    if ((inputPage >= minSize && inputPage <= maxSize) && (inputLimit >= minSize && inputLimit <= maxSize)){
        const json = await useRequest(inputPage, inputLimit);
        localStorage.setItem('lastJson', JSON.stringify(json));
        console.log(localStorage.getItem('lastJson'))
        displayContent(json);
    } else {
        displayNoContent(inputPage, inputLimit);
    }
});



const requestURL = "https://picsum.photos/v2/list";

const xhr = new XMLHttpRequest()
xhr.open('GET', requestURL)
xhr.responseType = 'json';
xhr.onload = () => {
    console.log(xhr.response)
}
xhr.send()