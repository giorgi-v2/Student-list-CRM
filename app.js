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
const SearchInput = document.getElementById('search');
const SortScores = document.getElementById('lowScores');
const studentsList = document.getElementById('studentsList');
function renderStudents() {
    studentsList.innerHTML = '';
    const searchResult = SearchInput.value;
    let StudentFound = students.filter(student => student.firstName.includes(searchResult) || student.lastName.includes(searchResult) || student.idnumber.includes(searchResult));
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
    SearchInput.addEventListener('input', () => {
        renderStudents();
    });
});
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (editingStudentId !== null) {
        const studentIndex = students.findIndex(s => s.id === editingStudentId);
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
    }
    else {
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
    }
    renderStudents();
    form.reset();
});
studentsList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('delete-button')) {
        const studentId = parseInt(target.getAttribute('data-id') || '0');
        const studentIndex = students.findIndex(s => s.id === studentId);
        if (studentIndex !== -1) {
            students.splice(studentIndex, 1);
            renderStudents();
        }
    }
    if (target.classList.contains('edit-button')) {
        const studentId = parseInt(target.getAttribute('data-id') || '0');
        const studentToEdit = students.find(s => s.id === studentId);
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
            form.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
