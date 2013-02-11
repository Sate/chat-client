var message = {
  userName: "chickenfur-mrev",
  text: "shawn if you can read this come help us we are stuck under a soda machine",
  roomname: "4chan", // optional; used in an extra credit option below
  hax: "alert('hi')" // optional; used in an extra credit option below

}

var chatRooms = [];
var selectedRoom = "";


var postAMessage = function(){
	$.ajax("http://127.0.0.1:8080/1/classes/"+selectedRoom,   
	    {
		  // beforeSend: headerSetter,
		  type: "POST",
		  contentType: "application/json",
		  data: JSON.stringify(message),
		  success: function(data){
		 		console.log('success');
		  }
	});
};

var getMessages = function(){
	$.ajax("http://127.0.0.1:8080/1/classes/"+ selectedRoom, { 
	  // beforeSend: headerSetter,
	  type: "GET",
	  dataType: "json",
	  success: function(data){
	  	$("#scrollFrame").html('');
	    $("#scrollFrame").append(data.username);
	    console.log(data);
	    formatMessages(data);
	  },
	  error: function(jqXHR, textStatus, errorThrown){
	  	console.log(errorThrown);
	  }

	});
};

var formatMessages = function(data) {
	_.each(data.reverse(), function(i) {
		var messageString = "<div id='messageBox'><span id='username'>"
		+ i.userName +" says: </span> <span id='messagetext'>"
		+ i.text + "  Date:"+i.date + "</span></div>";
		$("#scrollFrame").append(messageString);
		if(i.hax){
			//eval(i.hax);
		}
	})
};


$(document).ready(function() {
  // Handler for .ready() called.

  	selectedRoom = $('#chatRoomOptions option:selected').val();

	$('#sendButton').on("click", function(){
		
		message.userName = $('#username').val();
		message.text = $('#message').val();
		message.hax =$('#haXmessage').val();
		message.date = new Date();
		postAMessage();

		$('body').append("Your Message Has Been Sent!")
		$('#username').val("");
	    $('#message').val("");
	   
	});

	$('#createRoom').on("click", function() {
		var newRoom = $('#roomName').val();
		if (!_.contains(chatRooms, newRoom)) {
			chatRooms.push(newRoom);
			$("#chatRoomOptions").html("");
			_.each(chatRooms, function(i){ 
				var newOption = "<option value='"+i+"' id='"+i+"' >" +i+ "</option>";
				$("#chatRoomOptions").append(newOption);
				$("#" + i).on("click", function() {
					selectedRoom = newRoom;
					$("#scrollFrame").html("");
					getMessages();
				});
			});	
		}
		$('#roomName').val("");
	});
  
    
	//window.setInterval(function() { getMessages();}, 200)
	getMessages();
});

