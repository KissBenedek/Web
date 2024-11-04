let lastClickedCell = null;

document.addEventListener('DOMContentLoaded', () => {
    const scheduleCells = document.querySelectorAll('.schedule-table tbody td');

    scheduleCells.forEach(cell => {
        if (cell.textContent.trim()) {
            cell.addEventListener('click', () => {
                const selectedClass = cell.textContent.trim(); 

                scheduleCells.forEach(c => c.style.backgroundColor = '');

                scheduleCells.forEach(c => {
                    if (c.textContent.trim() === selectedClass) {
                        c.style.backgroundColor = '#ffeb3b'; 
                    }
                });
                
                if (lastClickedCell && lastClickedCell !== cell) {
                    removeIcons(lastClickedCell);
                }
            
                addIcons(cell);

                lastClickedCell = cell;
            });

        }
    });
});

const deleteClass = (event) => {
    event.stopPropagation();
    
    const cell = event.target.parentElement; 
    const row = cell.closest('tr'); 
    const tbody = row.closest('tbody'); 

    if (row && tbody) {
        const dayIndex = cell.cellIndex; 
        const dayHeader = tbody.parentElement.querySelector('thead th:nth-child(' + (dayIndex + 1) + ')'); 
        const timeSlot = row.querySelector('td:first-child').textContent; 

        

        if (dayHeader) {
            const day = dayHeader.textContent; 
            if (cell.textContent.trim() !== '-' && cell.cellIndex !== 0) {
                cell.textContent = '-';    
            }
            console.log('Deleting:', day, timeSlot);

            fetch('/api/schedule', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ day, timeSlot }) 
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok' + response.status);
                }
                return response.text();
            })
            .then(data => {
                console.log(data);
                cell.textContent = '-';
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

            removeUpdateIcon(cell);
            removeDeleteIcon(cell);
        } else {
            console.error("Day header not found");
        }
    } else {
        console.error("Row or tbody not found");
    }
}


function updateClass(event) {
    event.stopPropagation();
    const cell = event.target.parentElement;
    const newClassName = prompt("Please enter the new class name:", cell.textContent.trim());

    if (newClassName !== null && newClassName.trim() !== '') {
        cell.textContent = newClassName;
    }

    removeIcons(cell);
}


const addUpdateIcon = (cell) =>{
    if (!cell.querySelector('.update-icon')  && cell.cellIndex !== 0) {
        const updateIcon = document.createElement('span');
        updateIcon.textContent = '♻️'; 
        updateIcon.classList.add('update-icon');
        updateIcon.onclick = updateClass; 
        cell.appendChild(updateIcon);
    }
}

function addIcons(cell) {
    addDeleteIcon(cell);
    
    addUpdateIcon(cell);
}


const addDeleteIcon = (cell) => {
    if (!cell.querySelector('.delete-icon') && cell.cellIndex !== 0 && cell.textContent.trim() !== '-') {
        const deleteIcon = document.createElement('span');
        deleteIcon.textContent = '🗑️'; 
        deleteIcon.classList.add('delete-icon');
        deleteIcon.onclick = deleteClass;
        cell.appendChild(deleteIcon);
    }
}



function removeIcons(cell) {
    removeDeleteIcon(cell);
    removeUpdateIcon(cell);
}


const removeDeleteIcon = (cell) => {
    const deleteIcon = cell.querySelector('.delete-icon');
    if (deleteIcon) {
        deleteIcon.remove();
    }
}

const removeUpdateIcon = (cell) =>{
    const updateIcon = cell.querySelector('.update-icon');
    if (updateIcon) {
        updateIcon.remove();
    }
}

function openModal() {
    document.getElementById('addRowModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('addRowModal').style.display = 'none';
    document.getElementById('timeInput').value = '';
    document.getElementById('positionInput').value = '';
}

function addNewRow() {
    const time = document.getElementById('timeInput').value.trim();
    const position = parseInt(document.getElementById('positionInput').value.trim());
    const tableBody = document.querySelector('.schedule-table tbody');
    const rowCount = tableBody.rows.length;

    if (time && !isNaN(position) && position > 0 && position <= rowCount + 1) {
        const newRow = document.createElement('tr');
        
        const timeCell = document.createElement('td');
        timeCell.textContent = time;
        timeCell.addEventListener('click', () => cellClickHandler(timeCell));
        newRow.appendChild(timeCell);

        for (let i = 1; i < 6; i++) {
            const newCell = document.createElement('td');
            newCell.textContent = '-';
            newCell.addEventListener('click', () => cellClickHandler(newCell));
            newRow.appendChild(newCell);
        }

        tableBody.insertBefore(newRow, tableBody.rows[position - 1]);
        closeModal();
    } else {
        alert("Érvényes időpontot és pozíciót adj meg!");
    }
}

function deleteRow() {
    if (lastClickedRow) {
        lastClickedRow.remove(); // Remove the selected row
        lastClickedCell = null; // Clear last clicked cell
        lastClickedRow = null; // Clear last clicked row
    } else {
        alert("Először válassz ki egy sort a törléshez!");
    }
}
