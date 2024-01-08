window.onload = () => {
    document.getElementById("reverseButton").addEventListener("click", () => {
        const inputElement = document.getElementById("inputText");
        const originalText = inputElement.value;
        const reversedText = originalText.split('').reverse().join('');

        document.getElementById("output").innerText = reversedText;
    });
};