/**	 
* @author:anisha
* @date:24-11-2016
* @filename:view.js
* @created 24-11-2016 4:00:50 PM
*/

(function() {
 angular.module('users')
  .directive("experiment", directiveFunction)
})();

 /** Variable initialization */
var woodward_fieser_stage, exp_canvas, tab_label, border_style_red, border_style_black;

var base_value, substituent_residue, double_bond, exocyclic_doubleBond, polar_groups, lambda_max ;

var base_val, ring_val, dbl_bond_val, exocyclic_val, polar_val, imgRect, selectedIndex, polar_arom_meta_txt, ket_exo_cyclic;

var ring_arom_ortho_txt, ring_arom_para_txt, ring_arom_meta_txt, polar_arom_ortho_txt, polar_arom_para_txt, polar_arom_meta_txt;

var ketone_base, ring_alpha, ring_beta, ring_gamma, ring_delta, polar_alpha, polar_beta, polar_gamma, polar_delta, keto_dblbond;

var base_val_ket_txt,ring_keto_a_txt,ring_keto_b_txt,ring_keto_c_txt,ring_keto_d_txt,polar_keto_a_txt, homodiene_cmd, exocyclic_bnd;

var polar_keto_b_txt,polar_keto_c_txt,polar_keto_d_txt,keto_dbl_bnd_txt,ket_homodien_cmd_txt,ket_exo_cyclic_txt,keto_dbl_bnd, ket_homodien_cmd;

var base_val_ketone, ring_keto_a, ring_keto_b, ring_keto_c, ring_keto_d, polar_keto_a, polar_keto_b, polar_keto_c, polar_keto_d; 

var aromatic_base, aromatic_ring_ortho, aromatic_ring_para, aromatic_ring_meta, aromatic_polar_ortho, aromatic_polar_para, aromatic_polar_meta;

var base_val_aromatic, ring_aromatic_ortho, ring_aromatic_para, ring_aromatic_meta, polar_aromatic_ortho, polar_aromatic_para, polar_aromatic_meta;

	function directiveFunction() {
		return {
			restrict: "A",
			link: function(scope, element, attrs, dialogs) {
				/** Variable that decides if something should be drawn on mouse move */
				var experiment = true;
				if (element[0].width > element[0].height) {
					element[0].width = element[0].height;
					element[0].height = element[0].height;
				} else {
					element[0].width = element[0].width;
					element[0].height = element[0].width;
				}
				if (element[0].offsetWidth > element[0].offsetHeight) {
					element[0].offsetWidth = element[0].offsetHeight;
				} else {
					element[0].offsetWidth = element[0].offsetWidth;
					element[0].offsetHeight = element[0].offsetWidth;
				}				
				exp_canvas = document.getElementById("demoCanvas");
				exp_canvas.width = element[0].width;
				exp_canvas.height = element[0].height;
				woodward_fieser_stage = new createjs.Stage("demoCanvas");
				handleComplete(scope);
				woodward_fieser_stage.enableDOMEvents(true);
				woodward_fieser_stage.enableMouseOver();
				createjs.Touch.enable(woodward_fieser_stage);
				init(scope.selectedIndex);
				function handleComplete(scope) {	
					initialisationOfVariables(scope); /** Initializing the variables */
					translationLabels(); /** Translation of strings using gettext */
				}
				/** Add all the strings used for the language translation here. '_' is the short cut for calling 
				the gettext function defined in the gettext-definition.js */
				function translationLabels() {
					/** This help array shows the hints for this experiment */
					help_array = [_("help1"), _("help2"), _("help3"), _("help4"),_("Next"), _("Close")];
					scope.heading = _("heading");
					scope.Variables = _("Variables");
					scope.BaseValue=_("basevalue");
					scope.Doublebond=_("Doublebond");
					scope.Exocyclicdouble=_("Exocyclicdouble");
					scope.Polargroups=_("Polargroups");
					scope.AlkylSubstituent=_("AlkylSubstituent");
					scope.ringResidue=_("ringResidue");
					scope.Controls=_("Controls");
					scope.lamdaMax=_("lamdaMax");
					scope.Correct=_("Correct");
					scope.Submit=_("Submit"); 				
					scope.Aromatic=_("Aromatic"); 				
					scope.Ketone=_("Ketone"); 				
					scope.Conjugate=_("Conjugate"); 				
					scope.AlkylSubstituentKeto=_("AlkylSubstituentKeto"); 				
					scope.Polargroupsposition=_("Polargroupsposition"); 				
					scope.Homodienecompound=_("Homodienecompound"); 				
					scope.Ortho=_("Ortho"); 				
					scope.Para=_("Para"); 				
					scope.Meta=_("Meta"); 				
					scope.lambdamax=_("lambdamax"); 				
					scope.lambdamax=_("lambdamax"); 				
					scope.result = _("Result");
					scope.copyright = _("copyright");
					woodward_fieser_stage.update();
				}
			}
		}

	}
function init(selectedIndex) {
	woodward_fieser_stage.removeAllChildren();
	document.getElementById("checkSpan").style.display="none";
	document.getElementById("maxLambdaText").value="";
	ran_num = getRandomNumber(selectedIndex);		
	img = new Image();
	img.src = '././images/'+tab_label+ran_num+'.svg';	
	img.onload = handleImageLoad;
}
function handleImageLoad(event) {
    imgRect = new createjs.Bitmap(img);
    woodward_fieser_stage.addChild(imgRect);
    imgRect.x = 90;
    imgRect.y = 150;
	loadXml();
    woodward_fieser_stage.update();
}
/** All variables initialising in this function */
function initialisationOfVariables(scope) {
	document.getElementById("site-sidenav").style.display="block";
	tab_label="conjugate";
	selectedIndex=1;
	border_style_black="1px solid black";
	border_style_red="1px solid red";	
	getChild();
}
function getRandomNumber(selectedIndex){
	if(selectedIndex!=3){
		return Math.floor((Math.random() * 12) + 1);		
	}
	else{
		return Math.floor((Math.random() * 7) + 1);
	}
}
function errorValidationAromatic(){	
	validateTextBox(base_val_aromatic,base_val_arom_txt,aromatic_base);
	validateTextBox(ring_aromatic_ortho,ring_arom_ortho_txt,aromatic_ring_ortho);
	validateTextBox(ring_aromatic_para,ring_arom_para_txt,aromatic_ring_para);
	validateTextBox(ring_aromatic_meta,ring_arom_meta_txt,aromatic_ring_meta);
	validateTextBox(polar_aromatic_ortho,polar_arom_ortho_txt,aromatic_polar_ortho);
	validateTextBox(polar_aromatic_para,polar_arom_para_txt,aromatic_polar_para);
	validateTextBox(polar_aromatic_meta,polar_arom_meta_txt,aromatic_polar_meta);
}	
function errorValidationKetone(){
	validateTextBox(base_val_ketone,base_val_ket_txt,ketone_base);
	validateTextBox(ring_keto_a,ring_keto_a_txt,ring_alpha);
	validateTextBox(ring_keto_b,ring_keto_b_txt,ring_beta);
	validateTextBox(ring_keto_c,ring_keto_c_txt,ring_gamma);
	validateTextBox(ring_keto_d,ring_keto_d_txt,ring_delta);
	validateTextBox(polar_keto_a,polar_keto_a_txt,polar_alpha);
	validateTextBox(polar_keto_b,polar_keto_b_txt,polar_beta);
	validateTextBox(polar_keto_c,polar_keto_c_txt,polar_gamma);
	validateTextBox(polar_keto_d,polar_keto_d_txt,polar_delta);
	validateTextBox(keto_dbl_bnd,keto_dbl_bnd_txt,keto_dblbond);
	validateTextBox(ket_homodien_cmd,ket_homodien_cmd_txt,homodiene_cmd);
	validateTextBox(ket_exo_cyclic,ket_exo_cyclic_txt,exocyclic_bnd);		
}
function validateTextBox(textbox_name,txt_val,xml_value){
	txt_val != (xml_value) ? textbox_name.style.border=border_style_red: textbox_name.style.border=border_style_black;
}
function errorValidationConjugate(){
	validateTextBox(base_val,base_val_txt,base_value);
	validateTextBox(ring_val,ring_val_txt,substituent_residue);
	validateTextBox(dbl_bond_val,dbl_bond_val_txt,double_bond);
	validateTextBox(exocyclic_val,exocyclic_val_txt,exocyclic_doubleBond);
	validateTextBox(polar_val,polar_val_txt,polar_groups);
}
function resetExp() {
	if(selectedIndex==1){
		getChild();
		base_val.value = ring_val.value = dbl_bond_val.value = exocyclic_val.value = polar_val.value ="";	
		base_val.style.border=ring_val.style.border=dbl_bond_val.style.border=exocyclic_val.style.border=polar_val.style.border=border_style_black		
	}
	else if(selectedIndex==2){			
		getChildKetone();	
		base_val_ketone.value = ring_keto_a.value = ring_keto_b.value = ring_keto_c.value = ring_keto_d.value = polar_keto_a.value = "";
		polar_keto_b.value = polar_keto_c.value = polar_keto_d.value = keto_dbl_bnd.value = ket_homodien_cmd.value = ket_exo_cyclic.value ="";				
		base_val_ketone.style.border= ring_keto_a.style.border= ring_keto_b.style.border= ring_keto_c.style.border= ring_keto_d.style.border=border_style_black ;	
		polar_keto_a.style.border= polar_keto_b.style.border= polar_keto_c.style.border= polar_keto_d.style.border= keto_dbl_bnd.style.border=border_style_black ;	
		ket_homodien_cmd.style.border= ket_exo_cyclic.style.border=border_style_black ;
	}
	else if(selectedIndex==3){
		getChildAromatic();
		base_val_aromatic.value = ring_aromatic_ortho.value = ring_aromatic_para.value = ring_aromatic_meta.value ="";	
		polar_aromatic_ortho.value = polar_aromatic_para.value = polar_aromatic_meta.value ="";
		base_val_aromatic.style.border= ring_aromatic_ortho.style.border= ring_aromatic_para.style.border=border_style_black ;
		ring_aromatic_meta.style.border= polar_aromatic_ortho.style.border= polar_aromatic_para.style.border= polar_aromatic_meta.style.border=border_style_black ;		
	}
	document.getElementById("checkSpan").style.display="none"
	document.getElementById("maxLambdaText").value="";
}