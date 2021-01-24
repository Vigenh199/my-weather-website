const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const address = searchInput.value;
    
    messageOne.textContent = '';
    messageTwo.textContent = 'Loading...';
    fetch(`http://localhost:3000/weather?address=${address}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})