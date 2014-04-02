


$(document).ready(function($) {
  
  $.validator.addMethod("login1", function(value, element) {
    return this.optional(element) || (value.match(/[a-z0-9]/g).length == value.length);
  }, "Only lowercase letters and numbers allowed.");
  
  $.validator.addMethod("login2", function(value, element) {
    return this.optional(element) || /[a-z]/.test(value);
  }, "Must contain at least one downcase character.");
  
  $.validator.addMethod("password_format", function(value, element) {
    return this.optional(element) || /[a-zA-Z]/.test(value);
  }, "Must contain at least one character.");
  
  $('#shipping-address_country-id').update_state_id(countries_states, $('#shipping-address_state-id'));
  $('#billing-address_country-id').update_state_id(countries_states, $('#billing-address_state-id'));
  $('#home-address_country-id').update_state_id(countries_states, $('#home-address_state-id'));
  
  $(document).on("click",'.check_autoship', function(event) {
    if ($(this).is(':checked')) {
      $(this).parent().next().children().first().removeAttr("disabled").val(1);
    }else{
      $(this).parent().next().children().first().attr("disabled",'disabled').val("");
    };
  });
  
  $(document).on("click",'.promotional_pack', function(event) {
    if ($(this).is(':checked')) {
      $(".promotional_pack").attr("disabled",'disabled');
      $(this).removeAttr("disabled");
    }else{
      $(".promotional_pack").removeAttr("disabled");
    };
  });
  
  function autoship_line_items_attributes() {
    var line_items = [];
    $('.autoship-items').each(function(index) {
      if (parseInt($(this).val())  > 0 ) {
        line_items.push({ 
          "variant-id"  :  parseInt($(this).attr('data-variant-id')), 
          'price' : parseFloat($(this).attr('data-price')).toFixed(2), 
          'pv' : $(this).attr('data-pv'), 
          "quantity" :  $(this).val(),
          'image': $(this).attr('data-image'), 
          'name': $(this).attr('data-name')
        })
      };
    });
    return line_items;
  };
  

  function line_items_attributes() {
    var line_items = [];
    $('.line-items').each(function(index) {
      if (parseInt($(this).val())  > 0 ) {
        line_items.push({ 
          "variant-id"  :  parseInt($(this).attr('data-variant-id')), 
          'price' : parseFloat($(this).attr('data-price')).toFixed(2), 
          'pv' : $(this).attr('data-pv'), 
          "quantity" :  $(this).val(),
          'image': $(this).attr('data-image'), 
          'name': $(this).attr('data-name')
        })
      };
    });
    
    if ($('.promotional_pack:checked').val() != undefined) {
      line_items.push({ 
        "variant-id"  : parseInt($('.promotional_pack:checked').val()) ,
        "quantity"  :1 , 
        'price':  parseFloat($('.promotional_pack:checked').attr('data-price')).toFixed(2), 
        'image': $('.promotional_pack:checked').attr('data-image'),
        'pv' : $('.promotional_pack:checked').attr('data-pv'), 
        'name': $('.promotional_pack:checked').attr('data-name')
      })
    };
    
    if ($('.entry_kit:checked').val() != undefined) {
      line_items.push({ 
        "variant-id"  : parseInt($('.entry_kit:checked').val()) ,
        "quantity"  :1 , 
        'pv' : $('.entry_kit:checked').attr('data-pv'), 
        'price':   parseFloat($('.entry_kit:checked').attr('data-price')).toFixed(2),  //parseInt($('.entry_kit:checked').attr('data-price')) ,
        'image': $('.entry_kit:checked').attr('data-image'), 
        'name': $('.entry_kit:checked').attr('data-name')
      })
    };
    return line_items;
  };
  
  function update_autoship_html() {
    var html = '';
    $.each(autoship_line_items_attributes(), function(index, val) {
      html += '<tr>';
      html += "<td><div class='signUpPackItem'><img src='" + val.image + "' width='50' height='50' alt='Pack name' class='packImg' />";
      html += "<div class='packInfo'><h6>" + val.name + "</h6></div></div></td>";
      html += "<td>" + val.pv + "</td>";
      html += "<td>$ " + val.price + "</td>";
      html += "<td>" + val.quantity + "</td>";
      html += "<td>$ " + (val.price * val.quantity).toFixed(2) + "</td>";
      html += '</tr>';
    });
    if (html == '') {
      $('#autoship_wrapper').hide();
    }else{
      $('#autoship_wrapper').show();
      $('.autoship-preview').html(html);
    };
    
  };
  function update_line_items_html() {
    var html = '';
    $.each(line_items_attributes(), function(index, val) {
      html += '<tr>';
      html += "<td><div class='signUpPackItem'>"
      if (!(/noimage/.test(val.image ))) {
        html += "<img src='" + val.image + "' width='50' height='50'  class='packImg' />";
      };
      
      html += "<div class='packInfo'><h6>" + val.name + "</h6></div></div></td>";
      html += "<td>" + val.pv + "</td>";
      html += "<td>$ " + val.price + "</td>";
      html += "<td>" + val.quantity + "</td>";
      html += "<td>$ " + (val.price * val.quantity).toFixed(2) + "</td>";
      html += '</tr>';
    });
    $('.line-items-preview').html(html);
  };
  
  function update_step6_line_items_html(data) {
    var html = '';
    $.each(data['order']['line-items'], function(index, val) {
      html += '<tr>';
      html += "<td><div class='signUpPackItem'>";
      if ( !(/noimage/.test(val['image-url'])) ) {
      html +=  "<img src='" + val['image-url'] + "' width='50' height='50' alt='Pack name' class='packImg' />";
      };
      
      html += "<div class='packInfo'><h6>" + val['product-name'] + "</h6></div></div></td>";
      html += "<td>" + val['qualifiction-volume'] + "</td>";
      html += "<td>$ " + val.price + "</td>";
      html += "<td>" + val.quantity + "</td>";
      html += "<td>$ " + val.price * val.quantity + "</td>";
      html += '</tr>';
    });
    $('#step6-line-items').html(html);
    
    $('.step6_adjustments_place_holder').html("");
    $.each(data['order']['adjustments'], function(index, val) {
       $('.step6_adjustments_place_holder').append("<p>"+ val.label + ": $" + val.amount +"</p>")
    });
    
    $('.step6_total_price_placeholder').text(data['order']['total']);
    
  };
  
  
  $('#verify_sponsor').click(function(event) {
    if ($('#sponsorID').val().length > 0) {
      $.get('/verify_sponsor', {id: $('#sponsorID').val()}, function(data, textStatus, xhr) {
        $('.sponsor_name_wrapper').text(data.name);
      });
    };
    
  });
  

  
  
  function user_attributes() {
    
    var sponsor_id = parseInt($("input[name='sponsor']").val());
    if (sponsor_id < 10 || (sponsor_id >= 1000 && sponsor_id < 10000)) {
      sponsor_id = String(sponsor_id) + "01";
    };
    return{
      "sponsor"  :   sponsor_id,
      "role-code" :  $('.role_code:checked').val(),
      "login"  :   $("input[name='login']").val(),
      "password"  :  $("input[name='password']").val(),
      "email"  :  $("input[name='email']").val(),
      "birthday"  : $("#user_birthday_1i").val() + "-" +  $("#user_birthday_2i").val() + "-" +  $("#user_birthday_3i").val(),
      "social-security-number"  :  $("input[name='social-security-number']").val(),
      "tax-id"  :  $("input[name='social-security-number']").val(),
      "country-iso"  :  $('#country_id option:selected').attr("iso"),
      "dualteam-sponsor"  :  $("input[name='dualteam-sponsor']").val(),
      "dualteam-placement"  : $("#dualteam-placement").val()
    }
  };
  
  
  function home_address_attributes() {
    return  {
      "first-name"  :  $("input[name='home-address[first-name]']").val(),
      "m"  :   $("input[name='home-address[m]']").val(),
      "last-name"  :    $("input[name='home-address[last-name]']").val(),
      "street"  :    $("input[name='home-address[street]']").val(),
      "street-cont"  :    $("input[name='home-address[street-cont]']").val(),
      "city"  :    $("input[name='home-address[city]']").val(),
      "zip"  :   $("input[name='home-address[zip]']").val(),
      "state-id"  :  $("select[name='home-address[state-id]']").val(),
      "country-id"  : $("select[name='home-address[country-id]']").val(),
      "work-phone"  :  $("input[name='home-address[work-phone]']").val()
        }
  };
  
  function shipping_address_attributes() {
    return  {
      "first-name"  :  $("input[name='shipping-address[first-name]']").val(),
      "m"  :   $("input[name='shipping-address[m]']").val(),
      "last-name"  :    $("input[name='shipping-address[last-name]']").val(),
      "street"  :    $("input[name='shipping-address[street]']").val(),
      "street-cont"  :    $("input[name='shipping-address[street-cont]']").val(),
      "city"  :    $("input[name='shipping-address[city]']").val(),
      "zip"  :   $("input[name='shipping-address[zip]']").val(),
      "state-id"  :  $("select[name='shipping-address[state-id]']").val(),
      "country-id"  : $("select[name='shipping-address[country-id]']").val(),
      "phone"  :  $("input[name='shipping-address[phone]']").val()
    }
  };
  
  function billing_address_attributes() {
    return {
      "first-name"  :  $("input[name='billing-address[first-name]']").val(),
      "last-name"  :   $("input[name='billing-address[last-name]']").val(),
      "street"  :    $("input[name='billing-address[street]']").val(),
      "street-cont"  :    $("input[name='billing-address[street-cont]']").val(),
      "city"  :    $("input[name='billing-address[city]']").val(),
      "zip"  :   $("input[name='billing-address[zip]']").val(),
      "state-id"  :  $("select[name='billing-address[state-id]']").val(),
      "country-id"  : $("select[name='billing-address[country-id]']").val(),
      "phone"  :  $("input[name='billing-address[phone]']").val()
    }
  };
  
  
  function web_address_attributes() {
    return  {
      "first-name"  :  $("input[shipping='web-address[first-name]']").val(),
      "m"  :   $("input[name='web-address[m]']").val(),
      "last-name"  :    $("input[name='web-address[last-name]']").val(),
      "phone"  :  $("input[name='web-address[phone]']").val()
    }
  };

  // STEP3 update payment methods
  function update_payment_methods(country_id, total) {
    $.get('/registration/payment_methods', {country_id: country_id}, function(data, textStatus, xhr) {
      var options_html = "";
      function html_join(pval){
        return "<option value='"+ pval.id +"' data-is-creditcard='"+ pval['is-creditcard'] +"'>" + pval['name']+ "</option>";
      }
      if(total > 3000){
        $.each(data, function(index, val){
          if (val['is-creditcard'] == false) {
            options_html += html_join(val);
          }
        });
      } else {
        if(autoship_line_items_attributes().length > 0){ // total < 3000 && has autoship
          $.each(data, function(index, val){
            if (val['is-creditcard'] == true) {
              options_html += html_join(val);
            }
          });
        } else {
          $.each(data, function(index, val){
            options_html += html_join(val);
          });
        }
      }
//      $.each(data, function(index, val) {
//        if (!(total > 3000 && val['is-creditcard'] == true)) {
//           options_html += "<option value='"+ val.id +"' data-is-creditcard='"+ val['is-creditcard'] +"'>" + val['name']+ "</option>"
//        };
//      });
      $('#payment-method-id').html(options_html).trigger("change");
    });
  };
  
  
  function copy_attributes() {

    $('.login_placeholder').text($("input[name='login']").val());
    $('.password_placeholder').text($("input[name='password']").val());
    $('.shipping_method_placeholder').text($("#shipping-method-id option:selected").text());
    
    $('.shipping_address_placeholder .name').text(shipping_address_attributes()['first-name'] + " " + shipping_address_attributes()['last-name']);
    $('.shipping_address_placeholder .address').text(shipping_address_attributes()['street'] + ", " + shipping_address_attributes()['street-cont'] );
    $('.shipping_address_placeholder .city').text(shipping_address_attributes()['city'] +", " +
                                            $("select[name='shipping-address[state-id]'] option:selected").text() +" " + 
                                            shipping_address_attributes()['zip'] +" " +
                                            $("select[name='shipping-address[country-id]'] option:selected").text() 
                                            );
    $('.shipping_address_placeholder .phone').text(shipping_address_attributes()['phone']) ;
  };
  
  function copy_billing_address() {
    $('.billing_address_placeholder .name').text(billing_address_attributes()['first-name'] + " " + billing_address_attributes()['last-name']);
    $('.billing_address_placeholder .address').text(billing_address_attributes()['street'] + " " + billing_address_attributes()['street-cont'] );
    $('.billing_address_placeholder .city').text(billing_address_attributes()['city'] +", " +
                                            $("select[name='billing-address[state-id]'] option:selected").text()  +" " + 
                                            billing_address_attributes()['zip'] +" " +
                                            $("select[name='billing-address[country-id]'] option:selected").text() 
                                            );
    
    $('.billing_address_placeholder .phone').text(billing_address_attributes()['phone']) ;
  };
  
  $('#web_use_home_address').click(function() {
    if (this.checked) {
      $("input[name='web-address[first-name]']").val(home_address_attributes()["first-name"]);
      $("input[name='web-address[m]']").val(home_address_attributes()["m"]);
      $("input[name='web-address[last-name]']").val(home_address_attributes()["last-name"]);
      $("input[name='web-address[phone]']").val(home_address_attributes()["work-phone"]);
    };
  });
  
  $('#ship_use_home_address').click(function(event) {
    if (this.checked) {
      $("input[name='shipping-address[first-name]']").val(home_address_attributes()["first-name"]);
      $("input[name='shipping-address[m]']").val(home_address_attributes()["m"]);
      $("input[name='shipping-address[last-name]']").val(home_address_attributes()["last-name"]);
      $("input[name='shipping-address[street]']").val(home_address_attributes()["street"]);
      $("input[name='shipping-address[street-cont]']").val(home_address_attributes()["street-cont"]);
      $("input[name='shipping-address[city]']").val(home_address_attributes()["city"]);
      $("input[name='shipping-address[zip]']").val(home_address_attributes()["zip"]);
      $("select[name='shipping-address[state-id]']").val(home_address_attributes()["state-id"]);
      $("select[name='shipping-address[country-id]']").val(home_address_attributes()["country-id"]);
      $("input[name='shipping-address[phone]']").val(home_address_attributes()["work-phone"]);
    };
  });
  
  $('#bill_use_home_address').click(function(event) {
    if (this.checked) {
      $("input[name='billing-address[first-name]']").val(home_address_attributes()["first-name"]);
      $("input[name='billing-address[m]']").val(home_address_attributes()["m"]);
      $("input[name='billing-address[last-name]']").val(home_address_attributes()["last-name"]);
      $("input[name='billing-address[street]']").val(home_address_attributes()["street"]);
      $("input[name='billing-address[street-cont]']").val(home_address_attributes()["street-cont"]);
      $("input[name='billing-address[city]']").val(home_address_attributes()["city"]);
      $("input[name='billing-address[zip]']").val(home_address_attributes()["zip"]);
      $("input[name='billing-address[phone]']").val(home_address_attributes()["work-phone"]);
      $("select[name='billing-address[country-id]']").val(home_address_attributes()["country-id"]);
      $("select[name='billing-address[state-id]']").val(home_address_attributes()["state-id"]);
    };
  });
  
  function signup_data() {
    var a = {
      "special-instructions":$('#special_instructions').val(),
      "language": $('#language').val(),
      "payment-method-id"  : $("select[name='payment-method-id']").val(),
      "shipping-method-id" :  $("select[name='shipping-method-id']").val(),
      "user-info" : user_attributes(),
      "shipping-address" : shipping_address_attributes(),
      "home-address" : home_address_attributes(),
      "web-address" : web_address_attributes(),
      "line-items": line_items_attributes(),
      "autoship-line-items":autoship_line_items_attributes()
    }
    if ($('#payment-method-id option:selected').attr("data-is-creditcard") == 'true') {
      a["creditcard"] = creditcard_attributes();
      a["billing-address"] = billing_address_attributes();
    }else{
      a["billing-address"] = shipping_address_attributes();
    };
    return a;
  };
  
  function update_adjustment() {
    var r = {
      "shipping-method-id" :  $("select[name='shipping-method-id']").val(),
      "shipping-address" : shipping_address_attributes(),
      "billing-address" : shipping_address_attributes(),
      "home-address" : home_address_attributes(),
      "line-items": line_items_attributes(),
      "role-code": $('.role_code:checked').val()
    };
    
    var total = 0;
    var total_pv = 0;
    
    $.each(line_items_attributes(), function(index, val) {
      total += (val.price * val.quantity);
      total_pv += (val.pv * val.quantity);
    });
    
    //$('.adjustments_place_holder').html("");
    var checkout_table = $('#checkout-table');
    checkout_table.find('tr').not('._ndel').remove();
    $.post('/registration/adjustments', r, function(data, textStatus, xhr) {
   //   if (data[] == 200) {
      var adjustment_html = "";
     $('.subtotal_placeholder').html(total.toFixed(2));
        $.each(data['response'], function(index, val) {
          total += val.amount;
          //$('.adjustments_place_holder').append("<p>"+ val.label + ": $" + parseFloat(val.amount).toFixed(2) +"</p>")
          adjustment_html += ("<tr><td>"+ val.label + ":</td>" + "<td>$" + parseFloat(val.amount).toFixed(2) +"</td></tr>");
        });
        checkout_table.find('tr:first').after(adjustment_html);
        total = total.toFixed(2);
        $('.total_price_placeholder').text(total);
        $('.total_pv_placeholder').text(total_pv);
        update_payment_methods($('#country_id').val(), total);
        
   //   };
    });
    
    
  };
  
  
  
  function validate_home_address(callback) {
    $.post('/validate/home_address', home_address_attributes(), function(data, textStatus, xhr) {
      callback(data);
    },'html');
  };
  
  function validate_shipping_address(callback) {
    $.post('/validate/shipping_address', shipping_address_attributes(), function(data, textStatus, xhr) {
      callback(data);
    },'html');
  };
  
  function validate_billing_address(callback) {
    if ($("#payment-method-id option:checked").attr("data-is-creditcard") != 'true') {
      callback("true");
    }else{
      $.post('/validate/billing_address', billing_address_attributes(), function(data, textStatus, xhr) {
        callback(data);
      },'html');
    };
  };
  
  $('#step3_submit').click(function(event) {
    if (line_items_attributes().length > 0) {
     
      stepControl("#step_4");
       window.location.hash="#step_4";
    }else{
      alert("Please select your product.")
    };
    return false;
  });
  
  
  // step4
  $("#step4").validate({
    onkeyup: false,
    rules:{
      "login" : {
        required: true,
        login1: true,
        login2: true,
        maxlength: 30,
        minlength: 5,
        remote: "/validate/check_email_or_login"
      },
      "email":{
        required: true,
        email: true
      },
      "social-security-number":{
        number:true,
        minlength:9,
        maxlength:9,
        remote: "/validate/check_email_or_login"
      },
      "password": {
        required: true,
        password_format: true,
        minlength: 6,
        maxlength: 30
      },
      "password_confirmation": { 
        equalTo: "#password"
      },
    },
    messages:{
      "login":{
        remote: "Not available"
      },
      "email":{
        remote: "Not available"
      }
    },
    errorElement: "small",
    submitHandler: function(form) {
    $('#step4_submit').val('wait...').attr("disabled",'disabled');
      
      validate_home_address(function(data) {
        
        if (data == "true") {
          validate_shipping_address(function(data) {
           
            if (data == "true") {
              update_autoship_html();
              update_line_items_html();
              update_adjustment();
              copy_attributes();
              $('#bill_use_home_address').trigger("click");
              
              stepControl("#step_5");
              window.location.hash="#step_5";
            }else{
              alert("Shipping Address: " + data);
            };
         });
        }else{
         alert("Home Address: " + data);
        };
    
        $('#step4_submit').val('Continue').removeAttr('disabled');
      });
      return false;
    }
  });
  
  // step5
  function creditcard_attributes() {
    return {
      "number"  :  $("input[name='creditcard[number]']").val(),
      "expiration-year"  :  $("select[name='creditcard[expiration-year]']").val(),
      "expiration-month"  :  $("select[name='creditcard[expiration-month]']").val(),
      "cvv"  :   $("input[name='creditcard[cvv]']").val()
    }
  };
  
  function process_signup() {
    $.ajax({
      url: '/signup',
      type: 'POST',
      dataType: 'json',
      data: signup_data(),
      complete: function(xhr, textStatus) {
          $('#step5_submit').removeAttr('disabled').val("Continue");
      },
      success: function(data, textStatus, xhr) {
        if (data["meta"]["code"] == "200" && data['response']['order']['payment-state'] != 'failed') {
          var r = data["response"];
          $('.payment_method_placeholder').text($("#payment-method-id option:selected").text());
          $('#show-order-id').text(r["order"]["number"]);
          $('.distributor_placeholder').text(r["distributor-id"]);
          //$('#show-payment-state').text(r["order"]["payment-state"]);
          $('#show-payment-state').text("Funds Verification");
          if (r["sponsor"] != null) {
            $('#sponsor_name_placeholder').text(r["sponsor"]["name"]);
            $('#sponsor_email_placeholder').text(r["sponsor"]["email"]);
            $('#sponsor_phone_placeholder').text(r["sponsor"]["phone"]);
          };
          
          update_step6_line_items_html(data['response']);
          
          
          $('#order_date_placeholder').text(r["order"]["order-date"].replace(/-/g,'/').replace(/T/,' ').replace(/\..*Z/,''));
          if (r["order"]["payment-date"] != null) {
          $('#payment_date_placeholder').text(r["order"]["payment-date"].replace(/-/g,'/').replace(/T/,' ').replace(/\..*Z/,''));
          };
          
          copy_billing_address();
          stepControl("#step_6");
          window.location.hash="step_6";
          
        }else{
          alert(data["meta"]["error"]["message"]);
        };
      },
      error: function(xhr, textStatus, errorThrown) {
       alert("error.");
      }
    });
  };
  
  var step5_validator = $("#step5").validate({
    onkeyup: false,
    rules:{
    
    },
    messages:{
    },
    errorElement: "small"
  });
  
  $('#step5_submit').click(function(event) {
    if (($("select[name='payment-method-id'] option:selected").attr("data-is-creditcard") == 'true') && !step5_validator.form()) {
      return false;
    }else{
      $('#step5_submit').attr("disabled",'disabled').val("wait...");
      validate_billing_address(function(data) {
        if (data == "true") {
          process_signup()
        }else{
          alert("Billing Address: " + data);
           $('#step5_submit').removeAttr('disabled').val("Continue");
          return false;
        };
      });
    };
    
    return false;
  });


  // check total price is over 3000
  $(document).on('focusout', '.line-items', function(){
    var quantity = $(this).val().trim();
    if(quantity.length > 0){
      if(!/^\d+$/.test(quantity)) {
        alert('please entery correct Quantity');
        return;
      }
    }
    if(calcute_total_price() > 3000){
      autoship_is_disabled();
    }
  });

  $(document).on('focusin', '.line-items', function(){
    $('.check_autoship').prop('disabled', false);
//      $('.autoship-items').each(function(){
//        var data_quantity = $(this).attr('data-quantity');
//        if(data_quantity && /^\d+$/.test(data_quantity)){
//          $(this).val(data_quantity).parent().prev().children().prop('checked', true);
//        }
//      });
  });

  $(document).on('click', '.promotional_pack', function(){
    if(calcute_total_price() > 3000){
      autoship_is_disabled();
    } else {
      $('.check_autoship').prop('disabled', false);
    }
  });

  function products_total_price(){
    var total_price = 0;
    $('.line-items').each(function(){
      var quantity = parseInt($(this).val(), 10);
      var price    = parseFloat( $(this).parent().prev().text().slice(1) );
      if(quantity){ // check quantity is not NaN
        total_price += (price * quantity);
      }
    });
    return total_price;
  }

  function promotion_pack_total_price(){
    var check_promotion = $('.promotional_pack').filter(':checked');
    if(check_promotion.length > 0){
      return parseFloat(check_promotion.attr('data-price'));
    } else {
      return 0;
    }
  }

  function calcute_total_price(){
    return products_total_price() + promotion_pack_total_price();
  }

  function autoship_is_disabled(){
    $('.check_autoship').prop('checked', false).prop('disabled', true); // disable autoship checkbox
    $('.autoship-items').each(function(){
      //$(this).attr('data-quantity', $(this).val());
      $(this).val('');
    });
  }
  
});
