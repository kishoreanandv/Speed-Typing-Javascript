let initialTime = 45;
const timer = document.querySelector(".timer");
const textContent = document.querySelector(".text-content");
const textArea = document.querySelector(".text-area");

let timing = () => {
  console.log("IM ENTERING");
  randomQuotes();
  setInterval(() => {
    initialTime--;
    timer.innerHTML = initialTime;
    if (initialTime < 0) {
      timer.innerHTML = "TIMES UP !!! 😖";
      textArea.disabled = true;
    }
  }, 1000);
};

timing();

function randomQuotes() {
  return fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      textContent.innerHTML = "";
      textArea.innerHTML = "";
      let eachWords = data.content.split("");
      eachWords.forEach((word) => {
        let wordSpan = document.createElement("span");
        wordSpan.innerText = word;
        textContent.appendChild(wordSpan);
      });
    });
}

textArea.addEventListener("keyup", (i) => {
  let quoteWordsSpan = document.querySelectorAll("span");
  let typedValue = textArea.value.split("");

  if (typedValue.length > quoteWordsSpan.length) {
    randomQuotes();
    return;
  }
  quoteWordsSpan.forEach((element, index) => {
    let inputTypedIndex = typedValue[index];

    if (inputTypedIndex) {
      if (inputTypedIndex === element.innerText) {
        element.className = "correct";
      } else {
        element.className = "wrong";
      }
    }

    if (index > typedValue.length) {
      quoteWordsSpan[index - 1].className = "";
    }
  });
});
