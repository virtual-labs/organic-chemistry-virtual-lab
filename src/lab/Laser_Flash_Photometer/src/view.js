(function(){
  angular
       .module('users')
	   .directive("experiment",directiveFunction)
})();

var stage, exp_canvas, stage_width, stage_height,test_tube;

var chart,dataplot_array,title_text,tick;

var y_axis_min, y_axis_max, clr_time_out;

var solution_type_indx, graph_values =[[],[],[]];

function directiveFunction(){
	return {
		restrict: "A",
		link: function(scope, element,attrs){
			/** Variable that decides if something should be drawn on mouse move */
			var experiment = true;
			if ( element[0].width > element[0].height ) {
				element[0].width = element[0].height;
				element[0].height = element[0].height;
			} else {
				element[0].width = element[0].width;
				element[0].height = element[0].width;
			}  
			if ( element[0].offsetWidth > element[0].offsetHeight ) {
				element[0].offsetWidth = element[0].offsetHeight;			
			} else {
				element[0].offsetWidth = element[0].offsetWidth;
				element[0].offsetHeight = element[0].offsetWidth;
			}
			exp_canvas=document.getElementById("demoCanvas");
			exp_canvas.width=element[0].width;
			exp_canvas.height=element[0].height;            
    		stage = new createjs.Stage("demoCanvas");
			queue = new createjs.LoadQueue(true);
			queue.installPlugin(createjs.Sound);
			loadingProgress(queue, stage, exp_canvas.width);
			queue.on("complete", handleComplete, this);
			queue.loadManifest([
				{
					id: "background",
                    src: "././images/background.svg",
                    type: createjs.LoadQueue.IMAGE
                },
                {
                    id: "top_cover",
                    src: "././images/top_cover.svg",
                    type: createjs.LoadQueue.IMAGE
                },
                {
                    id: "solution_0",
                    src: "././images/solution_0.svg",
                    type: createjs.LoadQueue.IMAGE
                },
                {
                    id: "solution_1",
                    src: "././images/solution_1.svg",
                    type: createjs.LoadQueue.IMAGE
                },
                {
                    id: "solution_2",
                    src: "././images/solution_2.svg",
                    type: createjs.LoadQueue.IMAGE
                }
			]);			
			stage.enableDOMEvents(true);
			stage.enableMouseOver();
                        
            container = new createjs.Container(); /** Primery container for background*/
            container.name = "container";
            stage.addChild(container); /** Append to stage */

            test_tube = new createjs.Container(); /** Container for all test tube keep together*/
            container.name = "test_tube";
            stage.addChild(test_tube); /** Append to stage */

            top_cover = new createjs.Container(); /** Container for top cover of machien part*/
            top_cover.name = "top_cover";
            stage.addChild(top_cover); /** Append to stage */

			function handleComplete(){	
            /** ALl images load into into queue */			
                loadImages(queue.getResult("background"),"bg",0,0,"",0,container,1);
                loadImages(queue.getResult("solution_2"),"solution_2",0,0,"",0,test_tube,1);
                loadImages(queue.getResult("solution_1"),"solution_1",0,0,"",0,test_tube,1);
                loadImages(queue.getResult("solution_0"),"solution_0",0,0,"",0,test_tube,1);                   
				loadImages(queue.getResult("top_cover"),"top_cover",0,0,"",0,top_cover,1);                     
                
                initialisationOfControls(scope);
				initialisationOfVariables(); /** Function calling for initializing the variables */
				initialisationOfImages(); /** Function call for images used in the apparatus visibility */
				translationLabels(); /** Translation of strings using gettext */
                loadXml(); /** Function to load xml data from xml file */
			}
            
			/** Add all the strings used for the language translation here. '_' is the short cut for calling the gettext function defined in the gettext-definition.js */	
			function translationLabels(){
                /** This help array shows the hints for this experiment */
				helpArray=[_("help1"),_("help2"),_("help3"),_("help4"),_("Next"),_("Close")];
                scope.heading=_("Laser Flash Photometer");
				scope.variables=_("Variables");                 
				scope.result=_("Result");  
				scope.copyright=_("copyright");
				scope.select_sample_lbl = _("Select a sample solution"); /** Label of dropdown box(solution type) */
				scope.solution_type_label = [{type:_("xanthone"),index:0},{type:_("2-aminophenothiazine"),index:1},{type:_("zinc phthalocyanine"),index:2}];
                scope.load_sample = _("Load sample"); /** Label of Lpoad sample button  */
                scope.wavelength_label = _("Adjust Wavelength"); /** Label of wavelength slider */
                scope.reset = _("Reset");  /** Label of reset button  */
                /** Labels for title of graph for each sample */
                title_text = [_("Transient absorption spectra of Xanthone in SDS solution"),_("Transient absorption spectra of 2-aminophenothiazine in nitrogen saturated solution"),_("Transient absorption spectra of zinc phathalocyanine in degassed tolune solution")]
                scope.$apply();				
			}
		}
	}
}

/** All the images loading and added to the stage */
function loadImages(image, name, xPos, yPos, cursor, rot, container,scale){
    var _bitmap = new createjs.Bitmap(image).set({}); /** Creatinng new bitmap object */
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.scaleX=_bitmap.scaleY=scale;
    _bitmap.name = name;
    _bitmap.alpha = 1;
    _bitmap.rotation = rot;   
    _bitmap.cursor = cursor;    
    container.addChild(_bitmap); /** Adding bitmap to the container */ 
    stage.update();
}

/** function to return chiled element of container */
function getChiled(contnr,chldName){
    return contnr.getChildByName(chldName);
}
/** Createjs stage updation happens in every interval */
function updateTimer() {
    stage.update();    
}
/** All control side variables initialise in this function */
function initialisationOfControls(scope){
    scope.wave_min = 300; /** Initial minimum value of wavelength slider */
    scope.wave_max = 700; /** Initial maximum value of wavelength slider */
    scope.wavelength = 300; /** Inital value of wavelength */
    scope.sample_enable = false;
    scope.wave_disable_true = true;
}
/** All variables initialising in this function */
function initialisationOfVariables() {
    dataplot_array = []; /** Initialization of array variables*/
    y_axis_min = -0.04; /** Initialization of minimum value of y-axis */
    y_axis_max = 0.14; /** Initialization of maximum value of y-axis */
    solution_type_indx = 0;    
}
/** Set the initial status of the bitmap and text depends on its visibility and initial values */
function initialisationOfImages() {
   test_tube.x = 710; /** Initialil x-position of test tubes */
   test_tube.y = 300; /** Initialil y-position of test tubes */
   stage.update();
}
