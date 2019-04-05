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


let accountBalance = {
    incomes: [],
    expenses: [],
    addIncome: function (incomeDescription, incomeAmount, time) {
        return this.incomes.push({ incomeDescription, incomeAmount, time });
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

    addExpense: function (expenseDescription, expenseAmount, time) {
        return this.expenses.push({ expenseDescription, expenseAmount, time });
    },
    displayExpensesTable: function (content) {
        const { expenseDescription, expenseAmount, time } = content;
        return `<tr>
            <td>${expenseDescription}</td>
            <td>${expenseAmount}</td>
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
    totalIncome: function () {
        let total = 0;
        this.incomes.forEach(element => {
            total += element.incomeAmount;
        });
        return total;
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
console.log(displayDateTime());


// for the submit button
submitBtn.addEventListener('click', (e) => {

    if (incomeOption.selected) {

        accountBalance.incomesSource(accountBalance.addIncome(descriptionInput.value.toLowerCase(), parseInt(amountInput.value), displayDateTime()));
        totalIncome.textContent = `Total Incomes: ${accountBalance.totalIncome()} €`;
        console.log(accountBalance.incomes);
        console.log(accountBalance.totalIncome());

        e.stopImmediatePropagation();
    } else if (expenseOption.selected) {

        accountBalance.expensesSource(accountBalance.addExpense(descriptionInput.value.toLowerCase(), parseInt(amountInput.value), displayDateTime()));

        totalExpense.textContent = `Total Expenses: ${accountBalance.totalExpense()} €`;
        console.log(accountBalance.expenses);
        console.log(accountBalance.totalExpense());

        e.stopImmediatePropagation();
    } else {
        alert('choose one of the options!');
    }

    descriptionInput.value = '';
    amountInput.value = '';
    subTitle.textContent = `This account balance is = ${accountBalance.calculateBalance()}`;
    (accountBalance.calculateBalance() <= 0) ? subTitle.style.color = '#330000' : subTitle.style.color = '#003300';
    localStore();
});

/****  FOR LOCAL STORAGE ****/
function localStore() {
    // localStorage.clear();
    const incomesJSON = JSON.stringify(accountBalance.incomes);
    localStorage.setItem(accountBalance.incomes, incomesJSON);

    const expensesJSON = JSON.stringify(accountBalance.expenses);
    localStorage.setItem(accountBalance.expenses, expensesJSON);

    if (window.localStorage.getItem(accountBalance.incomes)) {
        accountBalance.incomes = JSON.parse(window.localStorage.getItem(accountBalance.incomes));
    }
    if (window.localStorage.getItem(accountBalance.expenses)) {
        accountBalance.expenses = JSON.parse(window.localStorage.getItem(accountBalance.expenses));
    }
};











