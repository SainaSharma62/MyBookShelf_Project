$(document).ready(function(){
    $("#myBtn").click(function(){
      $("#loginModal").modal();
    });
  
    $("#showSignup").click(function(){
      $("#loginModal").modal('hide');
      $("#signupModal").modal();
    });
  
    $("#showLogin").click(function(){
      $("#signupModal").modal('hide');
      $("#loginModal").modal();
    });
  
    // Signup form submission
    $("#signupForm").submit(function(event) {
      event.preventDefault();
      var name = $("#signup-name").val();
      var email = $("#signup-email").val();
      var password = $("#signup-password").val();
      var confirmPassword = $("#signup-confirm-password").val();
  
      if (password !== confirmPassword) {
        Toastify({
          text: "Passwords do not match!",
          backgroundColor: "red",
          duration: 3000
        }).showToast();
        return;
      }
  
      var users = JSON.parse(localStorage.getItem('users')) || [];
      var userExists = users.some(function(user) {
        return user.email === email;
      });
  
      if (userExists) {
        Toastify({
          text: "User already registered!",
          backgroundColor: "red",
          duration: 3000
        }).showToast();
        $("#signupModal").modal('hide');
        $("#loginModal").modal('show');
      } else {
        users.push({ name: name, email: email, password: password });
        localStorage.setItem('users', JSON.stringify(users));
        Toastify({
          text: "Registered successfully!",
          backgroundColor: "green",
          duration: 3000
        }).showToast();
        $("#signupModal").modal('hide');
        $("#loginModal").modal('show');
      }
    });
  
    // Login form submission
    $("#loginForm").submit(function(event) {
      event.preventDefault();
      var email = $("#login-username").val();
      var password = $("#login-password").val();
  
      var users = JSON.parse(localStorage.getItem('users')) || [];
      var user = users.find(function(user) {
        return user.email === email && user.password === password;
      });
  
      if (user) {
        Toastify({
          text: "Login successful!",
          backgroundColor: "green",
          duration: 3000
        }).showToast();
        // Redirect to the main page or perform other actions upon successful login
      } else {
        Toastify({
          text: "Invalid email or password!",
          backgroundColor: "red",
          duration: 3000
        }).showToast();
      }
    });
  });
  