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

const colors = [
    'rgba(194, 168, 129, 1)',
    'rgb(193, 118, 143)',
    'rgb(144, 168, 144)',
    'rgb(135, 160, 186)'
];

let colorIndex = 0;

function addCourseBox(code, name) {
    const box = document.createElement("div");
    box.classList.add("course-box");

    // set alternating background color
    box.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;

    // add text
    box.textContent = `${code}: ${name}`;

    // add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.classList.add("deleteBTN");
    box.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", () => {
        if (confirm(`Are you sure you want to delete ${code}: ${name}?`)) {
            fetch(`http://localhost:8080/api/delete-course/${encodeURIComponent(code)}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    box.remove();
                } else {
                    alert("Failed to delete course");
                }
            })
            .catch(err => {
                console.error(err);
                alert("Error deleting course.");
            });
        }
    });
    container.appendChild(box);
}