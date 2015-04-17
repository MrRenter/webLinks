var channels = [];
var window_focus = true;
var lastUpdate;
$(document).ready(function(){
	$('#btnAddChannel').on('click', addChannel);
	$('#inputChannel').keypress(function(e){
		if (e.which === 13){
			$('#btnAddChannel').click();			
		}
	});

	$(window).focus(function() {
		    window_focus = true;
	}).blur(function() {
		    window_focus = false;
	});
	initPage();
	getChat();
	setInterval(function(){
		var timeSinceLast = Date.now() - lastUpdate;
		if (window_focus && (timeSinceLast >= 58000)){
			getChat();
		}
	}, 1000);
});

function initPage(){
	$.getJSON('/channels/channels', function(data){
		var chanTable = "<table><th style='text-align:left'>Channel</th><th style='text-align:right'>Remove</th>";
		var evenOrOdd = "even";		
	
		$.each(data, function(){
			if (evenOrOdd === 'even'){
				evenOrOdd = 'odd';
			} else {
				evenOrOdd = 'even';
			}
			chanTable += "<tr class='" + evenOrOdd +"'><td>" + this.channel + "</td>";
			chanTable += "<td style='text-align: right'><a href='javascript:removeChannel(\"" + this.channel + "\")'>delete</a></td></tr>";
		});
		
		chanTable += "</table>";

		$('#channelList').html(chanTable);
	});
}

function getChat(oneOrAll){
	lastUpdate = Date.now();
	var oneOrAllUrl = 'lastTen';
	if (oneOrAll === 'all'){
		oneOrAllUrl = 'all';
	}
	$.getJSON('/messages/' + oneOrAllUrl, function(data){
		var linkTable = "<table style='width:95%'><th>Date</th><th>Channel</th><th>Url</th><th>Message</th>";
		var evenOrOdd = "even";

		$.each(data, function(){
			if (evenOrOdd === 'even'){
				evenOrOdd = 'odd';
			} else {
				evenOrOdd = 'even';
			}
			linkTable += "<tr style='widht:100%' class='" + evenOrOdd + "'><td style='width:20%'>" + this.date + "</td>";
			linkTable += "<td style='width:20%'>" + this.channel + "</td>";
			linkTable += "<td style='width:20%'><a href='" + this.url + "'>" + this.url + "</td>";
			linkTable += "<td style='width:40%'>" + this.message + "</td></tr>";
		});

		linkTable += "</table>";
		linkTable += "<br><a href='javascript:getChat(\"all\")'>Load All</a>";
		$('#linkList').html(linkTable);		
	});
}

function addChannel(){
	var chan = {'channel': $('#inputChannel').val()};
	if ($('#inputChannel').val() !== ''){	
		$.ajax({
			type: 'POST',
			data: chan,
			url: '/channels/add',
			dataType: 'JSON'
		});
		initPage();
		$('#inputChannel').val('');
	}
}

function removeChannel(elem){
	if(confirm("Are you sure you want to delete " + elem + "?")){
		var chan = {'channel': elem};
		$.ajax({
			type: 'POST',
			data: chan,
			url: '/channels/remove',
			dataType: 'JSON'
		});
		initPage();
		$('#inputChannel').val('');
	}
}
