if (sessionStorage.getItem("user") == null) {
	window.location.replace("../../../index.html")
}


else {


	var current_user = sessionStorage.getItem("user");
	var play_btn = document.getElementById("play_btn");
	var video = document.getElementById("video_player");

	play_btn.onclick = function()
	{

		if (play_btn.className == "fas fa-play-circle")
		{
			video.play();
			play_btn.className = "fas fa-pause-circle";
		}
		else if (play_btn.className == "fas fa-pause-circle")
		{
			video.pause();
			play_btn.className = "fas fa-play-circle";
		}

	}

	// video timing and progress bar coding

	video.ontimeupdate = function() {
		var t_duration = this.duration;
		var c_duration = this.currentTime;
		var v_timing = document.getElementById("v_timing");
		var p_bar = document.getElementById("progress_bar");
		var sec = c_duration - parseInt(c_duration / 60) * 60;
		var t_sec = t_duration - parseInt(t_duration / 60) * 60;
		v_timing.innerHTML = parseInt(c_duration / 60) + ":" + parseInt(sec) + " / " + parseInt(t_duration / 60) + ":" + parseInt(t_sec);
		p_bar.style.width = c_duration * 100 / t_duration + "%";

		if (t_duration == c_duration) {
			play_btn.className = "fas fa-play-circle";
		}
	}


	// video add box show & hide 
	var open_video_box_btn = document.getElementById("open_video_box_btn");
	open_video_box_btn.onclick = function() {
		var add_video_box = document.getElementById("add_video_box");
		if (this.className == "fas fa-plus-circle") {
			add_video_box.style.display = "block";
			add_video_box.className = "animate__animated animate__jackInTheBox";
			this.className = "fas fa-window-close";
		}

		else if (this.className == "fas fa-window-close") {
			add_video_box.className = "animate__animated animate__fadeOut";
			add_video_box.style.display = "none";
			this.className = "fas fa-plus-circle"

		}
	}


	// video add in local storage 
	var add_btn = document.getElementById("add_video_btn");

	add_btn.onclick = function()
	{
		var v_name = document.getElementById("video_name");
		var v_link = document.getElementById("video_link");
		if (v_name.value != "" && v_link.value != "")
		{
			var obj_data = { name: v_name.value, link: v_link.value };
			var text_data = JSON.stringify(obj_data);
			localStorage.setItem(current_user+"video"+ v_name.value, text_data);
		}


	}

	//video playlist 

	function load_all_video()
	{
		var i;
		for (i = 0; i < localStorage.length; i++)
		{
			var all_key = localStorage.key(i);
			if (all_key.match(current_user+"video"))
			{
				var v_data = localStorage.getItem(all_key);
				var obj_data = JSON.parse(v_data);

				var div = document.createElement("DIV");
				div.setAttribute("id", "main_video_box");

				var p = document.createElement("P");
				p.setAttribute("id", "playlist_video_name");
				p.innerHTML = obj_data.name;
				p.setAttribute("class", "p_v_name");

				var play_btn = document.createElement("BUTTON");
				play_btn.setAttribute("type", "submit");
				play_btn.setAttribute("id", "video_play_btn");
				play_btn.setAttribute("url", obj_data.link);
				play_btn.className = "v_play_btn";
				play_btn.innerHTML = "Play";

				var del_btn = document.createElement("BUTTON");
				del_btn.setAttribute("type", "submit");
				del_btn.setAttribute("id", "video_delete_btn");
				del_btn.className = "del_v_btn";
				del_btn.innerHTML = "Delete";

				div.appendChild(p);
				div.appendChild(play_btn);
				div.appendChild(del_btn);
				var v_part = document.getElementById("bottom");
				v_part.appendChild(div);
			}
		}
	}
	load_all_video();

	//video play coding 


	function clear() {
		var all_v_play_btn = document.getElementsByClassName("v_play_btn");
		var i;
		for (i = 0; i < all_v_play_btn.length; i++) {
			all_v_play_btn[i].innerHTML = "Play";
			all_v_play_btn[i].parentElement.style.border = "none";
		}
	}

	function play_video()
	{
		var all_v_play_btn = document.getElementsByClassName("v_play_btn")
		var i;
		for (i = 0; i < all_v_play_btn.length; i++)
		{
			all_v_play_btn[i].onclick = function()
			{
				clear();
				var v_url = this.getAttribute("url");
				src_tag = document.getElementById("v_src");
				src_tag.setAttribute("src", v_url);
				video.load();
				video.play();
				play_btn.className = "fas fa-pause-circle";
				this.innerHTML = "Playing...";
				var parent = this.parentElement;
				parent.style.border = "3px solid green";

			}
		}

	}
	play_video();


	// next video play coding
	var next_btn = document.getElementById("right_btn");
	next_btn.onclick = function()
	{
		var all_play_btn = document.getElementsByClassName("v_play_btn");
		var i;
		for (i = 0; i < all_play_btn.length; i++)
		{
			if (all_play_btn[i].innerHTML == "Playing...") {
				var next_element = all_play_btn[i].parentElement.nextSibling;
				var next_play_button = next_element.getElementsByClassName("v_play_btn")[0];
				next_play_button.click();
				return false;
			}
		}
	}

	//previous video play coding 
	var previous_btn = document.getElementById("left_btn");
	previous_btn.onclick = function()
	{
		var all_play_btn = document.getElementsByClassName("v_play_btn");
		var i;
		for (i = 0; i < all_play_btn.length; i++)
		{
			if (all_play_btn[i].innerHTML == "Playing...") {
				var previous_element = all_play_btn[i].parentElement.previousSibling;
				var previous_play_button = previous_element.getElementsByClassName("v_play_btn")[0];
				previous_play_button.click();
				return false;
			}
		}
	}



	// video delete coding
	function delete_video()
	{
		var del_btn = document.getElementsByClassName("del_v_btn");
		var i;
		for (i = 0; i < del_btn.length; i++)
		{
			del_btn[i].onclick = function()
			{
				var parent = this.parentElement;
				var video_name = parent.getElementsByTagName("P")[0].innerHTML;
				localStorage.removeItem(current_user + "video" + video_name);
				parent.className = "animate__animated animate__zoomOutRight";
				setTimeout(function() { parent.remove() }, 1000);


			}
		}



	}

	delete_video();



	// video volume coding 

	var vol_icon = document.getElementById("volume");
	vol_icon.onclick = function() {
		var volume_box = document.getElementById("vol_box");
		if (vol_box.style.display == "none") {
			vol_box.style.display = "flex";
			vol_control = document.getElementById("vol_control");
			vol_control.oninput = function()
			{
				video.volume = this.value;
			}
		}
		else if (vol_box.style.display == "flex") {
			vol_box.style.display = "none";
		}
	}


	// video speed coding

	var speed_icon = document.getElementById("setting");
	speed_icon.onclick = function() {
		var speed_box = document.getElementById("speed_control_box");
		if (speed_box.style.display == "none") {
			speed_box.style.display = "flex";
			var speed_control = document.getElementById("speed_control");
			speed_control.oninput = function() {
				video.playbackRate = this.value;
			}

		}
		else if (speed_box.style.display == "flex") {
			speed_box.style.display = "none";
		}
	}

	//video forward and backward coding
	var p_box = document.getElementById("progress_box");
	p_box.onclick = function(event)
	{
		var per = event.offsetX / this.offsetWidth;
		video.currentTime = per * video.duration;
	}

	// video full screen 

	var full_screen = document.getElementById("full_screen");
	full_screen.onclick = function(p) {
		video.requestFullscreen();
	}


	// video search coding


	var search = document.getElementById("search");

	search.oninput = function() {
		var all_v_name = document.getElementsByClassName("p_v_name");
		var i;
		for (i = 0; i < all_v_name.length; i++) {
			if (all_v_name[i].innerHTML.match(search.value)) {
				all_v_name[i].parentElement.style.display = "block";
			}

			else {
				all_v_name[i].parentElement.style.display = "none";
			}
		}
	}

}
