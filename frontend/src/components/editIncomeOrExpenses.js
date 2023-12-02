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

        this.incomeCategories()
        this.expenseCategories()
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
                this.addInputNameOperations(result)
                this.editOperation(result)
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
            if (this.createTypeOperation.value === 'income') {
                option.style.display = 'block'
            } else {
                option.style.display = 'none'
            }

            this.createCategoryOperation.appendChild(option)

            this.createTypeOperation.addEventListener('change', (e) => {
                if (this.createTypeOperation.value === 'expense') {
                    option.style.display = 'none'
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
                this.addInputNameOperations(resultExpense)
                this.editOperation(resultExpense)
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
            if (this.createTypeOperation.value === 'expense') {
                optionExp.style.display = 'block'
            }  else {
                optionExp.style.display = 'none'
            }

            this.createCategoryOperation.appendChild(optionExp)

            this.createTypeOperation.addEventListener('change', (e) => {

                if (this.createTypeOperation.value === 'income') {
                    optionExp.style.display = 'none'
                } else {
                    optionExp.style.display = 'block'
                }
            })
        })
    }

    addInputNameOperations(result) {
        let type = localStorage.getItem('Type')
        let category = localStorage.getItem('Category')
        let amount = localStorage.getItem('Amount')
        let date = localStorage.getItem('Date')
        let comment = localStorage.getItem('Comment')
        type = type.replace(/[^а-яёa-z]/gi, ' ');
        type = type.replace(/\s+/g, ' ').trim();
        category = category.replace(/[^а-яёa-z1-9]/gi, ' ');
        category = category.replace(/\s+/g, ' ').trim();
        amount = amount.replace(/[^0-9]/gi, ' ');
        amount = amount.replace(/\s+/g, ' ').trim();
        date = date.replace(/[^0-9.]/gi, ' ');
        date = date.replace(/\s+/g, ' ').trim();
        comment = comment.replace(/[^а-яёa-z1-9]/gi, ' ');
        comment = comment.replace(/\s+/g, ' ').trim();

        // console.log(date)

        result.forEach(item => {
            if (item.title === category) {
                this.createCategoryOperation.value = item.title
            }
        })

        if (type === 'доход') {
            this.createTypeOperation.value = 'income'
        } else {
            this.createTypeOperation.value = 'expense'
        }

        this.createAmountOperation.value = amount
        // this.createDateOperation.value = date
        this.createCommentOperation.value = comment
        // this.inputMask()
    }

    // inputMask() {
    //     let dateInputMask = function dateInputMask(elm) {
    //         elm.addEventListener('keypress', function(e) {
    //             if(e.keyCode < 47 || e.keyCode > 57) {
    //                 e.preventDefault();
    //             }
    //
    //             let len = elm.value.length;
    //
    //             if(len !== 1 || len !== 3) {
    //                 if(e.keyCode == 47) {
    //                     e.preventDefault();
    //                 }
    //             }
    //
    //             if(len === 2) {
    //                 elm.value += '.';
    //             }
    //
    //             if(len === 5) {
    //                 elm.value += '.';
    //             }
    //         });
    //     };
    //
    //     dateInputMask(this.createDateOperation);
    // }

    editOperation(result) {
        let category = null;
        result.forEach(item => {
            if (this.createCategoryOperation.value === item.title) {
                category = item.id
            }
        })
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
                    category_id: category,
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
        }
    }
}