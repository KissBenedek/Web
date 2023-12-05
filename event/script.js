function handleFormSubmit(event) {
    event.preventDefault();
    let inputValue = document.getElementById('szoveg').value;
    console.log('Beírt szöveg: ', inputValue);
}

document.getElementById('beolvas').addEventListener('click', handleFormSubmit);
