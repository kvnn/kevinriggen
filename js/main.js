(function(){
    $(function(){

        // Revealers
        $('.reveal-content').hide();
        $('.reveal').on('click', '.reveal-trigger', function(evt){
           $('.reveal-content', $(evt.delegateTarget)).slideToggle();
           $('expand', $(evt.delegateTarget)).toggle();
           evt.preventDefault();
        });
    });
})();