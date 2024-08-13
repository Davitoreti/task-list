const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

let nameMonths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
let nameDaysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

const table = document.getElementById('list-items');
const th = document.querySelectorAll('item-header');
let td = document.getElementsByTagName('td');
let tr = document.getElementsByTagName('tr');
const tbody = document.getElementById('tbody');
let header = document.getElementById('header');

const currentDate = new Date();
let currentDay = currentDate.getDate();
let numberDay = currentDate.getDay();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

header.innerText = `${nameMonths[currentMonth]} - ${currentYear}`

function makeFirstMonth() {
    let dayCounter = 1;
    for (let i = 0; i < td.length; i++) {
        td[i].innerText = '';
    }

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    for (let i = firstDay; i < firstDay + daysInMonth(currentMonth, currentYear); i++) {
        if (i < td.length) {
            td[i].innerText = dayCounter++;
        }
    }
}

makeFirstMonth();

function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = daysInMonth(currentMonth, currentYear);
    let dayCounter = 1;

    tbody.innerHTML = '';

    let tr = document.createElement('tr');

    for (let i = 0; i < firstDay; i++) {
        let td = document.createElement('td');
        td.setAttribute('class', 'item border-collapse border border-slate-900');
        tr.appendChild(td);
    }

    for (let i = firstDay; i < firstDay + totalDays; i++) {
        if (tr.children.length >= 7) {
            tbody.appendChild(tr);
            tr = document.createElement('tr');
        }
        let td = document.createElement('td');
        td.innerText = dayCounter++;
        td.setAttribute('class', 'item border-collapse border border-slate-900');
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    while (tr.children.length < 7) {
        let td = document.createElement('td');
        td.setAttribute('class', 'item border-collapse border border-slate-900');
        tr.appendChild(td);
    }
}

function updateHeader() {
    header.innerText = `${nameMonths[currentMonth]} - ${currentYear}`;
}

const arrowForward = document.getElementById('arrow-forward').addEventListener('click', advance);

function advance(ev){
    ev.preventDefault();

    currentMonth++
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    updateHeader();
    renderCalendar();
}

const arrowBack = document.getElementById('arrow-back').addEventListener('click', goBack);

    function goBack(ev) {
    ev.preventDefault();

    currentMonth--
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    updateHeader();
    renderCalendar();
}

const registerButton = document.getElementById('register-button');
registerButton.addEventListener('click', makeTask);

function makeTask(ev) {
    ev.preventDefault();

    const textArea = document.getElementById('textAreaTask').value;
    const startDateInput = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate').value;

    const startDate = new Date(startDateInput + 'T00:00:00');
    const endDate = new Date(endDateInput + 'T00:00:00');

    function formatDateToBrazilian(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`; 
    };

    const formattedStartDate = formatDateToBrazilian(startDate);
    const formattedEndDate = formatDateToBrazilian(endDate);

    const startDay = startDate.getDate();
    const startMonth = startDate.getMonth();
    const startYear = startDate.getFullYear();

    if (startMonth !== currentMonth || startYear !== currentYear) {
        currentMonth = startMonth;
        currentYear = startYear;
        renderCalendar();
        updateHeader();
    }

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = daysInMonth(currentMonth, currentYear);

    // Itera sobre as células do calendário para encontrar a célula do dia selecionado
    for (let i = firstDay; i < firstDay + totalDays; i++) {
        let cell = td[i];
        let cellDay = parseInt(cell.innerText);

        // Adiciona a tarefa ao dia correto
        if (cellDay === startDay) {
            cell.innerText += `\n\nTask: ${textArea}\nStart date: ${formattedStartDate}\nEnd date: ${formattedEndDate}\n`;
        }
    }
};
