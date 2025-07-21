const params = new URLSearchParams(window.location.search);
const code = params.get('course');

function loadCoursework(courseCode) {
    fetch(`http://locahlhost:8080/api/list?code=${encodeURIComponent(courseCode)}`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#coursework-table tbody");
            tbody.innerHTML = ""; // clear existing rows
            data.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.coursework_type}</td>
                    <td>${item.current_mark}</td>
                    <td>${item.full_mark}</td>
                    <td>${item.weightage}</td>
                    `;
                tbody.appendChild(row);
            });
        })
        .catch(err => {
            console.error("Error loading coursework:", err);
        });
}

if (code) {
    loadCoursework(code);
}