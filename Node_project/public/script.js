async function fetchSchedule() {
    try {
        const response = await fetch('/api/schedule');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const scheduleData = await response.json();
        updateScheduleTable(scheduleData);  // Update both tables with the schedule data
        applyEventListenersToCells();  // Apply event listeners to all table cells
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


function updateScheduleTable(schedule) {
    const weekdaysTableBody = document.querySelector('#weekdaysSchedule tbody');
    const weekendTableBody = document.querySelector('#weekendSchedule tbody');

    if (!weekdaysTableBody || !weekendTableBody) {
        console.error('Table bodies not found. Check your HTML structure.');
        return;
    }

    weekdaysTableBody.innerHTML = '';
    weekendTableBody.innerHTML = '';

    const timeSlots = Object.keys(schedule['Hétfő']);
    const weekdays = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];  // Weekdays
    const weekendDays = ['Szombat', 'Vasárnap'];  // Weekend days

    // Update weekdays table
    timeSlots.forEach(timeSlot => {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = timeSlot;
        timeCell.contentEditable = true;
        row.appendChild(timeCell);

        weekdays.forEach(day => {
            const classCell = document.createElement('td');
            classCell.textContent = schedule[day][timeSlot] || '-';
            row.appendChild(classCell);
        });

        weekdaysTableBody.appendChild(row);
    });

    // Update weekend table
    timeSlots.forEach(timeSlot => {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = timeSlot;
        timeCell.contentEditable = true;
        row.appendChild(timeCell);

        weekendDays.forEach(day => {
            const classCell = document.createElement('td');
            classCell.textContent = schedule[day][timeSlot] || '-';
            row.appendChild(classCell);
        });

        weekendTableBody.appendChild(row);
    });

    applyEventListenersToCells();
}


document.addEventListener('DOMContentLoaded', fetchSchedule);

let lastClickedCell = null;

function applyEventListenersToCells() {
    // Minden táblázat celláját figyelni kell
    const scheduleTables = document.querySelectorAll('#weekdaysSchedule tbody, #weekendSchedule tbody');

    scheduleTables.forEach(table => {
        const scheduleCells = table.querySelectorAll('td');

        scheduleCells.forEach(cell => {
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
        });
    });
}




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
            
            removeDeleteIcon(cell);
        } else {
            console.error("Day header not found");
        }
    } else {
        console.error("Row or tbody not found");
    }

    
}


const updateClass = (event) => {
    event.stopPropagation();
    const cell = event.target.parentElement;
    const newClassName = prompt("Please enter the new class name:", cell.textContent.trim());

    if (newClassName !== null && newClassName.trim() !== '') {
        const row = cell.closest('tr');
        const tbody = row.closest('tbody');
        const dayIndex = cell.cellIndex;
        const dayHeader = tbody.parentElement.querySelector('thead th:nth-child(' + (dayIndex + 1) + ')');
        const timeSlot = row.querySelector('td:first-child').textContent;

        if (dayHeader) {
            const day = dayHeader.textContent;
            cell.textContent = newClassName;  // Ideiglenes vizuális változás a táblázatban
            removeIcons(cell);  // Ikonok eltávolítása, hogy ne zavarják a frissítést

            // Frissítési kérés küldése a szervernek
            fetch('/api/schedule', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ day, timeSlot, newClassName })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.status);
                }
                return response.text();
            })
            .then(data => {
                console.log(data);
                cell.textContent = newClassName;
                addIcons(cell);  // Ikonok újra hozzáadása a frissítés után
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        } else {
            console.error("Day header not found");
        }
    }

    
}



const addUpdateIcon = (cell) => {
    if (!cell.querySelector('.update-icon') && cell.cellIndex !== 0) {
        const updateIcon = document.createElement('span');
        updateIcon.textContent = '♻️'; 
        updateIcon.classList.add('update-icon');
        updateIcon.onclick = updateClass; 
        cell.appendChild(updateIcon);
    }
}

const addDeleteIcon = (cell) => {
    // Törlés ikon csak nem üres cellákhoz
    if (!cell.querySelector('.delete-icon') && cell.cellIndex !== 0 && cell.textContent.trim() !== '-') {
        const deleteIcon = document.createElement('span');
        deleteIcon.textContent = '🗑️'; 
        deleteIcon.classList.add('delete-icon');
        deleteIcon.onclick = deleteClass;
        cell.appendChild(deleteIcon);
    }
}

const addIcons = (cell) => {
    addUpdateIcon(cell); // Frissítési ikon mindig megjelenik
    if (cell.textContent.trim() !== '-') {
        addDeleteIcon(cell); // Törlés ikon csak ha nem üres
    }
}

const removeIcons = (cell) => {
    removeDeleteIcon(cell);
    removeUpdateIcon(cell);
}

const removeDeleteIcon = (cell) => {
    const deleteIcon = cell.querySelector('.delete-icon');
    if (deleteIcon) {
        deleteIcon.remove();
    }
}

const removeUpdateIcon = (cell) => {
    const updateIcon = cell.querySelector('.update-icon');
    if (updateIcon) {
        updateIcon.remove();
    }
}



