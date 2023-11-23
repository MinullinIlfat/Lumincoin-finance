import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class EditCategoryExpenses {
    constructor() {
        this.inputNameElement = document.getElementById('input-name-expenses')
        this.btnSaveElement = document.getElementById('btn-save-expense')

        this.addInputNameExpenses()
        this.newNameExpense()
    }

    addInputNameExpenses() {
        let result = localStorage.getItem('BlockName')
        result = result.replace(/[^а-яё]/gi, ' ');
        this.inputNameElement.placeholder = result
    }

    newNameExpense() {
        const that = this
        let resultId = localStorage.getItem('BlockId')
        JSON.parse(resultId)
        resultId = resultId.replace(/[^1-9]/gi, ' ');
        resultId = parseInt(resultId)
        this.btnSaveElement.onclick = function () {
            const userInfo = Auth.getUserInfo();
            if (!userInfo) {
                location.href = '#/login'
            }

            try {
                const result = CustomHttp.request(config.host + '/categories/expense/' + resultId, "PUT", {
                    title: that.inputNameElement.value
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
}