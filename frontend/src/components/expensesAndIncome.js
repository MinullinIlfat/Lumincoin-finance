import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class ExpensesAndIncome {
    constructor() {
        this.buttonElements = document.querySelectorAll('.button-element')
        this.svgElements = document.querySelectorAll('.svg-element')
        this.collapseButtonElements = document.querySelectorAll('.collapse-button')

        this.sidebarFinance = document.getElementById('sidebar-finance')
        this.sidebarFinanceText = document.getElementById('sidebar-finance-text')
        this.sidebarFinanceSvg = document.getElementById('sidebar-finance-svg')

        this.orderCollapseElement = document.getElementById('orders-collapse')
        this.categoryButtonElement = document.getElementById('category-button')
        this.categorySvgElement = document.getElementById('category-svg')
        this.sidebarCategoryElement = document.getElementById('sidebar-category')

        this.sidebarMain = document.getElementById('sidebar-main');
        this.sidebarMainText = document.getElementById('sidebar-main-text');
        this.ssidebarMainSvg = document.getElementById('sidebar-main-svg');

        this.sidebarCategoryCollapseElements = document.getElementById('sidebar-category-collapse')

        this.popupExpAndInc = document.getElementById('popup-expense-and-income')
        this.popupDeleteOperation = document.getElementById('popup-delete-operation')

        this.buttonAll = document.getElementById('button-all')
        this.buttonWeek = document.getElementById('button-week')
        this.buttonMonth = document.getElementById('button-month')
        this.buttonYear = document.getElementById('button-year')
        this.buttonToday = document.getElementById('button-today')
        this.buttonInterval = document.getElementById('button-interval')
        this.buttonIntervalFrom = document.getElementById('from')
        this.buttonIntervalTo = document.getElementById('to')

        this.btns = document.querySelectorAll('.button')

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
                    that.showTableElements(result)
                }
            } catch (error) {
                console.log(error);
            }
        }
        this.buttonWeek.onclick = async function () {
            try {
                const result = await CustomHttp.request(config.host + '/operations/?period=week');
                if (result) {
                    that.showTableElements(result)
                }
            } catch (error) {
                console.log(error);
            }
        }
        this.buttonMonth.onclick = async function () {
            try {
                const result = await CustomHttp.request(config.host + '/operations/?period=month');
                if (result) {
                    that.showTableElements(result)
                }
            } catch (error) {
                console.log(error);
            }
        }
        this.buttonYear.onclick = async function () {
            try {
                const result = await CustomHttp.request(config.host + '/operations/?period=year');
                if (result) {
                    that.showTableElements(result)
                }
            } catch (error) {
                console.log(error);
            }
        }
        this.buttonToday.onclick = async function () {
            try {
                const result = await CustomHttp.request(config.host + '/operations/?period=today');
                if (result) {
                    that.showTableElements(result)
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
                    that.showTableElements(result)
                }
            } catch (error) {
                console.log(error);
            }
        }

        $( function() {
            var dateFormat = "mm/dd/yy",
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
                var date;
                try {
                    date = $.datepicker.parseDate( dateFormat, element.value );
                } catch( error ) {
                    date = null;
                }

                return date;
            }
        } );
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
        this.categoryButtonElement.classList.remove('active')

        this.categorySvgElement.style.fill = 'black'

        this.sidebarCategoryElement.style.border = '0px'

        this.sidebarMain.classList.remove('nav-link', 'active');
        this.sidebarMainText.classList.remove('active');
        this.sidebarMainText.classList.add('link-dark');
        this.ssidebarMainSvg.style.fill = 'black';
    }

    showTableElements(result) {
        const that = this

        this.tableBody = document.getElementById('table-body');
        result.forEach(item => {
            for (let i = 0; i < this.btns.length; i++) {
                this.btns[i].addEventListener("click", function () {
                    let current = document.getElementsByClassName("button active");
                    current[0].className = current[0].className.replace(" active", "");
                    this.className += " active";
                    let tableItem = document.getElementById(item.id);
                    if (tableItem) {
                        tableItem.remove()
                    }
                });
            }

            const tableItem = document.createElement('tr');
            tableItem.setAttribute('id', item.id);
            tableItem.className = 'tr-item';

            const tableItemScope = document.createElement('th');
            tableItemScope.setAttribute('scope', 'row');
            tableItemScope.innerText = item.id;

            const tableItemType = document.createElement('td');
            tableItemType.className = 'row-name-green';
            if (item.type === 'income' || item.type === 'доход') {
                item.type = 'доход'
                tableItemType.className = 'row-name-green';
            } else if (item.type === 'expense' || item.type === 'расход') {
                item.type = 'расход'
                tableItemType.className = 'row-name-red';
            }
            tableItemType.innerText = item.type;


            const tableItemCategory = document.createElement('td');
            tableItemCategory.innerText = item.category;

            const tableItemAmount = document.createElement('td');
            tableItemAmount.innerText = item.amount + '$';

            let str = item.date;
            let arr = str.split('-');
            let res = arr[2] + '.' + arr[1] + '.' + arr[0];

            const tableItemDate = document.createElement('td');
            tableItemDate.innerText = res;

            const tableItemComment = document.createElement('td');
            tableItemComment.innerText = item.comment;

            const tableItemButton = document.createElement('td');

            const tableItemButtonElement = document.createElement('button');
            tableItemButtonElement.className = 'btn-svg delete-btn';
            tableItemButtonElement.innerHTML =
                '<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-2">' +
                '<path d="M4.5 5.5C4.77614 5.5 5 5.72386 5 6V12C5 12.2761 4.77614 12.5 4.5 12.5C4.22386 12.5 4 12.2761 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5Z" fill="black"/>' +
                '<path d="M7 5.5C7.27614 5.5 7.5 5.72386 7.5 6V12C7.5 12.2761 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.2761 6.5 12V6C6.5 5.72386 6.72386 5.5 7 5.5Z" fill="black"/>' +
                '<path d="M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6V12C9 12.2761 9.22386 12.5 9.5 12.5C9.77614 12.5 10 12.2761 10 12V6Z" fill="black"/>' +
                '<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 3C13.5 3.55228 13.0523 4 12.5 4H12V13C12 14.1046 11.1046 15 10 15H4C2.89543 15 2 14.1046 2 13V4H1.5C0.947715 4 0.5 3.55228 0.5 3V2C0.5 1.44772 0.947715 1 1.5 1H5C5 0.447715 5.44772 0 6 0H8C8.55229 0 9 0.447715 9 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3ZM3.11803 4L3 4.05902V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V4.05902L10.882 4H3.11803ZM1.5 3V2H12.5V3H1.5Z" fill="black"/>' +
                '</svg>'

            const tableItemButtonCreate = document.createElement('a');
            tableItemButtonCreate.setAttribute('href', '#/editIncomeOrExpenses');
            tableItemButtonCreate.className = 'edit-operation';
            const tableItemButtonCreateImg = document.createElement("img");
            tableItemButtonCreateImg.src = "images/iconPen.png";

            tableItem.appendChild(tableItemScope)
            tableItem.appendChild(tableItemType)
            tableItem.appendChild(tableItemCategory)
            tableItem.appendChild(tableItemAmount)
            tableItem.appendChild(tableItemDate)
            tableItem.appendChild(tableItemComment)

            tableItemButtonCreate.appendChild(tableItemButtonCreateImg)

            tableItemButton.appendChild(tableItemButtonElement)
            tableItemButton.appendChild(tableItemButtonCreate)

            tableItem.appendChild(tableItemButton)

            this.tableBody.appendChild(tableItem)

            this.editOperationElements = document.querySelectorAll('.edit-operation')
            this.editOperationElements.forEach(item => {
                item.onclick = function () {
                    const type = item.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
                    const category = item.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
                    const amount = item.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent
                    const date = item.parentElement.previousElementSibling.previousElementSibling.textContent
                    const comment = item.parentElement.previousElementSibling.textContent
                    const operationId = item.parentElement.parentElement.id
                    localStorage.setItem('Type', JSON.stringify(type))
                    localStorage.setItem('Category', JSON.stringify(category))
                    localStorage.setItem('Amount', JSON.stringify(amount))
                    localStorage.setItem('Date', JSON.stringify(date))
                    localStorage.setItem('Comment', JSON.stringify(comment))
                    localStorage.setItem('OperationId', JSON.stringify(operationId))
                }
            })

            this.deleteBtnElement = document.querySelectorAll('.delete-btn')
            this.deleteBtnElement.forEach(item => {
                item.onclick = function () {
                    that.popupExpAndInc.style.display = 'grid'
                    that.popupDeleteOperation.onclick = function () {
                        let resultId = item.parentElement.parentElement.id
                        try {
                            const result = CustomHttp.request(config.host + '/operations/' + resultId, "DELETE");
                            if (result) {
                                location.href = '#/expensesAndIncome'
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            })

        })
    }
}