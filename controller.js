$(document).ready(function()
{
	$('#go').click(function(event)
	{
	});
	$('#back').click(function(event)
	{
		var equation = $('#equation').html();
		console.log(equation);
		$('#equation').html(equation.substring(0, equation.lastIndexOf('<space></space>', equation.length-16)));
	});

	$('#openparen').click(function(event) { appendEquation('('); });
	$('#closeparen').click(function(event) { appendEquation(')'); });
	$('#sin').click(function(event) { appendEquation('sin('); });
	$('#cos').click(function(event) { appendEquation('cos('); });
	$('#tan').click(function(event) { appendEquation('tan('); });
	
	$('#log').click(function(event) { appendEquation('log('); });
	$('#7').click(function(event) { appendEquation('7'); });
	$('#8').click(function(event) { appendEquation('8'); });
	$('#9').click(function(event) { appendEquation('9'); });
	$('#divide').click(function(event) { appendEquation('/'); });
	
	$('#ln').click(function(event) { appendEquation('ln('); });
	$('#4').click(function(event) { appendEquation('4'); });
	$('#5').click(function(event) { appendEquation('5'); });
	$('#6').click(function(event) { appendEquation('6'); });
	$('#multiply').click(function(event) { appendEquation('*'); });
	
	$('#e').click(function(event) { appendEquation('e'); });
	$('#1').click(function(event) { appendEquation('1'); });
	$('#2').click(function(event) { appendEquation('2'); });
	$('#3').click(function(event) { appendEquation('3'); });
	$('#minus').click(function(event) { appendEquation('-'); });
	
	$('#exponent').click(function(event) { appendEquation('^'); });
	$('#0').click(function(event) { appendEquation('0'); });
	$('#dot').click(function(event) { appendEquation('.'); });
	$('#negative').click(function(event) { appendEquation('-'); });
	$('#plus').click(function(event) { appendEquation('+') });
});

function appendEquation(val)
{
	$('#equation').html($('#equation').html() + val + '<space>');
	/*$('#equation').html(function(i,el) {
		return el.replace(/\ /g, '<div class="space">&nbsp;</div>');
	});*/
}