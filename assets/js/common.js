jQuery( document ).ready(function($) {

    $('.icon-toggle').on('click', function () {
        $(this).next('ul').slideToggle();
        $(this).toggleClass('active');
    });

    function footerToBottom () {
        var browserHeight = $(window).height(),
            headerOuterHeight = $('.header').outerHeight(true),
            footerOuterHeight = $('.footer').outerHeight(true),
            mainHeightMarginPaddingBorder = $('#content').outerHeight(true) - $('#content').height();
        $('#content').css({
            'min-height': browserHeight - footerOuterHeight - mainHeightMarginPaddingBorder - headerOuterHeight,
        });
    }
    footerToBottom();
    $(window).resize(function () {
        footerToBottom();
    });

    $('.up-btn').click(function() {
        $("html, body").animate({scrollTop: 0}, "slow")
    })

    // $('#menu-left-menu').scrollbar();
    const wrapTable = (data) => {
        data.wrap( "<div class='table-responsive'></div>" );
        data.addClass('table');
    };

    wrapTable($('.content-pages table'));

});


