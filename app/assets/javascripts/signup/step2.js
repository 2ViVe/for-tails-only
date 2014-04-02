jQuery(document).ready(function($) {
  
  function loadProduct(callback) {
    $.get('/registration/products', { role_code: $('.role_code:checked').val(), country_id:$('#country_id').val(),
    }, function(data, textStatus, xhr) {
      $('#products_wrapper').html(data);
      $('#step2_submit').val('Continute').removeAttr("disabled");
      stepControl("#step_3");
      window.location.hash="#step_3";
    });
    
  };
  
  $('#show_sponsor').click(function(e) {
    
     $.get('validate/check_sponsor', {sponsor: $('#sponsorID').val(), show_name: true}, function(data, textStatus, xhr) {

       if (data && data.name) {
       $('#show_sponsor_name').text(data.name);
       }else{
       $('#show_sponsor_name').text("not found");
       };
       
     },'json');
      e.preventDefault();
  });
  
  $(document).on("change",'#payment-method-id', function(event) {
    if ($("#payment-method-id option:selected").attr('data-is-creditcard') == 'true') {
      $('.creditcard-wrapper').show();
    }else{
     $('.creditcard-wrapper').hide();
    };
  });
  
  // STEP3 update shipping methods
  function update_shipping_methods(country_id) {
    $.get('/registration/shipping_methods', {country_id: country_id}, function(data, textStatus, xhr) {
      var options_html = "";
      $.each(data, function(index, val) {
       options_html += "<option value="+ val['id'] +">" + val['name']+ "</option>"
      });
      $('#shipping-method-id').html(options_html);
    });
  };
  
  function update_shipping_address_country() {
    var a = $('#country_id option:selected').clone()[0];
    var b = $('#country_id option:selected').clone()[0];
    $('#shipping-address_country-id').html(a).trigger("change");
    $('#home-address_country-id').html(b).trigger("change");
    $("#billing-address_country-id").val($('#country_id').val()).trigger("change");

  };
  function hide_state_and_zip_div() {
    $('#home-address-state-div').hide();
    $('#home-address-zip-div').hide();
    $('#shipping-address-state-div').hide();
    $('#shipping-address-zip-div').hide();
    $('#billing-address-state-div').hide();
    $('#billing-address-zip-div').hide();
  };
  
  function show_state_and_zip_div() {
    $('#home-address-state-div').show();
    $('#home-address-zip-div').show();
    $('#shipping-address-state-div').show();
    $('#shipping-address-zip-div').show();
    $('#billing-address-state-div').show();
    $('#billing-address-zip-div').show();
  };
  
//update_shipping_methods($('#country_id').val());
  
  $("#step2").validate({
    onkeyup: false,
    rules:{
      "sponsor" : {
        required: true,
        maxlength: 30,
        number: true,
        remote: "/validate/check_sponsor"
      },
      "country_id" : {
        required: true
      },
      "language":{
        required: true
      }
    },
    messages:{
      "sponsor":{
        remote: "Not available"
      }
    },
    errorElement: "small",
    submitHandler: function(form) {
      $('#step2_submit').val('wait...').attr("disabled","disabled");
      

    
      loadProduct(function() {
         
      });
      
      if ($('#country_id').val() != '1214') {
        $('.ssn_wrapper').hide();
      }else{
        $('.ssn_wrapper').show();
      };
     
      update_shipping_methods($('#country_id').val());
      update_shipping_address_country();

      if ($('#country_id').val() == '1008') {
        hide_state_and_zip_div();
      }else{
        show_state_and_zip_div();
      };
     
      return false;
    }
  });
});
