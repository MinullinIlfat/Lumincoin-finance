import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class EditIncomeOrExpenses {
    constructor() {
        this.createTypeOperation = document.getElementById('create-type-operation');
        this.createCategoryOperation = document.getElementById('create-category-operation');
        this.createAmountOperation = document.getElementById('create-amount-operation');
        this.createDateOperation = document.getElementById('create-date-operation');
        this.createCommentOperation = document.getElementById('create-comment-operation');
        this.createOperationSaveBtn = document.getElementById('create-operation-save-btn');

        this.category = null;

        this.Categories()
    }

    async Categories() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/login'
        }

        let type = localStorage.getItem('Type')
        type = type.replace(/[^а-яёa-z]/gi, ' ');
        type = type.replace(/\s+/g, ' ').trim();
        let category = localStorage.getItem('Category')
        category = category.replace(/[^а-яёa-z1-9]/gi, ' ');
        category = category.replace(/\s+/g, ' ').trim();

        try {
            const result = await CustomHttp.request(config.host + '/categories/income');
            this.addInputNameOperations(result)
            this.editOperation(result)
            result.forEach(item => {
                const option = document.createElement('option')
                option.setAttribute('value', item.title);
                option.setAttribute('id', item.id);
                option.className = 'option-element';
                option.innerText = item.title

                let indexSelected = this.createTypeOperation.selectedIndex,
                    options = this.createTypeOperation.querySelectorAll('option')[indexSelected];

                let selectedId = options.getAttribute('id');
                if (selectedId === 'one') {
                    option.style.display = 'block'
                } else {
                    option.style.display = 'none'
                }

                this.createCategoryOperation.appendChild(option)

                this.createTypeOperation.addEventListener('change', (e) => {
                    if (this.createTypeOperation.value === 'expense') {
                        option.style.display = 'none'
                        this.createCategoryOperation.value = ' '
                    } else {
                        option.style.display = 'block'
                    }
                })
            })

            if (type === 'доход') {
                result.forEach(item => {
                    if (item.title === category) {
                        this.createCategoryOperation.value = category
                        this.category = item.id
                        return this.category
                    }
                })
            }
            this.createCategoryOperation.addEventListener('change', (e) => {
                result.forEach(item => {
                    if (item.title && this.createCategoryOperation.value === item.title) {
                        this.category = item.id
                        return this.category
                    }
                })
            })

            const resultExpense = await CustomHttp.request(config.host + '/categories/expense');
            if (type === 'доход') {
                resultExpense.forEach(item => {
                    if (item.title === category) {
                        this.createCategoryOperation.value = item.title
                    }
                })
            }
            this.addInputNameOperations(resultExpense)
            this.editOperation(resultExpense)
            resultExpense.forEach(itemExp => {
                const optionExp = document.createElement('option')
                optionExp.setAttribute('value', itemExp.title);
                optionExp.setAttribute('id', itemExp.id);
                optionExp.className = 'option-element-exp';
                optionExp.innerText = itemExp.title

                let indexSelected = this.createTypeOperation.selectedIndex,
                    option = this.createTypeOperation.querySelectorAll('option')[indexSelected];

                let selectedId = option.getAttribute('id');

                if (selectedId === 'two') {
                    optionExp.style.display = 'block'
                } else {
                    optionExp.style.display = 'none'
                }

                this.createCategoryOperation.appendChild(optionExp)
                this.createTypeOperation.addEventListener('change', (e) => {

                    if (this.createTypeOperation.value === 'income') {
                        optionExp.style.display = 'none'
                        this.createCategoryOperation.value = ' '
                    } else {
                        optionExp.style.display = 'block'
                    }
                })
            })

            if (type === 'расход') {
                resultExpense.forEach(item => {
                    if (item.title === category) {
                        this.createCategoryOperation.value = category
                        this.category = item.id
                        return this.category
                    }
                })
            }
            this.createCategoryOperation.addEventListener('change', (e) => {
                resultExpense.forEach(item => {
                    if (item.title && this.createCategoryOperation.value === item.title) {
                        this.category = item.id
                        return this.category
                    }
                })
            })

        } catch (error) {
            console.log(error);
        }
    }

    addInputNameOperations() {
        let type = localStorage.getItem('Type')
        let amount = localStorage.getItem('Amount')
        let date = localStorage.getItem('Date')
        let comment = localStorage.getItem('Comment')
        type = type.replace(/[^а-яёa-z]/gi, ' ');
        type = type.replace(/\s+/g, ' ').trim();
        amount = amount.replace(/[^0-9]/gi, ' ');
        amount = amount.replace(/\s+/g, ' ').trim();
        date = date.replace(/[^0-9.]/gi, ' ');
        date = date.replace(/\s+/g, ' ').trim();
        comment = comment.replace(/[^а-яёa-z1-9]/gi, ' ');
        comment = comment.replace(/\s+/g, ' ').trim();

        date = date.split('.')
        date = date[2] + '-' + date [1] + '-' + date[0]

        if (type === 'доход') {
            this.createTypeOperation.value = 'income'
        } else {
            this.createTypeOperation.value = 'expense'
        }
        this.createAmountOperation.value = amount
        this.createDateOperation.value = date
        this.createCommentOperation.value = comment
    }

    editOperation() {
        const that = this
        let operationId = localStorage.getItem('OperationId')
        JSON.parse(operationId)
        operationId = operationId.replace(/[^1-9]/gi, ' ');
        operationId = parseInt(operationId)
        this.createOperationSaveBtn.onclick = function () {
            const userInfo = Auth.getUserInfo();
            if (!userInfo) {
                location.href = '#/login'
            }

            try {
                const result = CustomHttp.request(config.host + '/operations/' + operationId, "PUT", {
                    type: that.createTypeOperation.value,
                    category_id: that.category,
                    amount: that.createAmountOperation.value,
                    date: that.createDateOperation.value,
                    comment: that.createCommentOperation.value
                });
                if (result) {
                    location.href = '#/expensesAndIncome'
                }
            } catch (error) {
                console.log(error);
            }
            that.removeLocalStorage()
        }
    }

    removeLocalStorage() {
        localStorage.removeItem('Type');
        localStorage.removeItem('Amount');
        localStorage.removeItem('Date');
        localStorage.removeItem('Comment');
        localStorage.removeItem('Category');
        localStorage.removeItem('OperationId');
    }
}