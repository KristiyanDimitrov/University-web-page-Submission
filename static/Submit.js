$("#Submit").click(function(e)
{
        e.preventDefault();
        var data = {};
        $("#SubmitForm").serializeArray().map(function (x) { data[x.name] = x.value; });

        console.log("Data from SUBMIT!" + data);
        $("#result").empty();
        $.ajax(
            {
                type: "POST",
                crossDomain: true,
                url: $("#SubmitForm").attr('action'), 
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
    //$("#SubmitForm").on("submit", (e) => {
});
