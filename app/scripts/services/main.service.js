/* global marioApp, angular */

'use strict';

marioApp.service('MainSrv', ['$q', '$http','$filter', 'HttpSrv', 'ModalSrv', '$translate', function($q, $http,  $filter, HttpSrv, ModalSrv, $translate) {

    var urls = {
        data: 'https://cv-data-42f26.firebaseio.com/LANGUAGE.json'
    };

    function hideLoading() {
        ModalSrv.hideLoadingModal();
    }

    function showAlert(modalOptions) {
        var tempModalOptions = {},
            modalOptionsDefault = {
                type: 'info',
                title: 'Alert Type',
                bodyText: 'Error Description'
            };

        angular.extend(tempModalOptions, modalOptionsDefault, modalOptions);

        ModalSrv.showAlertModal({}, tempModalOptions);
    }

    

    var getData = function() {
        var language = $translate.use(),
            serviceUrl = urls.data.replace(/LANGUAGE/, language),
            deferred = $q.defer();

        function success(data) {
            return deferred.resolve(data);
        }

        function error(data) {
            hideLoading();
            showAlert({
                type: 'danger',
                title: 'Error',
                bodyText: $filter('translate')('loadingError')
            });
            return deferred.reject(data);
        }

        HttpSrv.get(serviceUrl).then(success, error);

        return deferred.promise;
    };

    var showLoading = function() {
        var modalOptions = {
            bodyText: $filter('translate')('loading')
        };

        ModalSrv.showLoadingModal(modalOptions);
    };

    var callbackError = function(message) {
        message = message || 'Service Error';
        showAlert({
            type: 'danger',
            title: 'Error',
            bodyText: message
        });
    };

    return {
        getData: getData,
        showLoading: showLoading,
        hideLoading: hideLoading,
        callbackError: callbackError
    };
}]);
