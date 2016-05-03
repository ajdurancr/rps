var campionshipService = require('../businessLogic/championshipService');

exports.newRecord = function(cRequest, cResponse) {
  campionshipService.addNewRecord(cRequest.body, function(res){
        cResponse.send(res);
    });
};

exports.getTop = function(cRequest, cResponse) {
  campionshipService.getTop(cRequest.params.count, function(res){
        cResponse.send(res);
    });
};

exports.newChampionship = function(cRequest, cResponse) {
  campionshipService.newChampionship(cRequest.body, function(res){
        cResponse.send(res);
    });
};