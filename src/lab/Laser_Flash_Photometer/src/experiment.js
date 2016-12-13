/** ---------Controls and all functionalities of experiments defined here---------*/
/** Function to set sample of solution */
function selectSample(scope){
	solution_type_indx = scope.solution_type;
	switch(scope.solution_type){
		case "0":
			scope.wave_min = scope.wavelength = '300'; /** Minimum value of wavelength slider and Value of wavelength*/
    		y_axis_min = -0.04;
    		y_axis_max = 0.14;
    		break;
    	case "1":
			scope.wave_min = scope.wavelength = '350'; /** Minimum value of wavelength slider and Value of wavelength*/
    		y_axis_min = -0.04;
    		y_axis_max = 0.14;
    		break;
    	case "2":
			scope.wave_min = scope.wavelength = '340'; /** Minimum value of wavelength slider and Value of wavelength*/
    		y_axis_min = -0.14;
    		y_axis_max = 0.04;
    		break;
	}
	getChiled(test_tube,'solution_0').alpha = getChiled(test_tube,'solution_1').alpha = getChiled(test_tube,'solution_2').alpha = 0;
	getChiled(test_tube,'solution_'+solution_type_indx).alpha = 1; 
	stage.update();
}
/** Function to load sample */
function loadSample(scope){
	scope.sample_enable = true;
	tick = setInterval(updateTimer, 100); /** Stage update function in a timer */
	createjs.Tween.get(test_tube).to({x : 492, y : 380},1000).call(function(){
		createjs.Tween.get(test_tube).to({y : 425},1000).call(function(){});
			clr_time_out = setTimeout(function(){
				createjs.Tween.get(getChiled(container,'bg')).to({x :-335, y : -150, scaleX : 2, scaleY : 2},1000).call(function(){
					clr_time_out = setTimeout(function(){
						scope.wave_disable_true = false;
						scope.$apply();
						document.getElementById("graphDiv").style.opacity = 1;
						makeGraph();
						clearInterval(tick);
					},100); 
				});
				createjs.Tween.get(getChiled(top_cover,'top_cover')).to({x :-335, y : -150, scaleX : 2, scaleY : 2},1000);
				createjs.Tween.get(test_tube).to({x :650, y : 710, scaleX : 2, scaleY : 2},1000);
			},1500);
	});
}
/** Function to adjust the wavelength */
function changeWavelength(scope){
	var _num_of_points = scope.wavelength -scope.wave_min;
	dataplot_array = [];

	for(i = 0; i <= _num_of_points; i++){
		dataplot_array.push({
	        x: (parseInt(graph_values[solution_type_indx][i].x)), /** x time in minute */
	        y: (parseFloat(graph_values[solution_type_indx][i].y)) /** y transition temperatue in degree */
	    }); /** Initially display of vibration magnetometer */
	}
	
	makeGraph();
}
/** Function for reset the experiment */
function resetExperiment(scope){
	initialisationOfControls(scope);
	initialisationOfVariables();
	initialisationOfImages();
	scope.solution_type = 0;
	scope.wave_min = scope.wavelength = '300';
	getChiled(container,'bg').x = getChiled(container,'bg').y = 0;
	getChiled(container,'bg').scaleX = getChiled(container,'bg').scaleY = 1;
	getChiled(top_cover,'top_cover').x = getChiled(top_cover,'top_cover').y = 0;
	getChiled(top_cover,'top_cover').scaleX = getChiled(top_cover,'top_cover').scaleY = 1;
	test_tube.x = 710;
	test_tube.y = 300;
	test_tube.scaleX = test_tube.scaleY = 1;
	document.getElementById("graphDiv").style.opacity = 0;
	getChiled(test_tube,'solution_1').alpha = getChiled(test_tube,'solution_2').alpha = 0;
	getChiled(test_tube,'solution_0').alpha = 1;
	createjs.Tween.removeAllTweens();
	clearTimeout(clr_time_out);
	clearInterval(tick)
	stage.update();
}var k = 0;
/** Draws a chart in canvas js for making graph plotting */
function makeGraph() {
	chart = new CanvasJS.Chart("graphDiv", {
		backgroundColor: "#490494",
		type: "spline",
		animationEnabled: true,
		animationDuration: 3000,
		axisX: {
			gridThickness: 1,
			labelFontColor: "white",
			minimum: 300,
			maximum: 700,
			interval: 50,
			margin: 1,
			labelMaxWidth: 30,
			labelAngle: 150,
		},
		axisY: {
			gridThickness: 1,
			labelFontColor: "white",
			minimum: y_axis_min,
			maximum: y_axis_max,
			interval: 0.02,
			margin: 10,

		},
	    title:{
         text: title_text[solution_type_indx],
         fontColor: "white",
         horizontalAlign: "center",
         margin: 5,
         padding: 5,
         fontSize: 15,
         fontWeight: "normal",
        },
		data: [{
			color: "RED",
			type: "spline",
			markerType: "circle",
			markerSize: 1,
			lineThickness: 1,
			dataPoints: dataplot_array   /** Array contains the data */
		}]
	});
	chart.render();  /** Rendering the graph */
}
function loadXml(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			readXML(xmlhttp);
		}
	};	
	xmlhttp.open("GET", "./dataFiles/graphValues.xml", true);
	xmlhttp.send();
}
function readXML(xml){
	var xmlDoc = xml.responseXML;
	samples = xmlDoc.getElementsByTagName("samples")[0];
	
	xanthone = samples.getElementsByTagName("xanthone")[0];
	xanthoneXvalu = xanthone.getElementsByTagName("Xval")[0].childNodes[0].nodeValue.split(",");
	xanthoneYvalu = xanthone.getElementsByTagName("Yval")[0].childNodes[0].nodeValue.split(",");
	for(i=0;i<xanthoneXvalu.length;i++){
		graph_values[0][i] = {x:xanthoneXvalu[i],y:xanthoneYvalu[i]}
	}
	aminophenothiazine = samples.getElementsByTagName("aminophenothiazine")[0];
	aminophenothiazineXvalu = aminophenothiazine.getElementsByTagName("Xval")[0].childNodes[0].nodeValue.split(",");
	aminophenothiazineYvalu = aminophenothiazine.getElementsByTagName("Yval")[0].childNodes[0].nodeValue.split(",");
	for(i=0;i<aminophenothiazineXvalu.length;i++){
		graph_values[1][i] = {x:aminophenothiazineXvalu[i],y:aminophenothiazineYvalu[i]}
	}
	zinc_phthalocyanine = samples.getElementsByTagName("zinc_phthalocyanine")[0];
	zinc_phthalocyanineXvalu = zinc_phthalocyanine.getElementsByTagName("Xval")[0].childNodes[0].nodeValue.split(",");
	zinc_phthalocyanineYvalu = zinc_phthalocyanine.getElementsByTagName("Yval")[0].childNodes[0].nodeValue.split(",");
	for(i=0;i<zinc_phthalocyanineXvalu.length;i++){
		graph_values[2][i] = {x:zinc_phthalocyanineXvalu[i],y:zinc_phthalocyanineYvalu[i]}
	}
}