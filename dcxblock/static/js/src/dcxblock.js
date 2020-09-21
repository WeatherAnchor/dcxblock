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

    $('.save-button').click(function(eventObject){
        var data = {
            dc_cdn: $(element).find('input[name=dc_cdn]').val(),
            dc_grade: $(element).find('input[name=dc_grade]').val(),
            dc_code: $(element).find('input[name=dc_code]').val()
        };
        runtime.notify('save', {state: 'start'});
        $.ajax({
            type: "POST",
            url: runtime.handlerUrl(element, 'studio_submit'),
            data: JSON.stringify(data),
            success:function(response){
                runtime.notify('save', {state: 'end'});
            }
        });
    });
    
    $('.cancel-button').click(function(eventObject){
        runtime.notify('cancel', {});
    });

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
