var signup_btn = document.getElementById("signup_link");
var login_btn = document.getElementById("login_link");
var signup_box = document.getElementById("signup");
var login_box = document.getElementById("login");

signup_btn.onclick = function signup_show() {
	login_box.style.display = "none";
	signup_box.style.display = "block";
	var email = document.getElementById("email").value;
	var pass = document.getElementById("password").value;
	var username = document.getElementById("username").value;
	var phone = document.getElementById("phone").value;
	if (email != "" && pass != "" && username != "" && phone != "") {
		email = "";
		pass = "";
		username = "";
		phone = "";
	}

}

login_btn.onclick = function login_show() {
	signup_box.style.display = "none";
	login_box.style.display = "block";
	var login_email = document.getElementById("login_email");
	var login_pass = document.getElementById("login_password");

	if (login_email != "" && login_pass != "") {
		login_email.value = "";
		login_pass.value = "";
	}
}
