const cardsContainer = document.querySelector(".cards");
const letters = ['A', 'B', 'C', 'D', 'E', 'F']
const picklist = [...letters, ...letters];
const cardCount = picklist.length;

//Game state
let revealedCount = 0;
let activeCard = null;
let matching = false;
let clickDisabled = false;

function create(letter) {
    const element = document.createElement("div");
    const innerElement = document.createElement("div");
    const frontFace = document.createElement("div");
    const backFace = document.createElement("div");

    element.classList.add("card");
    innerElement.classList.add("card-inner");
    frontFace.classList.add("card-face", "front");
    backFace.classList.add("card-face", "back");

    element.setAttribute("data-letter", letter);
    element.setAttribute("data-revealed", "false")

    frontFace.innerHTML = "";
    backFace.innerHTML = letter;

    element.appendChild(innerElement);
    innerElement.appendChild(frontFace);
    innerElement.appendChild(backFace);

    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");

        if (matching || clickDisabled || revealed === "true" || element === activeCard) {
            return;
        }

        element.classList.add("flipped");

        if (!activeCard) {
            activeCard = element;
            return;
        }

        const letterMatching = activeCard.getAttribute("data-letter")

        if (letterMatching === letter) {
            element.setAttribute("data-revealed", "true");
            activeCard.setAttribute("data-revealed", "true");

            clickDisabled = true;
            
            setTimeout(() => {
                activeCard.style.visibility = "hidden";
                element.style.visibility = "hidden";
    
                activeCard = null;
                matching = false;
                revealedCount += 2;
    
                if (revealedCount === cardCount) {
                    alert("Gratulálok!")
                    setTimeout(location.reload(), 1500);
                }
    
                clickDisabled = false;
            }, 750);

            return;
        }

        matching = true;

        setTimeout(() => {
            element.classList.remove("flipped");
            activeCard.classList.remove("flipped");

            matching = false;
            activeCard = null;

        }, 1000)
    });

    return element;
}





    for(let i = 0; i < cardCount; i++){
        const random = Math.floor(Math.random() * picklist.length);
        const letter = picklist[random];
        const card = create(letter);

        picklist.splice(random, 1);
        cardsContainer.appendChild(card);
    }


