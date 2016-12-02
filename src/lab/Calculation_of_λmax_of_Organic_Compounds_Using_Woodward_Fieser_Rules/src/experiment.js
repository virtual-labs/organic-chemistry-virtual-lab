/**	 
* @author:anisha
* @date:24-11-2016
* @filename:experiment.js
* @created 24-11-2016 4:00:50 PM
*/

/**calculation based on the tab selected*/
function calculation(scope,dialogs){	
	if(scope.selectedIndex==1){/** if conjugate*/
		calculateConjugate(scope,dialogs);
	}
	else if(scope.selectedIndex==2){/** if ketones*/
		calculateKetone(scope,dialogs);
	}
	else if(scope.selectedIndex==3){/** if aromatic*/
	calculateAromatic(scope,dialogs);	
	}	
}
/**Calculate the lambda max of conjugate compounds*/
function calculateConjugate(scope,dialogs){
	getChild();
	base_val_txt=base_val.value;
	ring_val_txt=ring_val.value;
	exocyclic_val_txt=exocyclic_val.value;
	dbl_bond_val_txt=dbl_bond_val.value;
	polar_val_txt=polar_val.value;	
	/**set the value of empty textbox with 0 in conjugate compounds*/
	polar_val_txt==""?polar_val_txt=0:polar_val_txt=polar_val_txt;
	dbl_bond_val_txt==""?dbl_bond_val_txt=0:dbl_bond_val_txt=dbl_bond_val_txt;
	exocyclic_val_txt==""?exocyclic_val_txt=0:exocyclic_val_txt=exocyclic_val_txt;
	/**validate the textbox value with the values of the conjugate from the xml*/
	errorValidationConjugate();	
	if(lambda_max==document.getElementById("maxLambdaText").value){
		if(base_val_txt == base_value && dbl_bond_val_txt==double_bond && exocyclic_val_txt==exocyclic_doubleBond && polar_groups == polar_val_txt && ring_val_txt == substituent_residue){
			document.getElementById("checkSpan").style.display="inline-flex"
		}
		else{
			document.getElementById("checkSpan").style.display="none"
			dialogs.error(_("Error"),_("Enter correct values"),_("Close"));
		}	
	}
	else{
		dialogs.error(_("Error"),_("Incorrect Lmax value"),_("Close"));
	}
}	

/**Calculate the lambda max of ketone compounds*/
function calculateKetone(scope,dialogs){
	getChildKetone();// get child object of textbox
	base_val_ket_txt=base_val_ketone.value;
	ring_keto_a_txt=ring_keto_a.value;
	ring_keto_b_txt=ring_keto_b.value;
	ring_keto_c_txt=ring_keto_c.value;
	ring_keto_d_txt=ring_keto_d.value;
	polar_keto_a_txt=polar_keto_a.value;
	polar_keto_b_txt=polar_keto_b.value;
	polar_keto_c_txt=polar_keto_c.value;
	polar_keto_d_txt=polar_keto_d.value;
	keto_dbl_bnd_txt=keto_dbl_bnd.value;
	ket_homodien_cmd_txt=ket_homodien_cmd.value;
	ket_exo_cyclic_txt=ket_exo_cyclic.value;
	
	/**set the value of empty textbox with 0 in ketone compounds*/
	ring_keto_a_txt==""?ring_keto_a_txt=0:ring_keto_a_txt=ring_keto_a_txt;
	ring_keto_b_txt==""?ring_keto_b_txt=0:ring_keto_b_txt=ring_keto_b_txt;
	ring_keto_c_txt==""?ring_keto_c_txt=0:ring_keto_c_txt=ring_keto_c_txt;
	ring_keto_d_txt==""?ring_keto_d_txt=0:ring_keto_d_txt=ring_keto_d_txt;
	polar_keto_a_txt==""?polar_keto_a_txt=0:polar_keto_a_txt=polar_keto_a_txt;
	polar_keto_b_txt==""?polar_keto_b_txt=0:polar_keto_b_txt=polar_keto_b_txt;
	polar_keto_c_txt==""?polar_keto_c_txt=0:polar_keto_c_txt=polar_keto_c_txt;
	polar_keto_d_txt==""?polar_keto_d_txt=0:polar_keto_d_txt=polar_keto_d_txt;
	keto_dbl_bnd_txt==""?keto_dbl_bnd_txt=0:keto_dbl_bnd_txt=keto_dbl_bnd_txt;
	ket_homodien_cmd_txt==""?ket_homodien_cmd_txt=0:ket_homodien_cmd_txt=ket_homodien_cmd_txt;
	ket_exo_cyclic_txt==""?ket_exo_cyclic_txt=0:ket_exo_cyclic_txt=ket_exo_cyclic_txt;	
	
	/**validate the textbox value with the values of the ketones from the xml*/
	errorValidationKetone();
			/**check the lambda max value entered by the user match with the value in the xml*/

	if(lambda_max==document.getElementById("maxLambdaText").value){
		if(base_val_ket_txt == ketone_base && ring_keto_a_txt==ring_alpha && ring_keto_b_txt==ring_beta && ring_keto_c_txt == ring_gamma
		&& ring_keto_d_txt == ring_delta && polar_keto_a_txt == polar_alpha && polar_keto_b_txt == polar_beta && polar_keto_c_txt == polar_gamma 
		&& polar_keto_d_txt == polar_delta && keto_dbl_bnd_txt == keto_dblbond && ket_homodien_cmd_txt == homodiene_cmd && ket_exo_cyclic_txt == exocyclic_bnd){
			document.getElementById("checkSpan").style.display="inline-flex"
		}
		else{
			document.getElementById("checkSpan").style.display="none"
			dialogs.error(_("Error"),_("Enter correct values"),_("Close"));/**show the alert if the value is wrong*/
		}	
	}
	else{
		dialogs.error(_("Error"),_("Incorrect Lmax value"),_("Close"));
	}
}

/**Calculate the lambda max of the aromatic compounds*/
function calculateAromatic(scope,dialogs){
	getChildAromatic();//get the object of the textbox
	base_val_arom_txt=base_val_aromatic.value;
	ring_arom_ortho_txt=ring_aromatic_ortho.value;
	ring_arom_para_txt=ring_aromatic_para.value;
	ring_arom_meta_txt=ring_aromatic_meta.value;	
	polar_arom_ortho_txt=polar_aromatic_ortho.value;
	polar_arom_para_txt=polar_aromatic_para.value;
	polar_arom_meta_txt=polar_aromatic_meta.value;
	
	/**set the value of empty textbox with 0 in aromatic compounds*/
	base_val_arom_txt==""?base_val_arom_txt=0:base_val_arom_txt=base_val_arom_txt;
	ring_arom_ortho_txt==""?ring_arom_ortho_txt=0:ring_arom_ortho_txt=ring_arom_ortho_txt;
	ring_arom_para_txt==""?ring_arom_para_txt=0:ring_arom_para_txt=ring_arom_para_txt;
	ring_arom_meta_txt==""?ring_arom_meta_txt=0:ring_arom_meta_txt=ring_arom_meta_txt;
	polar_arom_ortho_txt==""?polar_arom_ortho_txt=0:polar_arom_ortho_txt=polar_arom_ortho_txt;
	polar_arom_para_txt==""?polar_arom_para_txt=0:polar_arom_para_txt=polar_arom_para_txt;
	polar_arom_meta_txt==""?polar_arom_meta_txt=0:polar_arom_meta_txt=polar_arom_meta_txt;
	
	/**validate the textbox value with the values of the aromatic from the xml*/
	errorValidationAromatic();	
	/**check the lambda max value entered by the user match with the value in the xml*/
	if(lambda_max==document.getElementById("maxLambdaText").value){
	if(base_val_arom_txt == aromatic_base && ring_arom_ortho_txt==aromatic_ring_ortho && ring_arom_para_txt==aromatic_ring_para && ring_arom_meta_txt == aromatic_ring_meta&& polar_arom_ortho_txt == aromatic_polar_ortho && polar_arom_para_txt == aromatic_polar_para && polar_arom_meta_txt == aromatic_polar_meta){
		document.getElementById("checkSpan").style.display="inline-flex";/**display 'right' mark*/
		}
		else{
		document.getElementById("checkSpan").style.display="none"
		dialogs.error(_("Error"),_("Enter correct values"),_("Close"));
		}	
	}
	else{
		dialogs.error(_("Error"),_("Incorrect Lmax value"),_("Close"));/**show the alert if the value is wrong*/
	}	
}	

/**load the xml file using javascript*/
function loadXml()
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			readXML(xmlhttp);
		} 
	};	
	xmlhttp.open("GET", "./data.xml", true);
	xmlhttp.send();
}
		
/**Read the values of base value, ring residue, polar position, double bond etc of each compound from the xml*/		
function readXML(xml)
{	
    /**Read the values of thegiven compounds from the xml*/
	var xmlDoc = xml.responseXML;	
	compound2 = xmlDoc.getElementsByTagName("compounds");
	var id= compound2[0].getElementsByTagName("orgCompound")[0].getAttribute("id");		
	var xmlNode=compound2[0].getElementsByTagName("orgCompound")[selectedIndex-1].getElementsByTagName("compound")[ran_num-1];	
	if(selectedIndex==1){	//if the selected tab is conjugate  
	base_value  = xmlNode.getElementsByTagName("basevalue")[0].childNodes[0].nodeValue;
	substituent_residue  =xmlNode.getElementsByTagName("substituent")[0].childNodes[0].nodeValue;
	double_bond  =xmlNode.getElementsByTagName("doubleBond")[0].childNodes[0].nodeValue;
	exocyclic_doubleBond  =xmlNode.getElementsByTagName("exocyclicdoubleBond")[0].childNodes[0].nodeValue;
	polar_groups  =xmlNode.getElementsByTagName("polarGroups")[0].childNodes[0].nodeValue;
	lambda_max  =xmlNode.getElementsByTagName("lambdaMax")[0].childNodes[0].nodeValue;
	}
	else if(selectedIndex==2){	//if the selected tab is ketone
	ketone_base = xmlNode.getElementsByTagName("basevalue")[0].childNodes[0].nodeValue;
	ring_alpha =  xmlNode.getElementsByTagName("ring_alpha")[0].childNodes[0].nodeValue;
	ring_beta =  xmlNode.getElementsByTagName("ring_beta")[0].childNodes[0].nodeValue;
	ring_gamma = xmlNode.getElementsByTagName("ring_gamma")[0].childNodes[0].nodeValue;
	ring_delta = xmlNode.getElementsByTagName("ring_delta")[0].childNodes[0].nodeValue;
	polar_alpha = xmlNode.getElementsByTagName("polar_alpha")[0].childNodes[0].nodeValue;
	polar_beta = xmlNode.getElementsByTagName("polar_beta")[0].childNodes[0].nodeValue;
	polar_gamma = xmlNode.getElementsByTagName("polar_gamma")[0].childNodes[0].nodeValue;
	polar_delta = xmlNode.getElementsByTagName("polar_delta")[0].childNodes[0].nodeValue;
	keto_dblbond = xmlNode.getElementsByTagName("doubleBond")[0].childNodes[0].nodeValue;
	homodiene_cmd = xmlNode.getElementsByTagName("homodieneComp")[0].childNodes[0].nodeValue;
	exocyclic_bnd = xmlNode.getElementsByTagName("exocyclicdoubleBond")[0].childNodes[0].nodeValue;	
	lambda_max  =xmlNode.getElementsByTagName("lambdaMax")[0].childNodes[0].nodeValue;
	}
	else if(selectedIndex==3){	//if the selected tab is Aromatic
	aromatic_base = xmlNode.getElementsByTagName("basevalue")[0].childNodes[0].nodeValue;
	aromatic_ring_ortho =  xmlNode.getElementsByTagName("ring_ortho")[0].childNodes[0].nodeValue;
	aromatic_ring_para =  xmlNode.getElementsByTagName("ring_para")[0].childNodes[0].nodeValue;
	aromatic_ring_meta = xmlNode.getElementsByTagName("ring_meta")[0].childNodes[0].nodeValue;
	aromatic_polar_ortho = xmlNode.getElementsByTagName("polar_ortho")[0].childNodes[0].nodeValue;
	aromatic_polar_para = xmlNode.getElementsByTagName("polar_para")[0].childNodes[0].nodeValue;
	aromatic_polar_meta = xmlNode.getElementsByTagName("polar_meta")[0].childNodes[0].nodeValue;
	lambda_max  =xmlNode.getElementsByTagName("lambdaMax")[0].childNodes[0].nodeValue;
	}	
}

/**get the child name of each text box in the conjugate tab*/
function getChild(){
	base_val=document.getElementById("baseValText");
	ring_val=document.getElementById("ringText");
	dbl_bond_val=document.getElementById("dblbondText");
	exocyclic_val=document.getElementById("exocyclicText");
	polar_val=document.getElementById("polarText");
}

/**get the child name of each text box in the Ketone tab*/
function getChildKetone(){
	base_val_ketone=document.getElementById("ketoneBaseValText");
	ring_keto_a=document.getElementById("ringAlpha");
	ring_keto_b=document.getElementById("ringBeta");
	ring_keto_c=document.getElementById("ringGamma");
	ring_keto_d=document.getElementById("ringDelta");
	polar_keto_a=document.getElementById("polarAlpha");
	polar_keto_b=document.getElementById("polarBeta");
	polar_keto_c=document.getElementById("polarGamma");
	polar_keto_d=document.getElementById("polarDelta");
	keto_dbl_bnd=document.getElementById("ketoDblbond");
	ket_homodien_cmd=document.getElementById("homodieneCmd");
	ket_exo_cyclic=document.getElementById("exocyclicBnd");
}

/**get the child name of each text box in the Aromatic tab*/
function getChildAromatic(){
	base_val_aromatic=document.getElementById("aromaticBaseVal");
	ring_aromatic_ortho=document.getElementById("ringOrtho");
	ring_aromatic_para=document.getElementById("ringPara");
	ring_aromatic_meta=document.getElementById("ringMeta");	
	polar_aromatic_ortho=document.getElementById("polarOrtho");
	polar_aromatic_para=document.getElementById("polarPara");
	polar_aromatic_meta=document.getElementById("polarMeta");
}