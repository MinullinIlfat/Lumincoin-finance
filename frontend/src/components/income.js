export class Income {
    constructor() {
        this.incomeElement = document.getElementById('income')
        this.expensesElement = document.getElementById('expenses')
        this.incomeTextElement = document.getElementById('income-text')
        this.sidebarCategoryElement = document.getElementById('sidebar-category')
        this.categoryButtonElement = document.getElementById('category-button')
        this.orderCollapseElement = document.getElementById('orders-collapse')
        this.categorySvgElement = document.getElementById('category-svg')
        this.sidebarCategoryCollapseElements = document.getElementById('sidebar-category-collapse')
        this.buttonElements = document.querySelectorAll('.button-element')
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
            item.classList.remove('nav-link', 'rounded')
        })
    }
    activeElement() {
        this.incomeElement.classList.remove('link-dark')
        this.incomeElement.classList.add('nav-link', 'active')
        this.categoryButtonElement.classList.remove('link-dark', 'collapsed')
        this.categoryButtonElement.classList.add('nav-link', 'active')
        this.incomeTextElement.classList.remove('link-dark')
        this.incomeTextElement.classList.add('nav-link', 'active')
        this.orderCollapseElement.classList.add('show')
        this.sidebarCategoryCollapseElements.classList.add('nav-link', 'active')
        this.categorySvgElement.style.fill = 'white'

        this.sidebarCategoryElement.style.border = '1px solid #0D6EFD'
        this.sidebarCategoryElement.style.borderRadius = '7px'
        this.expensesElement.style.borderBottomLeftRadius = '7px'
        this.expensesElement.style.borderBottomRightRadius = '7px'

    }
}