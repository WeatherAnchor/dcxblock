/* Javascript for DcXBlock. */
function DcXBlock(runtime, element) {

    // Datacamp submits the grade if correct
    var submitHandleUrl = runtime.handlerUrl(element, 'submit_dc_grade');
    function submitDatacampGrade(result) {
        // console.log("successfull ajax");
        if(result.n_tried < result.total_tries){
            $("#student_attempts", element).text(result.n_tried);
            $("#student_attempts", element ).effect( "highlight", {color:"#669966"}, 3000 );
        } else {
            $("#student_attempts", element).text(result.n_tried);
            $("#attempts_block", element).css({"background-color":"#ffbfbf", "border-radius":"8px", "padding":"2px 5px"});
            $("#attempts_block", element).text('You have 0 attempt remaining! Your grade will not change if you submit!');
            $("#attempts_block", element ).effect( "shake", {times:4}, 500 );
        }
        if(result.student_grade === 1){
            $('#student_grade').text("1");
            $('#student_grade').effect( "highlight", {color:"#669966"}, 3000 );
        }
    }

    $('#dc_practice_loader').click(function(){
        // console.log("loader clicker");

        $('.dc_loader').toggleClass('show_block');
        
        setTimeout(function(){ 
            $('.dc_loader').toggleClass('show_block');
            // $('.dc_xblock_header_el').toggleClass('show_block'); 
            // $('.my_dcxblock').slideToggle('slow'); 

            initDcIde();
        }, 1200);
        
        $(this).addClass('hide_block');

    });
    
    function initDcIde(){
        // initAddedDCLightExercises();
        // console.log("DCL instances:", DCL.instances);
        my_object = DCL.instances;
        var idx = 0; 
    
        var key = Object.keys(my_object)[idx];
        value = my_object[key];
    
        dc_id = key;
    
        // console.dir("this is de key", dc_id);
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

