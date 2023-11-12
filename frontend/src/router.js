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
            // {
            //     route: '#/choice',
            //     title: 'Выбор теста',
            //     template: 'templates/choice.html',
            //     styles: 'styles/choice.css',
            //     load: () => {
            //         new Choice();
            //     }
            // },
            // {
            //     route: '#/test',
            //     title: 'Прохождение теста',
            //     template: 'templates/test.html',
            //     styles: 'styles/test.css',
            //     load: () => {
            //         new Test();
            //     }
            // },
            // {
            //     route: '#/result',
            //     title: 'Результаты',
            //     template: 'templates/result.html',
            //     styles: 'styles/result.css',
            //     load: () => {
            //         new Result();
            //     }
            // },
            // {
            //     route: '#/right',
            //     title: 'Правильные ответы',
            //     template: 'templates/right.html',
            //     styles: 'styles/right.css',
            //     load: () => {
            //         new Answers();
            //     }
            // },
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