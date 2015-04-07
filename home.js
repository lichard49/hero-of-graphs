$(document).ready(function()
{
	var firebase = new Firebase('https://hero-of-graphs.firebaseIO.com/');
	var id = Math.floor((Math.random() * 1000000) + 1000);
	
	// ========================== Load screen ==============================

	$('#console').html('<div id="message">Setting up network...</div>');
	/*
	firebase.set(
	{
		'hero-of-graphs':
		{
			id:
			{
				'equation':'',
				'go':'off',
				'controller':'no',
				'name':'richard'
			}
		}
	});
	*/
	var user = firebase.child('hero-of-graphs').child(id);
	//user.child('equation').set('');
	//user.child('go').set('off');
	user.child('controller').set('no');
	user.child('name').set('richard');
	
	var initial = 0;
	user.child('controller').on('value', function(snapshot)
	{
		if(initial == 1)
		{
			if(snapshot.val()=="yes") { showLevelSelecter(); }
		}
		else
		{
			$('#console').html($('#console').html()+'<div id="message">Launch the <a target="_blank" href="controller.html?id='+id+'">controller</a> here</div>');
			$('#console').html($('#console').html()+'<div id="message">Or login with user id '+id+' at '+addControllerToURL(location.href)+'</a></div>');
			initial = 1;
		}
	});

	function addControllerToURL(url)
	{
		return url.substring(0, url.lastIndexOf("/")+1) + "controller.html";
	}
	
	function showLevelSelecter()
	{
		$('#console').html('<div id="message">Controller connected!</div>');
		$('#console').html($('#console').html()+'<div id="message">Choose a level:</div>');
		$('#console').html($('#console').html()+'<a href="graphx.html?level=easy&id='+id+'">Easy</a><br>');
		$('#console').html($('#console').html()+'<a href="graphx.html?level=medium&id='+id+'">Medium</a><br>');
		$('#console').html($('#console').html()+'<a href="graphx.html?level=hard&id='+id+'">Hard</a><br>');
		firebase.child('hero-of-graphs').child(id).child('equation').on('value', function(snapshot)
		{
			if(snapshot.val() != null && snapshot.val() != "")
			{
				console.log(snapshot.val());
				document.write('<div id="message">New equation: '+snapshot.val()+'</div>');
			}
			firebase.child('hero-of-graphs').child(id).child('equation').set('');
		
		});
	}
});