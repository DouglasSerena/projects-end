$('#navbar').on('show.bs.collapse', function () {
    $('.bootsrapInfo').css('transform', "translate(-50%, 0%)");
});
$('#navbar').on('hidden.bs.collapse', function () {
    $('.bootsrapInfo').css('transform', "translate(-50%, -50%)");
});