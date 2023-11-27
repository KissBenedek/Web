const heroes = [
    {firstName: "Ahsoka", lastName: "Tano", job: "padawan", image: "ahsoka.jpeg"},
    {firstName: "Boba", lastName: "Fett", job: "fejvadász", image: "boba.png"},
    {firstName: "Han", lastName: "Solo", job: "csempész", image: "hansolo.jpg"},
    {firstName: "Leia", lastName: "Organa", job: "szenátor", image: "leia.jpg"},
    {firstName: "Anakin", lastName: "Skywalker", job: "jedi", image: "anakin.webp"}
];

function renderHeroesAsCards() {
    const container = document.body;

    heroes.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'card';

        const heroInfo = `
            <img src="${hero.image}" alt="${hero.firstName} ${hero.lastName}" style="max-width: 100%; border-radius: 5px;">
            <h2>${hero.firstName} ${hero.lastName}</h2>
            <p>Job: ${hero.job}</p>
        `;

        card.innerHTML = heroInfo;
        container.appendChild(card);
    });
}

function renderHeroesAsTable() {
    const container = document.body;

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['First Name', 'Last Name', 'Job'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    heroes.forEach(hero => {
        const row = document.createElement('tr');
        const data = [hero.firstName, hero.lastName, hero.job];

        data.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            row.appendChild(td);
        });

        table.appendChild(row);
    });

    container.appendChild(table);
}

renderHeroesAsCards();

renderHeroesAsTable();