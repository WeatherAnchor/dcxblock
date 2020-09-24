/* Javascript for DcXBlock. */
function DcXBlock(runtime, element) {

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
        if(result.n_tried < result.total_tries){
            $("#student_attempts", element).text(result.n_tried);
        } else {
            $("#student_attempts", element).text(result.n_tried);
            $("#attempts_block", element).html('<p style="background-color:#ffbfbf;">You have 0 attempt remaining! Your grade will not change if you submit!</p>');
        }
    }

      
    window.onload = function () {
        // console.log(DCL.instances);
        // dc_id = $(".my_dcxblock").attr("id");
        
        o = DCL.instances;
        var idx = 0; 

        var key = Object.keys(o)[idx];
        value = o[key]

        dc_id = key
        
        DCL.instances[dc_id].on("feedback", function(payload) {
            $.ajax({
                type: "POST",
                url: submitHandleUrl,
                data: JSON.stringify(payload),
                success: submitDatacampGrade
            });
        });
    }
}
