$('#userLink').click(function () {
    $('#dashboard-form').hide()
    $('#user-form').show()
    $('#vehicle-form').hide()
    $('#guide-form').hide()
    $('#hotel-form').hide()


})

$('#vehicleLink').click(function () {
    $('#dashboard-form').hide()
    $('#vehicle-form').show();
    $('#guide-form').hide()
    $('#hotel-form').hide()
    $('#user-form').hide()
})

$('#guideLink').click(function () {
    $('#dashboard-form').hide()
    $('#vehicle-form').hide();
    $('#guide-form').show()
    $('#hotel-form').hide()
    $('#user-form').hide()
})