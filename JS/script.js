const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressLabel = document.querySelector(".progress-label");
const bottomQuote = document.querySelector(".bottom-quote");
const progressValue = document.querySelector(".progress-value");
const allGoals = JSON.parse(getLocalStorage("allGoals")) || {};
let completedGoalsLength = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

const quotes = [
  "Start strong and the rest will follow; the first step is the hardest!",
  "Just one step closer to your goals; keep moving forward!",
  "You're almost there! Keep pushing; victory is within reach!",
  "Congratulations! You've achieved all your goals for today. Time to relax and celebrate!",
];

const quotes2 = [
  "“Stay determined; success follows persistence.”",
  "“Keep pushing forward; you're closer than you think!”",
  "“Progress each day; achieve your goals step by step.”",
  "“Celebrate small wins; they lead to big victories!”",
];

progressLabel.innerText = quotes[completedGoalsLength];
bottomQuote.innerText = quotes2[completedGoalsLength];

progressValue.style.width = `${
  (completedGoalsLength / inputFields.length) * 100
}%`;
progressValue.firstElementChild.innerText = `${completedGoalsLength}/${inputFields.length} Completed`;

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const allInputFilled = [...inputFields].every((input) => input.value);

    if (allInputFilled) {
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsLength = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      checkbox.parentElement.classList.toggle("completed");
      progressValue.style.width = `${
        (completedGoalsLength / inputFields.length) * 100
      }%`;
      progressValue.firstElementChild.innerText = `${completedGoalsLength}/${inputFields.length} Completed`;
      progressLabel.innerText = quotes[completedGoalsLength];
      bottomQuote.innerText = quotes2[completedGoalsLength];

      setLocalStorage("allGoals", allGoals);
    } else {
      errorLabel.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    errorLabel.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    allGoals[input.id] = {
      name: input.value,
      completed: false,
    };

    setLocalStorage("allGoals", allGoals);
  });
});

setInterval(() => {
  if (errorLabel.classList.contains("show-error")) {
    errorLabel.classList.remove("show-error");
  }
}, 4000);

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
  return localStorage.getItem(key);
}
