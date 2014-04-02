// datatables.us plugins and custom functions


// Sort by title attribute in a tag (note, only use "title-numeric" without -asc|-desc)
// Example: "aoColumns" : [null, null, {"sType":'string'},{"sType":'string'},{"sType":"title-numeric"},null,null]
jQuery.fn.dataTableExt.oSort['title-numeric-asc']  = function(a,b) {
    var x = a.match(/title="*(-?[0-9]+)/)[1];
    var y = b.match(/title="*(-?[0-9]+)/)[1];
    x = parseFloat( x );
    y = parseFloat( y );
    return ((x < y) ? -1 : ((x > y) ?  1 : 0));
};
 
jQuery.fn.dataTableExt.oSort['title-numeric-desc'] = function(a,b) {
    var x = a.match(/title="*(-?[0-9]+)/)[1];
    var y = b.match(/title="*(-?[0-9]+)/)[1];
    x = parseFloat( x );
    y = parseFloat( y );
    return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};
