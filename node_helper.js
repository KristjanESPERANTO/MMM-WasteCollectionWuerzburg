'use strict';
const Helper = require('node_helper');
const Request = require('request');
const Logger = require('logger');

function deUmlaut(value){
    value = value.toLowerCase();
    value = value.replace(/ä/g, 'ae');
    value = value.replace(/ö/g, 'oe');
    value = value.replace(/ü/g, 'ue');
    value = value.replace(/ß/g, 'ss');
    value = value.replace(/ /g, '-');
    value = value.replace(/\./g, '');
    value = value.replace(/,/g, '');
    value = value.replace(/\(/g, '');
    value = value.replace(/\)/g, '');
    return value;
  }

module.exports = Helper.create({
    config: {
        sourceUrl: 'https://opendata.wuerzburg.de/api/explore/',
        apiVersion: 'v2.1',
        limit: 50,
        orderBy: 'start ASC',
        fields: ['titel', 'kategorie', 'start', 'bild', 'stadtteil_name']
    },
    getData: function(data) {
        var _this = this;

        var urlSearchParams = new URLSearchParams({
            limit: this.config.limit,
            order_by: this.config.orderBy,
            select: this.config.fields.join()
        });

        var districts = data.districts || [];
        if (districts.length > 0) {
            // const currentDate = new Date();
            urlSearchParams.append('where', 'stadtteil_name IN (' + districts.map(a => `'${a}'`).join() + ')'); //  AND start <= ' + currentDate.setDate(currentDate.getDate() + 14))
        }

        var url = this.config.sourceUrl + this.config.apiVersion + '/catalog/datasets/abfallkalender-wuerzburg/records?' + urlSearchParams.toString();

        Logger.log(`Fetching opendata.wuerzburg.de data via ${url} ...`);

        Request({ url: url, method: 'GET' }, function (error, response, body) {
            if (error || response.statusCode != 200) {
                throw new Error('Invalid API request');
                return;
            }

            var res = JSON.parse(body);

            if (!res || !res.results || res.results.length === 0) return;

            _this.sendSocketNotification('API_DATA_RECEIVED', {
                rows: _this.processData(res.results)
            });
        });
    },
    processData: function(data) {
        var byDate = {};

        for (var i = 0; i < data.length; i++) {
            data[i].cat = deUmlaut(data[i].kategorie);
            data[i].district = deUmlaut(data[i].stadtteil_name);

            if (typeof byDate[data[i].start]  !== 'object') {
                byDate[data[i].start] = {};
            }

            if (typeof byDate[data[i].start][data[i].district] !== 'object') {
                byDate[data[i].start][data[i].district] = {};
            }

            byDate[data[i].start][data[i].district][data[i].cat] = data[i];
        }

        return byDate;
    },
    socketNotificationReceived: function(name, payload) {
        if (name === 'GET_DATA') {
            this.getData(payload);
        }
    }
});
