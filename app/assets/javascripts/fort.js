$(document).foundation();
$(document).ready(function(){
	jQuery.fn.extend({
    update_state_id: function(mapping, $state) {
      this.change(function(event) {
        var states = mapping[$(this).val()];
        $state.html("");
        $state.append("<option value=''></option>");
        $.each(states, function(index, val) {
          $state.append("<option value='"+ val.id +"' >" +val['name']+ "</option>");
        });
      });
    }
  });
	$('#topBarCountry').click(function(){
		$('#topBarCountryList').toggle();
	});
});