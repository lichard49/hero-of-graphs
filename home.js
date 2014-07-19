$(document).ready(function()
{
	var firebase = new Firebase('https://lichard49test.firebaseIO.com/');
	var id = 15794;
	
	if(getParameterByName('login') == "")
	{
		// ========================== Load screen ==============================
	
		document.write('<div id="message">Setting up network...</div>');
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
		user.child('equation').set('');
		//user.child('go').set('off');
		user.child('controller').set('no');
		user.child('name').set('richard');
		
		var initial = 0;
		user.child('controller').on('value', function(snapshot)
		{
			if(initial == 1)
			{
				if(snapshot.val()=="yes") { console.log("Logged in... going to game"); window.location.assign("?login=true"); }
			}
			else { document.write('<div id="message">Waiting for controller... user id: 15794</div>'); initial = 1; }
		});
	}
	else
	{
		// ========================== Game screen ==============================
	
		document.write('<div id="message">Game here</div>');
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
	
	function getParameterByName(name)
	{
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
});