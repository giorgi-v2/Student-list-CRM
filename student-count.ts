const studentsCount = document.getElementById('studentcount') as HTMLElement;

export function updateStudentCount(studentCount: number): void {
    studentsCount.textContent = String(studentCount);
}