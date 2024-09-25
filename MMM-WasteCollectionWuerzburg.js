'use strict';

Module.register("MMM-WasteCollectionWuerzburg", {
    requiresVersion: "2.1.0",
    defaults: {
        title: "Abfallkalender Würzburg",
        districts: [ // shows all if empty
            // 'Altstadt',
            // 'Frauenland',
            // 'Dürrbach alle mit Hafen',
            // 'Grombühl',
            // 'Heidingsfeld',
            // 'Heuchelhof innen',
            // 'Heuchelhof aussen',
            // 'Lengfeld',
            // 'Lindleinsmühle',
            // 'Mainviertel',
            // 'Neumühle',
            // 'Pilziggrund',
            // 'Rottenbauer',
            // 'Sanderau',
            // 'Steinbachtal',
            // 'Versbach',
            // 'Zellerau'
        ],
        categories: [ // shows all if empty
            'Restmüll',
            'Biomüll',
            'Gelbe Säcke',
            'Papier',
            // 'Problemmüll-Sammlung',
            // 'Wertstoffmobil'
        ],
        updateInterval: 604800*1000, // once a week
        rows: {},
        showTypes: true, // displays waste type names next to icons
        showDistrict: false, // this should be enaled if you use multiple districts
        showYear: false,
        rowsMax: 5 // max num rows to be displayed; 0 for unlimited
    },
    getStyles: function() {
        return [this.file('css/default.css')];
    },
    getDom: function() {
        var tbl = document.createElement("table");
        var rowCount = 0;

        Object.keys(this.config.rows).forEach(k => {
            var districts = this.config.rows[k];
            var date = k;

            Object.keys(districts).forEach(districtName => {
                var categories = districts[districtName];

                if (this.config.rowsMax && this.config.rowsMax > 0 && rowCount == this.config.rowsMax) {
                    return;
                }

                var tr = this.createDomRow(date, categories);

                if (tr) tbl.appendChild(tr);

                rowCount++;
            });
        });

        return tbl;
    },
    createDomRow: function(date, categories) {
        var districtName = null;
        var catArr = [];

        var tr = document.createElement('tr');

        /**
         * waste type icons & names
         */
        var td = document.createElement("td");
        td.className = 'waste-icons';

        Object.keys(categories).forEach(categoryName => {
            var category = categories[categoryName];

            if (!districtName) {
                districtName = category.stadtteil_name;
            }

            if (this.config.categories.length === 0 || this.config.categories.indexOf(category.kategorie) > -1) {
                catArr.push(category.kategorie);
            }

            var img = document.createElement('img');

            img.src = category.bild;

            td.appendChild(img);
        });

        // skip row if no desired category available
        if (catArr.length === 0) return false;

        tr.appendChild(td);

        /**
         * waste type names
         */
        if (this.config.showTypes) {
            var td = document.createElement("td");

            td.innerHTML = catArr.join(', ');

            tr.appendChild(td);
        }

        /**
         * district name
         */
        if (this.config.showDistrict) {
            var td = document.createElement("td");

            td.innerHTML = districtName;
            tr.appendChild(td);
        }

        /**
         * collection date
         */
        var td = document.createElement("td");
        var collectionDate = new Date(date);

        var dateOptions = {month: "numeric", day: "numeric"};
        if (this.config.showYear) {
            dateOptions.year = 'numeric';
        }

        td.innerHTML = collectionDate.toLocaleDateString('de-DE', dateOptions);

        tr.appendChild(td);


        return tr;
    },
    getHeader: function () {
        return this.config.title;
    },
    getData: function() {
        this.sendSocketNotification('GET_DATA', {
            districts: this.config.districts
        });
    },
    socketNotificationReceived: function(name, payload) {
        if (name !== 'API_DATA_RECEIVED') return this.rows = [];

        this.config.rows = payload.rows;

        this.updateDom();
    },
    start: function() {
        const _this = this;
        setInterval(function() {_this.getData()}, _this.config.updateInterval);

        _this.getData();
    }
});