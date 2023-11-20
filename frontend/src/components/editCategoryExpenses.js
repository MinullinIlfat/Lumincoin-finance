export class EditCategoryExpenses {
    constructor() {
        this.inputNameElement = document.getElementById('input-name-expenses')

        this.addInputNameExpenses()
    }

    addInputNameExpenses() {
        let result = localStorage.getItem('BlockName')
        result = result.replace(/[^а-яё]/gi, '');
        this.inputNameElement.placeholder = result
    }
}