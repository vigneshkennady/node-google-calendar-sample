// Sample CalendarAPI settings
const SERVICE_ACCT_ID = 'priyam1@melodic-eye-175118.iam.gserviceaccount.com';
//const KEYFILE = 'priyam1-google-key.json';				//path to pem key
const TIMEZONE = 'UTC+08:00';
const CALENDAR_ID = 
{
	'primary': 'iecvcnsnfl7s1ui70e7jfr18vk@group.calendar.google.com'
};

//Example for using json keys
var fs = require('fs');
const KEYPATH = 'json-googleapi-key/priyam1-google-key.json';
var json = fs.readFileSync(KEYPATH, 'utf8');
var key = JSON.parse(json).private_key;
module.exports.key = key;

const CONFIG = require('../config/Settings');
const CalendarAPI = require('node-google-calendar');
let cal = new CalendarAPI(CONFIG);  

module.exports.serviceAcctId = SERVICE_ACCT_ID;
//module.exports.key= key;
//module.exports.keyfile = KEYFILE;           //or if using json keys - module.exports.key = key; 
module.exports.timezone = TIMEZONE;
module.exports.calendarId = CALENDAR_ID;