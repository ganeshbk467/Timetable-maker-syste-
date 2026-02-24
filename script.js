// ---------------- USER STORAGE ----------------
let users = JSON.parse(localStorage.getItem("users")) || [];

// ---------------- REGISTER ----------------
function register() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    if (!username || !password) {
        document.getElementById("regError").innerText = "Fill all fields!";
        return;
    }

    let userExists = users.find(user => user.username === username);

    if (userExists) {
        document.getElementById("regError").innerText = "Username already exists!";
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");
    window.location.href = "index.html";
}

// ---------------- LOGIN ----------------
function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    let validUser = users.find(
        user => user.username === username && user.password === password
    );

    if (validUser) {
        localStorage.setItem("currentUser", username);
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Invalid Credentials!";
    }
}

// ---------------- LOGOUT ----------------
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// ---------------- TEACHERS & CLASSES ----------------
let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
let classes = JSON.parse(localStorage.getItem("classes")) || [];

// ---------------- ADD TEACHER ----------------
function addTeacher() {
    const name = document.getElementById("teacherName").value;
    const subject = document.getElementById("teacherSubject").value;

    if (name && subject) {
        teachers.push({ name, subject });
        localStorage.setItem("teachers", JSON.stringify(teachers));
        alert("Teacher Added!");
    }
}

// ---------------- ADD CLASS ----------------
function addClass() {
    const className = document.getElementById("className").value;

    if (className) {
        classes.push(className);
        localStorage.setItem("classes", JSON.stringify(classes));
        alert("Class Added!");
    }
}

// ---------------- GENERATE TIMETABLE ----------------
function generateTimetable() {

    if (teachers.length === 0 || classes.length === 0) {
        alert("Add teachers and classes first!");
        return;
    }

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const periods = ["1", "2", "3", "4", "5"];

    let output = "";

    classes.forEach(cls => {
        output += `<h4>Class: ${cls}</h4>`;
        output += "<table><tr><th>Day</th>";

        periods.forEach(p => {
            output += `<th>P${p}</th>`;
        });

        output += "</tr>";

        days.forEach(day => {
            output += `<tr><td>${day}</td>`;
            periods.forEach(() => {
                let randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];
                output += `<td>${randomTeacher.subject}<br>${randomTeacher.name}</td>`;
            });
            output += "</tr>";
        });

        output += "</table><br>";
    });

    document.getElementById("timetable").innerHTML = output;
}