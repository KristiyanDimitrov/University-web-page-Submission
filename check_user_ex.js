$(document).ready(function (e)
{
    e.preventDefault
    $("#inputUserName").on('keyup', function()
	{
		event.preventDefault();
		$.ajax(
		{
			type: "POST",
			crossDomain: true,
            url: $("#check_user_ex").attr('action'),
			contentType: "application/json",
            data: JSON.stringify({ "userName": inputUserName.value}),
			success: function( responseData, textStatus, jqXHR )
			{
                console.log("check EXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX: " +responseData);
                var data = JSON.parse(responseData);
                
                if (data.available == false) {
                    $("#user_check_ex").html("<p style='color:red;'>Username already exists!</p>");
                    $("#Sign_In").hide();
                    
                } else {
                    $("#user_check_ex").html("<p style='color:green;'>Username is available! .</p>");
                    $("#Sign_In").show();
                    
                }
				//Code to process the response
				
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				$("#user_check_ex").html("<p style='color:red;bold'>Something went wrong!" + errorThrown + ".</p>");
                $("#Sign_In").hide();
			}
		});
		return false;
	});
});












