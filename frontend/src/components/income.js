export class Income {
    constructor() {
        this.incomeElement = document.getElementById('income')

    }

    activeElement() {
        this.incomeElement.classList.remove('link-dark')
        this.incomeElement.classList.add('nav-link', 'active')
    }
}