$(document).ready(function () {

    //when document is ready make the first cell listen to click and lost focus evets
    $("#r1c1").on("click", clickEvent);
    $("#r1c1").on("focusout", focusoutEvent);
    //we also want to accept user input when he hits enter
    $("#r1c1").on("keydown", keypress)


    $("#r1c4").on("click", clickDelete);
});

var originalData;
var inputAccepted;
//create a click event function
//we created the function and gave it a name as we will need to access this function in many occasions as you will see
function clickEvent() {

    console.log("click event");
    //first save the content of the table cell
    originalData = $("#r1c1").text();
    //rest the cell contents 
    $("#r1c1").text("");
    //add a text input inside the cell
    $("#r1c1").html('<input type="text" class="form-control" value="' + originalData + '" id="txtr1c1">');
    //remove any click events as long as the text input is visible
    $("#r1c1").off("click", clickEvent);
    //focus on the input field not on the table cell
    $("#txtr1c1").focus();
}
function focusoutEvent() {

    //temporarirly deactive lost focus event to prevent triggering a new one while we are processing this one
    $("#r1c1").off("focusout", focusoutEvent);
    console.log("lost focus:")
    //if the user pressed enter key then we accept the input
    //otherwise we reject the input and reset to original text before change
    if (inputAccepted == true) {
        //save the value of the input text in a variable
        let data = $("#txtr1c1").val();
        //set the table cell to the cell
        $("#r1c1").text(data);

    }
    else {
        $("#r1c1").text(originalData);
    }
    inputAccepted = false;
    //remove the input text from the DOM completely
    $("#txtr1c1").remove();
    //bring back the click event
    $("#r1c1").on("click", clickEvent);
    $("#r1c1").on("focusout", focusoutEvent);

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