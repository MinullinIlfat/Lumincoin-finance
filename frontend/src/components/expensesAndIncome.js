export class ExpensesAndIncome {
    constructor() {
        this.buttonElements = document.querySelectorAll('.button-element')
        this.svgElements = document.querySelectorAll('.svg-element')
        this.sidebarFinance = document.getElementById('sidebar-finance')
        this.sidebarFinanceText = document.getElementById('sidebar-finance-text')
        this.sidebarFinanceSvg = document.getElementById('sidebar-finance-svg')
        this.orderCollapseElement = document.getElementById('orders-collapse')
        this.categoryButtonElement = document.getElementById('category-button')
        this.categorySvgElement = document.getElementById('category-svg')
        this.sidebarCategoryElement = document.getElementById('sidebar-category')
        this.collapseButtonElements = document.querySelectorAll('.collapse-button')
        this.sidebarMain = document.getElementById('sidebar-main');
        this.sidebarMainText = document.getElementById('sidebar-main-text');
        this.ssidebarMainSvg = document.getElementById('sidebar-main-svg');
        this.sidebarCategoryCollapseElements = document.getElementById('sidebar-category-collapse')
        this.removeElement()
        this.inactive()
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
            item.classList.add('nav-item')
        })
    }

    activeElement() {
        this.sidebarFinance.classList.add('nav-link', 'active')
        this.sidebarFinanceText.classList.add('nav-link', 'active')
        this.sidebarFinanceText.classList.remove('link-dark')
        this.sidebarFinanceSvg.style.fill = 'white'
    }

    inactive() {
        this.orderCollapseElement.classList.remove('show')

        this.sidebarCategoryCollapseElements.classList.remove('nav-link', 'active')
        this.sidebarCategoryCollapseElements.classList.add('link-dark')

        this.categoryButtonElement.classList.add('link-dark', 'collapsed')
        this.categoryButtonElement.classList.remove( 'active')

        this.categorySvgElement.style.fill = 'black'

        this.sidebarCategoryElement.style.border = '0px'

        this.sidebarMain.classList.remove('nav-link', 'active');
        this.sidebarMainText.classList.remove( 'active');
        this.sidebarMainText.classList.add('link-dark');
        this.ssidebarMainSvg.style.fill = 'black';
    }
}