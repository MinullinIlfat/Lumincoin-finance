export class Expenses {
    constructor() {
        this.expensesElement = document.getElementById('expenses')
        this.incomeElement = document.getElementById('income')
        this.expensesTextElement = document.getElementById('expenses-text')
        this.incomeTextElement = document.getElementById('income-text')
        this.categoryButtonElement = document.getElementById('category-button')
        this.sidebarCategoryElement = document.getElementById('sidebar-category')
        this.orderCollapseElement = document.getElementById('orders-collapse')
        this.categorySvgElement = document.getElementById('category-svg')
        this.buttonElements = document.querySelectorAll('.button-element')
        this.sidebarCategoryCollapseElements = document.getElementById('sidebar-category-collapse')
        this.collapseButtonElements = document.querySelectorAll('.collapse-button')
        this.svgElements = document.querySelectorAll('.svg-element')

        this.sidebarFinance = document.getElementById('sidebar-finance')
        this.sidebarFinanceText = document.getElementById('sidebar-finance-text')
        this.sidebarFinanceSvg = document.getElementById('sidebar-finance-svg')

        this.sidebarMain = document.getElementById('sidebar-main');
        this.sidebarMainText = document.getElementById('sidebar-main-text');
        this.ssidebarMainSvg = document.getElementById('sidebar-main-svg');

        this.removeElement()
        this.inactive ()
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
        this.expensesElement.style.borderRadius = '0px'
        this.expensesElement.style.borderBottomLeftRadius = '5px'
        this.expensesElement.style.borderBottomRightRadius = '5px'



        this.sidebarCategoryCollapseElements.classList.add('nav-link', 'active')
        this.sidebarCategoryCollapseElements.style.borderRadius = '0px'
        this.sidebarCategoryCollapseElements.style.borderTopLeftRadius = '5px'
        this.sidebarCategoryCollapseElements.style.borderTopRightRadius = '5px'

        this.categoryButtonElement.classList.remove('link-dark', 'collapsed')
        this.categoryButtonElement.classList.add('nav-link', 'active')

        this.expensesTextElement.classList.remove('link-dark')
        this.expensesTextElement.classList.add('nav-link', 'active')
        this.orderCollapseElement.classList.add('show')
        this.categorySvgElement.style.fill = 'white'

        this.sidebarCategoryElement.style.border = '1px solid #0D6EFD'
        this.sidebarCategoryElement.style.borderRadius = '5px'
    }

    inactive () {
        this.incomeElement.style.borderRadius = '0px'
        this.incomeTextElement.classList.remove('link-dark')

        this.sidebarFinance.classList.remove('nav-link', 'active')
        this.sidebarFinanceText.classList.remove( 'active')
        this.sidebarFinanceText.classList.add('link-dark')
        this.sidebarFinanceSvg.style.fill = 'black'

        this.sidebarMain.classList.remove('nav-link', 'active');
        this.sidebarMainText.classList.remove( 'active');
        this.sidebarMainText.classList.add('link-dark');
        this.ssidebarMainSvg.style.fill = 'black';
    }
}