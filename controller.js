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
			id = prompt("Please enter your ID", "");
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
		for(var i = 0; i < numEquations; i+=1)
		{
			var equation = $('.equation').eq(i).html();
			var stripped = equation.replace(/<space><\/space>/g,'');
			var equationAndBounds = "";
			equationAndBounds += $('.equation').eq(i).find('.lower').html().replace(/<space><\/space>/g,'') + ",";
			equationAndBounds += $('.equation').eq(i).find('.upper').html().replace(/<space><\/space>/g,'') + ",";
			equationAndBounds += stripped.replace(/<div class="bounds">.*<\/div>/g, '')
			console.log(equationAndBounds);
			firebase.child('hero-of-graphs').child(id).child('equation'+i).set(equationAndBounds);
		}
		firebase.child('hero-of-graphs').child(id).child('numEquations').set(numEquations);
	});
	$('#back').click(function(event)
	{
		var equation = $('.selected').html();
		$('.selected').html(equation.substring(0, equation.lastIndexOf('<space></space>', equation.length-16)));
	});
	$('#x').click(function(event) { appendToEquation('x'); });
	$('#sqrt').click(function(event) { appendToEquation('sqrt('); });
	var numEquations = 0;
	$('#add').click(addEquation);
	function addEquation(event)
	{
		$('#equations').append('<div id="equation'+numEquations+'" class="equation"><div class="bounds">x: \
<div id="lower'+numEquations+'" class="lower">0<space></div> , \
<div id="upper'+numEquations+'" class="upper">10<space></div></div></div>');
		$('#equation'+numEquations).click(function(event) { selectEquation(event.target.id); } );
		numEquations += 1;
		selectEquation("equation"+(numEquations-1));
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
});

function appendToEquation(val)
{
	$('.selected').html($('.selected').html() + val + '<space>');
}

function selectEquation(index)
{
	console.log("select equation " + index);
	$('.selected').toggleClass("selected");
	$('#'+index).toggleClass("selected");
}