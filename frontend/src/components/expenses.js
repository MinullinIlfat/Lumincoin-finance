import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

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

        this.popupExpenses = document.getElementById('popup-expenses')

        this.removeElement()
        this.inactive ()
        this.activeElement()
        this.init()
    }

    async init() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/login'
        }
        try {
            const result = await CustomHttp.request(config.host + '/categories/expense');
            if (result) {
                this.showExpenseElements(result)
            }
        } catch (error) {
            console.log(error);
        }
    }

    showExpenseElements(result) {
        const categoryItems = document.getElementById('category-expense-items');

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
            editBtnIncome.setAttribute('href', '#/editCategoryExpenses');
            editBtnIncome.className = 'edit-btn-expenses btn btn-primary me-2';
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
        categoryItemAdd.setAttribute('href', '#/createCategoryExpenses');
        categoryItemAdd.innerText = '+';

        categoryItems.appendChild(categoryItemAdd)

        this.editBtnElements = document.querySelectorAll('.edit-btn-expenses')
        this.editBtnElements.forEach(item => {
            item.onclick = function () {
                const result = item.parentElement.previousElementSibling.textContent
                const resultId = item.parentElement.parentElement.id
                localStorage.setItem('BlockName', JSON.stringify(result))
                localStorage.setItem('BlockId', JSON.stringify(resultId))
            }
        })

        this.deleteBtnElement = document.querySelectorAll('.delete-btn')
        this.popupDeleteCategory = document.getElementById('popup-delete-category-expense')
        const that = this
        this.deleteBtnElement.forEach(item => {
            item.onclick = function () {
                that.popupExpenses.style.display = 'grid'
                that.popupDeleteCategory.onclick = function () {
                    let resultId = item.parentElement.parentElement.id
                    try {
                        const result = CustomHttp.request(config.host + '/categories/expense/' + resultId, "DELETE");
                        if (result) {
                            location.href = '#/expenses'
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
            item.classList.remove('nav-link')
        })

        localStorage.removeItem('BlockName')
        localStorage.removeItem('BlockId')
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