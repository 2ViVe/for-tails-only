var ZOIVI = {
    currentDualTeamRootId: undefined,
	breadcrumbDualTeam: [],
	dualteamPath: [],
    distributorHash: {}
};

$(function() {
    $('#genealogy-search-botton').click(function() {
    	var distributorId = $('#genealogy-search-input').val();
	    if (!/^\d+$/.test(distributorId)) {
	        alert("Invalid distributor id: " + distributorId);
	        return;
	    }
		ZOIVI.renderDualteamTree(distributorId, ZOIVI.distributorHash);
    });
	
    $('#genealogy-search-input').keyup(function(e) {
		var distributorId;
		
		if (e.keyCode === 13) {
	    	distributorId = $('#genealogy-search-input').val();
		    if (!/^\d+$/.test(distributorId)) {
		        alert("Invalid distributor id: " + distributorId);
		        return;
		    }
			ZOIVI.renderDualteamTree(distributorId, ZOIVI.distributorHash);			
		}
    });
	
	$('#extreme-bottom-left').click(function() {
		var bottomExtremeDistributorId, distributor;
		
		distributor = ZOIVI.distributorHash[ZOIVI.currentDualTeamRootId];
		if (distributor.bottomExtremeDistributorLeftId === undefined) {
			bottomExtremeDistributorId = ZOIVI.getExtremeBottom(ZOIVI.currentDualTeamRootId, 'L');
			if (bottomExtremeDistributorId !== "") {
				distributor.bottomExtremeDistributorLeftId = bottomExtremeDistributorId;
			} else {
				return;
			}
		}
		ZOIVI.renderDualteamTree(distributor.bottomExtremeDistributorLeftId, ZOIVI.distributorHash);
	});
	
	$('#extreme-bottom-right').click(function() {
		var bottomExtremeDistributorId, distributor;

		distributor = ZOIVI.distributorHash[ZOIVI.currentDualTeamRootId];
		if (distributor.bottomExtremeDistributorRightId === undefined) {
			bottomExtremeDistributorId = ZOIVI.getExtremeBottom(ZOIVI.currentDualTeamRootId, 'R');
			if (bottomExtremeDistributorId !== "") {
				distributor.bottomExtremeDistributorRightId = bottomExtremeDistributorId;
			} else {
				return;
			}
		}
		ZOIVI.renderDualteamTree(distributor.bottomExtremeDistributorRightId, ZOIVI.distributorHash);	
	});
	
    $('.genealogy-instruction-a').click(function(){
        $('.genealogy-instruction').slideToggle();
        $('.fa').toggleClass('fa-chevron-down');
    });
	
	ZOIVI.init();
});

ZOIVI.clickBreadcrumbDualTeam = function(id, distributorHash) {
  if (id === ZOIVI.currentDualTeamRootId) {
    return;        
  }
  ZOIVI.renderDualteamTree(id, distributorHash);
};

ZOIVI.getBreadcrumbNodeHtml = function(id, breadcrumbDualTeam) {
  	var html,
		lastSelectCss = "",
  		onClickMethod = "";

	onClickMethod = "onClick='ZOIVI.clickBreadcrumbDualTeam(" + id + ", ZOIVI.distributorHash)'";   

  	if (id === _.last(breadcrumbDualTeam)) {
    	lastSelectCss = "class='active' ";
  	} else {
  		onClickMethod = "onClick='ZOIVI.clickBreadcrumbDualTeam(" + id + ", ZOIVI.distributorHash)'"; 
  	}
  	html = '<a ' + lastSelectCss + onClickMethod + '>' + id + '</a>';
  	return html;
};

ZOIVI.updateBreadcrumbDualTeam = function (breadcrumbDualTeam) {
	var html = "";
	
    _.map(breadcrumbDualTeam, function (distributorId) {
		html += ZOIVI.getBreadcrumbNodeHtml(distributorId, breadcrumbDualTeam);
    });
	
	$('#breadcrumb-dt').html(html);
};

ZOIVI.getExtremeBottom = function (id, side) {
	var distributorId = "",
		promise,
		url = '/genealogy_dualteam_extreme_bottom?distributorId=' + id + '&side=' + side;
		
	promise = $.ajax({
		url: url,
		async: false
	});
	promise.done(function (data) {
		if (data !== null) {
			distributorId = data['distributor-id'];			
		}
	});
	promise.fail(function (xhr, status, error) {
		$('#genealogy-loading').hide();
	  	alert("Please try again...");			
	}); 
	return distributorId;
}

ZOIVI.getDualteamPath = function (childId) {
	var path = "",
		promise,
		url = '/genealogy_dualteam_path?childId=' + childId;
		
	promise = $.ajax({
		url: url,
		async: false
	});
	promise.done(function (data) {
		path = data.path;
	});
	promise.fail(function (xhr, status, error) {
		$('#genealogy-loading').hide();
	  	alert("Please try again...");			
	}); 
	return path;
}

ZOIVI.getDisplayData = function (id, distributorHash) {
	var promise,
		url = '/genealogy_dualteam_data/' + id + '.json';
		
	$('#genealogy-loading').show();
	
	promise = $.ajax({
		url: url,
		async: false
	});
	promise.done(function (data) {
		if (data !== null) {
			ZOIVI.storeDisplayData(data, distributorHash);
		} else {
			distributorHash[id] = null;
		}
	});
	promise.fail(function (xhr, status, error) {
		$('#genealogy-loading').hide();
        alert("Please try again...");	
		return;			
	});
	
	$('#genealogy-loading').hide();
	return distributorHash[id];
}

ZOIVI.storeDisplayData = function(distributors, distributorHash) {
    _.map(distributors, function (distributor) {
        if (!(distributor['distributor-id'] in distributorHash)) {
            distributorHash[distributor['distributor-id']] = distributor;
        }
    });
};

ZOIVI.nodeCommonHtml = function (data) {
    var html,
		autoshipCSS,
		leftRightVolumeLink,
		personalHistoryVolumeLink,
		moveTopLink = '',
		userName = data['user-name'], 
		distributorId = data['distributor-id'], 
		clickDistributorMethod;

	if (userName.length > 30) {
		userName = data['user-name'].substring(0, 29);
		userName += "..";
	}
	
	if (distributorId !== genealogy_member_root_id) {
	    clickDistributorMethod = "'ZOIVI.renderDualteamTree(" + distributorId + ", ZOIVI.distributorHash)'";
	    moveTopLink = '<a title="Move Top" href="#' + distributorId + '" onclick=' + clickDistributorMethod + '><i class="fa fa-arrow-up"></i></a>';
	}
	
	if (data['autoship-status'] === 'complete') {
		autoshipColor = 'blue';
	} else {
		autoshipColor = 'red';
	}
	
	leftRightVolumeLink = '<a href="/commissions/organization_dt?distributor_id=' + distributorId + '">LR</a>';
	personalHistoryVolumeLink = '<a href="/commissions/organization?distributor_id=' + distributorId + '">PV</a>';
	
	
    html =        "<ul class='item1'>";
    html +=           "<li>" + leftRightVolumeLink + "</li>";
    html +=           '<li>' + moveTopLink + '</li>';
    html +=           "<li class='alph'>" + data['lifetime-rank'] + "</li>";
    html +=           "<li>" + personalHistoryVolumeLink + "</li>";
    html +=           "<li style='color: " + autoshipColor + "'>AS</li>";
    html +=         "</ul>";
    html +=         "<p class='item2'>" + userName + "</p>";
    html +=         "<p class='item3'>ACT<br/>" + data['active-status'] + "</p>";
    html +=         "<p class='item4'>PV<br/>" + data['current-month-pv'] + "</p>";
    html +=         "<p class='item5'>" + data['current-left-volume'] + "<br/>GV</p>";
    html +=         "<p class='item6'>" + data['current-right-volume'] + "<br/>GV</p>";
    html +=         "<p class='item7'>" + data['enrollment-date'] + "<br/>" + distributorId + "</p>";
    return html;
};


/*
ZOIVI.clickLeftRightVolume = function (distributorId) {
	var html;	
};

ZOIVI.clickPersonalHistoryVolume = function (distributorId) {
	
};
*/

ZOIVI.nodeRegularHtml = function (data) {
    var html, cssClass, statusDisplayName, statusCSS;

	if (data['enrollment-status'] === 'PR') {
		cssClass = 'diam-active-2';
		statusDisplayName = 'P';
		statusCSS = 'item8-2';
	} else {
		cssClass = 'diam-active-1';
		statusDisplayName = data['enrollment-status'];
		statusCSS = 'item8-1';	
	}
	
	if (data['active-status'] === 'N') {
		cssClass = 'diam-inactive-1';
	}
	
    html =  "<div class='diamondCon " + cssClass + "'>";
    html += ZOIVI.nodeCommonHtml(data);
    html += "<p class='" + statusCSS + "'><span>" + statusDisplayName + "</span></p>";
    html += "</div>";
    return html;
};


ZOIVI.nodeLockHtml = function (data) {
    var html;

    html = "<div class='diamondCon diam-bg-2'>";
    html += ZOIVI.nodeCommonHtml(data);
    html += "</div>";
    return html;
};

ZOIVI.nodeSilverHtml = function (dualteamSponsorId, side) {
    var html;

    html = "<div class='diamondCon silver diam-signup'>";
    html +=        "<ul class='item1'>";
    html +=           "<li>LR</li>";
    html +=           "<li><i class='fa fa-arrow-up'></i></li>";
    html +=           "<li class='alph'>Open</li>";
    html +=           "<li>PV</li>";
    html +=           "<li></li>";
    html +=         "</ul>";
	html +=         '<a class="item9" href="/signup?sponsor_id=' + genealogy_member_root_id + '&dualteam_sponsor_id=' + dualteamSponsorId + '&side=' + side + '"></a>';
    html += "</div>";

    return html;
};

ZOIVI.renderNonEmptyNode = function (data, htmlId) {
    if (data === undefined) {
        return;
    }

    if (data['enrollment-status'] === undefined) {
        $(htmlId).html(ZOIVI.nodeLockHtml(data));
    } else  {
        $(htmlId).html(ZOIVI.nodeRegularHtml(data));
    }
};

ZOIVI.renderEmptyNode = function (htmlId, dualteamSponsorId, side) {
    $(htmlId).html(ZOIVI.nodeSilverHtml(dualteamSponsorId, side));
};

ZOIVI.renderChildrenNodes = function (parentNodeData, leftHtmlId, rightHtmlId, distributorHash) {
    var nodeData,
		leftChildId,
		rightChildId;

    if (parentNodeData === undefined) {
        return;
    }
	
	leftChildId = parentNodeData['left-child-id'];
	rightChildId = parentNodeData['right-child-id'];

    if (leftChildId === "") {
        ZOIVI.renderEmptyNode(leftHtmlId, parentNodeData['distributor-id'], 'L');
    } else {
        nodeData = distributorHash[leftChildId];
		if (nodeData === undefined) {
			nodeData = ZOIVI.getDisplayData(leftChildId, distributorHash);
		}
        ZOIVI.renderNonEmptyNode(nodeData, leftHtmlId);
    }

    // render 1st level node 2
    if (rightChildId === "") {
        ZOIVI.renderEmptyNode(rightHtmlId, parentNodeData['distributor-id'], 'R');
    } else {
        nodeData = distributorHash[rightChildId];
		if (nodeData === undefined) {
			nodeData = ZOIVI.getDisplayData(rightChildId, distributorHash);
		}		
        ZOIVI.renderNonEmptyNode(nodeData, rightHtmlId);
    }
};

ZOIVI.clearDualteamTree = function () {
	$('#root-node').html('&nbsp;');
	$('#level2-node-1').html('&nbsp;');
	$('#level2-node-2').html('&nbsp;');
	$('#level3-node-1').html('&nbsp;');
	$('#level3-node-2').html('&nbsp;');
	$('#level3-node-3').html('&nbsp;');
	$('#level3-node-4').html('&nbsp;');
};

ZOIVI.dualteamMoveUp = function (id) {
	if (id === genealogy_member_root_id) {
		return;
	}
}


ZOIVI.renderDualteamTree = function (rootId, distributorHash) {
    var dualteamPath = [],
		root = distributorHash[rootId];
	
	if (root === undefined) {
		root = ZOIVI.getDisplayData(rootId, distributorHash);
	}

	if (root === null) {
		alert("Could not find the distributor id: " + rootId);
		return;
	}
	
	if (rootId === genealogy_member_root_id) {
		ZOIVI.breadcrumbDualTeam = [rootId];
	} else {
		dualteamPath = root.dualteamPath;
		
		if( dualteamPath === undefined ) {
			dualteamPath = ZOIVI.getDualteamPath(rootId).split('-');
			if (dualteamPath.length > 1) {   // [""] is still empty
				ZOIVI.breadcrumbDualTeam = dualteamPath.reverse();
				root.dualteamPath = ZOIVI.breadcrumbDualTeam;
			} else {
				alert("Could not find the distributor id: " + rootId);
				return;
			}
		} else if (dualteamPath.length > 1) {
			ZOIVI.breadcrumbDualTeam = dualteamPath;
		} else {
			return;
		}
	}
	
	ZOIVI.currentDualTeamRootId = rootId;
	ZOIVI.updateBreadcrumbDualTeam(ZOIVI.breadcrumbDualTeam);

	ZOIVI.clearDualteamTree();
	
	$('#extrem-left').html('← Extreme bottom left of <b>' + ZOIVI.currentDualTeamRootId + '</b>');
	$('#extrem-right').html('Extreme bottom Right of <b>' + ZOIVI.currentDualTeamRootId + '</b> →' );

    // render root node
    ZOIVI.renderNonEmptyNode(root, '#root-node');
	//sleep(5);

    // render 2nd level node 1(left) and node 2(right)
	setTimeout(function(){
		ZOIVI.renderChildrenNodes(root, '#level2-node-1', '#level2-node-2', distributorHash);
	}, 700);
    //ZOIVI.renderChildrenNodes(root, '#level2-node-1', '#level2-node-2', distributorHash);

    // render 3rd level node 1(left) and node 2(right)
	setTimeout(function(){
	    if (root['left-child-id'] !== "") {
        	ZOIVI.renderChildrenNodes(
            	distributorHash[root['left-child-id']],
            	'#level3-node-1',
            	'#level3-node-2',
            	distributorHash);
    	}
	
    	// render 3rd level node 3(left) and node 4(right)
    	if (root['right-child-id'] !== "") {
        	ZOIVI.renderChildrenNodes(
            	distributorHash[root['right-child-id']],
            	'#level3-node-3',
            	'#level3-node-4',
            	distributorHash);
    	}	
	}, 1400);

};

ZOIVI.init = function () {
	ZOIVI.renderDualteamTree(genealogy_member_root_id, ZOIVI.distributorHash);
};