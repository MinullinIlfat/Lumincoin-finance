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


        this.createNewOperation();
    }

    createNewOperation() {
        const that = this

        this.saveNewCreateOperation.onclick = function () {
            const userInfo = Auth.getUserInfo();
            if (!userInfo) {
                location.href = '#/login'
            }
            // let arr = that.createDateOperation.value.split('-');
            // let res = arr[2] + '.' + arr[1] + '.' + arr[0];
            // console.log(res)

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