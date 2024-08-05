const registerButton = document.getElementById('register-button');

registerButton.addEventListener('click', makeList);

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

let nameMonths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
let nameDaysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

const table = document.getElementById('list-items');
const th = document.querySelectorAll('item-header');
const td = document.getElementsByTagName('td');

const currentDate = new Date();
let currentDay = currentDate.getDate();
let numberDay = currentDate.getDay();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const nameDay = nameDaysOfWeek[numberDay];
console.log(nameDay)

// getDate() = número do dia (no caso hoje é dia 05, então vai retornar 5)
// getDay() = número do dia da semana (0 = domingo, 1 = segunda...)

function makeDays() {
    let dayCounter = 1;
    for(let i = 0; i < td.length; i++){
        td[i].innerText = '';
    }

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    console.log(firstDay)

    for(let i = firstDay; i < firstDay + daysInMonth(currentMonth, currentYear); i++){
        if(i < td.length){
            td[i].innerText = dayCounter++;
        }
    }
}

makeDays();

function makeList(ev) {
    ev.preventDefault();

    const textArea = document.getElementById('textAreaTask').value;
    const startDateInput = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate').value;

    const startDate = new Date(startDateInput + 'T00:00:00');
    const endDate = new Date(endDateInput + 'T00:00:00');

    const formattedStartDate = formatDateToBrazilian(startDate);
    const formattedEndDate = formatDateToBrazilian(endDate);

    td.innerText = 'Task: ' + textArea + '\n' + 'Start date: ' + formattedStartDate + '\n' + 'End date: ' + formattedEndDate + '\n\n';

    table.appendChild(td);

};

function formatDateToBrazilian(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

