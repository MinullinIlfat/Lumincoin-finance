import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class EditCategoryIncome {
    constructor() {
        this.inputNameElement = document.getElementById('input-name-income')
        this.btnSaveElement = document.getElementById('btn-save-income')

        this.addInputNameIncome()
        this.newNameIncome()
    }

    addInputNameIncome() {
        let result = localStorage.getItem('BlockName')
        JSON.parse(result)
        this.result = result.replace(/[^а-яё]/gi, ' ');
        this.inputNameElement.placeholder = this.result
    }

    newNameIncome() {
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
                const result = CustomHttp.request(config.host + '/categories/income/' + resultId, "PUT", {
                    title: that.inputNameElement.value
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
}