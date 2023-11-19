export class Main {
    constructor() {
        this.buttonElements = document.querySelectorAll('.button-element')
        this.collapseButtonElements = document.querySelectorAll('.collapse-button')
        this.svgElements = document.querySelectorAll('.svg-element')
        this.incomeChart = document.getElementById("incomeChart");
        this.expensesChart = document.getElementById("expensesChart");
        this.sidebarMain = document.getElementById('sidebar-main');
        this.sidebarMainText = document.getElementById('sidebar-main-text');
        this.ssidebarMainSvg = document.getElementById('sidebar-main-svg');
        this.orderCollapseElement = document.getElementById('orders-collapse');
        this.categoryButtonElement = document.getElementById('category-button');
        this.categorySvgElement = document.getElementById('category-svg');
        this.sidebarCategoryElement = document.getElementById('sidebar-category');
        this.sidebarFinance = document.getElementById('sidebar-finance')
        this.sidebarFinanceText = document.getElementById('sidebar-finance-text')
        this.sidebarFinanceSvg = document.getElementById('sidebar-finance-svg')
        this.sidebarCategoryCollapseElements = document.getElementById('sidebar-category-collapse');
        this.testChart()
        this.removeElement()
        this.inactive()
        this.activeElement()
    }

    testChart() {
        Chart.defaults.global.defaultFontFamily = "Roboto-Medium";
        Chart.defaults.global.defaultFontSize = 12;
        Chart.defaults.global.defaultFontColor = "#000000";

        let canvasIncome = this.incomeChart;
        canvasIncome.width = 414;
        canvasIncome.height = 467;
        let canvasExpenses = this.expensesChart;
        canvasExpenses.width = 414;
        canvasExpenses.height = 467;

        let incomeChartData = {
            labels: [
                "Red",
                "Orange",
                "Yellow",
                "Green",
                "Blue"
            ],
            datasets: [
                {
                    data: [133.3, 86.2, 52.2, 51.2, 50.2],
                    backgroundColor: [
                        "#DC3545",
                        "#FD7E14",
                        "#FFC107",
                        "#20C997",
                        "#0D6EFD"
                    ]
                }]
        };

        let incomeChartView = new Chart(this.incomeChart, {
            type: 'pie',
            data: incomeChartData
        });

        let expensesChartData = {
            labels: [
                "Red",
                "Orange",
                "Yellow",
                "Green",
                "Blue"
            ],
            datasets: [
                {
                    data: [133.3, 86.2, 52.2, 51.2, 50.2],
                    backgroundColor: [
                        "#DC3545",
                        "#FD7E14",
                        "#FFC107",
                        "#20C997",
                        "#0D6EFD"
                    ]
                }]
        };

        let expensesChartView = new Chart(this.expensesChart, {
            type: 'pie',
            data: expensesChartData
        });
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
        this.sidebarMain.classList.add('nav-link', 'active');
        this.sidebarMainText.classList.add('nav-link', 'active');
        this.sidebarMainText.classList.remove('link-dark');
        this.ssidebarMainSvg.style.fill = 'white';
    }

    inactive() {
        this.orderCollapseElement.classList.remove('show')

        this.sidebarCategoryCollapseElements.classList.remove('nav-link', 'active')
        this.sidebarCategoryCollapseElements.classList.add('link-dark')

        this.categoryButtonElement.classList.add('link-dark', 'collapsed')
        this.categoryButtonElement.classList.remove( 'active')

        this.categorySvgElement.style.fill = 'black'

        this.sidebarCategoryElement.style.border = '0px'

        this.sidebarFinance.classList.remove('nav-link', 'active')
        this.sidebarFinanceText.classList.remove( 'active')
        this.sidebarFinanceText.classList.add('link-dark')
        this.sidebarFinanceSvg.style.fill = 'black'

    }
}


