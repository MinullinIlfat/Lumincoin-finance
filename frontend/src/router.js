import {Login} from "./components/login.js";
import {SignUp} from "./components/signup.js";

export class Router {
    constructor() {
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/main.html',
                styles: 'styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/login',
                title: 'Войти',
                template: 'templates/login.html',
                styles: 'styles/login.css',
                load: () => {
                    new Login();
                }
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                styles: 'styles/login.css',
                load: () => {
                    new SignUp();
                }
            },
            {
                route: '#/expensesAndIncome',
                title: 'Главная',
                template: 'templates/expensesAndIncome.html',
                styles: 'styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/income',
                title: 'Главная',
                template: 'templates/income.html',
                styles: 'styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/expenses',
                title: 'Главная',
                template: 'templates/expenses.html',
                styles: 'styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/editIncomeOrExpenses',
                title: 'Главная',
                template: 'templates/editIncomeOrExpenses.html',
                styles: 'styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/createIncomeOrExpenses',
                title: 'Главная',
                template: 'templates/createIncomeOrExpenses.html',
                styles: 'styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/editCategoryIncome',
                title: 'Главная',
                template: 'templates/editCategoryIncome.html',
                styles: 'styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/createCategoryIncome',
                title: 'Главная',
                template: 'templates/createCategoryIncome.html',
                styles: 'styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/editCategoryExpenses',
                title: 'Главная',
                template: 'templates/editCategoryExpenses.html',
                styles: 'styles/index.css',
                load: () => {

                }
            },
            {
                route: '#/createCategoryExpenses',
                title: 'Главная',
                template: 'templates/createCategoryExpenses.html',
                styles: 'styles/index.css',
                load: () => {

                }
            },

        ]
    }
    async openRoute() {
        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash.split('?')[0];
        })

        if (!newRoute) {
            window.location.href = '#/';
            return;
        }

        document.getElementById('content').innerHTML =
            await fetch(newRoute.template).then(response => response.text());
        document.getElementById('styles').setAttribute('href', newRoute.styles);
        document.getElementById('title').innerText = newRoute.title;
        newRoute.load();
    }
}