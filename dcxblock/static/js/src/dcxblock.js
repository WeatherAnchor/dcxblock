/* Javascript for DcXBlock. */
function DcXBlock(runtime, element) {
    // $('.seq_other', element).click(function(eventObject){
        // var dc_api = document.createElement('script');  
        // dc_api.setAttribute('src','http://cdn.datacamp.com/dcl/latest/dcl-react.js.gz');
        // document.head.appendChild(dc_api);
        // initAddedDCLightExercises();
        
    //     o = DCL.instances;
    //     console.log("This is DCL log", o);
    //     var idx = 0; 

    //     var key = Object.keys(o)[idx];
    //     value = o[key]

    //     dc_id = key
        
    //     DCL.instances[dc_id].on("feedback", function(payload) {
    //         $.ajax({
    //             type: "POST",
    //             url: submitHandleUrl,
    //             data: JSON.stringify(payload),
    //             success: submitDatacampGrade
    //         });
    //     });
    // });
    
    function updateCount(result) {
        $('.count', element).text(result.count);
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    $('p', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount
        });
    });

    // Datacamp submits the grade if correct
    var submitHandleUrl = runtime.handlerUrl(element, 'submit_dc_grade');
    function submitDatacampGrade(result) {
        // $('.weather-submit', element).text(result.student_grade);
        // $('#student_attempts', element).text(result.student_grade);
        console.log("successfully ajax");
        if(result.n_tried < result.total_tries){
            $("#student_attempts", element).text(result.n_tried);
        } else {
            $("#student_attempts", element).text(result.n_tried);
            $("#attempts_block", element).html('<p style="background-color:#ffbfbf;">You have 0 attempt remaining! Your grade will not change if you submit!</p>');
        }
    }
    initAddedDCLightExercises();
    var dc_api = document.createElement('script');  
    dc_api.setAttribute('src','http://cdn.datacamp.com/dcl/latest/dcl-react.js.gz');
    document.head.appendChild(dc_api);
    initAddedDCLightExercises();
    console.log("Hey thgerem", DCL.instances)
    my_object = DCL.instances;
    var idx = 0; 

    var key = Object.keys(my_object)[idx];
    value = my_object[key];

    dc_id = key;

    console.dir("this is de key", dc_id);
    DCL.instances[dc_id].on("feedback", function(payload) {
        $.ajax({
            type: "POST",
            url: submitHandleUrl,
            data: JSON.stringify(payload),
            success: submitDatacampGrade
        });
    });
    window.document.onload = function(e){ 
        initAddedDCLightExercises(); 
        my_object = DCL.instances;
        var idx = 0; 
    
        var key = Object.keys(my_object)[idx];
        value = my_object[key];
    
        dc_id = key;
    
        console.dir("this is de key", dc_id);
        DCL.instances[dc_id].on("feedback", function(payload) {
            console.log("the dom start")
            $.ajax({
                type: "POST",
                url: submitHandleUrl,
                data: JSON.stringify(payload),
                success: submitDatacampGrade
            });
        });
    }
    


}
