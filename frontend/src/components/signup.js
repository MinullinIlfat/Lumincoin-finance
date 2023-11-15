import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";


export class SignUp {
    constructor(page) {
        this.processElement = null;
        this.agreeElement = null;
        this.page = page;
        // this.confirmPassword = document.getElementById('confirm-password');
        // this.password = document.getElementById('password');
        //
        // const accessToken = localStorage.getItem(Auth.accessTokenKey);
        // if (accessToken) {
        //     location.href = '#/login';
        //     return;
        // }

        this.processElement = null;
        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false
            },
        ];

        if (this.page === 'signup') {
            this.fields.unshift(
                {
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^[А-Я][а-я]+\s*$/,
                    valid: false
                },
                {
                    name: 'confirm-password',
                    id: 'confirm-password',
                    element: null,
                    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                    valid: false
                }
            )
        }

        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            }
        });

        this.processElement = document.getElementById('process');
        this.processElement.onclick = function () {
            that.processForm()
        }

        if (this.page === 'login') {
            this.agreeElement = document.getElementById('flexCheckDefault');
            this.agreeElement.onchange = function () {
                that.validateForm();
            }
        }
    }

    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.style.setProperty("border", "1px solid red", "important")
            field.valid = false;
        } else {
            element.removeAttribute('style');
            field.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        const isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
        if (isValid) {
            this.processElement.removeAttribute('disabled');
        } else {
            this.processElement.setAttribute('disabled', 'disabled');
        }
        return isValid;
    }

    async processForm() {
        if (this.validateForm()) {

            const email = this.fields.find(item => item.name === 'email').element.value;
            const password = this.fields.find(item => item.name === 'password').element.value;
            if (this.page === 'signup') {
                const passwordRepeat = this.fields.find(item => item.name === 'confirm-password').element.value;
                try {
                    const result = await CustomHttp.request(config.host + '/signup', 'POST', {
                        name: this.fields.find(item => item.name === 'name').element.value,
                        lastName: this.fields.find(item => item.name === 'name').element.value,
                        email: email,
                        password: password,
                        passwordRepeat: passwordRepeat,
                    });
                    if (result) {
                        if (!result.user) {
                            console.log(123);
                        }
                    }
                } catch (error) {
                    return console.log(error);
                }
            }

            try {
                const result = await CustomHttp.request(config.host + '/login', 'POST', {
                    email: email,
                    password: password,
                });
                if (result) {
                    if (!result.tokens.accessToken || !result.tokens.refreshToken
                        || !result.user.name || !result.user.id || !result.user.lastName) {
                        // throw new Error(result.message);
                        console.log('ошибка')
                    }

                    Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
                    Auth.setUserInfo({
                        fullName: result.user.name,
                        userId: result.user.id
                    })
                    location.href = '#/';
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
