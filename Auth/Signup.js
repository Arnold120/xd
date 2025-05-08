function signup(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("Signup data:", data);
    console.log("username: " + data.username);
    console.log("password: " + data.password);
}