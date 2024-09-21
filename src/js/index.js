const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
const nameDay = document.getElementById('day-name');
const nameMonth = document.getElementById('month-name');
const nameYear = document.getElementById('year-name');
const btn = document.getElementById('btn');
const emptyInput = document.querySelectorAll('.empty');
const validInput = document.querySelectorAll('.valid-number');
const validDateInput = document.querySelector('.valid-date');
const valueYears = document.querySelector('.result-years');
const valueMonths = document.querySelector('.result-months');
const valueDays = document.querySelector('.result-days');

btn.addEventListener('click', validateAndCalculateAge);

[inputDay, inputMonth, inputYear].forEach(input => {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            btn.click();
        }
    });
});

function validateAndCalculateAge() {
    hideMessages();

    const day = validateInput(inputDay, nameDay, emptyInput[0], validInput[0], 1, 31);
    const month = validateInput(inputMonth, nameMonth, emptyInput[1], validInput[1], 1, 12);
    const year = validateInput(inputYear, nameYear, emptyInput[2], validInput[2], 1, 2024);

    if (day && month && year) {
        const birthDate = new Date(year, month - 1, day);
        if (isValidDate(birthDate, day, month, year)) {
            calculateAge(birthDate);
        } else {
            showDateError();
        }
    }
}

function hideMessages() {
    emptyInput.forEach(msg => msg.style.display = 'none');
    validInput.forEach(msg => msg.style.display = 'none');
    validDateInput.style.display = 'none';
}

function validateInput(input, nameLabel, emptyMsg, validMsg, min, max) {
    const value = input.value;
    if (!value) {
        nameLabel.classList.add('error-name');
        input.classList.add('error-input');
        emptyMsg.style.display = 'block';
        return false;
    }
    if (value < min || value > max) {
        nameLabel.classList.add('error-name');
        input.classList.add('error-input');
        validMsg.style.display = 'block';
        return false;
    }
    nameLabel.classList.remove('error-name');
    input.classList.remove('error-input');
    emptyMsg.style.display = 'none';
    return value;
}

function isValidDate(birthDate, day, month, year) {
    return birthDate.getDate() == day &&
        birthDate.getMonth() == month - 1 &&
        birthDate.getFullYear() == year;
}

function showDateError() {
    [nameDay, nameMonth, nameYear].forEach(name => name.classList.add('error-name'));
    [inputDay, inputMonth, inputYear].forEach(input => input.classList.add('error-input'));
    validDateInput.style.display = 'block';
}

function calculateAge(birthDate) {
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    valueYears.textContent = ageYears;
    valueMonths.textContent = ageMonths;
    valueDays.textContent = ageDays;
}