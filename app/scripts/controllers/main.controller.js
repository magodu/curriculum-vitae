/* global marioApp, $ */

'use strict';

/**
 * @ngdoc function
 * @name cvparallaxAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cvparallaxAngularApp
 */

marioApp.controller('MainCtrl', ['MainSrv', '$translate', '$filter', function (MainSrv, $translate, $filter) {

    var _this = this;

    var MOBILE_WIDTH = 760,
        scopeProperties = {
            percentLoaded: 0,
            backgroundImageClass: '',
            mapOptions: {
                zoom: 4,
                mapTypeControl: $(window).width() <= MOBILE_WIDTH ? false : true
            },
            cities: [{
                city: 'Boston',
                desc:  $filter('translate')('maps.boston'),
                lat: 42.3133735,
                long: -71.0571571
            }, {
                city: 'Madrid',
                desc: $filter('translate')('maps.madrid'),
                lat: 40.4379543,
                long: -3.6795367
            }]
        };

    angular.extend(_this, scopeProperties);

    
    _this.calculatePeriod = function(dateFrom, dateTo) {
        var period = '',
            currentDate = new Date(),
            currentDateFormated = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear(),
            dateF = dateFrom.split('/'),
            dateT = dateTo ? dateTo.split('/') : currentDateFormated.split('/'),
            fDate1 = Date.UTC(dateF[2], dateF[1] - 1, dateF[0]),
            fDate2 = Date.UTC(dateT[2], dateT[1] - 1, dateT[0]),
            dif = fDate2 - fDate1,
            days = Math.floor(dif / (1000 * 60 * 60 * 24)),
            months = 0,
            years = 0,
            txtYear = '',
            txtMonth = '';

        months = Math.ceil(days / 30);
        period = months > 1 ? '(' + months + $filter('translate')('dates.months') + ')' : '(' + months + $filter('translate')('dates.month') + ')';

        if (months >= 12) {
            years = Math.floor(months / 12);

            if (months % 12 === 0) {
                period = years > 1 ? '(' + years + $filter('translate')('dates.years') + ')' : '(' + years + $filter('translate')('dates.year') + ')';
            } else {
                txtYear = years !== 1 ? $filter('translate')('dates.years') : $filter('translate')('dates.year');
                txtMonth = months % 12 !== 1 ? $filter('translate')('dates.months') : $filter('translate')('dates.month');
                period = '(' + years + txtYear + ', ' + (months % 12) + txtMonth + ')';
            }
        }

        return period;
    };

    function getCurrentYear() {
        var currentDate = new Date();
        _this.currentYear = currentDate.getFullYear();
    }

    function getData() {
        MainSrv.showLoading();
        MainSrv.getData().then(function (response) {
            _this.cvData = response;
            MainSrv.hideLoading();
        });
    }

    _this.changeLanguage = function(language) {
        if ($translate.use() === language) {
            return;
        }

        $translate.use(language);
        getData();
    };

    function init() {
        getData();
        getCurrentYear();
    }

    init();

}]);
