searchCleared = false;
function clearSearch()
{
	if (searchCleared == false)
	{
		document.getElementById('keywords').value = '';
		searchCleared = true;
	}
}

startList = function()
{
	if (document.all&&document.getElementById)
	{
    		navRoot = (typeof arguments[0] == 'undefined') ?  document.getElementById("nav") : document.getElementById(arguments[0]);
		for (i=0; i<navRoot.childNodes.length; i++)
		{
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI" || node.nodeName=="UL")
			{
				node.onmouseover=function()
				{
					this.className+=" over";
				}
				node.onmouseout=function()
				{
					this.className=this.className.replace(" over", "");
				}
			}
			
			navChild = node;
			for (j=0; j<navChild.childNodes.length; j++)
			{
				node2 = navChild.childNodes[j];
				
				if (node2.nodeName == "UL")
				{
					navChild2 = node2;
					for (k=0; k<navChild2.childNodes.length; k++)
					{
						node3 = navChild2.childNodes[k];
						if (node3.nodeName=="LI" || node3.nodeName=="UL")
						{
							node3.onmouseover=function()
							{
								this.className+=" over";
							}
							node3.onmouseout=function()
							{
								this.className=this.className.replace(" over", "");
							}
						}
					}
				}
			}
		}
	}
}

//window.onload=startList;

/**
* Set display of page element
* s[-1,0,1] = hide,toggle display,show
*/
function dE(n, s, type)
{
	if (!type)
	{
		type = 'block';
	}

	var e = document.getElementById(n);
	if (!s)
	{
		s = (e.style.display == type) ? -1 : 1;
	}
	e.style.display = (s == 1) ? type : 'none';
}
