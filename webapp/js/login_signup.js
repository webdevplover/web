// signup coding start 

var signup_form = document.getElementById("signup_frm");

signup_form.onsubmit = function signup()
{
	var user = btoa(document.getElementById("username").value);
	var email = btoa(document.getElementById("email").value);
	var phone = btoa(document.getElementById("phone").value);
	var pass = btoa(document.getElementById("password").value);
	var user_object_data = { username: user, email: email, phone: phone, pass: pass };
	var user_text_data = JSON.stringify(user_object_data);

	if (user != "" && email != "" && phone != "" && pass != "")
	{

		localStorage.setItem(email, user_text_data);
		var signup_btn_change = document.getElementById("signup_btn");
		signup_btn_change.style.background = "#14b129";
		signup_btn_change.innerHTML = "<i class='fas fa-check-circle'></i>Signup Successful!";

		setTimeout(function a()
		{
			signup_form.reset();
			signup_btn_change.innerHTML = "Sign Up";
			signup_btn_change.style.background = "linear-gradient(to right,#E100Ff,#7F00Ff)";
			var login_link_text = document.getElementById("login_link_text");
			login_link_text.innerHTML = "You can login now";
		}, 2000);
	}


	var strong_pass = document.getElementById("strong_pass");
	var weak = document.getElementById("weak_pass");
	var good = document.getElementById("good_pass");
	weak.style.display = "none";
	good.style.display = "none";
	strong_pass.style.display = "none";
	return false;
}

// signup page password validation number,samll letter and capital letter coding start 

var password = document.getElementById("password");

password.oninput = function()
{

	var pass = document.getElementById("password").value;
	var capital = /[A-Z]/g;
	var small = /[a-z]/g;
	var number = /[0-9]/g;
	var strong_pass = document.getElementById("strong_pass");
	var weak = document.getElementById("weak_pass");
	var good = document.getElementById("good_pass");
	var signup_btn = document.getElementById("signup_btn");


	if (pass.match(capital) || pass.match(small) || pass.match(number))
	{

		strong_pass.style.display = "none";
		good.style.display = "none";
		weak.style.display = "block";
		signup_btn.disable = true;
		signup_btn.style.background = "#ccc";

	}

	if (pass == "")
	{
		weak.style.display = "none";
		good.style.display = "none";
		strong_pass.style.display = "none";
	}

	if (pass.match(capital) && pass.match(small))
	{
		strong_pass.style.display = "none"
		weak.style.display = "none";
		good.style.display = "block";
		signup_btn.disable = false;
		signup_btn.style.background = "linear-gradient(to right,#E100Ff,#7F00Ff)";
	}

	if (pass.match(number) && pass.match(small))
	{
		strong_pass.style.display = "none"
		weak.style.display = "none";
		good.style.display = "block";
		signup_btn.disable = false;
		signup_btn.style.background = "linear-gradient(to right,#E100Ff,#7F00Ff)";
	}

	if (pass.match(capital) && pass.match(small) && pass.match(number))
	{
		weak.style.display = "none";
		good.style.display = "none"
		strong_pass.style.display = "block";
		signup_btn.disable = false;
		signup_btn.style.background = "linear-gradient(to right,#E100Ff,#7F00Ff)";
	}





	// Tab to edit
	// signup page password validation number,samll letter and capital letter coding end 
}








//signup page email validation coding start
var email_input = document.getElementById("email");
email_input.onchange = function p()
{
	email_value = btoa(document.getElementById("email").value);
	icon = document.getElementById("email_notice");
	signup_btn = document.getElementById("signup_btn");

	if (localStorage.getItem(email_value) != null)
	{
		icon.style.display = "block";
		email_input.style.borderBottomColor = "red";
		signup_btn.disable = true;
		signup_btn.style.background = "#ccc";

		email_input.onclick = function()
		{
			//email_input.value= "";
			email_input.style.borderBottomColor = "#ccc";
			icon.style.display = "none";
			signup_btn.disable = false;
			signup_btn.style.background = "linear-gradient(to right,#E100Ff,#7F00Ff)"
		}
	}
	return false;
}
// signup page email validation coding end 

// signup page coding end

// login page coding start

var login_frm = document.getElementById("login_frm");
login_frm.onsubmit = function()
{
	var email = document.getElementById("login_email");
	var password = document.getElementById("login_password");
	var login_email_warning = document.getElementById("login_email_warning");
	var login_password_warning = document.getElementById("login_password_warning");

	if (localStorage.getItem(btoa(email.value)) == null)
	{
		login_email_warning.style.display = "block";
		email.style.borderBottomColor = "red";

		email.onclick = function()
		{
			//	email.value = ""; 
			login_email_warning.style.display = "none";
			email.style.borderBottomColor = "#ccc";
		}
	}

	else
	{
		var text_data = localStorage.getItem(btoa(email.value));
		var obj_data = JSON.parse(text_data);
		var correct_email = obj_data.email;
		var correct_password = obj_data.pass;

		if (correct_email == btoa(email.value))
		{
			if (correct_password == btoa(password.value))
			{
				sessionStorage.setItem("user", btoa(email.value));
				window.location.replace("profile/profile.html")
			}

			else
			{

				login_password_warning.style.display = "block";
				password.style.borderBottomColor = "red";

				password.onclick = function()
				{
					password.value = "";
					login_password_warning.style.display = "none";
					password.style.borderBottomColor = "#ccc";
				}
			}
		}
	}
	return false;
}



//login page coding end 



// login password show & hide coding start 

var show = document.getElementById("eye_show_icon");
show.onclick = function() {
	var hide = document.getElementById("eye_hide_icon");
	var pass = document.getElementById("login_password");
	show.style.display = "none";
	hide.style.display = "block";
	pass.type = "text";

	if (hide.style.display == "block")
	{
		hide.onclick = function() {
			hide.style.display = "none";
			show.style.display = "block";
			pass.type = "password";
		}

	}
	else {
		hide.style.display = "block";
		show.style.display = "none";
		pass.type = "text";
	}
}

//login password show & hide coding end

//signup password show & hide coding start 


var signup_show = document.getElementById("signup_eye_show_icon");
signup_show.onclick = function() {
	var hide = document.getElementById("signup_eye_hide_icon");
	var pass = document.getElementById("password");
	signup_show.style.display = "none";
	hide.style.display = "block";
	pass.type = "text";

	if (hide.style.display == "block")
	{
		hide.onclick = function() {
			hide.style.display = "none";
			signup_show.style.display = "block";
			pass.type = "password";
		}

	}
	else {
		hide.style.display = "block";
		signup_show.style.display = "none";
		pass.type = "text";
	}
}

//signup password show & hide coding end
