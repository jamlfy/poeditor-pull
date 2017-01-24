const request = require('request');
const API_URL = 'https://poeditor.com/api/';


/**
 * [POEditor description]
 * @param {string} key [description]
 */
function POEditor(key) {
	this.key = key;
}

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
	this.__request({
		action : 'export',
		id  :  proyect,
		language  : lang,
		filters : JSON.stringify(filters),
		tags : JSON.stringify(tags)
	}, function (err, link) {
		callback(err, !err && item && item.link ? request(link.item) : null);
	});
};


POEditor.prototype.__request = function( params, cb) {
	params.api_token  = this.key;
	request.post(API_URL, params, function (err, res, body) {
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