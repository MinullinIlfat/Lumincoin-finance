import {SignUp} from "./components/signup.js";
import {Auth} from "./services/auth.js";
import {Income} from "./components/income.js";

export class Router {

    constructor() {
        this.contentElement = document.getElementById('content');
        this.stylesElement = document.getElementById('styles');
        this.pageTitleElement = document.getElementById('title');
        this.profileFullNameElement = document.getElementById('profile-full-name');

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
                    new SignUp('login');
                }
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                styles: 'styles/login.css',
                load: () => {
                    new SignUp('signup');
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
                    new Income()
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
        const urlRoute = window.location.hash.split('?')[0];
        if (urlRoute === '#/logout') {
            Auth.removeTokens();
            localStorage.removeItem(Auth.userInfoKey);
            localStorage.removeItem('email');
            window.location.href = '#/login';
            return;
        }

        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        })

        if (!newRoute) {
            window.location.href = '#/login';
            return;
        }

        this.contentElement.innerHTML =
            await fetch(newRoute.template).then(response => response.text());
        this.stylesElement.setAttribute('href', newRoute.styles);
        this.pageTitleElement.innerText = newRoute.title;

        const userInfo = Auth.getUserInfo();
        const accessToken = localStorage.getItem(Auth.accessTokenKey);
        if (userInfo && accessToken) {
            this.profileFullNameElement.innerText = userInfo.fullName;
        }

        newRoute.load();
    }
}