jQuery(document).ready(function($){


	//img overlays
	/*
    $('.team-thumb').on('mouseover', function()
    {
    	alert('1');
        var overlay = $(this).find('.team-overlay');
        var content = $(this).find('.overlay-content');
        alert('2');
        overlay.stop(true,true).fadeIn(600);
        content.stop().animate({'top': "40%",opacity:1 }, 600);
        alert('3');
        
    }).on('mouseleave', function()
    {
        var overlay = $(this).find('.team-overlay');
        var content = $(this).find('.overlay-content');
        
        content.stop().animate({'top': "60%",
			                     opacity:0  }, 300, function(){
			content.css('top',"20%")});
			
        overlay.fadeOut(300);
		
    });
*/
    jQuery('.team-thumb').hover(
    	function(){
	        var overlay = jQuery(this).find('.team-overlay');
	        var content = jQuery(this).find('.overlay-content');
	        overlay.stop(true,true).fadeIn(600);
	        content.stop().animate({'top': "40%",opacity:1 }, 600);
    	},
    	function(){
	        var overlay = jQuery(this).find('.team-overlay');
	        var content = jQuery(this).find('.overlay-content');
	        
	        content.stop().animate({'top': "60%",opacity:0  }, 300, function(){
				content.css('top',"20%")});
				
	        overlay.fadeOut(300);
			
	    }
    );


});