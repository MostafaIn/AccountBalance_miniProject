"use strict"

/***  GLOBAL VARIABLES  ***/
const controller = document.querySelector(".controller");
const descriptionInput = document.querySelector(".descriptionInput");
const amountInput = document.querySelector(".amountInput");
const incomeOption = document.querySelector(".incomeOption");
const expenseOption = document.querySelector(".expenseOption");
const selectOption = document.querySelector(".selectOption");
const submitBtn = document.querySelector(".submitBtn");
const container = document.querySelector(".container");
const incomesTable = document.querySelector(".incomesTable");
const expensesTable = document.querySelector(".expensesTable");
const totalIncome = document.querySelector(".totalIncome");
const totalExpense = document.querySelector(".totalExpense");
const subTitle = document.querySelector(".subTitle");

/***  this function DISPLAY THE DATE AND TIME of the income  ***/
const displayDateTime = () => {
    let myDate = new Date();
    let day = myDate.getDay();
    let month = myDate.getMonth() + 1;
    let year = myDate.getFullYear();
    let hour = myDate.getHours();
    let min = myDate.getMinutes();
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return `${day}.${month}.${year} ${hour}:${min}`;
}
// console.log(displayDateTime());
/***  THE MAIN VARIABLE THAT STORE ALL ARRAYS AND RELATED FUNCTIONS ***/
let accountBalance = {
    incomes: [],
    expenses: [],
    addIncome: function (incomeDescription, incomeAmount, time) {
        this.incomes.push({ incomeDescription, incomeAmount, time });
        savetoLocalStorage();
        return 0;
    },
    displayIncomesTable: function (content) {
        const { incomeDescription, incomeAmount, time } = content;
        return `<tr>
            <td>${incomeDescription}</td>
            <td>${incomeAmount} €</td>
            <td>${time}</td>
             </tr>`;
    },
    incomesSource: function (incomes) {
        let contents = '';
        this.incomes.forEach(element => {
            contents += this.displayIncomesTable(element);
        });
        incomesTable.innerHTML = contents;
    },
    totalIncome: function () {
        let total = 0;
        this.incomes.forEach(element => {
            total += element.incomeAmount;
        });
        return total;
    },

    addExpense: function (expenseDescription, expenseAmount, time) {
        this.expenses.push({ expenseDescription, expenseAmount, time });
        savetoLocalStorage();
        return 0;
    },
    displayExpensesTable: function (content) {
        const { expenseDescription, expenseAmount, time } = content;
        return `<tr>
            <td>${expenseDescription}</td>
            <td>${expenseAmount} €</td>
            <td>${time}</td>
             </tr>`;
    },
    expensesSource: function (expenses) {
        let contents = '';
        this.expenses.forEach(element => {
            contents += this.displayExpensesTable(element);
        });
        expensesTable.innerHTML = contents;
    },
    totalExpense: function () {
        let total = 0;
        this.expenses.forEach(element => {
            total += element.expenseAmount;
        });
        return total;
    },
    calculateBalance: function () {
        let calcBalance = this.totalIncome() - this.totalExpense();
        return calcBalance;
    }
};
/***  DISPLAY THE DATA STORED IN ARRAYS  ***/
window.addEventListener('load', () => {
    accountBalance.incomesSource(accountBalance.incomes);

    accountBalance.expensesSource(accountBalance.expenses);


});

/***  THE SUBMIT BUTTON THAT WORKS DEPEND ON THE OPTIONS  ***/
submitBtn.addEventListener('click', (e) => {
    if (incomeOption.selected && descriptionInput.value && amountInput.value) {
        accountBalance.incomesSource(accountBalance.addIncome(descriptionInput.value.toLowerCase(), parseInt(amountInput.value), displayDateTime()));
        totalIncome.textContent = `Total Incomes: ${accountBalance.totalIncome()} €`;
        console.log(accountBalance.incomes);
        e.stopImmediatePropagation();
    } else if (expenseOption.selected && descriptionInput.value && amountInput.value) {
        accountBalance.expensesSource(accountBalance.addExpense(descriptionInput.value.toLowerCase(), parseInt(amountInput.value), displayDateTime()));
        totalExpense.textContent = `Total Expenses: ${accountBalance.totalExpense()} €`;
        console.log(accountBalance.expenses);
        e.stopImmediatePropagation();
    } else {
        alert('please Enter and choose one of the options!');
    }
    descriptionInput.value = '';
    amountInput.value = '';
    subTitle.textContent = `The account balance is = ${accountBalance.calculateBalance()} €`;
    (accountBalance.calculateBalance() <= 0) ? subTitle.style.color = '#330000' : subTitle.style.color = '#003300';
});



/***  THIS FUNCTION CREATE THE JSON AND SET DATA TO LOCAL STORAGE  ***/
function savetoLocalStorage() {
    let incomesStr = JSON.stringify(accountBalance.incomes);
    localStorage.setItem('incomes', incomesStr);

    let expensesStr = JSON.stringify(accountBalance.expenses);
    localStorage.setItem('expenses', expensesStr);
}
/***  GET DATA FROM LOCAL STORAGE ***/
function getFromLocalStorage() {
    let incomesObj = localStorage.getItem('incomes');
    accountBalance.incomes = JSON.parse(incomesObj);
    if (!accountBalance.incomes) {
        accountBalance.incomes = [];
    }

    let expensesObj = localStorage.getItem('expenses');
    accountBalance.expenses = JSON.parse(expensesObj);
    if (!accountBalance.expenses) {
        accountBalance.expenses = [];
    }
}
getFromLocalStorage();
console.log(getFromLocalStorage());

// :)
