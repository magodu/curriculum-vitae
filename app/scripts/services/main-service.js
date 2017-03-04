/* global marioApp, angular */

'use strict';

marioApp.service('MainSrv', ['$q', '$http','$filter', 'HttpSrv', 'ModalSrv', '$translate', function($q, $http,  $filter, HttpSrv, ModalSrv, $translate) {

    var urls = {
        data: 'https://cv-data-42f26.firebaseio.com/LANGUAGE.json',
        data2: 'https://dl.dropboxusercontent.com/u/2251063/appData/CVData/'
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


    function getData() {
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
    }

    function showLoading() {
        var modalOptions = {
            bodyText: $filter('translate')('loading')
        };

        ModalSrv.showLoadingModal(modalOptions);
    }

    function callbackError(message) {
        message = message || 'Service Error';
        showAlert({
            type: 'danger',
            title: 'Error',
            bodyText: message
        });
    }

    return {
        getData: getData,
        showLoading: showLoading,
        hideLoading: hideLoading,
        callbackError: callbackError
    };
}]);
