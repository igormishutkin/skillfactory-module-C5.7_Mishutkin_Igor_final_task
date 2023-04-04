'use strict';

const btn = document.querySelector('.btn');
const contentNode = document.querySelector('#content');

function useRequest(firstInput, secondInput) {
    return fetch(`https://picsum.photos/${firstInput}/${secondInput}`)
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .catch(() => {
            console.log('error')
            contentNode.innerHTML = '<p> Что-то пошло не так</p>'
        })
}

btn.addEventListener('click', async () => {
    const inputWidth = document.querySelector('#first_input').value;
    const inputHeight = document.querySelector('#second_input').value;
    let minSize = 100,
        maxSize = 300;
    if ((inputWidth >= minSize && inputWidth <= maxSize) && (inputHeight >= minSize && inputHeight <= maxSize)){
        const url = await useRequest(inputWidth, inputHeight)
        contentNode.innerHTML = `
      <img src='${url}' alt='image'>`
    } else {
        contentNode.innerHTML = `
      <p>Одно из чисел вне диапазона от ${minSize} до ${maxSize}</p>`
    }
});

//const requestURL = "https://picsum.photos/v2/list";

//const xhr = new XMLHttpRequest()
//xhr.open('GET', requestURL)
//xhr.responseType = 'json';
//xhr.onload = () => {
    //console.log(xhr.response)
//}
//xhr.send()
