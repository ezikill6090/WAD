// Check if user data already exists in local storage
let userData = JSON.parse(localStorage.getItem('users')) || [];

// Function to render users in the list
function renderUserList(users) {
    let userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear existing list

    users.forEach(function(user) {
        let li = document.createElement('li');
        li.textContent = `Username: ${user.username}, Email: ${user.email}`;
        userList.appendChild(li);
    });
}

// Call render function to display existing users
renderUserList(userData);

// Handle form submission
document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting the traditional way

    // Get user input values
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Basic validation
    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Create user object
    let newUser = {
        username: username,
        email: email,
        password: password // Note: Avoid storing passwords in localStorage in real-world apps.
    };

    // Add user to the userData array
    userData.push(newUser);

    // Save updated user data to local storage
    localStorage.setItem('users', JSON.stringify(userData));

    // Simulate sending data to server using AJAX (POST method)
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 201) {
            console.log('Data sent to server:', xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(newUser));

    // Clear form after submission
    document.getElementById('registration-form').reset();

    // Redirect to another page (optional)
    window.location.href = 'ask1.html'; // You can modify this to a valid redirection
});
