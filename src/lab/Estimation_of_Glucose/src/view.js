(function() {
    angular
        .module('users')
        .directive("experiment", directiveFunction)
})();

/** Variables, arrays and shapes declaration */
var glucose_estimation_stage, exp_canvas, tick;

var water_timer, turner_timer, start_counter, delay_counter;

var start_flag, volume_int, turner_count, solution_vol, speed_var, titrant_sol, burette_sol, flask_sol, end_point_val, water_count;

var final_titration_point, titrant_volume, burette_soln_incr, flask_soln_incr, titrant_incr, dalay_max, drop_y, drop_speed_var;

var flame_anim_frame, flame_anim_width, flame_anim_timer;

var titrate_array = help_array = titrate_array = solution_item_array = titrant_array = titrant_value_array = [];

var mask_flask_rect = new createjs.Shape();

var mask_burette_rect = new createjs.Shape();

var turner_rect = new createjs.Shape();

var flames_mask_rect = new createjs.Shape();

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
            /** Stage initialization */
            glucose_estimation_stage = new createjs.Stage("demoCanvas");
            queue = new createjs.LoadQueue(true);            
            queue.installPlugin(createjs.Sound);
            loadingProgress(queue,glucose_estimation_stage,exp_canvas.width)
            queue.on("complete", handleComplete, this);
            queue.loadManifest([{
                id: "background",
                src: "././images/background.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "stand_and_tube",
                src: "././images/stand_and_tube.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "conical_flask",
                src: "././images/conical_flask.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "fehling_solution",
                src: "././images/fehling_solution.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "colorless_solution",
                src: "././images/colorless_solution.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "solution_without_methylene",
                src: "././images/solution_without_methylene.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "red_sediment",
                src: "././images/red_sediment.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "watermelon_solution",
                src: "././images/watermelon_solution.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "coconut_solution",
                src: "././images/coconut_solution.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "soft_drink_solution",
                src: "././images/soft_drink_solution.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "reflect1",
                src: "././images/reflect1.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "reflect2",
                src: "././images/reflect2.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "reflect3",
                src: "././images/reflect3.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "reflect4",
                src: "././images/reflect4.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "reflect5",
                src: "././images/reflect5.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "turner1",
                src: "././images/turner1.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "turner2",
                src: "././images/turner2.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "turner3",
                src: "././images/turner3.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "turner4",
                src: "././images/turner4.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "turner5",
                src: "././images/turner5.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "solution_drop",
                src: "././images/solution_drop.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "flames",
                src: "././images/flames.svg",
                type: createjs.LoadQueue.IMAGE
            }]);            
            glucose_estimation_stage.enableDOMEvents(true);
            glucose_estimation_stage.enableMouseOver();
            /** Stage update function in a timer */
            tick = setInterval(updateTimer, 100);

            function handleComplete() {
                /** Loading all images in the queue to the stage */
                loadImages(queue.getResult("background"), "background", 0, 0, "", 0, 1); 
                /** Rectangles for masking solutions */
                drawRectangleSolution(mask_flask_rect, 280, 506, 110, 150, 0);
                /** Rectangle for masking burette solution */
                drawRectangleSolution(mask_burette_rect, 325, 135, 40, 290, 0);
                /** Rectangle for making turner on and off */
                drawRectangle(turner_rect, 310, 354, 20, 20, 0.01, "pointer");
                /** Rectangle for making flames */
                drawRectangle(flames_mask_rect, 328, 530, 20, 35, 0, "");
                loadImages(queue.getResult("flames"), "flames", 328, 510, "", 0, 1);  
                getChild(glucose_estimation_stage, "flames").mask = flames_mask_rect;
                loadImages(queue.getResult("stand_and_tube"), "stand_and_tube", 0, 0, "", 0, 1);
                loadImages(queue.getResult("watermelon_solution"), "watermelon_solution", 0, 0, "", 0, 1);
                loadImages(queue.getResult("coconut_solution"), "coconut_solution", 0, 0, "", 0, 1);
                loadImages(queue.getResult("soft_drink_solution"), "soft_drink_solution", 0, 0, "", 0, 1);                
                getChild(glucose_estimation_stage, "watermelon_solution").mask = mask_burette_rect;
                getChild(glucose_estimation_stage, "coconut_solution").mask = mask_burette_rect;
                getChild(glucose_estimation_stage, "soft_drink_solution").mask = mask_burette_rect;
                loadImages(queue.getResult("solution_drop"), "drop1", 328, 418, "", 0, 1);
                loadImages(queue.getResult("solution_drop"), "drop2", 328, 445, "", 0, 1);
                loadImages(queue.getResult("solution_drop"), "drop3", 328, 470, "", 0, 1);
                loadImages(queue.getResult("fehling_solution"), "fehling_solution", 0, 0, "", 0, 1);
                loadImages(queue.getResult("red_sediment"), "red_sediment", 310, 515, "", 0, 1);
                loadImages(queue.getResult("conical_flask"), "conical_flask", 0, 0, "", 0, 1, 1);
                getChild(glucose_estimation_stage, "fehling_solution").mask = mask_flask_rect;
                loadImages(queue.getResult("colorless_solution"), "colorless_solution", 285, 395, "", 0, 1);
                getChild(glucose_estimation_stage, "colorless_solution").mask = mask_flask_rect;
                loadImages(queue.getResult("solution_without_methylene"), "solution_without_methylene", 0, 0, "", 0, 1);
                getChild(glucose_estimation_stage, "solution_without_methylene").mask = mask_flask_rect;
                for (var i = 1; i <= 5; i++) {
                    loadImages(queue.getResult("reflect" + i), "reflect" + i, 285, 500, "", 0, 1.5);
                    loadImages(queue.getResult("turner" + i), "turner" + i, 305, 346, "", 1, 1);
                }
                /** Initializing all images */
                initialisationOfImages(scope);
                /** Initializing the variables */
                initialisationOfVariables(scope);
                /** Initializing the controls */
                initialisationOfControls(scope);
                /** Translation of strings using getext */
                translationLabels();
                /** Calling function for making the water movement */
                waterMovement();
                /** Flame animation function in a atimer */
                flame_anim_timer = setInterval(flameAnimation, 100);
                glucose_estimation_stage.update();
            }
            
            /** Add all the strings used for the language translation here. '_' is the short cut for 
            calling the gettext function defined in the gettext-definition.js */
            function translationLabels() {
                /** This help array shows the hints for this experiment */
                help_array = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("Next"), _("Close")];
                /** Experiment name */
                scope.heading = _("Organic Synthesis: Estimation Of Glucose");
                scope.variables = _("Variables");   
                scope.titrant_label = _("Titrant");
                scope.water_melon = _('Water Melon');
                scope.drop_speed = _("Speed of drops");
                scope.titrate_label = _("Titrate");
                scope.fehling_solution = _("Fehling's Solution");
                scope.indicator_label = _("Indicator :");
                scope.normality_label = _("Normality");
                scope.volume_label = _("Volume");
                scope.water_vol_label = _("Volume of Water");
                /** Labels for buttons */
                scope.methylene_label = _("Methylene Blue");
                scope.reset_label = _("Reset");
                scope.result = _("Result");
                scope.titrant_used_label = _("Titrant Used");
                scope.titrant_unit = _("ml");
                scope.copyright = _("copyright");
                /** The titrant_array and titrate_array contains the values and indexes of the dropdown */
                scope.titrant_array = [{ 
                    solution: _('Water Melon'),
                    type: 0
                }, {
                    solution: _('Tender Coconut'),
                    type: 1
                }, {
                    solution: _('Soft Drink'),
                    type: 2
                }];
                scope.titrate_array = [{
                    selected_type: _("Fehling's Solution"),
                    type: 0
                }];
                scope.$apply();
            }
        }
    }
}

/** Createjs stage updation happens in every interval */
function updateTimer() {
    glucose_estimation_stage.update();
}

/** All the texts loading and added to the stage */
function setText(name, textX, textY, value, color, fontSize, container) {
    var _text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
    _text.x = textX;
    _text.y = textY;
    _text.textBaseline = "alphabetic";
    _text.name = name;
    _text.text = value;
    _text.color = color;
    container.addChild(_text); /** Adding text to the container */
}

/** All the images loading and added to the stage */
function loadImages(image, name, xPos, yPos, cursor, rot, scale) {
    var _bitmap = new createjs.Bitmap(image).set({});
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.name = name;
    _bitmap.scaleX = _bitmap.scaleY = scale;
    _bitmap.rotation = rot;
    _bitmap.cursor = cursor;    
    glucose_estimation_stage.addChild(_bitmap); /** Adding bitmap to the stage */
}

/** All variables initialising in this function */
function initialisationOfVariables(scope) {
    document.getElementById("site-sidenav").style.display="block";
    volume_int = 10;
    water_count = 0;    
    stir_counter = 0; /** Variable used in timers */
    turner_count = 0;    
    solution_vol = 0; /** Variable used to show the volume of solution with in the flask and burette */    
    speed_var = 200; /** Variable used to adjust speed of the drop */    
    dalay_max = 500; /** Variables used to adjust the timer */
    delay_counter = 2500;    
    end_point_val = 0;
    titrant_volume = 0;    
    titrant_sol = 0; /** Used to show the level of titrant used */
    burette_sol = 0;
    flask_sol = 0;    
    burette_soln_incr = 0.362; /** Used to calculate the level of solution in the burette */   
    flask_soln_incr = 0.05; /** Used to calculate the level of solution in the conical flask */   
    titrant_incr = 0.1; /** Used for calculating titrant used in the result area */   
    final_titration_point = 49; /** Variable used to stop the whole titration process */   
    drop_y = 510; /** Used to calculate y point of the drop */
    drop_speed_var = 0.1;
    flame_anim_width = 16.967;
    flame_anim_frame = 0;
    start_flag = false;
    turner_start_flag=false;    
    /** Array for storing solution type */
    solution_item_array = ["watermelon_solution", "coconut_solution", "soft_drink_solution"];
    /** Array for storing constant values of each solution */
    titrant_value_array = [0.04950495, 0.044643, 0.111111];    
}

/** All images are initialising in this function */
function initialisationOfImages(scope){
    getChild(glucose_estimation_stage, "background").alpha = 1;
    getChild(glucose_estimation_stage, "stand_and_tube").alpha = 1;
    getChild(glucose_estimation_stage, "watermelon_solution").visible = true;
    getChild(glucose_estimation_stage, "conical_flask").alpha = 1;
    getChild(glucose_estimation_stage, "drop1").alpha = 0;
    getChild(glucose_estimation_stage, "drop2").alpha = 0;
    getChild(glucose_estimation_stage, "drop3").alpha = 0;
    getChild(glucose_estimation_stage, "fehling_solution").visible = true;
    getChild(glucose_estimation_stage, "colorless_solution").visible = false;
    getChild(glucose_estimation_stage, "coconut_solution").visible = false;
    getChild(glucose_estimation_stage, "soft_drink_solution").visible = false;
    getChild(glucose_estimation_stage, "solution_without_methylene").visible = false;
    getChild(glucose_estimation_stage, "red_sediment").visible = false;
    for ( var i = 1; i <= 5; i++ ) {
        getChild(glucose_estimation_stage, "reflect" + i).alpha = 0;
        getChild(glucose_estimation_stage, "reflect" + i).x=285;
        getChild(glucose_estimation_stage, "reflect" + i).y=500;
        getChild(glucose_estimation_stage, "reflect" + i).scaleX = 1.5;
        getChild(glucose_estimation_stage, "turner" + i).alpha = 0;
    }
    getChild(glucose_estimation_stage, "turner1").alpha = 1;
}

/** All controls initialising in this function */
function initialisationOfControls(scope) { 
    scope.start_exp = _("Start");/** Initial label for start button */   
    scope_temp = scope; /** Storing scope to a temporary variable for using in the rectangle press event */    
    scope.speed = 0.1; /** Initial value for speed of drops slider */    
    scope.normality = 0.01; /** Initial value for normality of titrate */    
    scope.volume = 10; /** Initial value for volume of titrate */
    scope.water_vol = 10; /** Initial value for volume of water */  
    scope.methylene_disable = true; /** It disables the methylene blue button */     
    scope.titrant_used = 0; /** Initial value of titrant used in the result part */    
    scope.titrate_disable = false; /** For enabling and disabling titrate dropdown*/       
    scope.start_disable = false; /** For enabling and disabling start button */ 
}

/** Function for creating rectangle for masking burette and conical flask solution */
function drawRectangleSolution(rect_name, x, y, width, height, alpha_val) {
    glucose_estimation_stage.addChild(rect_name);
    rect_name.x = x;
    rect_name.y = y;
    rect_name.graphics.beginFill("red").drawRect(0, 0, width, height).command;
    rect_name.alpha = alpha_val;
}

/** Function for creating rectangle */
function drawRectangle(rect_name, x, y, width, height, alpha_val, cursor) {
    rect_name.graphics.clear();
    rect_name.graphics.beginFill("red").drawRect(x, y, width, height);
    rect_name.alpha = alpha_val;
    rect_name.cursor = cursor;
    glucose_estimation_stage.addChild(rect_name);
}

/** Function for making the water movement */
function waterMovement() {
    /** Creating timer for making reflection effect in the water */
    water_timer = setInterval(function() {
        water_count++;
        waterReflect(water_count);
        if ( water_count == 5 ) {
            water_count = 0;
        }
    }, 100);
}

/** Function for creating reflection effect in the water */
function waterReflect(count) {
    /** Initially set all image visibility as zero */
    for ( var i = 1; i <= 5; i++ ) {
        getChild(glucose_estimation_stage, "reflect" + i).alpha = 0;
    }
    /** Visible images accoding to the timer count */
    getChild(glucose_estimation_stage, "reflect" + count).alpha = 1;
}

/** Burner flame animation function */
function flameAnimation() {
    flame_anim_frame++; /** Frame increment */
    if ( flame_anim_frame < 3 ) {
        getChild(glucose_estimation_stage, "flames").x = getChild(glucose_estimation_stage, "flames").x - flame_anim_width; /** Changing of animation object x position */
    } else {
        flame_anim_frame = 0;
        getChild(glucose_estimation_stage, "flames").x = 328;
    }
}