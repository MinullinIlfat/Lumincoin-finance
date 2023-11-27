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

        if (this.createTypeOperation.value !== type) {
            this.createTypeOperation.lastElementChild.setAttribute("selected", "selected")
        }

        this.createCategoryOperation.value = category
        this.createAmountOperation.value = amount
        this.createDateOperation.value = date
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
    //                 elm.value += '-';
    //             }
    //
    //             if(len === 5) {
    //                 elm.value += '-';
    //             }
    //         });
    //     };
    //
    //     dateInputMask(this.createDateOperation);
    // }

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