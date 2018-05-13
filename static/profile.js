
    $(document).ready(function () {
        var id = "";
        var id_text = "";
        table_init(id,id_text);
            

            $.ajax(
                {
                    type: "GET",
                    crossDomain: true,
                    url: "http://localhost:8081/api/v1/profile",
                    contentType: 'application/json',
                    data: data_acc,
                    success: function (responseData, textStatus, jqXHR) {

                        localStorage.setItem("acc_info", responseData);

                    }
            });     
           
            var acc_info = localStorage.getItem("acc_info");
            acc_info = eval(acc_info);
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>." + acc_info)
            document.getElementById("r1c1").innerHTML = acc_info[0].userName;
            document.getElementById("r1c2").innerHTML = "********";
            document.getElementById("r1c3").innerHTML = acc_info[0].eMail;
            


         
    });

$(document).ready(function () {
    $("#delete_yes").click(function () {

        console.log("delete was called")
        $.ajax(
            {
                type: "DELETE",
                crossDomain: true,
                url: "http://localhost:8081/api/v1/user/delete",
                contentType: 'application/json',
                data: JSON.stringify(data_acc),
                success: function (responseData, textStatus, jqXHR) {
                    console.log("WHOOOOOOHOOOOOOO DELETED SUCCESS")


                }
            });
    });
});
   


function update_user() {
    event.preventDefault();
    

    console.log("OI OI OI OI O IO IO IO IO IO IO IO IOI OI OI ")
    $.ajax(
        {
            type: "PUT",
            crossDomain: true,
            url: "http://localhost:8081/api/v1/user/update",
            contentType: 'application/json',
            data: JSON.stringify(data_acc),
            success: function (responseData, textStatus, jqXHR) {
                console.log("WHOOOOOOHOOOOOOO UPDATED SUCCESS : " + JSON.stringify(data_acc))


            }
        });
    return false
    };


    var originalData;
    var inputAccepted;
    let acc = localStorage.getItem('account');
    let data_acc = {
        account: acc
    };
    var prev_id = ""


    function select(id, id_text) {
        console.log("DDDDDDDDDDDDDD: " + id)
        if (prev_id != id) {
            prev_id = id
            localStorage.setItem("id", id);
            localStorage.setItem("id_text", id_text);
            clickEvent(id, id_text);
            console.log("Select function CALLED!");
        }
        
        
    }
   
    

    function table_init(id,id_text) {

        
        if (id === "") {
            console.log("ONLY ONCEEEEE!!!!!!!!!!!!!!!!");
            $("#r1c1").on("click", function () { select("#r1c1", "#txtr1c1"); });
            $("#r1c2").on("click", function () { select("#r1c2", "#txtr1c2"); }); 
            $("#r1c3").on("click", function () { select("#r1c3", "#txtr1c3"); });
            $("#r1c4").on("click", clickDelete);
        };
        id = localStorage.getItem("id");
        id_text = localStorage.getItem("id_text"); 
        console.log("TRY ID RECAL: " + id + " " + id_text);
        $(id).on("focusout", function () { focusoutEvent(id, id_text); });
        $(id).on("keydown", keypress)


    }

    function clickEvent(id, id_text) {
        id = localStorage.getItem("id");
        id_text = localStorage.getItem("id_text");
        
        console.log("Click event: " + id + " " + id_text);
        originalData = $(id).text();
        $(id).text(""); 
 
        el_lenght = $(id_text).length // variable to check if the eemnt exists
        console.log("!!!!!!!!!!!!!!!" + '<input action="http://localhost:8081/api/v1/user/update" type="password" class="form-control" value="' + originalData + '" id="' + id_text.substring(1, ) + '">' +   "!!!!!!!!!!1 ERR creating? : " + el_lenght)
        if (el_lenght == 0 ) {
            var html = '<input type="text" class="form-control" value="' + originalData + '" id="' + id_text.substring(1, ) + '">' // WHEN click second time
            $(id).html(html);
        }
        
        $(id).off("click", function () { clickEvent(id, id_text); });
        $(id_text).focus();
        table_init();
    }
    function focusoutEvent(id, id_text) {
        id = localStorage.getItem("id");
        id_text = localStorage.getItem("id_text");
        
        console.log("FOCUS OUT EVENT: " + id + " " + id_text);
        $(id).off("focusout", function () { focusoutEvent(id, id_text); });
        console.log("lost focus:")
        if (inputAccepted == true) {
            console.log("INPUT ACCEPTED!")
            let data = $(id_text).val();
            console.log("DATA TEXXXXXXXXXXXXXXXT: " + data);
            $(id_text).text(data);
            originalData = data;
            console.log(originalData)
            
            

        }
        else {
            $(id).text(originalData);
        }
        inputAccepted = false;
        //remove the input text from the DOM completely
        try {
            //$(id_text).remove();
        }
        catch (err) {
            console.log('Err: ' + err)
        }
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
        //bring back the click event
        
        $(id).on("focusout", function () { focusoutEvent(id,id_text); });
        //localStorage.setItem("id", "");
        //localStorage.setItem("id_text", "");

    }
    
    function keypress(e) {
        console.log("key press " + e.which)
        let id = localStorage.getItem("id");
        let id_text = localStorage.getItem("id_text");


        //if we pressed enter key (value = 13)
        //then accepts user input
        if (e.which == 13) {
            console.log("enter key was pressed");
            inputAccepted = true;
            focusoutEvent(id,id_text);

        }
        else if (e.which == 27) {
            console.log("wscape key was pressed");
            inputAccepted = false;
            focusoutEvent(id,id_text);

        }
    }

    function clickDelete() {

    }