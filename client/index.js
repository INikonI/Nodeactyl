const axios = require('axios');
const Request = require('./ClientRequest.js');

// GET
const getallservers = require('./methods/getAllServers.js');
const getserverinfo = require('./methods/getServerInfo.js');
const getserverstatus = require('./methods/getServerStatus.js');
const isowner = require('./methods/isOwner.js');
const getcpucores = require('./methods/getCPUCores.js');
const getcpuusage = require('./methods/getCPUUsage.js');
const getramusage = require('./methods/getRAMUsage.js');
const getdiskusage = require('./methods/getDiskUsage.js');

// POST
const startserver = require('./methods/startServer.js');
const stopserver = require('./methods/stopServer.js');
const killserver = require('./methods/killServer.js');
const restartserver = require('./methods/restartServer.js');
const sendcommand = require('./methods/sendCommand.js');

class Client {
	/**
 	*
 	* @param {String} HOST Host to use
 	* @param {String} KEY Client API key
 	*/
	constructor(host, key) {
		this.host = host
		this.key = key
	}
	
	getAllServers() {
		const Req = new Request(this.host, this.key);
		return Req.getRequest('GetAllServers', null);
	}

	getCPUCores(ServerID) {
		const Req = new Request(this.host, this.key);
		return Req.getRequest('GetCPUCores', ServerID);
	}

	getCPUUsage(ServerID) {
		const Req = new Request(this.host, this.key);
		return Req.getRequest('GetCPUUsage', ServerID);
	}

	getDiskUsage(ServerID) {
		const Req = new Request(this.host, this.key);
		return Req.getRequest('GetDiskUsage', ServerID);
	}

	getRAMUsage(ServerID) {
		const Req = new Request(this.host, this.key);
		return Req.getRequest('GetRAMUsage', ServerID);
	}

	getServerInfo(ServerID) {
		const Req = new Request(this.host, this.key);
		return Req.getRequest('GetServerInfo', ServerID);
	}

	getServerStatus(ServerID) {
		const Req = new Request(this.host, this.key);
		return Req.getRequest('GetServerStatus', ServerID);
	}

	getServerStats(ServerID) {
		const Req = new Request(this.host, this.key);
		return Req.getRequest('GetServerStats', ServerID);
	}

	isOwner(ServerID) {
		const Req = new Request(this.host, this.key);
		return Req.getRequest('IsOwner', ServerID);
	}

	killServer(ServerID) {
		const Req = new Request(this.host, this.key);
		const data = { 'signal': 'kill' };
		return Req.postRequest('KillServer', data, ServerID);
	}

	restartServer(ServerID) {
		const Req = new Request(this.host, this.key);
		const data = { 'signal': 'restart' };
		return Req.postRequest('RestartServer', data, ServerID);
	}

	sendCommand(ServerID, Command) {
		const Req = new Request(this.host, this.key);
		const data = { 'command': Command };
		return Req.postRequest('SendCommand', data, ServerID);
	}

	startServer(ServerID) {
		const Req = new Request(this.host, this.key);
		const data = { 'signal': 'start' };
		return Req.postRequest('StartServer', data, ServerID);
	}

	stopServer(ServerID) {
		const Req = new Request(this.host, this.key);
		const data = { 'signal': 'stop' };
		return Req.postRequest('StopServer', data, ServerID);
	}
}

/**
 *
 * @param {String} HOST Host to use
 * @param {String} KEY Client API key
 */
function login(HOST, KEY, callback) {
	HOST = HOST.trim();
	if (HOST.endsWith('/')) HOST = HOST.slice(0, -1);

	// process.env.CLIENT_NODEACTYL_HOST = HOST;
	// process.env.CLIENT_NODEACTYL_KEY = KEY;
	axios.get(HOST + '/api/client', {
		responseEncoding: 'utf8',
		maxRedirects: 5,
		headers: {
			'Authorization': 'Bearer ' + KEY,
			'Content-Type': 'application/json',
			'Accept': 'Application/vnd.pterodactyl.v1+json',
		},
	}).then(res => {
		if (res.status == 404) {
			callback(false, 'API Key is not valid! (Application)');
		}
		else {
			callback(true);
		}
	}).catch(error => {
		if (error.response.status == 403) {
			callback(false, 'API Key is not valid! (Application)');
		}
		else {
			throw error;
		}
	});
}

function fastLogin(HOST, KEY) {
	HOST = HOST.trim();
	if (HOST.endsWith('/')) HOST = HOST.slice(0, -1);
	// process.env.CLIENT_NODEACTYL_HOST = HOST;
	// process.env.CLIENT_NODEACTYL_KEY = KEY;
}


module.exports = {
	Client,

	login: login,
	fastLogin: fastLogin,

	// GET
	getAllServers: getallservers,
	getServerInfo: getserverinfo,
	getServerStatus: getserverstatus,
	isOwner: isowner,
	getCPUCores: getcpucores,
	getCPUUsage: getcpuusage,
	getRAMUsage: getramusage,
	getDiskUsage: getdiskusage,

	// POST
	startServer: startserver,
	stopServer: stopserver,
	killServer: killserver,
	restartServer: restartserver,
	sendCommand: sendcommand,
};
