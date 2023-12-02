import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

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

        this.buttonAll = document.getElementById('button-all')
        this.buttonWeek = document.getElementById('button-week')
        this.buttonMonth = document.getElementById('button-month')
        this.buttonYear = document.getElementById('button-year')
        this.buttonToday = document.getElementById('button-today')
        this.buttonInterval = document.getElementById('button-interval')
        this.buttonIntervalFrom = document.getElementById('from')
        this.buttonIntervalTo = document.getElementById('to')

        this.removeElement()
        this.inactive()
        this.activeElement()
        this.init()
    }

    async init() {
        const that = this
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/login'
        }
        this.buttonAll.onclick = async function () {
            try {
                const result = await CustomHttp.request(config.host + '/operations/?period=all');
                if (result) {
                    that.testChart(result)
                }
            } catch (error) {
                console.log(error);
            }
        }
        this.buttonWeek.onclick = async function () {
            try {
                const result = await CustomHttp.request(config.host + '/operations/?period=week');
                if (result) {
                    that.testChart(result)
                }
            } catch (error) {
                console.log(error);
            }
        }
        this.buttonMonth.onclick = async function () {
            try {
                const result = await CustomHttp.request(config.host + '/operations/?period=month');
                if (result) {
                    that.testChart(result)
                }
            } catch (error) {
                console.log(error);
            }
        }
        this.buttonYear.onclick = async function () {
            try {
                const result = await CustomHttp.request(config.host + '/operations/?period=year');
                if (result) {
                    that.testChart(result)
                }
            } catch (error) {
                console.log(error);
            }
        }
        this.buttonToday.onclick = async function () {
            try {
                const result = await CustomHttp.request(config.host + '/operations/?period=today');
                if (result) {
                    that.testChart(result)
                }
            } catch (error) {
                console.log(error);
            }
        }
        this.buttonToday.click()


        this.buttonInterval.onclick = async function () {
            try {
                const result = await CustomHttp.request(config.host + '/operations/?period=interval&dateFrom=' + this.buttonIntervalFrom.value + '&dateTo=' + this.buttonIntervalTo.value);
                if (result) {
                    that.testChart(result)
                }
            } catch (error) {
                console.log(error);
            }
        }

        $( function() {
            let dateFormat = "mm/dd/yy",
                from = $( "#from" )
                    .datepicker({
                        defaultDate: "+1w",
                        changeMonth: true,
                        numberOfMonths: 1
                    })
                    .on( "change", function() {
                        to.datepicker( "option", "minDate", getDate( this ) );
                    }),
                to = $( "#to" ).datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    numberOfMonths: 1
                })
                    .on( "change", function() {
                        from.datepicker( "option", "maxDate", getDate( this ) );
                    });

            function getDate( element ) {
                let date;
                try {
                    date = $.datepicker.parseDate( dateFormat, element.value );
                } catch( error ) {
                    date = null;
                }

                return date;
            }
        } );
    }

    testChart(result) {
        let expenseArrAmount = [];
        let expenseArrCategory = [];
        result.forEach(item => {
            if (item.type === 'expense') {
                expenseArrAmount.push(item.amount)
                expenseArrCategory.push(item.category)
            }
        })
        let incomeArrAmount = [];
        let incomeArrCategory = [];
        result.forEach(item => {
            if (item.type === 'income') {
                incomeArrAmount.push(item.amount)
                incomeArrCategory.push(item.category)
            }
        })


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
            labels: incomeArrCategory,
            datasets: [
                {
                    data: incomeArrAmount,
                    backgroundColor: [
                        "#DC3545",
                        "#FD7E14",
                        "#FFC107",
                        "#20C997",
                        "#0D6EFD",
                        "#FFC0CB",
                        "#00FFFF",
                        "#8B008B"
                    ]
                }]
        };

        let incomeChartView = new Chart(this.incomeChart, {
            type: 'pie',
            data: incomeChartData
        });

        let expensesChartData = {
            labels: expenseArrCategory,
            datasets: [
                {
                    data: expenseArrAmount,
                    backgroundColor: [
                        "#DC3545",
                        "#FD7E14",
                        "#FFC107",
                        "#20C997",
                        "#0D6EFD",
                        "#FFC0CB",
                        "#00FFFF",
                        "#8B008B"
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
        this.categoryButtonElement.classList.remove('active')

        this.categorySvgElement.style.fill = 'black'

        this.sidebarCategoryElement.style.border = '0px'

        this.sidebarFinance.classList.remove('nav-link', 'active')
        this.sidebarFinanceText.classList.remove('active')
        this.sidebarFinanceText.classList.add('link-dark')
        this.sidebarFinanceSvg.style.fill = 'black'

    }
}


