var incomeChart = document.getElementById("incomeChart");
var expensesChart = document.getElementById("expensesChart");

Chart.defaults.global.defaultFontFamily = "Roboto-Medium";
Chart.defaults.global.defaultFontSize = 12;
Chart.defaults.global.defaultFontColor = "#000000";

var canvasIncome = document.getElementById("incomeChart");
canvasIncome.width = 414;
canvasIncome.height = 467;
var canvasExpenses = document.getElementById("expensesChart");
canvasExpenses.width = 414;
canvasExpenses.height = 467;

var incomeChartData = {
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

var incomeChart = new Chart(incomeChart, {
    type: 'pie',
    data: incomeChartData
});

var expensesChartData = {
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

var expensesChart = new Chart(expensesChart, {
    type: 'pie',
    data: expensesChartData
});