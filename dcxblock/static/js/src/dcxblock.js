/* Javascript for DcXBlock. */
function DcXBlock(runtime, element) {

    // Datacamp submits the grade if correct
    var submitHandleUrl = runtime.handlerUrl(element, 'submit_dc_grade');
    function submitDatacampGrade(result) {
        // $('.weather-submit', element).text(result.student_grade);
        // $('#student_attempts', element).text(result.student_grade);
        console.log("successfully ajax");
        if(result.n_tried < result.total_tries){
            $("#student_attempts", element).text(result.n_tried);
            $("#student_attempts", element ).effect( "bounce", "slow" );
        } else {
            $("#student_attempts", element).text(result.n_tried);
            $("#student_attempts", element ).effect( "bounce", "slow" );
            $("#attempts_block", element).css({"background-color":"#ffbfbf", "border-radis":"8px", "padding":"2px 5px"});
            $("#attempts_block", element).text('You have 0 attempt remaining! Your grade will not change if you submit!');
            $("#attempts_block", element ).effect( "bounce", "slow" );
        }
    }

    $('#dc_practice_loader').click(function(){
        console.log("loader clicker");

        $('.dc_loader').toggleClass('show_block');
        
        setTimeout(function(){ 
            $('.dc_loader').toggleClass('show_block');
            $('.my_dcxblock').toggleClass('show_block'); 
            initDcIde();
        }, 1500);
        
        $(this).addClass('hide_block');

    });
    
    function initDcIde(){
        // initAddedDCLightExercises();
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
    }

}

