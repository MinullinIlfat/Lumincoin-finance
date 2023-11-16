export class Expenses {
    constructor() {
        this.expensesElement = document.getElementById('expenses')
        this.incomeElement = document.getElementById('income')
        this.expensesTextElement = document.getElementById('expenses-text')
        this.categoryButtonElement = document.getElementById('category-button')
        this.sidebarCategoryElement = document.getElementById('sidebar-category')
        this.orderCollapseElement = document.getElementById('orders-collapse')
        this.categorySvgElement = document.getElementById('category-svg')
        this.buttonElements = document.querySelectorAll('.button-element')
        this.sidebarCategoryCollapseElements = document.getElementById('sidebar-category-collapse')
        this.collapseButtonElements = document.querySelectorAll('.collapse-button')
        this.svgElements = document.querySelectorAll('.svg-element')
        this.removeElement()
        this.activeElement()
    }

    removeElement() {
        this.buttonElements.forEach(item => {
            item.classList.remove('active')
            item.classList.add('link-dark')
        })
        this.svgElements.forEach(item => {
            item.style.setProperty("fill", "black", "important")
        })
        this.collapseButtonElements.forEach(item => {
            item.classList.remove('nav-link')
        })
    }
    activeElement() {
        this.expensesElement.classList.remove('link-dark')
        this.expensesElement.classList.add('nav-link', 'active')
        this.categoryButtonElement.classList.remove('link-dark', 'collapsed')
        this.categoryButtonElement.classList.add('nav-link', 'active')
        this.expensesTextElement.classList.remove('link-dark')
        this.expensesTextElement.classList.add('nav-link', 'active')
        this.orderCollapseElement.classList.add('show')
        this.sidebarCategoryCollapseElements.classList.add('nav-link', 'active')
        this.categorySvgElement.style.fill = 'white'

        this.sidebarCategoryElement.style.border = '1px solid #0D6EFD'
        this.sidebarCategoryElement.style.borderRadius = '7px'
        this.incomeElement.style.borderBottomLeftRadius = '7px'
        this.incomeElement.style.borderBottomRightRadius = '7px'
    }
}