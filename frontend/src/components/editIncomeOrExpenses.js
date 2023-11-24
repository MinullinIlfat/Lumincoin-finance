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

        this.addInputNameOperations()
        this.editOperation()
    }

    addInputNameOperations() {
        let type = localStorage.getItem('Type')
        let category = localStorage.getItem('Category')
        let amount = localStorage.getItem('Amount')
        let date = localStorage.getItem('Date')
        let comment = localStorage.getItem('Comment')
        type = type.replace(/[^а-яё]/gi, ' ');
        category = category.replace(/[^а-яё]/gi, ' ');
        amount = amount.replace(/[^0-9,.$]/gi, ' ');
        date = date.replace(/[^0-9,.]/gi, ' ');
        comment = comment.replace(/[^а-яё]/gi, ' ');
        this.createTypeOperation.placeholder = type
        this.createCategoryOperation.placeholder = category
        this.createAmountOperation.placeholder = amount
        this.createDateOperation.placeholder = date
        this.createCommentOperation.placeholder = comment
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
                    category: that.createCategoryOperation.value,
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