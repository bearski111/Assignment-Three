(function() {
	var win1 = Titanium.UI.createWindow({
		title:'Select Color',
		backgroundColor:'#fff'
	});
	//open window
	win1.open();
})();
var Teas = ['#F5F5DC','#FFE4B5', '#FFE4C4', '#D2B48C', '#C3B091', '#C3B091', '#926F5B', '#804000', '#654321', '#3D2B1F'];
allrows = [];
var theColours = Ti.UI.createTableView({});
for (var i=0; i<Teas.length; i++){
	theRow = Ti.UI.createTableViewRow({backgroundColor:
		Teas [i], height:50, TeaColour:Teas [i]});
		allRows.push(theRow);
}
theColours.setData (allRows);
win1.add(theColours);

function getVerdict (colour) {
	var indicator = color.charAt (1);
	var msg;
	//Make a crude decision on the strength of the tea based on the 2nd character of the hex color
	switch (indicator){
		case 'F': msg = 'Milky'; break;
		case 'D': msg = 'Nice'; break;
		case 'C': msg = 'Perfect'; break;
		case '9': msg = 'A bit strong'; break;
		case '8': msg = 'Builders tea'; break;
		case '6': msg = 'Send it back'; break;
		case '3': msg = 'No milk here'; break;
	}
	return msg;
};
function showTeaVerdict (_args){
	var teaVerdict = Ti.UI.createWindow ({layout:'vertical'});
	
	teaVerdict.backgroundColor = _args;
	teaVerdict.msg = getVerdict (_args);
	var judgement = Ti.UI.createLabel
	({text:teaVerdict.msg, top:'50%'});
	var close = Ti.UI.createButton
	({title:'Choose Again', top:'25%'});
	close.addEventListener('Click', function(e)
		{teaVerdict.close();
			//release the resources
		teaVerdict = null;
		});
	teaVerdict.add(judgement);
	teaVerdict.add(close);
	teaVerdict.open();
}
theColours.addEventListener('click', function (e)
{showTeaVerdict(e.source.TeaColour);});

var win2 = Titanium.UI.createWindow ({
	backgroundColor:'#fff'
});
var vertVw = Ti.UI.createView ({layout:'vertical'});
var compassHeading = Ti.UI.createLabel ({});
var direction = Ti.UI.createLabel ({});
vertVw.add(compassHeading);
vertVw.add(direction);
win2.add(vertVw);

function updateLabels(_args) {
	compassHeading.text = 
	_args.heading.magneticHeading+ 'degrees';
	
	var headingText = null;
	var theBearing = _args.heading.magneticHeading;
	switch (true) {
		case (theBearing >= 0 && theBearing < 23):
			headingText = 'North';
			break;
		case (theBearing >= 23 && theBearing < 68):
			headingText= 'North East';
			break;
		case (theBearing >= 68 && theBearing < 113):
			headingText = 'East';
			break;
		case (theBearing >= 338 && theBearing <= 360):
			headingText = 'North';
			break;
	direction.text = 'You are looking'+ headingText;
	}
Ti.Geolocation.purpose = 'To get the compass bearing';
Ti.Geolocation.addEventListener ("Outdoor Compass");
win2.addEventListener ('blue', function (){Ti.Geolocation.
	removeEventListener ("Outdoor Compass", updateLabels);});
win2.addEventListener('focus', function(){Ti.Geolocation.
	addEventListener ("Outdoor Compass", updateLabels);});
	
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'To Window 2',
    window:win1
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'To Window 1',
    window:win2
});
var tabGroup = Titanium.UI.createTabGroup();
tabGroup.open();

win1.add(tab1);
win2.add(tab2);
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
win2.win (close);
win2.win (open);   

win.open()
