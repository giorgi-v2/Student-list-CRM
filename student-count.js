const studentsCount = document.getElementById('studentcount');
export function updateStudentCount(studentCount) {
    studentsCount.textContent = String(studentCount);
}
