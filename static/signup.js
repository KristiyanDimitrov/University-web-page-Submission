$(document).ready(function () {
    $("#Sign_In").click(function (e) {
        e.preventDefault();
        var data = {};
        $("#signUpForm").serializeArray().map(function (x) { data[x.name] = x.value; });

        console.log("Data from signup.html" + data);
        $("#result").empty();
        $.ajax(
            {
                type: "POST",
                crossDomain: true,
                url: "http://localhost:8081/api/v1/user/add",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (responseData, textStatus, jqXHR) {
                    console.log(data);
                    //Code to process the response
                    $("#result").html("<p style='color:green;'>User created!</p > ");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#result").html("<p style='color:red;'>An error has occurred, " + errorThrown + ".</p>");

                }
            });

        return false;
        //$(location).attr('href', "{{ url_for('main_page') }}")
    });
}); 
