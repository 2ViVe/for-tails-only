//Initialize
$(document).ready(function(){

	//Example 6	
	var oScroll6 = $('#scrollbar6');
	if(oScroll6.length > 0){
		
		oScroll6.tinyscrollbar();
		
		$('#scroll6load').click(function(){
			oScroll6.tinyscrollbar_update(50);
			return false;
		});
		$('#scroll6load2').click(function(){
			oScroll6.tinyscrollbar_update(200);
			return false;
		});		
		$('#scroll6load3').click(function(){
			oScroll6.tinyscrollbar_update(350);
			return false;
		});			
	//Example 1
	var oScroll1 = $('.tabwrap');
	if(oScroll1.length > 0){
		oScroll1.tinyscrollbar();
	}
}});

//Fake html5 in ie
document.createElement('header');
document.createElement('footer');
document.createElement('nav');
document.createElement('section');
document.createElement('article');
document.createElement('aside');