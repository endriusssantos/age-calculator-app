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

btn.addEventListener('click', () => {
    emptyInput.forEach(message => message.style.display = 'none');
    validInput.forEach(message => message.style.display = 'none');
    validDateInput.style.display = 'none';

    if (!inputDay.value) {
        nameDay.classList.add('error-name');
        inputDay.classList.add('error-input');
        emptyInput[0].style.display = 'block';
    } else if (inputDay.value < 1 || inputDay.value > 31) {
        nameDay.classList.add('error-name');
        inputDay.classList.add('error-input');
        validInput[0].style.display = 'block';
    } else {
        nameDay.classList.remove('error-name');
        inputDay.classList.remove('error-input');
        emptyInput[0].style.display = 'none';
    }

    if (!inputMonth.value) {
        nameMonth.classList.add('error-name');
        inputMonth.classList.add('error-input');
        emptyInput[1].style.display = 'block';
    } else if (inputMonth.value < 1 || inputMonth.value > 12) {
        nameMonth.classList.add('error-name');
        inputMonth.classList.add('error-input');
        validInput[1].style.display = 'block';
    } else {
        nameMonth.classList.remove('error-name');
        inputMonth.classList.remove('error-input');
        emptyInput[1].style.display = 'none';
    }

    if (!inputYear.value) {
        nameYear.classList.add('error-name');
        inputYear.classList.add('error-input');
        emptyInput[2].style.display = 'block';
    } else if (inputYear.value < 1 || inputYear.value > 2024) {
        nameYear.classList.add('error-name');
        inputYear.classList.add('error-input');
        validInput[2].style.display = 'block';
    } else {
        nameYear.classList.remove('error-name');
        inputYear.classList.remove('error-input');
        emptyInput[2].style.display = 'none';
    }

    if (inputDay.value && inputMonth.value && inputYear.value &&
        (inputDay.value >= 1 && inputDay.value <= 31) &&
        (inputMonth.value >= 1 && inputMonth.value <= 12)) {

        const birthDate = new Date(inputYear.value, inputMonth.value - 1, inputDay.value);

        if (birthDate.getDate() != inputDay.value ||
            birthDate.getMonth() != inputMonth.value - 1 ||
            birthDate.getFullYear() != inputYear.value) {
            nameDay.classList.add('error-name');
            inputDay.classList.add('error-input');
            nameMonth.classList.add('error-name');
            inputMonth.classList.add('error-input');
            nameYear.classList.add('error-name');
            inputYear.classList.add('error-input');
            validDateInput.style.display = 'block';
            return;
        }

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
});

function triggerButton() {
    btn.click();
}

[inputDay, inputMonth, inputYear].forEach(input => {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            triggerButton(); 
        }
    });
});