export class EditCategoryIncome {
    constructor() {
        this.inputNameElement = document.getElementById('input-name-income')

        this.addInputNameIncome()
    }

    addInputNameIncome() {
        let result = localStorage.getItem('BlockName')
        JSON.parse(result)
        result = result.replace(/[^а-яё]/gi, '');
        this.inputNameElement.placeholder = result
    }
}