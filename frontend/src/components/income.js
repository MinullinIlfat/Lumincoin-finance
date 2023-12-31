import config from "../../config/config.js";
import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";

export class Income {
    constructor() {
        this.incomeElement = document.getElementById('income');
        this.incomeTextElement = document.getElementById('income-text');

        this.expensesElement = document.getElementById('expenses');
        this.expensesTextElement = document.getElementById('expenses-text');

        this.sidebarCategoryElement = document.getElementById('sidebar-category');
        this.categoryButtonElement = document.getElementById('category-button');
        this.orderCollapseElement = document.getElementById('orders-collapse');
        this.categorySvgElement = document.getElementById('category-svg');
        this.sidebarCategoryCollapseElements = document.getElementById('sidebar-category-collapse')

        this.buttonElements = document.querySelectorAll('.button-element');
        this.collapseButtonElements = document.querySelectorAll('.collapse-button');
        this.svgElements = document.querySelectorAll('.svg-element');

        this.sidebarFinance = document.getElementById('sidebar-finance');
        this.sidebarFinanceText = document.getElementById('sidebar-finance-text');
        this.sidebarFinanceSvg = document.getElementById('sidebar-finance-svg');

        this.sidebarMain = document.getElementById('sidebar-main');
        this.sidebarMainText = document.getElementById('sidebar-main-text');
        this.ssidebarMainSvg = document.getElementById('sidebar-main-svg');

        this.popupIncome = document.getElementById('popup-income');


        this.removeElement()
        this.inactive()
        this.activeElement()
        this.init()
    }

    async init() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/login'
        }

        try {
            const result = await CustomHttp.request(config.host + '/categories/income');
            if (result) {

                this.showIncomeElements(result)
            }
        } catch (error) {
            console.log(error);
        }
    }

    showIncomeElements(result) {
        const categoryItems = document.getElementById('category-income-items');

        result.forEach(item => {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';
            categoryItem.setAttribute('id', item.id)

            const categoryItemName = document.createElement('div');
            categoryItemName.className = 'category-item-name';
            categoryItemName.innerText = item.title;

            const categoryItemActive = document.createElement('div');
            categoryItemActive.className = 'category-item-active';

            const editBtnIncome = document.createElement('a');
            editBtnIncome.setAttribute('href', '#/editCategoryIncome');
            editBtnIncome.className = 'edit-btn-income btn btn-primary me-2';
            editBtnIncome.innerText = 'Редактировать';

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn btn btn-danger';
            deleteBtn.innerText = 'Удалить';

            categoryItemActive.appendChild(editBtnIncome)
            categoryItemActive.appendChild(deleteBtn)

            categoryItem.appendChild(categoryItemName)
            categoryItem.appendChild(categoryItemActive)
            categoryItems.appendChild(categoryItem)
        })

        const categoryItemAdd = document.createElement('a');
        categoryItemAdd.className = 'category-item category-item-add d-flex justify-content-center align-items-center';
        categoryItemAdd.setAttribute('href', '#/createCategoryIncome');
        categoryItemAdd.innerText = '+';

        categoryItems.appendChild(categoryItemAdd)

        this.editBtnElements = document.querySelectorAll('.edit-btn-income')
        this.editBtnElements.forEach(item => {
            item.onclick = function () {
                const result = item.parentElement.previousElementSibling.textContent
                const resultId = item.parentElement.parentElement.id
                localStorage.setItem('BlockName', JSON.stringify(result))
                localStorage.setItem('BlockId', JSON.stringify(resultId))
            }
        })

        this.deleteBtnElement = document.querySelectorAll('.delete-btn')
        this.popupDeleteCategory = document.getElementById('popup-delete-category-income')
        const that = this
        this.deleteBtnElement.forEach(item => {
            item.onclick = function () {
                that.popupIncome.style.display = 'grid'
                that.popupDeleteCategory.onclick = function () {
                    let resultId = item.parentElement.parentElement.id
                    try {
                        const result = CustomHttp.request(config.host + '/categories/income/' + resultId, "DELETE");
                        if (result) {
                            location.href = '#/income'
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        })
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

        localStorage.removeItem('BlockName')
        localStorage.removeItem('BlockId')
    }

    activeElement() {
        this.incomeElement.classList.remove('link-dark')
        this.incomeElement.classList.add('nav-link', 'active')
        this.incomeElement.style.borderRadius = '0px'

        this.categoryButtonElement.classList.remove('link-dark', 'collapsed')
        this.categoryButtonElement.classList.add('nav-link', 'active')

        this.incomeTextElement.classList.remove('link-dark')
        this.incomeTextElement.classList.add('nav-link', 'active')

        this.orderCollapseElement.classList.add('show')

        this.categorySvgElement.style.fill = 'white'

        this.sidebarCategoryCollapseElements.classList.add('nav-link', 'active')
        this.sidebarCategoryCollapseElements.style.borderRadius = '0px'
        this.sidebarCategoryCollapseElements.style.borderTopLeftRadius = '5px'
        this.sidebarCategoryCollapseElements.style.borderTopRightRadius = '5px'

        this.sidebarCategoryElement.style.border = '1px solid #0D6EFD'
        this.sidebarCategoryElement.style.borderRadius = '5px'
    }

    inactive() {
        this.expensesTextElement.classList.remove('link-dark')
        this.expensesElement.style.borderRadius = '0px'
        this.expensesElement.style.borderBottomLeftRadius = '5px'
        this.expensesElement.style.borderBottomRightRadius = '5px'

        this.sidebarFinance.classList.remove('nav-link', 'active')
        this.sidebarFinanceText.classList.remove('active')
        this.sidebarFinanceText.classList.add('link-dark')
        this.sidebarFinanceSvg.style.fill = 'black'

        this.sidebarMain.classList.remove('nav-link', 'active');
        this.sidebarMainText.classList.remove('active');
        this.sidebarMainText.classList.add('link-dark');
        this.ssidebarMainSvg.style.fill = 'black';
    }
}