/** Event handling functions starts here */

/** Function for starting the experiment */
function startExperiment(scope) {
    if ( !start_flag ) {
        /** Denote experiment is started */
        start_flag = true;
        scope.start_exp = _("Stop");
        scope.titrant_disable = true; /** For enabling and disabling titrant dropdown */
        scope.normality_disable = true; /** For enabling and disabling normality slider */ 
        scope.volume_disable = true; /** For enabling and disabling volume slider */
        /** Interval for setting turner on */
        turner_timer = setInterval(function() {
            turner_count++;
            if (turner_count == 5) {
                clearInterval(turner_timer);
            }
            turnerRotate(scope, turner_count)
        }, 50);
        getChild(glucose_estimation_stage, "drop1").y = 418;        
        dropDown(); /** Calling function for moving the drop */       
        startTitration(scope); /** Calls calculate function with in an interval */
    } else {
        /** Clears the interval for calling calculateFn */
        clearInterval(start_counter);
        start_flag = false;
        clearFn();
        scope.start_exp = _("Start");
    }
}
            
/** Function for resetting the experiment */
function resetFn(scope) {    
    turner_rect.mouseEnabled = true;
    scope.titration_soln = titrant_array[0]; 
    mask_flask_rect.y=506;
    mask_burette_rect.y=135;
    clearInterval(start_counter);
    initialisationOfControls(scope);
    initialisationOfVariables(scope);
    initialisationOfImages(scope);
}

/** Function for selecting titrate */
function selectTitrantFn(scope) {
    for ( var i=0; i<3; i++ ) {
        /** Check each solution whether it match with the dropdown selection */
        if ( scope.titration_soln == i ) {
            getChild(glucose_estimation_stage, solution_item_array[i]).visible=true;
        } else {
            /** Visible set as false rest of the solutions */
            getChild(glucose_estimation_stage, solution_item_array[i]).visible=false;
        }
    }
}

/** Function for changing the speed of the drop */
function changeDropSpeedFn(scope) {
    var _current_speed = scope.speed;
    delay_counter = dalay_max / _current_speed;
    drop_speed_var = scope.speed;
    if ( start_flag == true ) {
        startTitration(scope);
    }
}

/** Function for changing the volume slider */
function changeVolumeFn(scope) {
    scope.water_vol = scope.volume;
    volume_int = scope.volume;
    var _y_move = 506 - (volume_int/5);
    var _y_move_reflect = 500 - (volume_int/5);
    mask_flask_rect.y = _y_move;
    for ( var i = 1; i <= 5; i++ ) {
        getChild(glucose_estimation_stage, "reflect" + i).y = _y_move_reflect;
    }
}

/** Function for the click event of Methyle Blue button */
function addMethyleneFn(scope) {
    scope.start_disable = false;
    turner_rect.mouseEnabled = true;
    scope.methylene_disable = true;
    getChild(glucose_estimation_stage, "solution_without_methylene").visible = false;
    getChild(glucose_estimation_stage, "fehling_solution").visible = true;
}

/** Event handling functions ends here */

/** Calclation function starts here */
function calculateFn(scope) {
    /** Calculate the solution level in each interval */
    burette_sol = solution_vol + burette_soln_incr;
    flask_sol = solution_vol + flask_soln_incr;
    /** Adjust drop's y position according to the movement of solution in the conical flask */
    drop_y = drop_y - flask_soln_incr;
    /** Calculate the value for titrant used */
    titrant_sol = parseFloat((titrant_sol + titrant_incr).toFixed(1));
    /** Display the value for titrant used */
    scope.titrant_used = titrant_sol;
    if (start_flag == true) {
        /** After starting experiment fill and unfill the flask solution and burette solution respectively */
        mask_flask_rect.y -= flask_sol;
        mask_burette_rect.y += burette_sol;
        /** Calculate the volume of titrant Titrant Volume (V2) = N1*V1/N2 */
        titrant_volume = ((scope.normality*scope.volume)/titrant_value_array[scope.titration_soln]);
        var _temp_titrant_volume = ((scope.normality*scope.volume)/titrant_value_array[scope.titration_soln]).toFixed(1);
        /** Titrant volume when blue coloue just fades = End point - 0.3 */
        end_point_val = Number(titrant_volume - 0.3).toFixed(1);
        /** When titrant used reaches end_point_val a pale blue colour is observed due to the formation of glucose in the solution */
        if ( titrant_sol == end_point_val ) {
            getChild(glucose_estimation_stage, "solution_without_methylene").visible = true;
            getChild(glucose_estimation_stage, "fehling_solution").visible = false;
            clearInterval(start_counter);
            start_flag = false;
            clearFn();            
            scope.start_exp = _("Start");
            scope.start_disable = true;
            turner_rect.mouseEnabled = false;
            scope.methylene_disable = false;            
            dialogs_temp.notify(_("Information"), _("Add Methylene Blue!"));
        }
        /** When titrant used reaches titrant_volume precipitate is observed due to the formation of glucose in the solution */
        if ( titrant_sol == _temp_titrant_volume ) {
            getChild(glucose_estimation_stage, "fehling_solution").visible = false;
            getChild(glucose_estimation_stage, "colorless_solution").visible = true;
            getChild(glucose_estimation_stage, "red_sediment").visible = true;
        }
        if ( titrant_sol >= final_titration_point ) {
            scope.start_disable = true;
            turner_rect.mouseEnabled = false;
            clearInterval(start_counter);
            clearFn(scope);
        }
        /** Based on the water level, adjusting the water's reflecting movement */
        for ( var i = 1; i <= 5; i++ ) {
            getChild(glucose_estimation_stage, "reflect" + i).y -= flask_sol;
            if ( getChild(glucose_estimation_stage, "reflect" + i).y <= 519 ) {
                getChild(glucose_estimation_stage, "reflect" + i).x += flask_sol / 2;
                getChild(glucose_estimation_stage, "reflect" + i).scaleX -= flask_sol / 60.3;
                if ( getChild(glucose_estimation_stage, "reflect" + i).y <= 465 ) {
                    clearInterval(start_counter);
                }
            }
        }
    } else {
        clearInterval(start_counter);
    }
    scope.$apply();
}
/** Calclation function ends here */

/** Function for ending the experiment */
function clearFn(scope) {    
    start_flag = false; /** Deactivate start and add starch button */
    getChild(glucose_estimation_stage, "drop1").alpha = 0;
    getChild(glucose_estimation_stage, "drop2").alpha = 0;
    getChild(glucose_estimation_stage, "drop3").alpha = 0;
    /** Timer for closing the burette lid */
    turner_timer = setInterval(function() {
        turner_count--;
        if ( turner_count == 1 ) {
            clearInterval(turner_timer);
        }
        turnerRotate(scope, turner_count)
    }, 50);
    /** Clear the interval*/
    clearInterval(start_counter);
}

/** Function for setting the downward movement of the solution drop */
function dropDown() {
    if (start_flag == true) {        
        /** After starting the experiment adjust the number of drops according to the speed of titrant slider value*/
        getChild(glucose_estimation_stage, "drop1").alpha = 1;
        if ( drop_speed_var >= 0.1 && drop_speed_var <= 0.4 ) {
            var drop_tween = createjs.Tween.get(getChild(glucose_estimation_stage, "drop1")).to({
                y: drop_y
            }, 600).call(dropUp);
        } else if ( drop_speed_var >= 0.4 && drop_speed_var <= 0.7 ) {
            var drop_tween = createjs.Tween.get(getChild(glucose_estimation_stage, "drop1")).to({
                y: 445
            }, 500);
            var drop_tween1 = createjs.Tween.get(getChild(glucose_estimation_stage, "drop2")).to({
                y: drop_y
            }, 500).call(dropUp);
        } else if ( drop_speed_var >= 0.7 && drop_speed_var <= 1 ) {
            var drop_tween = createjs.Tween.get(getChild(glucose_estimation_stage, "drop1")).to({
                y: 445
            }, 500);
            var drop_tween1 = createjs.Tween.get(getChild(glucose_estimation_stage, "drop2")).to({
                y: 470
            }, 500);
            var drop_tween2 = createjs.Tween.get(getChild(glucose_estimation_stage, "drop3")).to({
                y: drop_y
            }, 500).call(dropUp);
        }
    } else {
        getChild(glucose_estimation_stage, "drop1").alpha = 0;
        getChild(glucose_estimation_stage, "drop2").alpha = 0;
        getChild(glucose_estimation_stage, "drop3").alpha = 0;
    }
}

/** Function for setting the upward movement of the solution drop */
function dropUp() {
    if ( start_flag == true ) {        
        /** After completing tween set the initial point for each of the drop*/
        if ( drop_speed_var >= 0.1 && drop_speed_var <= 0.4 ) {
            getChild(glucose_estimation_stage, "drop1").y = 416;
            getChild(glucose_estimation_stage, "drop2").alpha = 0;
            getChild(glucose_estimation_stage, "drop3").alpha = 0;      
        } else if ( drop_speed_var >= 0.4 && drop_speed_var <= 0.7 ) {
            getChild(glucose_estimation_stage, "drop1").y = 416;
            getChild(glucose_estimation_stage, "drop2").y = 445;
            getChild(glucose_estimation_stage, "drop2").alpha = 1;
            getChild(glucose_estimation_stage, "drop3").alpha = 0;
        } else if ( drop_speed_var >= 0.7 && drop_speed_var <= 1 ) {
            getChild(glucose_estimation_stage, "drop1").y = 416;
            getChild(glucose_estimation_stage, "drop2").y = 445;
            getChild(glucose_estimation_stage, "drop3").y = 470;
            getChild(glucose_estimation_stage, "drop2").alpha = 1;
            if ( drop_y >= 470 ) {
                getChild(glucose_estimation_stage, "drop3").alpha = 1;
            }
        }
    }
    dropDown();
}

/** Function for turning turner on and off */
function turnerRotate(scope, inr) {
    for ( var i = 1; i <= 5; i++ ) {
        getChild(glucose_estimation_stage, "turner" + i).alpha = 0;
    }
    getChild(glucose_estimation_stage, "turner" + inr).alpha = 1;
}

/** Function for beginning the titration */
function startTitration(scope) {
    clearInterval(start_counter);
    start_counter = setInterval(function() {
        calculateFn(scope)
    }, delay_counter);
}

/** Function for adding child to the stage and return the result */
function getChild(stage,name) {
    return stage.getChildByName(name);
}
