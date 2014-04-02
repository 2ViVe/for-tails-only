
jQuery(document).ready(function($) {
  
  if (window.location.hash != '') {
    window.location = '/signup';
  };


  
  $('#step1').submit(function(event) {
    var role_code = $('input[name=role_code]:checked').val();
    if ( role_code == undefined) {
      alert("Please select the type of the new applicant first.")
      return false;
    }else{
      if (role_code != 'D') {
        $('.hide_for_retail').hide();
      }else{
        $('.hide_for_retail').show();
      };
      stepControl("#step_2");
      window.location.hash="#step_2";
      
      return false;
    };
    
  });
  
});