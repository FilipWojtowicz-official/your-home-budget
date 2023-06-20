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
  finalScoreCalculation();
});

function updateTotalIncomes() {
  const total = incomes
    .map((income) => Number(income.amount))
    .reduce((a, b) => a + b, 0);
  totalIncomes.textContent = `${total} PLN`;
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
  finalScoreCalculation();
});

function updateTotalExpenses() {
  const total = expenses
    .map((expens) => Number(expens.amount))
    .reduce((a, b) => a + b, 0);
  totalExpenses.textContent = `${total} PLN`;
}

function finalScoreCalculation() {
  const allIncomes = incomes
    .map((income) => Number(income.amount))
    .reduce((a, b) => a + b, 0);
  const allExpenses = expenses
    .map((expens) => Number(expens.amount))
    .reduce((a, b) => a + b, 0);

  const finalresult = allIncomes - allExpenses;

  finalScore.textContent = `In this month you can spend ${finalresult} PLN`;
}

function addIncome(name, amount, id) {
  const item = document.createElement("li");
  item.textContent = `${name}: ${amount} PLN`;

  const editionBtn = document.createElement("button");
  editionBtn.classList.add("edition-btn");
  editionBtn.textContent = "edit";
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "delete";

  incomesList.appendChild(item);
  incomesList.appendChild(editionBtn);
  incomesList.appendChild(deleteBtn);
}

function addExpenses(name, amount, id) {
  const item = document.createElement("li");
  item.textContent = `${name}: ${amount} PLN`;

  const editionBtn = document.createElement("button");
  editionBtn.classList.add("edition-btn");
  editionBtn.textContent = "edit";
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "delete";
  expensesList.appendChild(item, editionBtn, deleteBtn);
  expensesList.appendChild(editionBtn);
  expensesList.appendChild(deleteBtn);
}
