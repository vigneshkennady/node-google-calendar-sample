//example.js
const CALENDAR_URL = require('../config/Settings').calendarUrl;
const CONFIG = require('../config/Settings');
const CalendarAPI = require('../src/CalendarAPI');
const cal = new CalendarAPI(CONFIG);
const calendarIdList = CONFIG.calendarId;

const express = require('express');
const app = express();
/*app.use(bodyParser.json());
app.use(bodyParser.json({
	type : 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(methodOverride('X-HTTP-Method-Override'));*/

app.configure(function() {
    app.use(express.bodyParser()); // used to parse JSON object given in the request body
});

/*app.get('/', function (req, res) {
	//res.set('Content-Type', 'text/json');
	  //res.send('Hello World!')
	/*examples(
			function(err, mydocs) {
				if (err) {
					next(err);
				} else {
					res.set('Content-Type', 'text/json');
					res.send(json(mydocs));
					
					logger.info('Dashboard request fulfilled in '
							+ appConfig.getElapsedInms('DASHBOARD')
							+ ' milliseconds');
				}
			});
	  listAllEventsInCalendar(calendarIdList['primary'],function(err, mydocs) {
			if (err) {
				next(err);
			} else {
				res.set('Content-Type', 'text/json');
				res.send(mydocs);
				
				logger.info('Dashboard request fulfilled in '
						+ appConfig.getElapsedInms('DASHBOARD')
						+ ' milliseconds');
			}
		});
	
	})*/


/*app.get('/list', function(req, res) {
	
	res.json({});
	
});*/

/*app.get('/list', function (request, response) {
	let params = {};
	response.set('Content-Type', 'application/json');
    response.json({list: listevents(calendarIdList['primary'])});
});*/


app.get('/list', function(req, res, next) {
	
	listAllEventsInCalendar(calendarIdList['primary'],
				function(err, mydocs) {
					if (err) {
						next(err);
					} else {
						res.set('Content-Type', 'text/json');
						res.status(200).json(mydocs);
						
					}
				});

});

app.post('/insert', function(req, res, next) {
	

	insertEvent(calendarIdList['primary'], 'TestEventName', '2017-05-20T12:00:00+08:00', '2017-05-20T15:00:00+08:00', 'location', 'confirmed', 'some description here', function(err, result) {
			if (err) {
				next(err);
			} else {
				res.set('Content-Type', 'text/json');
				res.status(200).json(result);
			}
		});
	
});





	app.listen(3000, function () {
	  console.log('Example app listening on port 3000!')
	})

//var clientDir = path.join(__dirname, properties.get('app.clientdir'));

//examples();

function examples() {
	//return listAllEventsInCalendar(calendarIdList['primary']);
	// listSingleEventsWithinDateRange(calendarIdList['primary'], '2017-05-20T06:00:00+08:00', '2017-05-25T22:00:00+08:00', '');
	// listRecurringEventsWithinDateRange(calendarIdList['drone'], '2017-05-20T06:00:00+08:00', '2017-05-20T22:00:00+08:00', '');
	insertEvent(calendarIdList['primary'], 'TestEventName', '2017-05-20T12:00:00+08:00', '2017-05-20T15:00:00+08:00', 'location', 'confirmed', 'some description here');
	// insertRecurringEvent(calendarIdList['primary'], 'TestRecurringEvent', '2017-05-20T10:00:00+08:00', '2017-05-20T11:00:00+08:00', 'location', 'confirmed', 'description', ['RRULE:FREQ=WEEKLY;COUNT=3'])
	// quickAddEvent(calendarIdList['primary'], 'Breakfast 9am - 11am');
	// getEvent(calendarIdList['primary'], 'algjb8m5jdjcgmptc3dqbcg3fc');
	// eventInstances(calendarIdList['drone'], '04fl5s82f98ccgp5dmba3132m0');
	// updateEvent(calendarIdList['primary'], 'algjb8m5jdjcgmptc3dqbcg3fc', 'BreakfastEvent', '2017-05-20T08:30:00+08:00', '2017-05-20T11:00:00+08:00', '', 'confirmed', 'some descriptions here');
	// moveEvent(calendarIdList['primary'], '04fl5s82f98ccgp5dmba3132m0', calendarIdList['drone']);
	// deleteEvent(calendarIdList['primary'], 'upnbq496e7k8l2fmctnph9jius');

	// listSettings();
	// getSettings('weekStart');

	// checkBusy(calendarIdList['primary'], '2017-05-20T09:00:00+08:00', '2017-05-20T21:00:00+08:00');
}
	
	
	/*function listevents(calendarId,callback){
		var params = {};
		var eventsArray = [];
		cal.Events.list(calendarId, params).then(function(json){
		
			for (let i = 0; i < json.length; i++) {
				let event = {
					id: json[i].id,
					summary: json[i].summary,
					location: json[i].location,
					start: json[i].start,
					end: json[i].end,
					status: json[i].status
				};
				eventsArray.push(event);
				console.log(eventsArray);
			}
			return callback(null, eventsArray);
		});
	}*/

	
	
	
	
function listAllEventsInCalendar(calendarId,callback) {
	let eventsArray = [];
	
	let params = {};
    cal.Events.list(calendarId, params)
		.then(json => {
			for (let i = 0; i < json.length; i++) {
				let event = {
					id: json[i].id,
					summary: json[i].summary,
					location: json[i].location,
					start: json[i].start,
					end: json[i].end,
					status: json[i].status
				};
				eventsArray.push(event);
			}
			//console.log('List of all events on calendar');
			console.log(eventsArray);
			return callback(null, eventsArray);
			
		}).catch(err => {
			console.log('Error: listAllEventsInCalendar -' + err);
		});
	
	
}

	
function listSingleEventsWithinDateRange(calendarId, startDateTime, endDateTime, query) {
	let eventsArray = [];
	let params = {
		timeMin: startDateTime,
		timeMax: endDateTime,
		q: query,
		singleEvents: true,
		orderBy: 'startTime'
	}

	cal.Events.list(calendarId, params)
		.then(json => {
			for (let i = 0; i < json.length; i++) {
				let event = {
					id: json[i].id,
					summary: json[i].summary,
					location: json[i].location,
					start: json[i].start,
					end: json[i].end,
					status: json[i].status
				};
				eventsArray.push(event);
			}

			console.log('List of events on calendar within time-range:');
			console.log(eventsArray);

		}).catch(err => {
			console.log('Error: listSingleEventsWithinDateRange -' + err);
		});
}

function listRecurringEventsWithinDateRange(calendarId, startDateTime, endDateTime, query) {
	let eventsArray = [];
	let params = {
		timeMin: startDateTime,
		timeMax: endDateTime,
		q: query,
		singleEvents: false
	}

	cal.Events.list(calendarId, params)
		.then(json => {
			for (let i = 0; i < json.length; i++) {
				let event = {
					id: json[i].id,
					summary: json[i].summary,
					location: json[i].location,
					start: json[i].start,
					end: json[i].end,
					status: json[i].status
				};
				eventsArray.push(event);
			}

			console.log('List of recurring events on calendar within time-range:');
			console.log(eventsArray);

		}).catch(err => {
			console.log('Error: listRecurringEventsWithinDateRange -' + err);
		});
}

function quickAddEvent(calendarId, text) {
	let params = {
		'text': text
	}

	cal.Events.quickAdd(calendarId, params)
		.then(resp => {
			let json = resp;
			console.log('inserted quickAddEvent:');
			console.log(json);
		})
		.catch(err => {
			console.log('Error: quickAddEvent-' + err);
		});
}

function insertEvent(calendarId, eventSummary, startDateTime, endDateTime, location, status, description,callback) {
	let event = {
		'start': {
			'dateTime': startDateTime
		},
		'end': {
			'dateTime': endDateTime
		},
		'location': location,
		'summary': eventSummary,
		'status': status,
		'description': description,
		'colorId': 1
	};

	cal.Events.insert(calendarId, event)
		.then(resp => {
			let json = resp;
			let results = {
				id: json.id,
				'summary': json.summary,
				'location': json.location,
				'status': json.status,
				'htmlLink': CALENDAR_URL,
				'start': json.start.dateTime,
				'end': json.end.dateTime,
				'created': new Date(json.created)
			};
			console.log('inserted event:');
			console.log(results);
			return callback(null,results);
		})
		.catch(err => {
			console.log('Error: insertEvent-' + err);
		});
}

/*function insertEvent(calendarId, eventSummary, startDateTime, endDateTime, location, status, description) {
	let event = {
		'start': {
			'dateTime': startDateTime
		},
		'end': {
			'dateTime': endDateTime
		},
		'location': location,
		'summary': eventSummary,
		'status': status,
		'description': description,
		'colorId': 1
	};

	cal.Events.insert(calendarId, event)
		.then(resp => {
			let json = resp;
			let results = {
				id: json.id,
				'summary': json.summary,
				'location': json.location,
				'status': json.status,
				'htmlLink': CALENDAR_URL,
				'start': json.start.dateTime,
				'end': json.end.dateTime,
				'created': new Date(json.created)
			};
			console.log('inserted event:');
			console.log(results);
		})
		.catch(err => {
			console.log('Error: insertEvent-' + err);
		});
}*/

function insertRecurringEvent(calendarId, eventSummary, startDateTime, endDateTime, location, status, description, recurrenceRule) {
	let event = {
		'start': {
			'dateTime': startDateTime,
			'timeZone': 'Asia/Singapore'
		},
		'end': {
			'dateTime': endDateTime,
			'timeZone': 'Asia/Singapore'
		},
		'location': location,
		'summary': eventSummary,
		'status': status,
		'description': description,
		'colorId': 1,
		'recurrence': recurrenceRule
	};

	cal.Events.insert(calendarId, event)
		.then(resp => {
			let json = resp;
			console.log('inserted event:');
			console.log(json);
		})
		.catch(err => {
			console.log('Error: insertRecurringEvent-' + err);
		});
}

function deleteEvent(calendarId, eventId) {
	let params = {
		sendNotifications: true
	};
	return cal.Events.delete(calendarId, eventId, params)
		.then(resp => {
			console.log('Deleted Event Response: ');
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: deleteEvent-' + err);
		});
}

function getEvent(calendarId, eventId) {
	let params = {};

	return cal.Events.get(calendarId, eventId, params)
		.then(resp => {
			console.log('GetEvent: ' + eventId);
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: getEvent-' + err);
		});
}

function updateEvent(calendarId, eventId, eventSummary, startDateTime, endDateTime, location, status, description, recurrenceRule) {
	let event = {
		'start': {
			'dateTime': startDateTime,
			'timeZone': 'Asia/Singapore'
		},
		'end': {
			'dateTime': endDateTime,
			'timeZone': 'Asia/Singapore'
		},
		'location': location,
		'summary': eventSummary,
		'status': status,
		'description': description,
		'colorId': 1,
		'recurrence': recurrenceRule
	};

	cal.Events.update(calendarId, eventId, event)
		.then(resp => {
			let json = resp;
			console.log('updated event:');
			console.log(json);
		})
		.catch(err => {
			console.log('Error: updatedEvent-' + err);
		});
}

function eventInstances(calendarId, eventId) {
	let params = {};

	return cal.Events.instances(calendarId, eventId, params)
		.then(resp => {
			console.log('eventInstances: ' + eventId);
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: eventInstances-' + err);
		});
}

function moveEvent(calendarId, eventId, destination) {
	let params = { 'destination': destination };

	return cal.Events.move(calendarId, eventId, params)
		.then(resp => {
			console.log('moveEvent: ' + eventId);
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: moveEvent-' + err);
		});
}

function checkBusy(calendarId, startDateTime, endDateTime) {
	let params = {
		"timeMin": startDateTime,
		"timeMax": endDateTime,
		"items": [{ "id": calendarId }]
	};

	return cal.FreeBusy.query(calendarId, params)
		.then(resp => {
			console.log('List of busy timings with events on calendar within defined time range: ' + startDateTime + ' - ' + endDateTime);
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: checkBusy -' + err);
		});
}

function getSettings(settingId) {
	return cal.Settings.get(settingId)
		.then(resp => {
			console.log('List settings with settingID: ' + settingId);
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: getSettings -' + err);
		});
}

function listSettings() {
	let params = {};
	return cal.Settings.list(params)
		.then(resp => {
			console.log('List settings: ');
			console.log(resp);
		})
		.catch(err => {
			console.log('Error: listSettings -' + err);
		});
}