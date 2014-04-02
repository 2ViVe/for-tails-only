function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr;
  for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function TimeZone() {
  var tzTime = new Date();
  var tzOffset = 0 - (tzTime.getTimezoneOffset() / 60);
  window.document.form1.TimeZone.value = tzOffset;
  window.document.form1.TimeZone2.value = tzOffset;
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function MM_preloadImages() { //v3.0
  var d=document;

  if(d.images){
	if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments;

	for(i=0; i<a.length; i++) {
      if (a[i].indexOf("#")!=0){
		d.MM_p[j]=new Image;
		d.MM_p[j++].src=a[i];
	  }
	}
  }
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments;
  document.MM_sr=new Array;

  for(i=0;i<(a.length-2);i+=3) {
     if ((x=MM_findObj(a[i]))!=null){
		document.MM_sr[j++]=x;
		if(!x.oSrc) { x.oSrc=x.src;}
		x.src=a[i+2];
     }
  }
}
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {
	if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    	document.MM_pgW=innerWidth; document.MM_pgH=innerHeight;
		onresize=MM_reloadPage; 
	}
  } else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
  }
MM_reloadPage(true);

function scrollInit() {
}

function getElementLeft(Elem) {
	var elem = MM_findObj(Elem);

    if (elem!=null) {
/*
	if(document.getElementById) {
		//msie5+ and dom
		var elem = document.getElementById(Elem);
	} else if (document.all){
		// msie4
		var elem = document.all[Elem];
	}
*/
	xPos = elem.offsetLeft;
	tempEl = elem.offsetParent;
  	while (tempEl != null) {
  		xPos += tempEl.offsetLeft;
  		tempEl = tempEl.offsetParent;
  	}
	return xPos;
    } else {
	return null;
    }
}
/*
function getImage(name) {
  if (document.layers) {
    return findImage(name, document);
  }
  return null;
}
function getImagePageLeft(img) {
  var x, obj;
  if (document.layers) {
    if (img.container != null)
      return img.container.pageX + img.x;
    else
      return img.x;
  }
  return -1;
}

function getImagePageTop(img) {
  var y, obj;
  if (document.layers) {
    if (img.container != null)
      return img.container.pageY + img.y;
    else
      return img.y;
  }
  return -1;
}
*/

function getImage(name) {
  if (NS4 || NS6) {
    return findImage(name, document);
  }
  if (IE4 || NS6)
    return eval('document.all.' + name);
  return null;
}

function findImage(name, doc) {
  var i, img;
  for (i = 0; i < doc.images.length; i++)
    if (doc.images[i].name == name)
      return doc.images[i];
  for (i = 0; i < doc.layers.length; i++)
    if ((img = findImage(name, doc.layers[i].document)) != null) {
      img.container = doc.layers[i];
      return img;
    }
  return null;
}

function getImagePageLeft(img) {
  var x, obj;
  if (NS4 || NS6) {
    if (img.container != null)
      return img.container.pageX + img.x - 1;
    else
      return img.x - 1;
  }
  if (IE4) {
    x = 0;
    obj = img;
    while (obj.offsetParent != null) {
      x += obj.offsetLeft;
      obj = obj.offsetParent;
    }
    x += obj.offsetLeft;
    return x;
  }
  return -1;
}
function getImagePageTop(img) {
  var y, obj;
  if (NS4 || NS6) {
    if (img.container != null)
      return img.container.pageY + img.y;
    else
      return img.y;
  }
  if (IE4) {
    y = 0;
    obj = img;
    while (obj.offsetParent != null) {
      y += obj.offsetTop;
      obj = obj.offsetParent;
    }
    y += obj.offsetTop;
    return y;
  }
  return -1;
}

function getElementTop(Elem) {
	var elem = MM_findObj(Elem);
    if (elem!=null) {
/*
	if(document.getElementById) {
		// MSIE5+ AND DOM
		var elem = document.getElementById(Elem);
	} else if (document.all) {
		//MSIE4
		var elem = document.all[Elem];
	}
*/
	yPos = elem.offsetTop;
	tempEl = elem.offsetParent;
	while (tempEl != null) {
  		yPos += tempEl.offsetTop;
  		tempEl = tempEl.offsetParent;
  	}
	return yPos;
    } else {
	return null;
    }
}


//MakePopUp Function- Mike Mostellar
function MakePopUp(page,url) {
                //Make new window at 75% of screen width & height
                var winwidth = screen.availWidth * .75;
                var winheight = screen.availHeight * .75;
                //Initial position centered horizontally
                var x = (screen.availWidth-winwidth)/2;
                //Initial position vertically down .5 inch
                var y = 35;
		if (url) {
			var newwin=window.open(url,'','width='+winwidth+',height='+winheight+',resizable=yes,scrollbars=yes');
			// Unless it's the site you're on, it won't let you move windows around and it will return errors...
			var pattern = new RegExp(self.location);
			if (url.match(pattern)) {
                		newwin.moveTo(x,y);
			}
		} else if (page) {
                	var newwin=window.open('index.cfm?Fuse=public/Files&Page='+ page,'','width='+winwidth+',height='+winheight+',resizable=yes,scrollbars=yes');
			// No url passed, so it'll be on the same site, so OK to center the window
                	newwin.moveTo(x,y);
		}

}

//Open window and make sure if still open, opens in the same window and brings it to front.
var newwin = '';
function openSameWin (url,targ,params) {
	if (!newwin.closed && newwin.location)
	{
		newwin.location.href = url;
	}
	else
	{
		newwin=window.open(url,targ,params);
		if (!newwin.opener) {newwin.opener = self;}
	}
	if (window.focus) {newwin.focus();}
	return false;
}

// Mike Mostellar: Keep them from double-clicking the submit button
// call this function in OnSubmit with a return false like this:
// <form name="form1" method="post" action="index.cfm" OnSubmit="check_form_submit('form1'); return false;">

var processing = false;
function check_form_submit(formname) {
	var waittime = (typeof arguments[1] == 'undefined') ? 7 : arguments[1];
                if (processing == false) {
                        processing = true;
			setTimeout("processing = false",waittime * 1000);  //Let them submit again after a while
                        document.forms[formname].submit();
                } else {
                        alert("Processing.  Please wait.");
                }
}
//used in schedule a conference to uncheck other options if choosing global publishing
function check_global_publish(formname) {

				if (document.forms[formname].PublishGlobalCheckBox.checked == true) 
				{
				document.forms[formname].PublishLink.checked = false;
				document.forms[formname].PublishOnPublic.checked = false;
				}
				else
				{
				document.forms[formname].PublishLink.checked = true;
				document.forms[formname].PublishOnPublic.checked = true;
				}

}

//used in schedule conference to bring up alert if try to select other option and global publishing is checked
function check_global_publish_box(formname) {

				if (document.forms[formname].PublishGlobalCheckBox) //if global publish box exists
				{
					if (document.forms[formname].PublishGlobalCheckBox.checked == true) //if global publish box is checked
					{	
						if ((document.forms[formname].PublishLink.checked == true) || (document.forms[formname].PublishOnPublic.checked == true))
						{
							alert("Cannot chose this option while global publishing is selected");	
							document.forms[formname].PublishLink.checked = false;
							document.forms[formname].PublishOnPublic.checked = false;					
						}
					}
						
						
				}


}

// Original:  Ronnie T. Moore 
// Modified 06/21/2001 by Mike Mostellar
// Web Site:  The JavaScript Source

// Dynamic 'fix' by: Nannette Thacker
// Web Site: http://www.shiningstar.net

// This script and many more are available free online at
// The JavaScript Source!! http://javascript.internet.com

// Text limiter & counter...call with OnKeyDown & OnKeyPress=textCounter(textareaname,counterboxname,limit)

//For Netscape textcount
//If this causes problems, move these two lines into where this function is called.
if (navigator.appName != "Microsoft Internet Explorer") {
document.captureEvents(Event.KEYPRESS); 
document.onkeypress = "textCounter(UserTextForm.UserText,UserTextForm.remLen,500);"
}

function textCounter(field, countfield, maxlimit) {
	if (field.value.length > maxlimit){
	 	// if too long...trim it!
		field.value = field.value.substring(0, maxlimit);
		alert("You've reached the maximum of "+maxlimit+" characters!");
	} else {
		// otherwise, update 'characters left' counter
		countfield.value = maxlimit - field.value.length;
	}
}


function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) {
	v=args[i+2];
    	if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    	obj.visibility=v;
  }
}

//New, seperate functions for show & hide to get rid of unneeded flags above.
var hideflag = new Object();  //flag to force keeping open (if mouse stays on link)
var lays = new Object();  //struct of timeout ids for each layer`
var fadeouteffect = 1;  //turn on/off fadeout effect
var disappeartime = 500;  //time to wait before menu begins to fade or disappear
var menuopacity = 100;  // percent opacity of the popup menus

//Set opacity
function setOpac(obj,opac) {
    // opace ranges from 0 (transparent) to 100 (shown)
    //note that this may not affect the value of visibility (i.e., 0 opacity might still be "visible")
  if (fadeouteffect == 1) {
    if (obj.style && document.all) {
              obj.style.filter = 'alpha(opacity='+opac+')';
    } else if (obj.style && document.getElementById) {
              obj.style.MozOpacity = opac / 100;
    }
  }
  //return false;
}

function HideMenuLayers() { //v7.0 hides form elements (otherwise, they show through layers)
  var i,obj,args=HideMenuLayers.arguments;

  //loop through list of layers passed
  for (i=0; i<(args.length); i++) if ((obj=MM_findObj(args[i]))!=null) {
  //  if (obj.style) { setOpac(obj,menuopacity); } //make sure opactiy is 100 when we hide...so it will be visible when shown again
if (obj.style) {
    obj.style.visibility='hidden'; //hide the layer
}

    //make sure timeout is cleared by this point
    if (lays[args[i]] != null) {
    	clearTimeout(lays[args[i]]); //we're hiding the layer, so clear the timeout
    	lays[args[i]] = null; //null out the timeout id for this layer, so we can tell it's no longer active
    }

    var keepopen = false;
    //if there's a hide flag active, don't hide elements yet
    for (var j in hideflag) {
	if (hideflag[j] == 0) {
		keepopen = true;
		//debug
		//if (bleh == null) {var bleh=window.open('','bleh');}
		//bleh.document.write(j+"="+hideflag[j]+"<BR>");
	}
    }
    //if there's a timeout for a layer still active, don't hide elements yet.
    for (var k in lays) {
	if (lays[k] != null) {
		keepopen = true;
	}
    }
    //if (keepopen == false) { ShowHideFormElements('visible');}
  }
}

function ShowMenuLayers() { //v7.0 hides form elements (otherwise, they show through layers)
  var i,obj,args=ShowMenuLayers.arguments;
  for (i=0; i<(args.length); i++) if ((obj=MM_findObj(args[i]))!=null) {
	setOpac(obj,menuopacity);
	if (obj.style && obj.style.visibility != 'visible') {
		obj.style.visibility='visible';
  		ShowHideFormElements('hidden');
	}
  }
}


// Fade out a layer
function FadeOut(mylayer,opac){
  var obj = MM_findObj(mylayer);  //Find the layer object
  if (opac == null) { opac = menuopacity;}  //Default to 100% to start

  if (obj!=null && opac >= 0) {
	// set timer to drop opacity down to next level
	setTimeout("FadeOut('"+mylayer+"',"+(opac-20)+")",15);
  	setOpac(obj,opac); // Set Opacity
  }
}

// Fade out Menu (has to check hideflag to keep open if mouseover)
function FadeOutMenu(mylayer,opac){
  var obj = MM_findObj(mylayer);  // Find the layer object
  lays[mylayer] = null;
  if (opac == null) { opac = menuopacity;}  //Default to 100% to start

  if (obj!=null && hideflag[mylayer] == 1) {
    if (opac > 0) {
	setTimeout("FadeOutMenu('"+mylayer+"',"+(opac-50)+")",25); // set timer to drop opacity down to next level
    	setOpac(obj,opac); // Set Opacity
    } else {
	// reset visiblity to 'hide' for compatibility with show/hide functions	
	hideflag[mylayer] = 1;
	HideMenuLayers(mylayer);
    	setOpac(obj,menuopacity);
  	ShowHideFormElements('visible');
    }
  }
}

// Highlight Menu item
function highlight (thing, bgcolor,textcolor){
	if (document.all || document.getElementById) {
		if (bgcolor) { thing.style.backgroundColor = bgcolor;}
		if (textcolor) {thing.style.color = textcolor;}
	}
}

// Functions for setting timeouts for hiding menus

function TimedHideLayers(mylayer) {
	//var i,args=TimedHideLayers.arguments;
	//var mylayer = "";
	lays[mylayer] = null;
	if (hideflag[mylayer] != null && hideflag[mylayer] == 1) {
	  /*for (i=0; i<(args.length); i++) {
		// If we haven't moused over another layer (and reset hideflag var), hide the layer
		HideMenuLayers(args[i]);
	  }*/
		HideMenuLayers(mylayer);
  		ShowHideFormElements('visible');
	}
}

// We've moused out from the nav button.  Set timer for 2 secs
function delayHideLayer(mylayer) {
	var i,args=delayHideLayer.arguments;
	/*var mylayer = "";
	for (i=0; i<(args.length); i++) {
		if (i > 0) { mylayer += ','; }
		mylayer += "'"+args[i]+"'";	
	}
	*/
	hideflag[mylayer] = 1;
	if (lays[mylayer] != null) {
		// we moused over & out again...clear any previous timeouts on this item.
		clearTimeout(lays[mylayer]);  //clear the timeout
		lays[mylayer] = null;	      //null out the timeout id for this layer
	}
	lays[mylayer] = setTimeout("TimedHideLayers('"+mylayer+"')",disappeartime);
}

// Same two functions but this time fading menus out

/*
function TimedFadeOutLayers(mylayer) {
	//var i,args=TimedFadeOutLayers.arguments;
	//var mylayer = "";
	lays[mylayer] = null;
	if (hideflag[mylayer] == 1) {
	  //for (i=0; i<(args.length); i++) {
		// If we haven't moused over another layer (and reset hideflag var), hide the layer
		//FadeOutMenu(args[i],'',level);  //Fade Out instead of just hiding it
	  //}
	  FadeOutMenu(mylayer,menuopacity);  //Fade Out instead of just hiding it
	}
}
*/

// We've moused out from the nav button.  Set timer for 2 secs
function delayFadeOutLayer(mylayer) {
	var i,args=delayFadeOutLayer.arguments;
	/*var mylayer = "";
	for (i=0; i<(args.length); i++) {
		if (i > 0) { mylayer += ','; }
		mylayer += "'"+args[i]+"'";	
	}*/
	hideflag[mylayer] = 1;
	if (lays[mylayer] != null) {
		// we moused over & out again...clear any previous timeouts on this item.
		clearTimeout(lays[mylayer]);  //clear the timeout
		lays[mylayer] = null;  //null out the timeout id for this layer
	}
	//lays[mylayer] = setTimeout("TimedFadeOutLayers('"+mylayer+"')",disappeartime);
	if (fadeouteffect != 1) {
		lays[mylayer] = setTimeout("TimedHideLayers('"+mylayer+"')",disappeartime);
	} else {
		lays[mylayer] = setTimeout("FadeOutMenu('"+mylayer+"')",disappeartime);
	}
}

function menuClick(src) {
	if (typeof(event) != 'undefined' && event.srcElement.tagName == 'TD') {
		//src.children.tags('A')[0].click();
		event.srcElement.children.tags('A')[0].click();
	} else {
		//src.firstChild.links[0].click();
		location=src.firstChild.href;
	}
	return false;
}
function menuOver(src) {
	src.style.cursor = 'pointer';
	//src.children.tags('A')[0].style.textDecoration = 'underline';
	return false;
}
function menuOut(src) {
	src.style.cursor = 'default';
	//src.children.tags('A')[0].style.textDecoration = 'none';
	return false;
}

//This hides all the form elements for the pop-up layers...IE sets the z-index to infinity, so you cannot overlap on top of them.
function ShowHideFormElements(showhide) {
  if (showhide == null) {showhide = 'visible';} // visible|hidden
  if (typeof hideformelements == 'undefined' || hideformelements == 1) {

  for (var myForm=0; myForm < document.forms.length; myForm++ ) {
    //document.write(document.forms[myForm].name+"<BR>");
    for (var myElement=0; myElement < document.forms[myForm].elements.length; myElement++) {
	//document.write("&nbsp;&nbsp;"+document.forms[myForm].elements[myElement].name+" - "+document.forms[myForm].elements[myElement].type+"<BR>");
	if (document.forms[myForm].elements[myElement].style.visibility == showhide) { return false; }
	document.forms[myForm].elements[myElement].style.visibility = showhide;
    }
  }
}
}

// insertAdjacentHTML(), insertAdjacentText() and insertAdjacentElement()
// for Netscape 6/Mozilla by Thor Larholm me@jscript.dk
// Usage: include this code segment at the beginning of your document
// before any other Javascript contents.

if(typeof HTMLElement!="undefined" && !HTMLElement.prototype.insertAdjacentElement){
	HTMLElement.prototype.insertAdjacentElement = function (where,parsedNode)
	{
		switch (where){
		case 'beforeBegin':
			this.parentNode.insertBefore(parsedNode,this)
			break;
		case 'afterBegin':
			this.insertBefore(parsedNode,this.firstChild);
			break;
		case 'beforeEnd':
			this.appendChild(parsedNode);
			break;
		case 'afterEnd':
			if (this.nextSibling) this.parentNode.insertBefore(parsedNode,this.nextSibling);
			else this.parentNode.appendChild(parsedNode);
			break;
		}
	}

	HTMLElement.prototype.insertAdjacentHTML = function (where,htmlStr)
	{
		var r = this.ownerDocument.createRange();
		r.setStartBefore(this);
		var parsedHTML = r.createContextualFragment(htmlStr);
		this.insertAdjacentElement(where,parsedHTML)
	}


	HTMLElement.prototype.insertAdjacentText = function (where,txtStr)
	{
		var parsedText = document.createTextNode(txtStr)
		this.insertAdjacentElement(where,parsedText)
	}
}

//el = target element (and subelements), appends class to class names.
function changeSubClass (el, cname) {
  var clear = (typeof arguments[2] == 'undefined') ? 1 :arguments[2];
  if (clear) {
  	clearSubClass(el.parentNode,cname); //strip off (clear) class from other elements
  } else {
  	clearSubClass(el,cname); //strip off (clear) class from just desired element
  }
  el.className = el.className + " " + cname;
  var all = el.getElementsByTagName('td');
  for (var e = 0; e < all.length; e++) {
      all[e].className = all[e].className + " " + cname;
  }
}
//replace class from element and subelements
function replaceSubClass (el, cname1, cname2) {
  var re = new RegExp("(^|[^_-a-zA-Z0-9])"+cname1+"([^_-a-zA-Z0-9]|$)",'g');
  el.className = el.className.replace(re,'$1'+cname2+'$2');
  var all = el.getElementsByTagName('*');
  for (var e = 0; e < all.length; e++) {
      all[e].className = all[e].className.replace(re,'$1'+cname2+'$2');
  }
}
//strip off class from element and subelements
function clearSubClass (el, cname) {
  var re = new RegExp("(^|[^_-a-zA-Z0-9])"+cname+"([^_-a-zA-Z0-9]|$)",'g');
  el.className = el.className.replace(re,'$1$2');
  var all = el.getElementsByTagName('*');
  for (var e = 0; e < all.length; e++) {
      all[e].className = all[e].className.replace(re,'$1$2');
  }
}
//strip off class from element and subelements
function alternateRowColors (el, cname1, cname2) {
  //put rows in THEAD or TFOOT tags to skip highlighting.
  clearSubClass (el, cname1);
  clearSubClass (el, cname2);
  var rownum = 0;
  //var all = el.getElementsByTagName('*');
  var all = getChildElements(el);
  if (all[0].tagName == 'TBODY') { all = getChildElements(all[0]);}
  else if (all[1].tagName == 'TBODY') { all = getChildElements(all[1]);}
  for (var e = 0; e < all.length; e++) {
	if (all[e].tagName == 'TR' && all[e].style.display != 'none') {
		if (rownum == 1) {
			rownum = 2;
		} else {
			rownum = 1;
		}
				if (rownum == 1) {
      					all[e].className = all[e].className + " " + cname1;
				} else {
      					all[e].className = all[e].className + " " + cname2;
				}
		var alltd = getChildElements(all[e]);
  		for (var f = 0; f < alltd.length; f++) {
			if (alltd[f].tagName == 'TD') {
				if (rownum == 1) {
      					alltd[f].className = alltd[f].className + " " + cname1;
				} else {
      					alltd[f].className = alltd[f].className + " " + cname2;
				}
			}

		}
	}
  }
}


/* get all child elements of a node (but not descendant nodes)
* and ignore text nodes */
var getChildElements = function(node)
{
    var a = [];
    var tags = node.getElementsByTagName("*");
    
    for (var i = 0; i < tags.length; ++i)
    {
        if (node == tags[i].parentNode)
        {
            a.push(tags[i]);
        }
    }
    return a;
} 

/* javascript to setup a play/pause button for iPhone/iPad */
function html5AudioPlayer(url,id) {
	html5AudioControl(url,id);
	document.write(html5AudioButton(id));
	return;
}
function html5AudioControl(url,id) {
	var bid = id + "_button"; //id for button
	var tid = id + "_time"; //id for button
	//create audio tag
	var afile = MM_findObj(id);
	if (afile) {
		afile.parentNode.removeChild(afile);
	}
	//if (afile == null) {
		afile = document.createElement('audio');
		afile.setAttribute('id',id);
		afile.setAttribute('src',url);
		document.body.appendChild(afile);
		afile.addEventListener("play", function (e) {
			var abutton = MM_findObj(bid);
			if (abutton)  {
				abutton.innerHTML = '<img src="images/ios/pause_sm.gif" width=17 height=14 border=0>';
			}
			
		}, false);
		afile.addEventListener("pause", function (e) {
			var abutton = MM_findObj(bid);
			if (abutton)  {
				abutton.innerHTML = '<img src="images/ios/play_sm.gif" width=17 height=14 border=0>';
			}
		}, false);
		afile.addEventListener("ended", function (e) {
			var abutton = MM_findObj(bid);
			if (abutton)  {
				abutton.innerHTML = '<img src="images/ios/play_sm.gif" width=17 height=14 border=0>';
			}
		}, false);
		afile.addEventListener("error", function (e) {
			var abutton = MM_findObj(bid); 
			if (abutton)  {
				abutton.innerHTML = '<img src="images/ios/error_sm.gif" width=17 height=14 border=0>';
				abutton.onclick = function () {return false;}
			}
		}, false);
		afile.addEventListener("timeupdate", function (e) {
			var atime = MM_findObj(tid);
			if (atime) {
				var hour = Math.floor(afile.currentTime/3600);
				var min = "0" + Math.floor((afile.currentTime % 3600)/60);
				var sec = "0" + parseInt( (afile.currentTime % 3600) % 60);
				atime.innerHTML = hour+":"+min.slice(-2)+":"+sec.slice(-2);
			}
		}, false);
	//} else {
		//afile.setAttribute('src',url);
		//afile.load();
	//}
}
function html5AudioButton(id) {
	var bid = id + "_button"; //id for button
	//create play button
	return('<a id="'+bid+'" class="iplaybutton" href="javascript:;" onClick="playpausehtml5Audio(\''+id+'\');"><img src="images/ios/play_sm.gif" width=17 height=14 border=0></a>');
}
function playpausehtml5Audio(el) {
	var afile = MM_findObj(el);
	if (afile.ended) {
		afile.load();
		afile.play();
	} else if (afile.paused) {
		afile.play();
	} else {
		afile.pause();
	}
}
function playhtml5Audio(el) {
	var afile = MM_findObj(el);
	if (afile.ended) {
		afile.load();
		afile.play();
	} else if (afile.paused) {
		afile.play();
	}
}
function pausehtml5Audio(el) {
	var afile = MM_findObj(el);
	afile.pause();
}
function stophtml5Audio(el) {
	var afile = MM_findObj(el);
	afile.currentTime = 0;
	afile.load();
}
function fillIFrame(frameid,mytext) {
	//write text to an iframe (as opposed to normally having to open a separate page)
	var myframe = document.getElementById(frameid);
	var mydoc = 'contentDocument' in myframe? myframe.contentDocument : myframe.contentWindow.document;
	mydoc.open('text/html','replace');
	mydoc.write(mytext);
	mydoc.close();
}
function resizeIFrameHeight(frameid) {
	//resize iframe to content height
	var myframe = document.getElementById(frameid);
/*
	if (myframe.contentDocument && myframe.contentDocument.body.offsetHeight) { //ns6 syntax
		myframe.height = myframe.contentDocument.body.offsetHeight; 
	} else if (myframe.document && myframe.document.body.scrollHeight) { //ie5+ syntax
		myframe.height = myframe.document.body.scrollHeight;
	}
*/

    if (myframe.Document && myframe.Document.body.scrollHeight) //ie5+ syntax
        myframe.height = myframe.contentWindow.document.body.scrollHeight;
    else if (myframe.contentDocument && myframe.contentDocument.body.scrollHeight) //ns6+ & opera syntax
        myframe.height = myframe.contentDocument.body.scrollHeight;
    else if (myframe.contentDocument && myframe.contentDocument.body.offsetHeight) //standards compliant syntax . ie8
        myframe.height = myframe.contentDocument.body.offsetHeight;

}
function copyCSSToIFrame(frameid) {
  var myframe = document.getElementById(frameid);
  var mydoc = 'contentDocument' in myframe? myframe.contentDocument : myframe.contentWindow.document;

  var small_head = mydoc.getElementsByTagName('head').item(0);

    var linkrels = window.top.document.getElementsByTagName('link');
    // loop through parent's links
    for (var i = 0, max = linkrels.length; i < max; i++) {
      // are they stylesheets
      if (linkrels[i].rel && linkrels[i].rel == 'stylesheet') {
         // create new element and copy all attributes
        var thestyle = document.createElement('link');
        var attrib = linkrels[i].attributes;
        for (var j = 0, attribmax = attrib.length; j < attribmax; j++) {
          thestyle.setAttribute(attrib[j].nodeName, attrib[j].nodeValue);
        }
         // add the newly created element to the head
        mydoc.body.appendChild(thestyle);

      }
    }
}
function widthOrAvail(w) {
	return (window.screen.availWidth<w)?window.screen.availWidth:w;
}
function heightOrAvail(h) {
	return (window.screen.availHeight<h)?window.screen.availWidth:h;
}
