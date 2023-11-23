import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class CreateCategoryExpenses {
    constructor() {
        this.inputNameCreateExpense = document.getElementById('input-name-create-expense');
        this.createCategoryExpenseBtn = document.getElementById('create-category-expense-btn');

        this.createCategoryIncome()
    }

    createCategoryIncome() {
        const that = this
        this.createCategoryExpenseBtn.onclick = function () {
            let categoryName = that.inputNameCreateExpense.value
            try {
                const result = CustomHttp.request(config.host + '/categories/expense', "POST", {
                    title: categoryName
                });
            } catch (error) {
                console.log(error);
            }
        }

    }
}