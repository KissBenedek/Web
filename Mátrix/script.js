document.addEventListener("DOMContentLoaded", function () {
    let originalArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let displayArray = [];

    const matrixContainer = document.getElementById("matrix-container");
    const matrixTable = document.getElementById("matrix");
    const clearButton = document.getElementById("clear-button");
    const refresh = document.getElementById("refresh");

    function initialBoard() {
        displayArray = [...originalArray];
        renderBoard();
    }

    function setRandomOrder() {
        let randomArray = [];
        while (displayArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * displayArray.length);
            randomArray.push(displayArray.splice(randomIndex, 1)[0]);
        }
        return randomArray;
    }

    function getItem() {
        if (displayArray.length > 0) {
            const index = Math.floor(Math.random() * displayArray.length);
            return displayArray.splice(index, 1)[0];
        }
        return null;
    }

    function renderBoard() {
        matrixTable.innerHTML = "";

        for (let i = 0; i < 3; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("td");
                if (displayArray.length > 0) {
                    const item = getItem();
                    cell.textContent = item;
                }
                row.appendChild(cell);
            }
            matrixTable.appendChild(row);
        }
    }

    initialBoard();
    
    refresh.addEventListener("click", function () {
        initialBoard();
    });

    clearButton.addEventListener("click", function () {
        matrixTable.innerHTML = "";
    });

    matrixTable.addEventListener("click", function (event) {
        if (event.target.tagName === "TD") {
            if (displayArray.length > 0) {
                const item = getItem();
                event.target.textContent = item;
            }
        }
    });
});
