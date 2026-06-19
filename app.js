import { updateStudentCount } from "./student-count.js";
import { saveStudents, getStudents } from "./storage.js";
const students = getStudents();
let editingStudentId = null;
const form = document.getElementById('studentForm');
const FirstNameInput = document.getElementById('name');
const LastNameInput = document.getElementById('surname');
const IdNumberInput = document.getElementById('id');
const DateInput = document.getElementById('date');
const phoneInput = document.getElementById('phone');
const mailInput = document.getElementById('mail');
const scoreInput = document.getElementById('score');
const CitySelect = document.getElementById('city');
const CourseSelect = document.getElementById('course');
const submitButton = form.querySelector('button[type="submit"]');
const SearchInput = document.getElementById('search');
const SortScores = document.getElementById('lowScores');
const studentsList = document.getElementById('studentsList');
function renderStudents() {
    studentsList.innerHTML = '';
    const searchResult = SearchInput.value.toLowerCase();
    let StudentFound = students.filter((student) => student.firstName.toLowerCase().includes(searchResult) ||
        student.lastName.toLowerCase().includes(searchResult) ||
        student.idnumber.includes(searchResult));
    updateStudentCount(StudentFound.length);
    let sortedStudents = [...StudentFound];
    if (SortScores.value === 'low-high') {
        sortedStudents.sort((a, b) => parseInt(a.score) - parseInt(b.score));
    }
    else if (SortScores.value === 'high-low') {
        sortedStudents.sort((a, b) => parseInt(b.score) - parseInt(a.score));
    }
    sortedStudents.forEach((student) => {
        const studentScore = parseInt(student.score);
        const failedStatus = studentScore < 50 ? '<p style="color: red; font-weight: bold;">Student Failed</p>' : '';
        const passStatus = studentScore >= 50 ? '<p style="color: green; font-weight: bold;">Student passed</p>' : '';
        studentsList.innerHTML += `
        <div class='students-list__item'>
            <h3>#${student.id} Fullname: ${student.firstName} ${student.lastName}</h3>
            <div class='students-list__field'> ID: ${student.idnumber} </div>
            <p> Birthdate: ${student.date}</p>
            <p> Phone number: ${student.phone}</p>
            <p> E-mail: ${student.email}</p>
            <p> Score: ${student.score}</p>
            ${failedStatus}
            ${passStatus}
            <p> City: ${student.city}</p>
            <p> Course: ${student.course}</p>
            <div class='button-container'>
                <button class='edit-button' data-id="${student.id}"> Edit</button>
                <button class='delete-button' data-id="${student.id}">Delete</button>
            </div>
        </div>
        `;
    });
}
SortScores.addEventListener('change', () => {
    renderStudents();
});
SearchInput.addEventListener('input', () => {
    renderStudents();
});
form.addEventListener('submit', (event) => {
    DateInput.setCustomValidity("");
    if (!DateInput.value)
        return;
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Months are 0-indexed
    const currentDay = today.getDate();
    const [selectedYear, selectedMonth, selectedDay] = DateInput.value.split('-').map(Number);
    const selectedDateValue = (selectedYear * 10000) + (selectedMonth * 100) + selectedDay;
    const todayDateValue = (currentYear * 10000) + (currentMonth * 100) + currentDay;
    if (selectedDateValue > todayDateValue) {
        event.preventDefault();
        DateInput.setCustomValidity("Date cannot be in the future!");
        DateInput.reportValidity();
        return;
    }
    event.preventDefault();
    if (editingStudentId !== null) {
        const studentIndex = students.findIndex((s) => s.id === editingStudentId);
        if (studentIndex !== -1) {
            students[studentIndex] = {
                id: editingStudentId,
                firstName: FirstNameInput.value,
                lastName: LastNameInput.value,
                idnumber: IdNumberInput.value,
                date: DateInput.value,
                phone: phoneInput.value,
                email: mailInput.value,
                score: scoreInput.value,
                city: CitySelect.value,
                course: CourseSelect.value
            };
        }
        editingStudentId = null;
        submitButton.innerText = 'Sign Up';
    }
    else {
        const existingStudent = students.find((student) => {
            return student.email === mailInput.value;
        });
        if (existingStudent) {
            alert('This student is already registered');
            return;
        }
        const nextId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
        const student = {
            id: nextId,
            firstName: FirstNameInput.value,
            lastName: LastNameInput.value,
            idnumber: IdNumberInput.value,
            date: DateInput.value,
            phone: phoneInput.value,
            email: mailInput.value,
            score: scoreInput.value,
            city: CitySelect.value,
            course: CourseSelect.value
        };
        students.push(student);
    }
    saveStudents(students);
    renderStudents();
    form.reset();
});
studentsList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('delete-button')) {
        const studentId = parseInt(target.getAttribute('data-id') || '0');
        const studentIndex = students.findIndex((s) => s.id === studentId);
        if (studentIndex !== -1) {
            students.splice(studentIndex, 1);
            saveStudents(students);
            renderStudents();
        }
    }
    if (target.classList.contains('edit-button')) {
        const studentId = parseInt(target.getAttribute('data-id') || '0');
        const studentToEdit = students.find((s) => s.id === studentId);
        if (studentToEdit) {
            FirstNameInput.value = studentToEdit.firstName;
            LastNameInput.value = studentToEdit.lastName;
            IdNumberInput.value = studentToEdit.idnumber;
            DateInput.value = studentToEdit.date;
            phoneInput.value = studentToEdit.phone;
            mailInput.value = studentToEdit.email;
            scoreInput.value = studentToEdit.score;
            CitySelect.value = studentToEdit.city;
            CourseSelect.value = studentToEdit.course;
            editingStudentId = studentId;
            submitButton.innerText = 'Done';
            form.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
renderStudents();
