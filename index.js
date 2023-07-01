const finalScore = document.getElementById("final-score");
const addNewPositionIncome = document.getElementById("add-new-position-income");
const addNewPositionExpenses = document.getElementById(
  "add-new-position-expenses"
);
const incomesList = document.getElementById("incomes-list");
const expensesList = document.getElementById("expenses-list");
const totalIncomes = document.getElementById("total-incomes");
const totalExpenses = document.getElementById("total-expenses");

const incomes = [];

addNewPositionIncome.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target.incomeName.value;
  const amount = event.target.incomeAmount.value;
  const id = Math.random();

  incomes.push({ name, amount, id });
  addIncome(name, amount, id);
  updateTotalIncomes();
  updateFinalScore();
});

function updateTotalIncomes() {
  const total = incomes
    .map((income) => Number(income.amount))
    .reduce((a, b) => a + b, 0);
  const roundedTotal = Number(total.toFixed(2));
  totalIncomes.textContent = `Sum of incomes: ${roundedTotal} PLN`;
}

const expenses = [];

addNewPositionExpenses.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target.expensName.value;
  const amount = event.target.expensAmount.value;
  const id = Math.random();

  expenses.push({ name, amount, id });
  addExpenses(name, amount, id);
  updateTotalExpenses();
  updateFinalScore();
});

function updateTotalExpenses() {
  const total = expenses
    .map((expens) => Number(expens.amount))
    .reduce((a, b) => a + b, 0);
  const roundedTotal = Number(total.toFixed(2));
  totalExpenses.textContent = `Sum of expenses: ${roundedTotal} PLN`;
}

function updateFinalScore() {
  const allIncomes = incomes
    .map((income) => Number(income.amount))
    .reduce((a, b) => a + b, 0);
  const allExpenses = expenses
    .map((expens) => Number(expens.amount))
    .reduce((a, b) => a + b, 0);

  const finalResult = allIncomes - allExpenses;
  const roundedTotal = Number(finalResult.toFixed(2));
  const absolutValue = Math.abs(roundedTotal);
  if (finalResult > 0) {
    finalScore.textContent = `In this month you can spend ${roundedTotal} PLN`;
  } else if (finalResult == 0) {
    finalScore.textContent = "You're going to break even this month";
  } else {
    finalScore.textContent = `Ups... You owe ${absolutValue} PLN this month`;
  }
}

function addIncome(name, amount, id) {
  const item = document.createElement("li");
  const btns = document.createElement("div");
  item.textContent = `${name}: ${amount} PLN`;
  item.classList.add("record-wrapper");
  btns.classList.add("btns-wrapper");

  const editionBtn = document.createElement("button");
  editionBtn.classList.add("edition-btn");
  editionBtn.textContent = "edit";
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "delete";

  btns.appendChild(editionBtn);
  btns.appendChild(deleteBtn);
  item.appendChild(btns);
  incomesList.appendChild(item);
  editionBtn.addEventListener("click", () => {
    const index = incomes.findIndex((income) => income.id === id);
    const newName = window.prompt("enter the name", incomes[index].name);
    const newAmount = window.prompt("enter the amount", incomes[index].amount);

    if (isNaN(newAmount)) {
      alert("in amount you have to enter a number");
    } else if (newName && newAmount) {
      const index = incomes.findIndex((income) => income.id === id);
      incomes[index].name = newName;
      incomes[index].amount = newAmount;
      item.textContent = `${newName}: ${newAmount} PLN`;
      item.appendChild(btns);
      updateTotalIncomes();
      updateFinalScore();
    }
  });

  deleteBtn.addEventListener("click", () => {
    const index = incomes.findIndex((income) => income.id === id);
    if (index !== -1) {
      incomes.splice(index, 1);
      incomesList.removeChild(item);
      updateTotalIncomes();
      updateFinalScore();
    }
  });
}

function addExpenses(name, amount, id) {
  const item = document.createElement("li");
  const btns = document.createElement("div");
  item.textContent = `${name}: ${amount} PLN`;
  item.classList.add("record-wrapper");
  btns.classList.add("btns-wrapper");

  const editionBtn = document.createElement("button");
  editionBtn.classList.add("edition-btn");
  editionBtn.textContent = "edit";
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "delete";

  btns.appendChild(editionBtn);
  btns.appendChild(deleteBtn);
  item.appendChild(btns);
  expensesList.appendChild(item);
  editionBtn.addEventListener("click", () => {
    const index = expenses.findIndex((expens) => expens.id === id);
    const newName = window.prompt("enter the name", expenses[index].name);
    const newAmount = window.prompt("enter the amount", expenses[index].amount);

    if (isNaN(newAmount)) {
      alert("in amount you have to enter a number");
    } else if (newName && newAmount) {
      const index = expenses.findIndex((expens) => expens.id === id);
      expenses[index].name = newName;
      expenses[index].amount = newAmount;
      item.textContent = `${newName}: ${newAmount} PLN`;
      item.appendChild(btns);
      updateTotalExpenses();
      updateFinalScore();
    }
  });

  deleteBtn.addEventListener("click", () => {
    const index = expenses.findIndex((expens) => expens.id === id);
    if (index !== -1) {
      expenses.splice(index, 1);
      expensesList.removeChild(item);
      updateTotalExpenses();
      updateFinalScore();
    }
  });
}
