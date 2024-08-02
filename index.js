const registerButton = document.getElementById('register-button');

registerButton.addEventListener('click', makeList);

let index = 0;

function makeList(ev) {
    ev.preventDefault();

    const textArea = document.getElementById('textAreaTask').value;
    const startDateInput = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate').value;
    const listItems = document.getElementById('list-items');

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

    const li = document.createElement('li');
    const rowIndex = index++;
    li.id = 'task-' + rowIndex;
    li.className = 'task';
    li.innerText = 'Task: ' + textArea + '\n' + 'Start date: ' + formattedStartDate + '\n' + 'End date: ' + formattedEndDate;

    listItems.appendChild(li);

}
