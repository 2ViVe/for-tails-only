function ClickLayerShowLoading(id)
{
	var myl = document.getElementById(id);
	myl.innerHTML = "<p style='background-color:#ffffff; border:1px solid black; padding: 15px; font-family: Arial; font-size: 12px'><img src='images/loading.gif' align='absmiddle'>";
	myl.innerHTML = myl.innerHTML + "</p>";
}

function ClickLayer(event,thisurl,thiswidth,thisheight)
{
	/* Required:
	event - event (for position of mouse at time of click) or "width,height" for specific position.  Overwridden by leftoffset
	thisurl - url to load
	thiswidth - 'auto' or width of popup
	thisheight - 'auto' or height of popup

	Optional:	
	leftoffset - leftoffset from position, 'auto' (move off edge), 'center', 'centerh', 'centerv'
	id - set id of popup layer
	showloading - 0, imageonly, 1
	*/
   var leftoffset = (typeof arguments[4] == 'undefined' || arguments[4] == '') ? 0:arguments[4];
   var id = (typeof arguments[5] == 'undefined' || arguments[5] == '') ? 'clickpopupdiv':arguments[5];
   var showloading = (typeof arguments[6] == 'undefined') ? 'imageonly':arguments[6];

 	var isIE = document.all?true:false;

	if (!MM_findObj(id)) { createDiv(id,55,55);} 
	var myl = document.getElementById(id);

  	var x;
  	var y;
	if (typeof event == 'string') {
		var xy = event.split(",");
		x = xy[0];
		y = xy[1];
	} else {
		x = mouseX(event);
		y = mouseY(event);
	}

	if (showloading != 0) {
	myl.innerHTML = "<p style='background-color:#ffffff; border:1px solid black; padding: 15px; font-family: Arial; font-size: 12px'><img src='images/loading.gif' align='absmiddle'>";
		if (showloading != 'imageonly') { myl.innerHTML = myl.innerHTML + "&nbsp;&nbsp;Loading, please wait....</p>";}
	myl.innerHTML = myl.innerHTML + "</p>";
	}
	if (thiswidth != 'auto' && thiswidth != '') {
		myl.style.width=thiswidth + "px";
	}
	if (thisheight != 'auto' && thisheight != '') {
		myl.style.height=thisheight + "px";
	}
	myl.style.display = "inline";
	myl.style.top = y + "px";

	//myl.style.left = x + "px";
	if (leftoffset == 'centerh') {
		centerDivH(myl);
	} else if (leftoffset == 'centerv') {
		centerDivV(myl);
	} else if (leftoffset == 'center') {
		centerDivH(myl);
		centerDivV(myl);
	} else if (leftoffset == 'auto') {
		myl.style.left = x + "px";
		autoEdgeDivH(myl,20);
		myl.style.top = y + "px";
		autoEdgeDivV(myl,20);
	} else {
		myl.style.left = (x - leftoffset) + "px";
	}
	myl.style.textAlign="left";

		var this_url= thisurl + '&divid='+id;
		//post the elements to page, call ConnectWithMeResult funciton
		makeRequest('index.cfm',this_url,ClickLayerResult,id,leftoffset);

}

function AddNoteResult()
{
	if (document.getElementById('Module_ActionItems')) {showLoading('Module_ActionItems');ajaxLoadPage('index.cfm?Fuseaction=evo_Modules.ActionItems&DivID=Module_ActionItems','Module_ActionItems',0);}
}

function ClickLayerResult()
{
   var id = (typeof arguments[1] == 'undefined') ? 'clickpopupdiv':arguments[1];
   var leftoffset = (typeof arguments[2] == 'undefined') ? 0:arguments[2];
	//showPopUp('overlay');
	myl = MM_findObj(id);
	myl.innerHTML = result;
	evalScripts2(myl);

	//center after loading content
	if (leftoffset == 'centerh') {
		centerDivH(myl);
	} else if (leftoffset == 'centerv') {
		centerDivV(myl);
	} else if (leftoffset == 'center') {
		centerDivH(myl);
		centerDivV(myl);
	} else if (leftoffset == 'auto') {
		//myl.style.left = x + "px";
		autoEdgeDivH(myl,20);
		//myl.style.top = y + "px";
		autoEdgeDivV(myl,20);
	}
}

function QualificationProfileResult() {
   var id = (typeof arguments[1] == 'undefined') ? 'clickpopupdiv':arguments[1];
	var id2  = (typeof arguments[2] == 'undefined') ? 'clickpopupdiv':arguments[2];

	//showPopUp('overlay');
	myl = MM_findObj(id);
	myl.innerHTML = result;
	evalScripts2(myl);
	
	//myl2 = MM_findObj(id2);

	setTimeout("centerDiv('"+id2+"');",100);
	//myl2 = MM_findObj(id2);
	//alert(myl2);
	//centerDivH(myl2);
	//centerDivV(myl2);
	
}


function getWordsBetweenCurlies(str) {
  var results = [], re = /{([^}]+)}/g, text;

  while(text = re.exec(str)) {
    results.push(text[1]);
  }
  return results;
}


function EditGroupReturn()
{
	var addpattern = /PASSADD/; 
	var editpattern = /PASSEDIT/; 
	if (result.match(addpattern) != null) 
	{ 
		ajaxLoadPage('index.cfm?Fuseaction=evo_BusinessGroups.GroupsMenu','BusinessGroupsMenu',0); 
		removeDiv('editpopupdiv');
	} 
	else if (result.match(editpattern) != null) 
	{ 
		showLoading('BusinessGroupsMain');
		this_url='index.cfm?fuseaction=evo_BusinessGroups.GetGroup&Group=' + getWordsBetweenCurlies(result);
		ajaxLoadPage(this_url,'BusinessGroupsMain',0);
		removeDiv('editpopupdiv');
	} 
	else {  
		mdiv = MM_findObj('editpopupdiv');
		mdiv.innerHTML = result;
		evalScripts2(mdiv);
	}

}

function GetUserSelectedDataReturn()
{
		mdiv = MM_findObj('UsersSelectedDiv');
		mdiv.innerHTML = result;
		evalScripts2(mdiv);
}

function MessageCenterMainReturn()
{
		mdiv = MM_findObj('MessageCenterMain');
		mdiv.innerHTML = result;
		evalScripts2(mdiv);
}

function nicealert(id,mytext) {
    	var width = (typeof arguments[2] == 'undefined') ? 'auto':arguments[2]+"px";
    	var height = (typeof arguments[3] == 'undefined') ? 'auto':arguments[3]+"px";
	//showPopUp('overlay');
	//createDiv(id);
	myl = document.getElementById(id);
	myl.style.width = width;
	myl.style.height = height;
	myl.style.display = 'inline';
	myl.innerHTML = mytext + '&nbsp;<a href="javascript:;" onClick="closewarning(\''+id+'\')">Close</a>';
	if (width != 'auto') { centerDivH(myl); }
	if (height != 'auto') { centerDivV(myl); }
}
function closewarning(id) {
	var el = document.getElementById(id);
	if (el) {
		el.innerHTML = '';
		el.style.display = 'none';
	}
}
function niceIFrame(addr) {
    	var overlay = (typeof arguments[1] == 'undefined' || (arguments[1] != 0 && arguments[1] == '')) ? 1:arguments[1];
    	var mylay = (typeof arguments[2] == 'undefined' || arguments[2] == '') ? 'mydiv':arguments[2];
    	var width = (typeof arguments[3] == 'undefined') ? 'auto':arguments[3];
    	var height = (typeof arguments[4] == 'undefined') ? 'auto':arguments[4];

	//pass var event and it will place near where you clicked.  set to 0 to not move. Otherwise, gets centered if width/height passed.
    	var event = (typeof arguments[5] == 'undefined') ? '':arguments[5];
    	var leftoffset = (typeof arguments[6] == 'undefined') ? 0:arguments[6];
    	var topoffset = (typeof arguments[7] == 'undefined') ? 0:arguments[7];


	var hideoverlay = '';
	var fwidth = '';
	var fheight = '';
	if (overlay != 0 && overlay != '') {
		if (overlay == 1) {
			showPopUp('overlay');
			hideoverlay = 'hidePopUp(\'overlay\');';
		} else {
			showPopUp(overlay);
			hideoverlay = 'hidePopUp(\''+overlay+'\');';
		}
	}
	if (addr.match(/divid=/i) == null) {
		addr+= '&divid='+mylay
	}
	if (!MM_findObj(mylay)) { createDiv(mylay,55,55);}
	var d = document.getElementById(mylay);
	d.style.width = width;
	//d.style.height= height;
	if (width != 'auto') {
		fwidth = "width='"+ (width-0) + "'";
		d.style.width = width + "px";
	}
	if (height != 'auto') {
		fheight = "height='" + (height-0) + "'";
		d.style.height = height + "px";
	}
	d.style.display = 'inline';
	d.style.border = '0px solid black';
	d.style.padding = 0;
	d.style.margin = 0;
	d.style.textAlign = 'left';
	if (addr.match(/Embedded=1/i) == null) {
		var border = "border:1px solid black;";
	} else {
		var border = "";
	}
	
	d.innerHTML = "<div id='loadinggraphic_"+mylay+"' style='position:fixed;background-color:#ffffff;"+border+"width:"+width+"px;height:"+height+"px; font-family: Arial; font-size: 12px'><img src='images/loading.gif' style='padding:10px'></div>"; //IFrame will need to checke and remove
	if (addr.match(/Embedded=1/i) == null) {
		d.innerHTML += '<iframe '+ fwidth + fheight +' marginwidth="0" marginheight="0" frameborder="0" allowtransparency="true" src="'+addr+'" id="myframe" name="myframe" onLoad="' + "document.getElementById('loadinggraphic_"+mylay+"').style.display='none'" +'"></iframe>';
	} else {
		d.innerHTML += '<iframe '+ fwidth + fheight +' marginwidth="0" marginheight="0" frameborder="0" allowtransparency="true" src="'+addr+'" id="myframe" name="myframe"></iframe>';
	}
   if (event == 'center') {
		centerDivH(d); centerDivV(d);
		if (topoffset) { d.style.top = (d.style.top.replace('px','') - topoffset)+ "px";}
		if (leftoffset) { d.style.left = (d.style.left.replace('px','') - leftoffset) + "px";}
		if (d.style.top.replace('px','') < 0 ) { d.style.top = 0; }
		if (d.style.left.replace('px','') < 0 ) { d.style.left = 0; }
   } else if (event != 0) {
	/*
	if (width != 'auto') { centerDivH(d); }
	if (height != 'auto') { centerDivV(d); }
	*/

 	var isIE = document.all?true:false;
  	var _x;
  	var _y;
	/*
  	if (!isIE) {
    	_x = event.pageX;
    	_y = event.pageY;
  	}
  	if (isIE) {
    	//_x = event.clientX + document.body.scrollLeft;
    	//_y = event.clientY + document.body.scrollTop;
    	_x = event.x + document.body.scrollLeft;
    	_y = event.y + document.body.scrollTop;
 	 }
	*/
	_x = mouseX(event);
	_y = mouseY(event);
	var x=_x;
	var y=_y;
		d.style.top = (y - topoffset)+ "px";
		//myl.style.left = x + "px";
		d.style.left = (x - leftoffset - width / 2) + "px";
    }
	
}
function resizeLayer(mylay,width,height) {
    if (MM_findObj(mylay)) {
	var d = document.getElementById(mylay);
	alert(mylay);
	d.style.width = width;
	d.style.height= height;
	if (width != 'auto') {
		fwidth = "width='"+ (width-5) + "'";
		d.style.width = width + "px";
	}
	if (height != 'auto') {
		fheight = "height='" + (height-5) + "'";
		d.style.height = height + "px";
	}
	//if layer had iframe wrapper, resize that too
	var df = d.getElementsByTagName('iframe');
	if (df) {
		df.width=fwidth;
		df.height=fheight;
	}
	if (width != 'auto') { centerDivH(d); }
	if (height != 'auto') { centerDivV(d); }
    }
}
function showPopUp()
{
//document.getElementById("overlay").style.display = "";
//create overlay div layer
    	var overlay = (typeof arguments[0] == 'undefined' ) ? 'overlay' : arguments[0];
	var divTag = document.getElementById(overlay);
	if (!divTag) { divTag = document.createElement("div");}
	divTag.id = overlay;
	divTag.setAttribute("align","center");
	divTag.style.margin = "0px";
	divTag.style.padding = "0px";
	divTag.style.zIndex = "3000";
	//divTag.style.position = "absolute";
	divTag.style.top = 0;
	divTag.style.left = 0;
	divTag.style.backgroundColor = "transparent";
	divTag.style.overflow = "auto";
	divTag.style.border = "0px";
	divTag.style.display = "none";
	divTag.style.width = "100%";
	divTag.style.height = "5000px";
	//divTag.style.height = "100%";
	//divTag.style.height = "10px"; /*make sure it's smaller than screen before resizing*/
		//if( window.innerHeight && window.scrollMaxY ) {
		//var h = window.innerHeight + window.scrollMaxY;
		//} else if ( document.body.scrollHeight > document.body.offsetHeight ) {
		//var h = document.body.scrollHeight;
		//} else { var h = document.body.offsetHeight + document.body.offsetTop; }
		//divTag.style.height = h + "px";
	divTag.style.backgroundColor = "#ffffff";
	divTag.opacity=".8";
	divTag.style.display = "inline";
	divTag.className = "overlay_layer"; //this can override styles above
	divTag.innerHTML = "";
	document.body.appendChild(divTag);
	divTag.style.filter = "alpha(opacity=80)";
	divTag.style.opacity=".8";
	divTag.style.MozOpacity=".8";
} 
function hidePopUp() {
    	var overlay = (typeof arguments[0] == 'undefined' ) ? 'overlay':arguments[0];
	var divTag = document.getElementById(overlay);
	if (divTag) {
		removeDiv(overlay);
	}
}

// check if flash mic recorder is done
var recordedsound = 0;
function flashdone() {
    	var done = (typeof arguments[0] == 'undefined' ) ? 1 : arguments[0];
	recordedsound = done;
}

function mouseX(evt) {
	if (evt.pageX) {
		return evt.pageX;
	} else if (evt.clientX) {
   		return evt.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft);
	} else {
		return null;
	}
}
function mouseY(evt) {
	if (evt.pageY) {
		return evt.pageY;
	} else if (evt.clientY) {
   		return evt.clientY + (document.documentElement.scrollTop ?  document.documentElement.scrollTop : document.body.scrollTop);
	} else {
		return null;
	}
}
