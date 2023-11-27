import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class CreateIncomeOrExpenses {
    constructor() {
        this.newCreateTypeOperation = document.getElementById('new-create-type-operation');
        this.newCreateCategoryOperation = document.getElementById('new-create-category-operation');
        this.newCreateAmountOperation = document.getElementById('new-create-amount-operation');
        this.newCreateDateOperation = document.getElementById('new-create-date-operation');
        this.newCreateCommentOperation = document.getElementById('new-create-comment-operation');
        this.saveNewCreateOperation = document.getElementById('save-new-create-operation');


        this.incomeCategories();
        this.createNewOperation();
    }

    async incomeCategories() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/login'
        }
        try {
            const result = await CustomHttp.request(config.host + '/categories/income');
            if (result) {
                this.selectCategories(result)
            }
        } catch (error) {
            console.log(error);
        }
    }

    selectCategories(result) {
        result.forEach(item => {
            const option = document.createElement('option')
            option.setAttribute('value', item.title);
            option.setAttribute('id', item.id);
            option.className = 'option-element';
            option.innerText = item.title

            this.newCreateCategoryOperation.appendChild(option)
        })
    }

    createNewOperation() {
        let optionId = null
        this.newCreateCategoryOperation.addEventListener('change', (e) => {
            let option = document.querySelectorAll('.option-element')
            option.forEach(item => {
                console.log(item.id);
                optionId = item.id
                return optionId;
            })
            console.log(optionId)
        })
        console.log(this.newCreateCategoryOperation.value)
        const that = this
        this.saveNewCreateOperation.onclick = function () {
            const userInfo = Auth.getUserInfo();
            if (!userInfo) {
                location.href = '#/login'
            }

            try {
                const result = CustomHttp.request(config.host + '/operations', "POST", {
                    type: that.newCreateTypeOperation.value,
                    category: that.newCreateCategoryOperation.value,
                    amount: that.newCreateAmountOperation.value,
                    date: that.newCreateDateOperation.value,
                    comment: that.newCreateCommentOperation.value
                });

                if (result) {
                    location.href = '#/expensesAndIncome'
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}