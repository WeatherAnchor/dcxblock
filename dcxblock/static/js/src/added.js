function AddedJs(runtime, element) {
    console.log("added loaded");
    $(window).on('load', function() { 
        console.log("added loaded");
        alert("added jshere");
        // initAddedDCLightExercises(); 
        // my_object = DCL.instances;
        // var idx = 0; 

        // var key = Object.keys(my_object)[idx];
        // value = my_object[key];

        // dc_id = key;

        // console.dir("this is de key", dc_id);
        // DCL.instances[dc_id].on("feedback", function(payload) {
        //     console.log("the dom start")
        //     $.ajax({
        //         type: "POST",
        //         url: submitHandleUrl,
        //         data: JSON.stringify(payload),
        //         success: submitDatacampGrade
        //     });
        // });
    });
}
