import { updateStudentCount } from "./student-count.js";

interface Student {
    id: number;
    firstName: string;
    lastName: string;
    idnumber: string,
    date: string,
    phone: string;
    email: string;
    score: string,
    city: string;
    course: string;
}

const students: Student[] = [];

const form = document.getElementById('studentForm') as HTMLFormElement;
const FirstNameInput = document.getElementById('name') as HTMLInputElement;
const LastNameInput = document.getElementById('surname') as HTMLInputElement;
const IdNumberInput = document.getElementById('id') as HTMLInputElement;
const DateInput = document.getElementById('date') as HTMLInputElement;
const phoneInput = document.getElementById('phone') as HTMLInputElement;
const mailInput = document.getElementById('mail') as HTMLInputElement;
const scoreInput = document.getElementById('score') as HTMLInputElement;
const CitySelect = document.getElementById('city') as HTMLSelectElement;
const CourseSelect = document.getElementById('course') as HTMLSelectElement;
const SortScores = document.getElementById('lowScores') as HTMLSelectElement;
const studentsList = document.getElementById('studentsList') as HTMLElement;

function renderStudents(): void {
    studentsList.innerHTML = '';

    updateStudentCount(students.length);

    let sortedStudents: Student[] = [...students];

    if (SortScores.value === 'low-high') {
        sortedStudents.sort((a, b) => parseInt(a.score) - parseInt(b.score));
    } else if (SortScores.value === 'high-low') {
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

    if(existingStudent){
        alert ('This student is already registered');
        return;
    }

    const student: Student = {
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

export{};