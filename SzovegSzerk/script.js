document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.getElementById('szoveg');
    const saveButton = document.getElementById('elment');
  
    // Szöveg betöltése a /read végpontból
    fetch('/read')
      .then(response => response.json())
      .then(data => {
        textArea.value = data.content;
      })
      .catch(error => {
        console.error('Hiba történt a szöveg betöltése közben:', error);
      });
  
    // Szöveg mentése a /save végpontra
    saveButton.addEventListener('click', () => {
      const updatedContent = textArea.value;
  
      fetch('/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: updatedContent })
      })
      .then(response => response.json())
      .then(data => {
        message.textContent = data.message;
        message.style.color = 'green';      
      })
      .catch(error => {
        message.textContent = 'Mentés sikertelen.';
        message.style.color = 'red';
        console.error('Hiba történt a szöveg mentése közben:', error);
      });
    });
  });
  

