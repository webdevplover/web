//if(sessionStorage.getItem("user") == null)
//{
//	window.location.replace("../../../index.html");
//}
//else {
var back_btn_icon = document.getElementById("back_icon_btn");
back_btn_icon.onclick = function()
{
	var body = document.getElementById("body");
	window.location = "../../profile.html";;

}


var p_icon = document.getElementById("plus_icon_btn");

p_icon.onclick = function()
{
	var bg = document.getElementById("contact_bg");
	bg.style.display = "flex";


}

var close = document.getElementById("close");
close.onclick = function()
{
	var bg = document.getElementById("contact_bg");
	bg.style.display = "none";

}

var user_email = sessionStorage.getItem("user");
var img = localStorage.getItem(user_email + "image");
var profile_pic = document.getElementById("profile_pic");
profile_pic.style.backgroundImage = "url(" + img + ")";
profile_pic.style.backgroundSize = "cover";
profile_pic.style.backgroundPosition = "center";
var current_user = sessionStorage.getItem("user");
var add = document.getElementById("add");
add.onclick = function()
{
	var c_name = document.getElementById("c_name");
	var c_num = document.getElementById("c_num");

	if (c_name.value != "" && c_num.value != "")
	{
		var new_contact = { name: c_name.value, number: c_num.value }
		var json_text = JSON.stringify(new_contact);

		localStorage.setItem(current_user + "_contact" + c_name.value, json_text);
	}

	else
	{
		var c_name_input = document.getElementById("c_name");
		var c_num_input = document.getElementById("c_num");
		c_name_input.style.borderColor = "red";
		//c_name_input.style.borderLeftColor = "red";
		c_num_input.style.borderColor = "red";
		//c_num_input.style.borderLeftColor = "red";


		c_name_input.onclick = function() {
			c_name_input.style.borderColor = "purple";
			c_num_input.style.borderColor = "purple";
		}
		c_num_input.onclick = function() {
			c_name_input.style.borderColor = "purple";
			c_num_input.style.borderColor = "purple";
		}
		if (c_name_input.value != "") {
			c_num_input.style.borderColor = "red";
		}
		if (c_num_input.value != "") {
			c_name_input.style.borderColor = "red";
		}
		return false;
	}
}

// contact box coding start

function all_contact()
{
	var i;
	for (i = 0; i < localStorage.length; i++)
	{
		var all_key = localStorage.key(i);
		if (all_key.match(sessionStorage.getItem("user") + "_contact"))
		{
			var json_text = localStorage.getItem(all_key);
			var obj = JSON.parse(json_text);

			var contact_box = document.createElement("DIV");
			contact_box.setAttribute("id", "contact");

			var name_p = document.createElement("P");
			name_p.setAttribute("class", "contact_name");

			var name_i = document.createElement("I");
			name_i.setAttribute("class", "fas fa-user");

			var tool = document.createElement("DIV");
			tool.setAttribute("id", "tool");

			var line = document.createElement("HR");
			line.setAttribute("width", "75%");
			line.setAttribute("color", "purple");
			line.setAttribute("size", "1");

			var num_p = document.createElement("P");
			name_p.appendChild(name_i);
			name_p.innerHTML += obj.name;

			var num_i = document.createElement("I");
			num_i.setAttribute("class", "fas fa-mobile-alt");

			var edit_i = document.createElement("I");
			edit_i.setAttribute("class", "fas fa-edit edit");
			edit_i.setAttribute("id", "edit");

			var delete_i = document.createElement("I");
			delete_i.setAttribute("class", "fas fa-trash del");
			delete_i.setAttribute("id", "trash");

			tool.appendChild(edit_i);
			tool.appendChild(delete_i);
			num_p.appendChild(num_i);
			num_p.innerHTML += obj.number;
			contact_box.appendChild(name_p);
			contact_box.appendChild(tool);
			contact_box.appendChild(line);
			contact_box.appendChild(num_p);

			var all_contact_box = document.getElementById("all_contact_box");
			all_contact_box.appendChild(contact_box);



		}
	}
}
all_contact();

// contact box coding end

// contact search function coding start 

var search = document.getElementById("search");
search.oninput = function() {
	var all_contact = document.getElementsByClassName("contact_name");
	var a;
	for (a = 0; a < all_contact.length; a++)
	{
		if (all_contact[a].innerHTML.toUpperCase().match(search.value.toUpperCase()))
		{
			all_contact[a].parentElement.style.display = "block";
		}

		else {
			all_contact[a].parentElement.style.display = "none";
		}
	}
}

//contact search function coding end 



// contact delete function coding start
var del = document.getElementsByClassName("del");
var i;
for (i = 0; i < del.length; i++)
{
	del[i].onclick = function()
	{
		var parent = this.parentElement.parentElement;
		var p_ele = parent.getElementsByClassName("contact_name")[0];
		var username = p_ele.innerHTML.replace('<i class="fas fa-user"></i>', "");
		localStorage.removeItem(current_user + "_contact" + username.trim());
		parent.className = "animate__animated animate__bounceOut";
		setTimeout(function() { parent.remove(); }, 1000);
	}
}

// contact delete function coding end

// contact edit function coding start

var edit = document.getElementsByClassName("edit");
var i;
for (i = 0; i < edit.length; i++)
{
	edit[i].onclick = function()
	{
		var parent = this.parentElement.parentElement;
		var p = parent.getElementsByTagName("P");
		var name = p[0].innerHTML.replace('<i class="fas fa-user"></i>', "");
		var number = p[1].innerHTML.replace('<i class="fas fa-mobile-alt"></i>', "");
		var c_name = document.getElementById("c_name");
		var c_num = document.getElementById("c_num");
		var add_btn = document.getElementById("plus_icon_btn");
		var c_head = document.getElementById("c_head");
		var add = document.getElementById("add");
		var close = document.getElementById("close");
		c_name.value = name;
		c_num.value = number;

		c_head.innerHTML = "Edit Contact";
		add.innerHTML = "Update";
		close.style.display = "none";
		add.style.marginLeft = "30%";
		add_btn.click();
		localStorage.removeItem(current_user + "_contact" + name);

	}
}

// contact edit function coding end




//}
