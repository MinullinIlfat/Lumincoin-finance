export class EditCategoryIncome {
    constructor() {
        this.inputNameElement = document.getElementById('input-name-income')
        this.btnSaveElement = document.getElementById('btn-save')

        this.addInputNameIncome()
        this.newNameIncome()
    }

    addInputNameIncome() {
        let result = localStorage.getItem('BlockName')
        JSON.parse(result)
        result = result.replace(/[^а-яё]/gi, '');
        this.inputNameElement.placeholder = result
    }

    newNameIncome() {
        const that = this
        this.btnSaveElement.onclick = function () {
            console.log(that.inputNameElement.value)
        }
    }
}