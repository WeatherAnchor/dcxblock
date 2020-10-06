/* Javascript for DcXBlock. */
function DcXBlock(runtime, element) {

    $('.save-button').click(function(eventObject){
        var data = {
            dc_cdn: $(element).find('input[name=dc_cdn]').val(),
            dc_grade: $(element).find('input[name=dc_grade]').val(),
            dc_code: $("#dc_code").val(),
            dc_id: $("#dc_id").val()
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

}
