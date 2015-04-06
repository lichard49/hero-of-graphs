$(document).ready(function()
{
	var canvas = document.getElementById("graph");
	var context = canvas.getContext("2d");
	
	drawEnvironment();
	
	function drawEnvironment()
	{
		context.fillStyle = "blue";
		context.fillRect(0, 0, 	canvas.width, 2*canvas.height/3);
		context.fillStyle = "green";
		context.fillRect(0, 2*canvas.height/3, canvas.width, canvas.height);
		
		// axis
		context.fillStyle = "#FFFFFF";
		drawLine(100, 100, 100, canvas.height-50);
		drawLine(100, 100, canvas.width-50, 100);
		
		// ticks
		for(var x = 100; x <= canvas.width-50; x += (canvas.width-150)/20)
		{
			drawLine(x, 95, x, 105);
		}
		for(var y = 100; y <= canvas.height-50; y += (canvas.width-150)/20)
		{
			drawLine(95, y, 105, y);
		}
		
		// equation
		context.moveTo(100, canvas.height-100);
		for(var i = 0; i < 20; i+=0.1)
		{
			var scope = {x: i};
			var x = i*(canvas.width-100)/20;
			var y = math.eval('1/10*x^2', scope)*(canvas.width-100)/20;
			context.lineTo(x+100, canvas.height-y-100);
			console.log(x + ", " + y);
		}
		context.stroke();
	}
	
	function drawLine(x0, y0, x1, y1)
	{
		context.moveTo(x0, canvas.height-y0);
		context.lineTo(x1, canvas.height-y1);
		context.stroke();
	}
});