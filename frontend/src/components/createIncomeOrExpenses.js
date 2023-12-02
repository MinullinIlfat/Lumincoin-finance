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
        this.expenseCategories();
    }

    async incomeCategories() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/login'
        }
        try {
            const result = await CustomHttp.request(config.host + '/categories/income');
            if (result) {
                this.selectCategoriesIncome(result)
                this.createNewOperation(result)
            }
        } catch (error) {
            console.log(error);
        }
    }

    selectCategoriesIncome(result) {
        result.forEach(item => {
            const option = document.createElement('option')
            option.setAttribute('value', item.title);
            option.setAttribute('id', item.id);
            option.className = 'option-element';
            option.innerText = item.title
            option.style.display = 'none'

            this.newCreateCategoryOperation.appendChild(option)

            this.newCreateTypeOperation.addEventListener('change', (e) => {
                if (this.newCreateTypeOperation.value === 'expense') {
                    option.style.display = 'none'
                    this.newCreateCategoryOperation.value = ' '
                } else {
                    option.style.display = 'block'
                }
            })
        })
    }

    async expenseCategories() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/login'
        }
        try {
            const resultExpense = await CustomHttp.request(config.host + '/categories/expense');
            if (resultExpense) {
                this.selectCategoriesExpense(resultExpense)
                this.createNewOperation(resultExpense)
            }
        } catch (error) {
            console.log(error);
        }

    }

    selectCategoriesExpense(resultExpense) {
        resultExpense.forEach(itemExp => {
            const optionExp = document.createElement('option')
            optionExp.setAttribute('value', itemExp.title);
            optionExp.setAttribute('id', itemExp.id);
            optionExp.className = 'option-element-exp';
            optionExp.innerText = itemExp.title
            optionExp.style.display = 'none'

            this.newCreateCategoryOperation.appendChild(optionExp)

            this.newCreateTypeOperation.addEventListener('change', (e) => {

                if (this.newCreateTypeOperation.value === 'income') {
                    optionExp.style.display = 'none'
                } else {
                    optionExp.style.display = 'block'
                }
            })
        })
    }

    createNewOperation(result) {
        const that = this
        let testCategory
        let category

        this.newCreateCategoryOperation.addEventListener('change', (e) => {
            result.forEach(item => {
                if (item.title && this.newCreateCategoryOperation.value === item.title) {
                    testCategory = item.id

                }
            })
            if (testCategory) {
                // console.log(testCategory)
                category = testCategory
                // console.log(category)
            }
            // console.log(category)
        })
        this.saveNewCreateOperation.onclick = function () {
            const userInfo = Auth.getUserInfo();
            if (!userInfo) {
                location.href = '#/login'
            }
            try {
                // console.log(category)
                const result = CustomHttp.request(config.host + '/operations', "POST", {
                    type: that.newCreateTypeOperation.value,
                    category_id: category,
                    amount: that.newCreateAmountOperation.value,
                    date: that.newCreateDateOperation.value,
                    comment: that.newCreateCommentOperation.value
                });

                if (result) {
                    location.href = '#/IncomeAndExpense'
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}