const courseForm = document.getElementById("courseForm");
const codeInput = document.getElementById("courseCode");
const nameInput = document.getElementById("courseName");
const container = document.getElementById("course-container");

fetch('http://localhost:8080/api/courses')
    .then((res) => res.json())
    .then((courses) => {
        courses.forEach(course =>addCourseBox(course.course_code, course.course_name));
    });

courseForm.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent page reload
    const courseCode = codeInput.value.trim();
    const courseName = nameInput.value.trim();
    if (!courseCode && !courseName) return;

    fetch('http://localhost:8080/api/add-course', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course_name: courseName, course_code: courseCode })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            addCourseBox(courseCode, courseName);
            nameInput.value = "";
            codeInput.value = "";
        } else {
            alert("Failed to add course");
        }
    });
});

function addCourseBox(code, name) {
    const div = document.createElement("div");
    div.className = "course-box";
    div.textContent = `${code}: ${name}`;
    container.appendChild(div);
}