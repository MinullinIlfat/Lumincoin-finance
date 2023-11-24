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
        this.deleteBtnElement = document.querySelectorAll('.delete-btn')

        this.removeElement()
        this.inactive()
        this.deleteBtn()
        this.activeElement()
        this.init()
    }

    async init() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/login'
        }
        try {
            const result = await CustomHttp.request(config.host + '/operations/?period=all');
            if (result) {
                this.showTableElements(result)
            }
        } catch (error) {
            console.log(error);
        }
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

    deleteBtn() {
        const that = this
        this.deleteBtnElement.forEach(item => {
            item.onclick = function () {
                that.popupExpAndInc.style.display = 'grid'
            }
        })
    }

    showTableElements(result) {
        this.tableBody = document.getElementById('table-body');

        result.forEach(item => {
            console.log(item)

            const tableItem = document.createElement('tr');
            tableItem.setAttribute('id', item.id);

            const tableItemScope = document.createElement('th');
            tableItemScope.setAttribute('scope', 'row');
            tableItemScope.innerText = item.id;

            const tableItemType = document.createElement('td');
            tableItemType.className = 'row-name-green';
            tableItemType.innerText = item.type;

            const tableItemCategory = document.createElement('td');
            tableItemCategory.innerText = item.category;

            const tableItemAmount = document.createElement('td');
            tableItemAmount.innerText = item.amount;

            const tableItemDate = document.createElement('td');
            tableItemDate.innerText = item.date;

            const tableItemComment = document.createElement('td');
            tableItemComment.innerText = item.comment;

            const tableItemButton = document.createElement('td');

            const tableItemButtonElement = document.createElement('td');
            tableItemButtonElement.className = 'btn-svg delete-btn';

            const tableItemSvg = document.createElement('svg');
            tableItemSvg.setAttribute('width', '14');
            tableItemSvg.setAttribute('height', '15');
            tableItemSvg.setAttribute('viewBox', '0 0 14 15');
            tableItemSvg.setAttribute('fill', 'none');
            tableItemSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            tableItemSvg.className = 'me-2';

            const tableItemSvgPath = document.createElement('path');
            tableItemSvgPath.setAttribute('d', 'M4.5 5.5C4.77614 5.5 5 5.72386 5 6V12C5 12.2761 4.77614 12.5 4.5 12.5C4.22386 12.5 4 12.2761 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5Z');
            tableItemSvgPath.setAttribute('fill', 'black');

            const tableItemSvgPath2 = document.createElement('path');
            tableItemSvgPath2.setAttribute('d', 'M7 5.5C7.27614 5.5 7.5 5.72386 7.5 6V12C7.5 12.2761 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.2761 6.5 12V6C6.5 5.72386 6.72386 5.5 7 5.5Z');
            tableItemSvgPath2.setAttribute('fill', 'black');

            const tableItemSvgPath3 = document.createElement('path');
            tableItemSvgPath3.setAttribute('d', 'M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6V12C9 12.2761 9.22386 12.5 9.5 12.5C9.77614 12.5 10 12.2761 10 12V6Z');
            tableItemSvgPath3.setAttribute('fill', 'black');

            const tableItemSvgPath4 = document.createElement('path');
            tableItemSvgPath4.setAttribute('d', 'M13.5 3C13.5 3.55228 13.0523 4 12.5 4H12V13C12 14.1046 11.1046 15 10 15H4C2.89543 15 2 14.1046 2 13V4H1.5C0.947715 4 0.5 3.55228 0.5 3V2C0.5 1.44772 0.947715 1 1.5 1H5C5 0.447715 5.44772 0 6 0H8C8.55229 0 9 0.447715 9 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3ZM3.11803 4L3 4.05902V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V4.05902L10.882 4H3.11803ZM1.5 3V2H12.5V3H1.5Z');
            tableItemSvgPath4.setAttribute('fill', 'black');
            tableItemSvgPath4.setAttribute('fill-rule', 'evenodd');
            tableItemSvgPath4.setAttribute('clip-rule', 'evenodd');

            const tableItemButtonCreate = document.createElement('a');
            tableItemButtonCreate.setAttribute('href', '#/editIncomeOrExpenses');

            const tableItemSvgCreate = document.createElement('svg');
            tableItemSvgCreate.setAttribute('width', '16');
            tableItemSvgCreate.setAttribute('height', '16');
            tableItemSvgCreate.setAttribute('viewBox', '0 0 16 16');
            tableItemSvgCreate.setAttribute('fill', 'none');
            tableItemSvgCreate.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

            const tableItemSvgPathCreate = document.createElement('path');
            tableItemSvgPathCreate.setAttribute('d', 'M12.1465 0.146447C12.3417 -0.0488155 12.6583 -0.0488155 12.8536 0.146447L15.8536 3.14645C16.0488 3.34171 16.0488 3.65829 15.8536 3.85355L5.85357 13.8536C5.80569 13.9014 5.74858 13.9391 5.68571 13.9642L0.68571 15.9642C0.500001 16.0385 0.287892 15.995 0.146461 15.8536C0.00502989 15.7121 -0.0385071 15.5 0.0357762 15.3143L2.03578 10.3143C2.06092 10.2514 2.09858 10.1943 2.14646 10.1464L12.1465 0.146447ZM11.2071 2.5L13.5 4.79289L14.7929 3.5L12.5 1.20711L11.2071 2.5ZM12.7929 5.5L10.5 3.20711L4.00001 9.70711V10H4.50001C4.77616 10 5.00001 10.2239 5.00001 10.5V11H5.50001C5.77616 11 6.00001 11.2239 6.00001 11.5V12H6.29291L12.7929 5.5ZM3.03167 10.6755L2.92614 10.781L1.39754 14.6025L5.21903 13.0739L5.32456 12.9683C5.13496 12.8973 5.00001 12.7144 5.00001 12.5V12H4.50001C4.22387 12 4.00001 11.7761 4.00001 11.5V11H3.50001C3.28561 11 3.10272 10.865 3.03167 10.6755Z');
            tableItemSvgPathCreate.setAttribute('fill', 'black');

            tableItem.appendChild(tableItemScope)
            tableItem.appendChild(tableItemType)
            tableItem.appendChild(tableItemCategory)
            tableItem.appendChild(tableItemAmount)
            tableItem.appendChild(tableItemDate)
            tableItem.appendChild(tableItemComment)

            tableItemSvg.appendChild(tableItemSvgPath)
            tableItemSvg.appendChild(tableItemSvgPath2)
            tableItemSvg.appendChild(tableItemSvgPath3)
            tableItemSvg.appendChild(tableItemSvgPath4)

            tableItemButtonElement.appendChild(tableItemSvg)

            tableItemSvgCreate.appendChild(tableItemSvgPathCreate)

            tableItemButtonCreate.appendChild(tableItemSvgCreate)

            tableItemButton.appendChild(tableItemButtonElement)
            tableItemButton.appendChild(tableItemButtonCreate)

            tableItem.appendChild(tableItemButton)

            this.tableBody.appendChild(tableItem)

        })
    }
}