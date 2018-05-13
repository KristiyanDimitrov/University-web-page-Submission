let type = localStorage.getItem('type');
        let data = {
            type: type
        };


        $(document).ready(function () {
            $.ajax(
                {
                    type: "GET",
                    crossDomain: true,
                    url: 'http://localhost:8081/load_images',
                    contentType: 'application/json',
                    data: data,
                    success: function (responseData, textStatus, jqXHR) {
                        //console.log("RESPONSE DATAAAAAAAAAAAAAAAAAAA IMAGES");
                        //console.log(responseData);
                        var acc = JSON.stringify(responseData);
                        //console.log("-------------------")
                        //console.log(responseData);
                        images = responseData;
                        var images_ = eval(images);
                        console.log("WHAT IS IMAGES???????")
                        console.log(data.type)
                        //console.log(images)

                        let image_view = "'image_view'";
                        if (data.type == 0) {
                            var y = document.getElementById("signupHTML");
                            y.style.display = "block";
                        } else if (data.type == 1) {
                            var z = document.getElementById("loginHTML");
                            z.style.display = "block";
                        } else if (data.type == 2) {
                            var x = document.getElementById("profileHTML");
                            x.style.display = "block";
                        } else if (data.type == 4) {
                            var x = document.getElementById("image_view");
                            l.style.display = "block";
                        } else {
                            for (image in images_) {
                                $("#image_section").append(
                                    '<div class="col-xs-12 col-sm-6" >\
                                     <div id="images" class="thumbnail">\
                                         <img src="'+ images_[image].path + '">\
                                         <div class="caption">\
                                             <h3> '+ images_[image].title + ' </h3>\
                                             <a class="btn btn-primary" href="{{ url_for('main_page') }}" onClick="imageType('+ image_view +')" >View recept</a>\
                                         </div>\
                                     </div>\
                                 </div>'
                                ); 
                            };

                        }



                    }

                });
            return false;
        });