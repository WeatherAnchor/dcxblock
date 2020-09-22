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
        $('.weather-submit', element).text(result.grade)
    }

      
    window.onload = function () {
        console.log(DCL.instances)

        DCL.instances["my_test_1"].on("feedback", function(payload) {
            $.ajax({
                type: "POST",
                url: submitHandleUrl,
                data: JSON.stringify(payload),
                success: submitDatacampGrade
            });
        });
    
    ;}
}
