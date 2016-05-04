var championshipRepo = require('../dataAccess/championshipRepo');

var sortTop = function(a, b){return b.points - a.points};

var matchSolver = function (player1, player2) {
	if (	(player1[1].toLowerCase()  == player2[1].toLowerCase()) || 
		(player1[1].toLowerCase() == 'p' && player2[1].toLowerCase() == 'r') || 
		(player1[1] .toLowerCase()== 'r' && player2[1].toLowerCase() == 's') || 
		(player1[1].toLowerCase() == 's' && player2[1].toLowerCase() == 'p')
	    ) {
		return player1;
	} else{
		return player2;
	}
}

var tournamentSolver = function (match) {
	if (Array.isArray(match[0])) {
		return matchSolver( tournamentSolver(match[0]), tournamentSolver(match[1]));
	} else {
		return match;
	}
}

exports.addNewRecord = function (players, callback) {
	var data = {userId: players.first, points: 3};
	championshipRepo.updateUserPoints(data, function (res) {
		if(res.success){
			data = {userId: players.second, points: 1};
			championshipRepo.updateUserPoints(data, function (res) {
				if(res.success){
					callback({status: 'success'});
				}else{
					callback({status: 'failure'});
				}
			});
		}else{
			callback({status: 'failure'});
		}
	});
}

exports.getTop = function (count, callback) {
	if (count <= 0) {
		callback({players: []});
		return;
	}
	championshipRepo.getUsers(count, function (res) {
		if (res.success) {
			var records = res.data;
			if (records.length == 0) {
				callback({players: []})
				return;
			}else{
				records.sort(sortTop);
				if (records.length > count) {
					records.splice(count - 1, records.length - count);
				}
				var players = [];
				for (var i = 0; i < records.length; i++) {
					players.push(records[i]._id);
				}
				callback({players: players})
				return;
			}
		} else {
			callback({players: []});
			return;
		}
	});
}

exports.newChampionship = function (tournament, callback) {
	var winner = tournamentSolver(tournament);
	callback({winner: winner})
}


