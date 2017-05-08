const request = require('request');
const API_URL = 'https://api.poeditor.com/v2/';


/**
 * [POEditor description]
 * @param {string} key [description]
 */
function POEditor(key, proyect) {
	this.key = key;
	this.proyect = proyect;
}

POEditor.prototype.listLang = function(id, callback) {
	this.__request('languages/list', {
		id  :  this.proyect,
	}, callback);
};

/**
 * Download
 * @param  {Stirng}   proyect
 * @param  {String}   lang
 * @param  {String}   type
 * @param  {Array}   filters
 * @param  {Array}   tags
 * @param  {Function} callback
 * @return {[type]}
 */
POEditor.prototype.download = function(proyect, lang, type, filters, tags, callback) {
	this.__request('projects/export', {
		id        :  proyect,
		language  : lang,
		type      : type,
		filters   : JSON.stringify(filters),
		tags      : JSON.stringify(tags)
	}, function (err, link) {
		callback(err, !err && link && link.item ? request(link.item) : null);
	});
};


POEditor.prototype.__request = function(name, params, cb) {
	params.api_token  = this.key;
	request.post(API_URL + name, { form: params }, function (err, res, body) {
		if(err || res.statusCode !== 200){
			return cb(err || new Error(res.headers.status), data);
		}

		try {
			var data = JSON.parse(body);
			cb(err, data);
		}catch(err) {
			cb(err || new Error(data.errors), data);
		}
	});
};

module.exports = POEditor;