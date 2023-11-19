const cellaszinek = ['yellow', 'yellow', 'yellow', 'yellow'];

    function changeColor(element) {
        let index = element.dataset.index;
        let currentColor = cellaszinek[index];

        if (currentColor === 'yellow') {
            element.style.backgroundColor = 'red';
            cellaszinek[index] = 'red';
        } else if (currentColor === 'red') {
            element.style.backgroundColor = 'blue';
            cellaszinek[index] = 'blue';
        } else {
            element.style.backgroundColor = 'yellow';
            cellaszinek[index] = 'yellow';
        }
    }

    function betolt() {
        let matrix = document.getElementById('matrix');
        let content = '';

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let index1 = i * 2 + j;
                content += `<div class="cell" onclick="changeColor(this)" data-index="${index1}"></div>`;
            }
            content += '<br>';
        }

        matrix.innerHTML = content;
    }

    betolt();