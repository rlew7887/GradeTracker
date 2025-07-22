const params = new URLSearchParams(window.location.search);
const code = params.get('course');
const btn = document.getElementById("addworkBTN");
const cancelBtn = document.getElementById("cancelBTN");

function loadCoursework(courseCode) {
    fetch(`http://localhost:8080/api/list?code=${encodeURIComponent(courseCode)}`)
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

let addRow = false;
btn.addEventListener("click", () => {
    const table = document.getElementById("coursework-table").querySelector("tbody");
    if (!addRow) {
        addRow = true; // used to prevent multiple input fields
        btn.textContent = "Save";
        cancelBtn.style.display = "inline-block";
        const row = document.createElement("tr");
        row.id = "input-row";
        row.innerHTML = `
            <td><input type="text" placeholder="Coursework"></td>
            <td><input type="number" placeholder="Your Mark"></td>
            <td><input type="number" placeholder="Full Mark"></td>
            <td><input type="number" placeholder="Weightage"></td>
        `
        table.appendChild(row);

        // save on enter
        row.querySelectorAll("input").forEach(input => { 
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    saveCoursework();
                }
            });
        });
    } else {
        saveCoursework();
    }
});

function saveCoursework() {
    const row = document.getElementById("input-row");
    const inputs = row.querySelectorAll("input");
    const coursework = inputs[0].value.trim();
    const your_mark = parseFloat(inputs[1].value); // parseFloat converts string to float
    const full_mark = parseFloat(inputs[2].value);
    const weightage = parseFloat(inputs[3].value);
    const code = new URLSearchParams(window.location.search).get("course");

    if (!coursework || isNaN(your_mark) || isNaN(full_mark) || isNaN(weightage)) { // isNan checks 'is not a number'
        alert("Please fill in all fields correctly.");
        return;
    }

    fetch("http://localhost:8080/api/add-coursework", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            course_code: code,
            coursework_type: coursework,
            current_mark: your_mark,
            full_mark,
            weightage
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            // replace editable row with plain text row
            row.innerHTML = `
                <td>${coursework}</td>
                <td>${your_mark}</td>
                <td>${full_mark}</td>
                <td>${weightage}</td>
            `;
            row.removeAttribute("id");
            btn.textContent = "+ Add coursework";
            cancelBtn.style.display = "none";
            addRow = false;
        } else {
            alert("Failed to save coursework.");
        }
    })
    .catch (err => {
        console.error(err);
        alert("Error saving coursework.");
    });
}

cancelBtn.addEventListener("click", () => {
  const inputRow = document.getElementById("input-row");
  if (inputRow) inputRow.remove();

  addRow = false;
  btn.textContent = "+ Add coursework";
  cancelBtn.style.display = "none";
});