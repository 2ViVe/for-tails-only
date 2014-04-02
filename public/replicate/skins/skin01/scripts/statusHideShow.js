function showHide(shID) {
        if (document.getElementById('arrow_'+shID)) {
                if (shID == 'GVGraph') {
                        document.getElementById('arrow_GVGraph').style.display = 'block';
                        document.getElementById('Module_GVGraph').style.display = 'inline';
                        document.getElementById('arrow_PVGraph').style.display = 'none';
                        document.getElementById('Module_PVGraph').style.display = 'none';
                        document.getElementById('arrow_SponsorGraph').style.display = 'none';
                        document.getElementById('Module_SponsorGraph').style.display = 'none';
                } else if (shID == 'PVGraph') {
                        document.getElementById('arrow_GVGraph').style.display = 'none';
                        document.getElementById('Module_GVGraph').style.display = 'none';
                        document.getElementById('arrow_PVGraph').style.display = 'block';
                        document.getElementById('Module_PVGraph').style.display = 'inline';
                        document.getElementById('arrow_SponsorGraph').style.display = 'none';
                        document.getElementById('Module_SponsorGraph').style.display = 'none';
                } else if (shID == 'SponsorGraph') {
                        document.getElementById('arrow_GVGraph').style.display = 'none';
                        document.getElementById('Module_GVGraph').style.display = 'none';
                        document.getElementById('arrow_PVGraph').style.display = 'none';
                        document.getElementById('Module_PVGraph').style.display = 'none';
                        document.getElementById('arrow_SponsorGraph').style.display = 'block';
                        document.getElementById('Module_SponsorGraph').style.display = 'inline';
                } else if (shID == 'Qualifications') {
                       	document.getElementById('arrow_Qualifications').style.display = 'block';
                       	document.getElementById('Module_Qualifications').style.display = 'inline';
                       	document.getElementById('arrow_UplineListing').style.display = 'none';
                       	document.getElementById('Module_UplineListing').style.display = 'none';
                       	document.getElementById('arrow_OrderHistory').style.display = 'none';
                       	document.getElementById('Module_OrderHistory').style.display = 'none';
                } else if (shID == 'UplineListing') {
                       	document.getElementById('arrow_Qualifications').style.display = 'none';
                        document.getElementById('Module_Qualifications').style.display = 'none';
                        document.getElementById('arrow_UplineListing').style.display = 'block';
                        document.getElementById('Module_UplineListing').style.display = 'inline';
                        document.getElementById('arrow_OrderHistory').style.display = 'none';
                        document.getElementById('Module_OrderHistory').style.display = 'none';
                } else if (shID == 'OrderHistory') {
						document.getElementById('arrow_Qualifications').style.display = 'none';
						document.getElementById('Module_Qualifications').style.display = 'none';
						document.getElementById('arrow_UplineListing').style.display = 'none';
						document.getElementById('Module_UplineListing').style.display = 'none';
						document.getElementById('arrow_OrderHistory').style.display = 'block';
						document.getElementById('Module_OrderHistory').style.display = 'inline';
				} else if (shID == 'ActionItems') {
                       	document.getElementById('arrow_ActionItems').style.display = 'block';
                       	document.getElementById('Module_ActionItems').style.display = 'inline';
                       	document.getElementById('arrow_ActionItemsDue').style.display = 'none';
                       	document.getElementById('Module_ActionItemsDue').style.display = 'none';
                       	document.getElementById('arrow_ActionItemsCompleted').style.display = 'none';
                       	document.getElementById('Module_ActionItemsCompleted').style.display = 'none';
                } else if (shID == 'ActionItemsDue') {
                       	document.getElementById('arrow_ActionItems').style.display = 'none';
                        document.getElementById('Module_ActionItems').style.display = 'none';
                        document.getElementById('arrow_ActionItemsDue').style.display = 'block';
                        document.getElementById('Module_ActionItemsDue').style.display = 'inline';
                        document.getElementById('arrow_ActionItemsCompleted').style.display = 'none';
                        document.getElementById('Module_ActionItemsCompleted').style.display = 'none';
                } else if (shID == 'ActionItemsCompleted') {
						document.getElementById('arrow_ActionItems').style.display = 'none';
						document.getElementById('Module_ActionItems').style.display = 'none';
						document.getElementById('arrow_ActionItemsDue').style.display = 'none';
						document.getElementById('Module_ActionItemsDue').style.display = 'none';
						document.getElementById('arrow_ActionItemsCompleted').style.display = 'block';
						document.getElementById('Module_ActionItemsCompleted').style.display = 'inline';
				}
					else {
						alert('1:' + shID);
					}
        } else {
		
                alert('2:'+shID);
        }
}
