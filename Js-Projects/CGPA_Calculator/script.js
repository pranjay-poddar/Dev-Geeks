let courses = [];

function addCourse() {
  const courseName = document.getElementById('course-name').value;
  const courseCode = document.getElementById('course-code').value;
  const credit = parseInt(document.getElementById('credit').value);
  const grade = parseFloat(document.getElementById('grade').value);

  if (courseName && courseCode && credit && grade) {
    courses.push({ courseName, courseCode, credit, grade });
    document.getElementById('course-name').value = '';
    document.getElementById('course-code').value = '';
    document.getElementById('credit').value = '';
    document.getElementById('grade').value = '10';
  }

  displayCourses();
}

function deleteCourse(index) {
  courses.splice(index, 1);
  displayCourses();
}

function displayCourses() {
  const courseList = document.getElementById('course-list');
  courseList.innerHTML = '';

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    const listItem = document.createElement('div');
    listItem.classList.add('course-item');
    listItem.innerHTML = `
      <span class="course-name">${course.courseName}</span>
      <span class="course-details">(${course.courseCode}) - ${course.credit} credits, Grade: ${course.grade}</span>
      <button class="delete-course-btn" onclick="deleteCourse(${i})">Delete</button>
    `;
    courseList.appendChild(listItem);
  }
}

function resetCalculator() {
  courses = [];
  displayCourses();
  document.getElementById('result').textContent = '';
}




function calculateCGPA() {
  let totalCredits = 0;
  let weightedGradePoints = 0;

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    totalCredits += course.credit;
    weightedGradePoints += course.credit * course.grade;
  }

  const cgpa = (weightedGradePoints / totalCredits).toFixed(2);
  document.getElementById('result').textContent = `CGPA: ${cgpa}`;
}
