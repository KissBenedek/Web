// Lista a toplistán megjelenítendő felhasználókról
let users = []; // Dinamikus lista, amelyhez a felhasználókat hozzáadjuk

// API hívás a Codewars felhasználói adataihoz
async function getUserData() {
    const username = document.getElementById('username').value;
    const apiUrl = `https://www.codewars.com/api/v1/users/${username}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            if (response.status === 404) {
                showError('Nincs ilyen felhasználó.');
            } else {
                showError('Hiba történt az adatok lekérése közben.');
            }
            return;
        }

        const userData = await response.json();
        displayTotalPoints(userData);
        displayLanguagePoints(userData);
        hideError();
    } catch (error) {
        showError('Nem sikerült lekérni az adatokat.');
    }
}

// Összesített pontok megjelenítése
function displayTotalPoints(userData) {
    const totalPoints = userData.honor;
    document.getElementById('totalPointsResult').innerText = `Ez a felhasználó összesen ${totalPoints} pontot szerzett.`;
}

// Pontok nyelvenkénti megjelenítése
function displayLanguagePoints(userData) {
    const languages = userData.ranks.languages;
    const languageList = document.getElementById('languagePointsList');
    languageList.innerHTML = ''; // Töröljük a korábbi adatokat

    for (const [language, data] of Object.entries(languages)) {
        const listItem = document.createElement('li');
        listItem.innerText = `${language}: ${data.score} pont`;
        languageList.appendChild(listItem);
    }
}

// Hibaüzenet megjelenítése
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerText = message;
    errorDiv.classList.remove('hidden');
}

// Hibaüzenet elrejtése
function hideError() {
    const errorDiv = document.getElementById('error');
    errorDiv.classList.add('hidden');
}

// Új felhasználó hozzáadása a toplistához
async function addToLeaderboard() {
    const username = document.getElementById('username').value;

    if (!username) {
        alert('Kérjük, adjon meg egy felhasználónevet.');
        return;
    }

    // Ellenőrizzük, hogy a felhasználó létezik-e az API-ban
    try {
        const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
        if (!response.ok) {
            if (response.status === 404) {
                alert('Ez a felhasználó nem létezik.');
            } else {
                alert('Hiba történt az adatok lekérése közben.');
            }
            return;
        }

        const userData = await response.json();

        // Ellenőrizzük, hogy a felhasználó már szerepel-e a toplistában
        if (users.includes(username)) {
            alert('Ez a felhasználó már a toplistán van.');
        } else {
            users.push(username);
            alert(`${username} hozzáadva a toplistához.`);
        }

    } catch (error) {
        alert('Nem sikerült lekérni az adatokat.');
    }
}

// Toplista megjelenítése
async function displayLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = ''; // Töröljük a korábbi listát

    const userScores = [];

    // Felhasználók adatainak lekérése
    for (const username of users) {
        try {
            const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
            if (!response.ok) {
                userScores.push({ username, honor: 0, error: true });
            } else {
                const userData = await response.json();
                userScores.push({ username, honor: userData.honor, error: false });
            }
        } catch (error) {
            userScores.push({ username, honor: 0, error: true });
        }
    }

    // Felhasználók rendezése pontszám szerint (csökkenő sorrend)
    userScores.sort((a, b) => b.honor - a.honor);

    // Toplista megjelenítése
    userScores.forEach(user => {
        const listItem = document.createElement('li');
        if (user.error) {
            listItem.innerText = `${user.username}: Nem sikerült lekérni az adatokat.`;
        } else {
            listItem.innerText = `${user.username}: ${user.honor} pont`;
        }
        leaderboardList.appendChild(listItem);
    });
}

// Menü navigációs események kezelése animációval
document.getElementById('totalPointsLink').addEventListener('click', function() {
    document.getElementById('totalPoints').classList.remove('hidden', 'fade-in');
    document.getElementById('byLanguage').classList.add('hidden');
    document.getElementById('leaderboard').classList.add('hidden');
    setTimeout(() => document.getElementById('totalPoints').classList.add('fade-in'), 50);
});

document.getElementById('byLanguageLink').addEventListener('click', function() {
    document.getElementById('byLanguage').classList.remove('hidden', 'fade-in');
    document.getElementById('totalPoints').classList.add('hidden');
    document.getElementById('leaderboard').classList.add('hidden');
    setTimeout(() => document.getElementById('byLanguage').classList.add('fade-in'), 50);
});

document.getElementById('leaderboardLink').addEventListener('click', function() {
    document.getElementById('leaderboard').classList.remove('hidden', 'fade-in');
    document.getElementById('totalPoints').classList.add('hidden');
    document.getElementById('byLanguage').classList.add('hidden');
    setTimeout(() => document.getElementById('leaderboard').classList.add('fade-in'), 50);
    displayLeaderboard(); // Toplista frissítése
});
