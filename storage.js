export function saveStudents(data) {
    localStorage.setItem('students', JSON.stringify(data));
}
export function getStudents() {
    const savedData = localStorage.getItem('students');
    return savedData ? JSON.parse(savedData) : [];
}
