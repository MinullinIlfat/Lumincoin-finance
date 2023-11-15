// import {CustomHttp} from "../services/custom-http.js";
// import config from "../../config/config.js";
// import {Auth} from "../services/auth.js";
//
// export class Login {
//     constructor() {
//         this.agreeElement = null;
//         this.processElement = null;
//         this.fields = [
//             {
//                 name: 'email',
//                 id: 'email',
//                 element: null,
//                 regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//                 valid: false
//             },
//             {
//                 name: 'password',
//                 id: 'password',
//                 element: null,
//                 regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
//                 valid: false
//             },
//         ];
//
//         const that = this;
//         this.fields.forEach(item => {
//             item.element = document.getElementById(item.id);
//             item.element.onchange = function () {
//                 that.validateField.call(that, item, this);
//             }
//         });
//
//         this.processElement = document.getElementById('process');
//         this.processElement.onclick = function () {
//             that.processForm()
//         }
//
//         this.agreeElement = document.getElementById('flexCheckDefault');
//         this.agreeElement.onchange = function () {
//             that.validateForm();
//         }
//     }
//
//     validateField(field, element) {
//         if (!element.value || !element.value.match(field.regex)) {
//             element.style.setProperty("border", "1px solid red", "important")
//             field.valid = false;
//         } else {
//             element.removeAttribute('style');
//             field.valid = true;
//         }
//         this.validateForm();
//     };
//
//     validateForm() {
//         const validForm = this.fields.every(item => item.valid);
//         const isValid = this.agreeElement.checked && validForm;
//         if (isValid) {
//             this.processElement.removeAttribute('disabled');
//         } else {
//             this.processElement.setAttribute('disabled', 'disabled');
//         }
//         return isValid;
//     };
//
//     async processForm() {
//         if (this.validateForm()) {
//
//             const email = this.fields.find(item => item.name === 'email').element.value;
//             const password = this.fields.find(item => item.name === 'password').element.value;
//
//             try {
//                 const result = await CustomHttp.request(config.host + '/login', 'POST', {
//                     email: email,
//                     password: password,
//                 });
//                 if (result) {
//                     if (!result.accessToken || !result.refreshToken
//                         || !result.name || !result.id) {
//                         // throw new Error(result.message);
//                         console.log('ошибка')
//                     }
//
//                     Auth.setTokens(result.accessToken, result.refreshToken);
//                     Auth.setUserInfo({
//                         fullName: result.fullName,
//                         userId: result.userId
//                     })
//                     location.href = '#/';
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     }
// }
