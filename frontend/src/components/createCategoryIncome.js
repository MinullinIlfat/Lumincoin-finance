import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class CreateCategoryIncome {
    constructor() {
        this.inputNameCreateIncome = document.getElementById('input-name-create-income');
        this.createCategoryIncomeBtn = document.getElementById('create-category-income-btn');

        this.createCategoryIncome();
    }

    createCategoryIncome() {
        const that = this
        this.createCategoryIncomeBtn.onclick = function () {
            let categoryName = that.inputNameCreateIncome.value;
            try {
                const result = CustomHttp.request(config.host + '/categories/income', "POST", {
                    title: categoryName
                });
            } catch (error) {
                console.log(error);
            }
        }

    }
}