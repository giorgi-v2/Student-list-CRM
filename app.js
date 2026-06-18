import { updateStudentCount } from "./student-count.js";
const students = [];
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
const SortScores = document.getElementById('lowScores');
const studentsList = document.getElementById('studentsList');
function renderStudents() {
    studentsList.innerHTML = '';
    updateStudentCount(students.length);
    let sortedStudents = [...students];
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
            <h3>#${student.id} ${''} ${'Fullname:'} ${''} ${student.firstName} ${''} ${student.lastName}</h3>
            <div class='students-list__field'> ${'ID:'} ${''} ${student.idnumber}  </div>
            <p> ${'Birthdate:'} ${''} ${student.date}</p>
            <p> ${'Phone number:'} ${''} ${student.phone}</p>
            <p> ${'E-mail:'} ${''} ${student.email}</p>
            <p> ${'Score:'} ${''} ${student.score}</p>
            ${''} ${failedStatus}
            ${''} ${passStatus}
            <p> ${'City:'} ${''} ${student.city}</p>
            <p> ${'Course:'} ${''} ${student.course}</p>
            <div class='button-container'>
                <button class='edit-button'> Edit</button>
                <button class='delete-button'>Delete</button>
            </div>
        </div>
        `;
    });
}
SortScores.addEventListener('change', () => {
    renderStudents();
});
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const existingStudent = students.find((student) => {
        return student.email === mailInput.value;
    });
    if (existingStudent) {
        alert('This student is already registered');
        return;
    }
    const student = {
        id: students.length + 1,
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
    renderStudents();
    form.reset();
    // studentCount.innerText = `${students.length}`
});
