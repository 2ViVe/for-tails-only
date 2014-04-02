function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function showLoading(id) {
    var mytext = (typeof arguments[1] == 'undefined' || arguments[1] == '') ?  "<p style='background-color:#ffffff; padding: 15px; font-family: Arial; font-size: 12px'><img src='images/loading.gif' align='absmiddle'></p>" : arguments[1];
    var myreplace = (typeof arguments[2] == 'undefined') ?  'replace' : arguments[2];
	var b;
	if (b = MM_findObj(id)) {
	//b.innerHTML = "<p style='background-color:#ffffff; padding: 15px; font-family: Arial; font-size: 12px'><img src='images/loading.gif' align='absmiddle'>&nbsp;&nbsp;Loading, please wait....</p>";
	if (myreplace == 'append') {
		b.innerHTML = b.innerHTML + mytext; 
	} else if (myreplace == 'prepend') {
		b.innerHTML = mytext + b.innerHTML; 
	} else {
		b.innerHTML = mytext; 
	}
	}
}
function setContent(id,str) {
	var b = MM_findObj(id);
	b.innerHTML = str;
}

function removeAllChildren(targetElement) {
    if (targetElement && targetElement.childNodes) {
        for (var rloop = targetElement.childNodes.length -1; rloop >= 0 ; rloop--) {
            targetElement.removeChild(targetElement.childNodes[rloop]);
        }
    }
}

var ajaxObjectsLoading = new Object();

// Load a page into a div layer
function ajaxLoadPage(){
    var url = arguments[0];
    var id = arguments[1];
    var close = (typeof arguments[2] == 'undefined') ? 0 :arguments[2];
    var xpos = (typeof arguments[3] == 'undefined') ? 'center' : arguments[3];
    var ypos = (typeof arguments[4] == 'undefined') ? 'center' : arguments[4];

    var d = new Date();

    ajaxObjectsLoading[id] = d.getTime();


    var xmlobj;
    // check for existing requests
    if (xmlobj != null && xmlobj.readyState != 0 && xmlobj.readyState != 4) {
        xmlobj.abort();
    }
    try {
        // instantiate object for Mozilla, Nestcape, etc.
        xmlobj = new XMLHttpRequest();
    }
    catch(e) {
        try {
            xmlobj = new ActiveXObject('Microsoft.XMLHTTP'); // IE
        }
        catch(e) {
            // Ajax not supported
            xmlobj = null;
        }
    }

    // what to do with data from hit
    xmlobj.onreadystatechange = function () {
	   // if request is completed
	   if (xmlobj.readyState == 4 ) {
	        if(xmlobj.status == 200 ) {
		    if (id in ajaxObjectsLoading && d.getTime() >= ajaxObjectsLoading[id]) {
			// do something with returned data
			var b = MM_findObj(id);
			if (b != null) {
				//b.innerHTML = xmlobj.responseText;
				//evalScripts(b.innerHTML);

				//IE doesn't run script tags if they're the first thing.  Inserting a 0x0 table that shouldn't show, but will be the first thing in the source.
				var re = /^\s*<script\s*/;
				if (xmlobj.responseText.match(re)) {
					b.innerHTML = "<table width=0 height=0 cellspacing=0 cellpadding=0 border=0></table>" + xmlobj.responseText;
				} else {
					b.innerHTML = xmlobj.responseText;
				}
				evalScripts2(b);
				if (close == 1) {
					b.innerHTML = "<p align=center style='font-family: Arial; background-color: #ffffff;'><a href='javascript:;' onclick='removeDiv(\""+id+"\");hidePopUp(\"overlay\");'>X Close/Cancel</a></p>" + b.innerHTML;
				}
				if (xpos == 'center') {
					centerDivH(b);
				} else if (xpos != '') {
					b.style.left = parseInt(xpos) + "px";
				}
				if (ypos == 'center') {
					centerDivV(b);
				} else if (ypos != '') {
					b.style.top = parseInt(ypos) + "px";
				}
				if (typeof jQuery != 'undefined' && $('.scroll-pane') && typeof $('.scroll-pane').jScrollPane == 'function') {
					$('.scroll-pane').jScrollPane();
				}
			}

			delete ajaxObjectsLoading[id];
		   }
		  
         	} else if (xmlobj.status != 0) {
			alert(url + ' Failed:'+ xmlobj.statusText);
		     if (id in ajaxObjectsLoading) {
			delete ajaxObjectsLoading[id];
		     }
	        }
	   }

    }

    //make the hit
    xmlobj.open('GET',url,true);
    xmlobj.setRequestHeader('Content-Type','text/html'); //GET
    //receiverXMLHttpObj.setRequestHeader('Content-Type','application/x-www-form-urlencoded'); //POST
    xmlobj.setRequestHeader( "If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT" ); //for IE caching
    xmlobj.send('null');
}


// example of creating a div layer
function createDiv() {
	var id = arguments[0];
	var xpos = (typeof arguments[1] == 'undefined') ? 'center' : arguments[1];
	var ypos = (typeof arguments[2] == 'undefined') ? 'center' : arguments[2];
	var hide = (typeof arguments[3] == 'undefined') ? 0 : arguments[3];
	var divTag = document.createElement("div");
	divTag.id = id;
	divTag.setAttribute("align","center");
	divTag.style.margin = "0px auto";
	divTag.style.padding = "5px";
	divTag.style.zIndex = "5000";
	divTag.style.position = "absolute";
	divTag.style.top = 0;
	divTag.style.left = 0;
	divTag.style.backgroundColor = "transparent";
	divTag.style.overflow = "visible";
	divTag.style.border = "0px";
	divTag.style.display = "none";
	divTag.className = "popup_layer"; //this can override styles above
	//divTag.innerHTML = "<p style='font-family: Arial'>Loading.  Please wait...</p>";
	//divTag.innerHTML = "<p style='background-color:#ffffff; width: 200px; padding: 15px; font-family: Arial; font-size: 12px'><img src='images/loading.gif' align='absmiddle'>&nbsp;&nbsp;Loading, please wait....</p>";
	divTag.innerHTML = "<p style='background-color:#ffffff; width: 200px; padding: 15px; font-family: Arial; font-size: 12px'></p>";
                //Make new window at 75% of screen width & height
                var winwidth = document.body.clientWidth * .75;
                var winheight = document.body.clientHeight * .75;
	if (xpos == 'center') {
		centerDivH(divTag);
	} else {
		divTag.style.left = parseInt(xpos) + "px";
	}
	if (ypos == 'center') {
		centerDivV(divTag);
	} else {
		divTag.style.top = parseInt(ypos) + "px";
	}
	if (hide == 0) {
		divTag.style.display = "inline";
	} else {
		divTag.style.display = "none";
	}
	document.body.appendChild(divTag);
} 

//create overlay div layer
function overlayDiv() {
	var divTag = document.getElementById('overlay');
	if (!divTag) { divTag = document.createElement("div");}
	divTag.id = "overlay";
	divTag.setAttribute("align","center");
	divTag.style.margin = "0px";
	divTag.style.padding = "0px";
	divTag.style.zIndex = "3000";
	divTag.style.position = "absolute";
	divTag.style.top = 0;
	divTag.style.left = 0;
	divTag.style.backgroundColor = "transparent";
	divTag.style.overflow = "auto";
	divTag.style.border = "0px";
	divTag.style.display = "none";
	divTag.style.width = "100%";
	//divTag.style.height = "100%";
	divTag.style.height = "10px"; /*make sure it's smaller than screen before resizing*/
		if( window.innerHeight && window.scrollMaxY ) {
		var h = window.innerHeight + window.scrollMaxY;
		} else if ( document.body.scrollHeight > document.body.offsetHeight ) {
		var h = document.body.scrollHeight;
		} else { var h = document.body.offsetHeight + document.body.offsetTop; }
		divTag.style.height = h + "px";
	divTag.style.backgroundColor = "#333333";
	divTag.opacity=".8";
	divTag.style.display = "inline";
	divTag.className = "overlay_layer"; //this can override styles above
	divTag.innerHTML = "";
	document.body.appendChild(divTag);
	divTag.style.filter = "alpha(opacity=80)";
	divTag.style.opacity=".8";
	divTag.style.MozOpacity=".8";
} 

// remove a div layer (or object)
function removeDiv(id)
{
	var elem = document.getElementById(id);
	var old = (elem.parentNode).removeChild(elem);
}

function centerDiv(div) {
      var position = (typeof arguments[1] == 'undefined') ? '' :arguments[1];
	centerDivH(div);
	centerDivV(div);
	if (position != '') {
		if (typeof div  == 'string') {div=MM_findObj(div);}
		div.style.position="fixed";
	}
}
function centerDivH(div) {
	var offset = (typeof arguments[1] == 'undefined' || arguments[1] == '') ? 'visible':arguments[1];
	var iebody=(document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body;
	var scrolledleft=document.all? iebody.scrollLeft : pageXOffset;
	if (offset == 'visible') { offset = scrolledleft;}
	if (typeof div  == 'string') {div=MM_findObj(div);}
	if (div) {
		var winwidth = 0;
		if(typeof window.innerWidth  == 'number') {
             		winwidth = window.innerWidth;
          	} else if(document.documentElement && (document.documentElement.clientWidth)) {
               		winwidth = document.documentElement.clientWidth;
          	} else if(document.body && (document.body.clientWidth)) {
            		winwidth = document.body.clientWidth;
          	}
               	var x = (winwidth-div.offsetWidth)/2;
		if (x < 0 ) { x = 0; }
		div.style.left = x + offset + "px";
	}
}
function centerDivV(div) {
	var offset = (typeof arguments[1] == 'undefined' || arguments[1] == '') ? 'visible':arguments[1];
	var iebody=(document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body;
	var scrolledtop=document.all? iebody.scrollTop : pageYOffset;
	if (offset == 'visible') { offset = scrolledtop;}
	if (typeof div  == 'string') {div=MM_findObj(div);}
	if (div) {
		var winheight = 0;
		if(typeof window.innerWidth  == 'number') {
             		winheight = window.innerHeight;
          	} else if(document.documentElement && (document.documentElement.clientHeight)) {
               		winheight = document.documentElement.clientHeight;
          	} else if(document.body && (document.body.clientHeight)) {
            		winheight = document.body.clientHeight;
          	}
               	var y = (winheight-div.offsetHeight)/2;
		if (y < 0 ) { y = 0; }
		div.style.top = y + offset + "px";
	}
}
function autoEdgeDivH(div) {
	var offset = (typeof arguments[1] == 'undefined' || arguments[1] == '') ? 'visbile':arguments[1];
	var iebody=(document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body;
	var scrolledleft=document.all? iebody.scrollLeft : pageXOffset;
	if (div) {
		var winwidth = 0;
		if(typeof window.innerWidth  == 'number') {
             		winwidth = window.innerWidth;
          	} else if(document.documentElement && (document.documentElement.clientWidth)) {
               		winwidth = document.documentElement.clientWidth;
          	} else if(document.body && (document.body.clientWidth)) {
            		winwidth = document.body.clientWidth;
          	}
	    if (div.offsetLeft < 0 + offset || div.offsetWidth > winwidth) {
			div.offsetLeft = 0 + offset;
	    } else {
		if (div.offsetLeft + div.offsetWidth > winwidth + scrolledleft) {
			div.style.left = (winwidth - div.offsetWidth - offset + scrolledleft) + "px";
		}
	    }
	}
}
function autoEdgeDivV(div) {
	var offset = (typeof arguments[1] == 'undefined' || arguments[1] == '') ? 'visible':arguments[1];
	var iebody=(document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body;
	var scrolledtop=document.all? iebody.scrollTop : pageYOffset;
	if (div) {
		var winheight = 0;
		if(typeof window.innerHeight  == 'number') {
             		winheight = window.innerHeight;
          	} else if(document.documentElement && (document.documentElement.clientHeight)) {
               		winheight = document.documentElement.clientHeight;
          	} else if(document.body && (document.body.clientHeight)) {
            		winheight = document.body.clientHeight;
          	}
	    if (div.offsetTop < 0 + offset || div.offsetHeight > winheight + scrolledtop) {
			div.offsetTop = 0 + offset;
	    } else {
		if (div.offsetTop + div.offsetHeight > winheight) {
			div.style.top = (winheight - div.offsetHeight - offset + scrolledtop) + "px";
		}
	    }
	}
}

// run javascript returned by ajax
function evalScripts(scripts)
{	//this only does script tags, doesn't load external src="file.js"
	try
	{	if(scripts != '')	
		{	var script = "";
			scripts = scripts.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(){ if (scripts !== null) script += arguments[1] + '\n'; return '';});
			//if(script) (window.execScript) ? window.execScript(script) : window.setTimeout(script, 0);
			window.setTimeout(script, 0); //faster than window.execScript
		}
		return false;
	}
	catch(e)
	{	alert(e)
	}
}

function evalScripts2(element) {
	if (element.innerHTML.match(/<!-- Version/) != null) {
		//If login page was returned, handle being logged out
		//top.location = 'index.cfm?ErrorMsg=You%20Are%20Logged%20Out'; //redirect
		top.document.body.innerHTML = element.innerHTML; //use page returned
	}
        var scripts = element.getElementsByTagName("script");
        var scripts2 = document.getElementsByTagName('head').item(0).getElementsByTagName("script");
	var jsfiles = new Object()
       	for (j=0; j < scripts2.length; j++) {
               	var src = scripts2[j].getAttribute("src");
		jsfiles[src] = src;
       	}
	var myscripts = '';

	//this takes a node and evals both src="file.js" and regular js code.
	//warning: IE may strip script tags if they are first in file (adding &nbsp; fixes, but messes up formatting)

        for (i=0; i < scripts.length; i++) {
		//var found = 0;
            // if src, eval it, otherwise eval the body
            if (scripts[i].getAttribute("src") != '' && scripts[i].getAttribute("src") != null) {
                var src = scripts[i].getAttribute("src");
		//make sure it's not already included
		if (src in jsfiles) {
			//found++;}
		//if (!found) {
		} else {
                	var script = document.createElement('script');
			script.setAttribute("type","text/Javascript");
                	script.setAttribute("src",src);
                	var head = document.getElementsByTagName('head').item(0);
			head.appendChild(script);
		}
            } else {
                //window.eval(scripts[i].innerHTML);
                //evalScripts(element.innerHTML);
		myscripts += scripts[i].innerHTML + "\n";
            }
        }
                //evalScripts(element.innerHTML);
		window.setTimeout(myscripts, 0);
}

//AJAX Form Post

   //see ajaxPostForm below
   function makeRequest(url, parameters, fname) {
      //var fargs = (typeof arguments[3] == 'undefined') ? '' :arguments[3]; //arg string for return function
	var newargs = Array.prototype.slice.call(arguments);  //copy arguments
	//remove first three elements.  The rest will be args to pass to return function.
	newargs.shift();
	newargs.shift();
	newargs.shift();
      var http_request = false;
      if (window.XMLHttpRequest) { // Mozilla, Safari,...
         http_request = new XMLHttpRequest();
         if (http_request.overrideMimeType) {
         	// set type accordingly to anticipated content type
            //http_request.overrideMimeType('text/xml');
            http_request.overrideMimeType('text/html');
         }
      } else if (window.ActiveXObject) { // IE
         try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (e) {
            try {
               http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
         }
      }
      if (!http_request) {
         alert('Cannot create XMLHTTP instance');
         return false;
      }
      //http_request.onreadystatechange = alertContents;
      http_request.onreadystatechange = function () {
      if (http_request.readyState == 4) {
         if (http_request.status == 200) {
            //alert(http_request.responseText);
            result = http_request.responseText;
            //document.getElementById('myspan').innerHTML = result;            
		fname.apply(null, [result].concat(newargs)); //for return function, use arguments[0] (or result),  arguments[1] (can't use fargs though)
         } else if (http_request.status != 0) {
            alert('There was a problem with the request.');
         }
      }

      }
      http_request.open('POST', url, true);
      http_request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      http_request.send(parameters);
      return false;
   }
   
   function ajaxPostForm(url,obj,fname) {
      var showload = (typeof arguments[3] == 'undefined') ? 0 :arguments[3]; //div layer to show loading, optional
      var poststr = "";
      for (i=0; i<obj.elements.length; i++) {
        if (obj.elements[i].type == "checkbox") {
           if (obj.elements[i].checked) {
              poststr += obj.elements[i].name + "=" + 
                   obj.elements[i].value + "&";
           } else {
              //poststr += obj.elements[i].name + "=&";
           }
        } else if (obj.elements[i].type == "textarea") { 
			temp_var = obj.elements[i].value.replace(/\n/g,'<br>')
			poststr += obj.elements[i].name + "=" + encodeURIComponent(temp_var) + "&";
	} else if (obj.elements[i].type == "radio") {
           if (obj.elements[i].checked) {
              poststr += obj.elements[i].name + "=" + 
                   obj.elements[i].value + "&";
           }
        } else if (obj.elements[i].type == "select") {
  	    for (j=0; j<obj.elements[i].length; j++) {
            	var sel = obj.elements[i][j];
            	poststr += sel.name + "=" + sel.options[sel.selectedIndex].value + "&";
  	    }
        } else if (obj.elements[i].type == "select-multiple" ) {
	    var vals = '';
  	    for (j=0; j<obj.elements[i].length; j++) {
            	var sel = obj.elements[i][j];
		if (sel.selected) {
			if (vals != '') {
				vals = vals + "," + sel.value;
			} else {
				vals = vals + sel.value;
			}
		}
  	    }
	    if (vals != '') {
            	poststr += obj.elements[i].name + "=" + vals + "&";
	    }
	} else {
        //if (obj.elements[i].type == "text" || obj.elements[i].type == "hidden") {
           poststr += obj.elements[i].name + "=" + 
                   encodeURIComponent(obj.elements[i].value) + "&";
        }
      }
      if (showload != 0) { showLoading(showload); }
      makeRequest(url, poststr, fname);
      return false;
   }

function setClassHTML (className, val) {
  var all = document.all ? document.all :
    document.getElementsByTagName('*');
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      all[e].innerHTML = val;
}
function changeFlashImageByClass (className, val) {
  var all = document.all ? document.all :
    document.getElementsByTagName('*');
  for (var e = 0; e < all.length; e++) {
    if (all[e].className == className) {
      if (all[e].src) {
	all[e].src = "images/UserImage.swf?dropshadow=0&UserImage=" + val;
      }
      if (all[e].movie) {
	all[e].movie = "images/UserImage.swf?dropshadow=0&UserImage=" + val;
      }
    }
  }
}


//replaced by built-in function encodeURIComponent()
function urlencode (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // +      input by: Ratheous
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: This reflects PHP 5.3/6.0+ behavior
    // *     example 1: urlencode('Kevin van Zonneveld!');
    // *     returns 1: 'Kevin+van+Zonneveld%21'
    // *     example 2: urlencode('http://kevin.vanzonneveld.net/');
    // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
 
    var hexStr = function (dec) {
        return '%' + dec.toString(16).toUpperCase();
    };
 
    var ret = '',
            unreserved = /[\w.-]/; // A-Za-z0-9_.- // Tilde is not here for historical reasons; to preserve it, use rawurlencode instead
    str = (str+'').toString();
 
    for (var i = 0, dl = str.length; i < dl; i++) {
        var ch = str.charAt(i);
        if (unreserved.test(ch)) {
            ret += ch;
        }
        else {
            var code = str.charCodeAt(i);
            // Reserved assumed to be in UTF-8, as in PHP
            if (code === 32) {
                ret += '+'; // %20 in rawurlencode
            }
            else if (code < 128) { // 1 byte
                ret += hexStr(code);
            }
            else if (code >= 128 && code < 2048) { // 2 bytes
                ret += hexStr((code >> 6) | 0xC0);
                ret += hexStr((code & 0x3F) | 0x80);
            }
            else if (code >= 2048 && code < 65536) { // 3 bytes
                ret += hexStr((code >> 12) | 0xE0);
                ret += hexStr(((code >> 6) & 0x3F) | 0x80);
                ret += hexStr((code & 0x3F) | 0x80);
            }
            else if (code >= 65536) { // 4 bytes
                ret += hexStr((code >> 18) | 0xF0);
                ret += hexStr(((code >> 12) & 0x3F) | 0x80);
                ret += hexStr(((code >> 6) & 0x3F) | 0x80);
                ret += hexStr((code & 0x3F) | 0x80);
            }
        }
    }
    return ret;
}

/* Load Ajax Modules Sequentially
   requires in footer (or document.ready):
	if (typeof EVOModulesArray != 'undefined') {
		ModListLoad();
	}

*/
EVOModulesArray = new Array();

function ModListLoad() {
	if (EVOModulesArray.length > 1) {
		var id = EVOModulesArray.shift();
		/*showLoading(id);*/
		var url = EVOModulesArray.shift();
		var el = document.getElementById(id);
		if (el) {
 			makeRequest(url,'',ModListLoadReturn,id);
		} else {
			ModListLoad();
		}
	}
}
function ModListLoadReturn() {
   	var id = (typeof arguments[1] == 'undefined') ? 'clickpopupdiv':arguments[1];
	var el = document.getElementById(id);
	el.innerHTML = result;
	evalScripts2(el);
	if (typeof jQuery != 'undefined' && typeof $('.scroll-pane').jScrollPane == 'function') {
		$('.scroll-pane').jScrollPane();
	}
	ModListLoad();
}
