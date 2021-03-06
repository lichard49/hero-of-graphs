$(document).ready(function()
{
	var DEBUG = false;

	var firebase = new Firebase('https://lichard49test.firebaseIO.com/');
	
	window.onbeforeunload = function()
	{
		firebase.child('hero-of-graphs').child(id).child('controller').set('no');
	}
	
	var id;
	if(!DEBUG) { ready(null); }
	function ready(snapshot)
	{
		if(snapshot === null || snapshot.val() === null)
		{
			id = getParameterByName('id');
			if(id != null && id != '') { id = Number(id); }
			else{ id = prompt("Please enter your ID", ""); }
			
			if(id != null)
			{
				firebase.child('hero-of-graphs').child(id).once('value', ready);
			}
			else
			{
				ready(null);
			}
		}
		else
		{
			firebase.child('hero-of-graphs').child(id).child('controller').set('yes');
			firebase.child('hero-of-graphs').child(id).child('numEquations').set('0');
			alert("Connected!");
		}
	}
	
	$('#go').click(function(event)
	{
		//firebase.child('hero-of-graphs').child(id).child('go').set('on');
		var equations = [];
		var error = false;
		for(var i = 0; i < numEquations; i+=1)
		{
			var equation = $('.equation').eq(i).html();
			var stripped = equation.replace(/<space><\/space>/g,'');
			
			var lowerBound = $('.equation').eq(i).find('.lower').html().replace(/<space><\/space>/g,'');
			var upperBound = $('.equation').eq(i).find('.upper').html().replace(/<space><\/space>/g,'');
			var eq = stripped.replace(/<div class="bounds">.*<\/div>/g, '')
			
			equations[i] = [lowerBound, upperBound, eq];
			//var equationAndBounds = lowerBound + "," + upperBound + "," + eq;
			console.log(equations[i]);
			//firebase.child('hero-of-graphs').child(id).child('equation'+i).set(equationAndBounds);
			
			console.log(equations);
			if(math.eval(equations[0][2], {x: Number(equations[0][0])}) != 0)
			{
				alert("Equations must start at the origin (0,0)");
				error = true;
				break;
			}
			if(i > 0 && math.eval(equations[i-1][2], {x:Number(equations[i-1][1])}) != math.eval(equations[i][2], {x:Number(equations[i][0])}))
			{
				alert("Functions must be continuous... check functions " + (i-1) + " and " + i);
				error = true;
				break;
			}
			
			/*
			
			if(i > 0 && math.eval(equations[i-1][2], {x:Number(equations[i-1][1])}) > 1.05*math.eval(equations[i][2], {x:Number(equations[i][0])}))
			{
				if(i > 0 && math.eval(equations[i-1][2], {x:Number(equations[i-1][1])}) < 0.95*math.eval(equations[i][2], {x:Number(equations[i][0])}))
			{
				alert("Functions must be continuous... check functions " + (i-1) + " and " + i);
				error = true;
				break;
			}
			}
			
			*/
		}
		
		if(!DEBUG && !error)
		{
			for(var i = 0; i < numEquations; i+=1)
			{
				firebase.child('hero-of-graphs').child(id).child('equation'+i).set(equations[i][0] + "," + equations[i][1] + "," + equations[i][2]);
			}
			firebase.child('hero-of-graphs').child(id).child('numEquations').set(numEquations);
		}
	});
	
	// ===== back button =====
	$('#back').click(function(event)
	{
		var equation = $('.selected').html();
		console.log(equation);
		var space = equation.lastIndexOf('<space></space>');
		var bounds = equation.lastIndexOf('</div>');
		if(space >= bounds)
		{
			$('.selected').html(equation.substring(0, space-1));
			if($('.selected').attr('class').indexOf('upper') > -1)
			{
				var id = $('.selected').attr('id');
				id = Number(id.substring(id.indexOf('upper')+5))+1;
				if(id > -1 && id < numEquations)
				{
					$('#lower'+id).html($('.selected').html() + '<space>');
				}
			}
		}
	});
	
	// ===== x button =====
	$('#x').click(function(event) { appendToEquation('x'); });
	// ===== sqrt button =====
	$('#sqrt').click(function(event) { appendToEquation('sqrt('); });
	
	// ===== add function box =====
	var numEquations = 0;
	$('#add').click(addEquation);
	function addEquation(event)
	{
		// add box
		var startingLower = 0;
		if(numEquations > 0)
		{
			startingLower = Number($('#upper'+(numEquations-1)).html().replace(/<space><\/space>/g,''));
			console.log(startingLower);
		}
		$('#equations').append('<div id="equation'+numEquations+'" class="equation"><div class="bounds">x: [\
<div id="lower'+numEquations+'" class="lower">'+startingLower+'<space></div>, \
<div id="upper'+numEquations+'" class="upper">20<space></div>]</div></div>');
		$('#equation'+numEquations).click(function(event)
		{
			if(event.target.id.indexOf("lower") == -1)
			{
				selectEquation(event.target.id);
			}
		});
		
		// update data
		numEquations += 1;
		selectEquation("equation"+(numEquations-1));
		
		// at most 3 equations
		if(numEquations == 3)
		{
			$('#add').prop("disabled",true);
		}
	}
	addEquation(null);
	
	$('#openparen').click(function(event) { appendToEquation('('); });
	$('#closeparen').click(function(event) { appendToEquation(')'); });
	$('#sin').click(function(event) { appendToEquation('sin('); });
	$('#cos').click(function(event) { appendToEquation('cos('); });
	$('#tan').click(function(event) { appendToEquation('tan('); });
	
	$('#log').click(function(event) { appendToEquation('log('); });
	$('#7').click(function(event) { appendToEquation('7'); });
	$('#8').click(function(event) { appendToEquation('8'); });
	$('#9').click(function(event) { appendToEquation('9'); });
	$('#divide').click(function(event) { appendToEquation('/'); });
	
	$('#ln').click(function(event) { appendToEquation('ln('); });
	$('#4').click(function(event) { appendToEquation('4'); });
	$('#5').click(function(event) { appendToEquation('5'); });
	$('#6').click(function(event) { appendToEquation('6'); });
	$('#multiply').click(function(event) { appendToEquation('*'); });
	
	$('#e').click(function(event) { appendToEquation('e'); });
	$('#1').click(function(event) { appendToEquation('1'); });
	$('#2').click(function(event) { appendToEquation('2'); });
	$('#3').click(function(event) { appendToEquation('3'); });
	$('#minus').click(function(event) { appendToEquation('-'); });
	
	$('#exponent').click(function(event) { appendToEquation('^'); });
	$('#0').click(function(event) { appendToEquation('0'); });
	$('#dot').click(function(event) { appendToEquation('.'); });
	$('#negative').click(function(event) { appendToEquation('-'); });
	$('#plus').click(function(event) { appendToEquation('+') });
	
	function appendToEquation(val)
	{
		$('.selected').html($('.selected').html() + val + '<space>');
		if($('.selected').attr('class').indexOf('upper') > -1)
		{
			var id = $('.selected').attr('id');
			id = Number(id.substring(id.indexOf('upper')+5))+1;
			if(id > -1 && id < numEquations)
			{
				$('#lower'+id).html($('.selected').html() + '<space>');
			}
		}
	}

	function selectEquation(index)
	{
		console.log("select equation " + index);
		$('.selected').toggleClass("selected");
		$('#'+index).toggleClass("selected");
	}

	function getParameterByName(name)
	{
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
});