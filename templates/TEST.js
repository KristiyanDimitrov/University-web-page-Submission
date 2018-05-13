let acc = localStorage.getItem('account');
let data_acc = {
    account: acc
};

function select(id, id_text) {
    localStorage.setItem("id", id);
    localStorage.setItem("id_text", id_text);
    clickEvent(id, id_text);
    console.log("Select function CALLED!");
}
document.getElementById("r1c1").innerHTML = acc_info[0].userName;
document.getElementById("r1c2").innerHTML = "********";
document.getElementById("r1c3").innerHTML = acc_info[0].eMail;
var originalData;
var inputAccepted;

//create a click event function
//we created the function and gave it a name as we will need to access this function in many occasions as you will see

function table_init(id, id_text) {


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
    //we also want to accept user input when he hits enter
    $(id).on("keydown", keypress)


}

function clickEvent(id, id_text) {
    //let id = localStorage.getItem("id");
    //let id_text = localStorage.getItem("id_text");
    console.log("Click event: " + id + " " + id_text);
    //first save the content of the table cell
    originalData = $(id).text();
    //rest the cell contents 
    $(id).text("");
    //add a text input inside the cell
    el_lenght = $(id_text).length // variable to check if the eemnt exists
    if (el_lenght == 0) {
        var html = '<input type="text" class="form-control" value="' + originalData + '" id="' + id_text.substring(1, ) + '">'
        $(id).html(html);
    }

    //remove any click events as long as the text input is visible
    $(id).off("click", function () { clickEvent(id, id_text); });
    //focus on the input field not on the table cell
    $(id_text).focus();
    table_init();
}
function focusoutEvent(id, id_text) {
    //id = localStorage.getItem("id");
    //id_text = localStorage.getItem("id_text");
    console.log("FOCUS OUT EVENT: " + id + " " + id_text);
    //temporarirly deactive lost focus event to prevent triggering a new one while we are processing this one
    $(id).off("focusout", function () { focusoutEvent(id, id_text); });
    console.log("lost focus:")
    //if the user pressed enter key then we accept the input
    //otherwise we reject the input and reset to original text before change
    if (inputAccepted == true) {
        console.log("INPUT ACCEPTED!")
        //save the value of the input text in a variable
        let data = $(id_text).val();
        //set the table cell to the cell
        $(id).text(data);
        //<a onclick="http://localhost:8081/api/v1/profile"></a>
        //$('#UpdateApi').trigger('click');

    }
    else {
        $(id).text(originalData);
    }
    inputAccepted = false;
    //remove the input text from the DOM completely
    $(id_text).remove();
    //bring back the click event
    $(id).on("click", function () { clickEvent(id, id_text); });
    $(id).on("focusout", function () { focusoutEvent(id, id_text); });
    //localStorage.setItem("id", "");
    //localStorage.setItem("id_text", "");

}

function keypress(e) {
    console.log("key press " + e.which)



    //if we pressed enter key (value = 13)
    //then accepts user input
    if (e.which == 13) {
        console.log("enter key was pressed");
        inputAccepted = true;
        focusoutEvent();

    }
    else if (e.which == 27) {
        console.log("wscape key was pressed");
        inputAccepted = false;
        focusoutEvent();

    }
}

function clickDelete() {

}