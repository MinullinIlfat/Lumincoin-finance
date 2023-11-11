(function () {
    const confirmPassword = document.getElementById('confirm-password');
    const password = document.getElementById('password');
    const SignUp = {
        agreeElement: null,
        processElement: null,
        fields: [
            {
                name: 'name',
                id: 'name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false
            },
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false
            },
            {
                name: 'password',
                id: 'confirm-password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false
            },
        ],
        init() {
            const that = this;
            this.fields.forEach(item => {
                item.element = document.getElementById(item.id);
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                }
            });

            this.processElement = document.getElementById('process');
            this.processElement.onclick = function () {
                that.processForm()
            }
        },
        validateField(field, element) {
            console.log(password.value)
            console.log(confirmPassword.value)
            if (!element.value || !element.value.match(field.regex)) {
                element.style.setProperty("border", "1px solid red", "important")
                field.valid = false;
            } else {
                element.removeAttribute('style');
                field.valid = true;
            }
            this.validateForm();
        },

        validateForm() {
            const validForm = this.fields.every(item => item.valid);
            if (validForm) {
                this.processElement.removeAttribute('disabled');
            } else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
            return validForm;
        },

        processForm() {
            let paramString = '';
            if (this.validateForm()) {
                this.fields.forEach(item => {
                    paramString += (!paramString ? '?' : '&') + item.name + '=' + item.element.value;
                })

                location.href = 'main.html' + paramString;
            }
        }
    };

    SignUp.init();
})();