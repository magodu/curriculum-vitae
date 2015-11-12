/* global marioApp */

'use strict';

marioApp.service('ModalSrv', ['$modal', '$modalStack', function ($modal, $modalStack) {

    var modalDefaults = {
	        backdrop: true,
	        keyboard: true,
	        modalFade: true,
	        templateUrl: ''
	    },
	    alertModalDefaults = {
	        backdrop: 'static',
	        keyboard: false,
	        modalFade: true,
	        templateUrl: 'views/modals/modalAlert.html'
	    },
	    loadingModalDefaults = {
	        backdrop: 'static',
	        keyboard: false,
	        modalFade: false,
	        templateUrl: 'views/modals/modalLoading.html'
	    },
   		modalOptions = {
	        closeButtonText: 'Close',
	        actionButtonText: 'OK',
	        bodyText: ''
	    };

    function show(tempModalDefaults, tempModalOptions) {
        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $modalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };
            };
        }

        return $modal.open(tempModalDefaults).result;
    }

    this.showModal = function(customModalDefaults, customModalOptions) {
    	var tempModalDefaults = {},
            tempModalOptions = {};

        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!customModalDefaults) {
        	customModalDefaults = {};
        }

        return show(tempModalDefaults, tempModalOptions);
    };

    this.showAlertModal = function(customAlertModalDefaults, customAlertModalOptions) {
        var tempModalDefaults = {},
            tempModalOptions = {};

        angular.extend(tempModalDefaults, alertModalDefaults, customAlertModalDefaults);
        angular.extend(tempModalOptions, customAlertModalOptions);

        if (!customAlertModalDefaults) {
        	customAlertModalDefaults = {};
        }

        return show(tempModalDefaults, tempModalOptions);
    };

    this.showLoadingModal = function(customLoadingModalOptions) {
        var tempModalDefaults = {},
        	tempModalOptions = {},
	        loadingModalOptions = {
	        	bodyText: ''
	        };

        angular.extend(tempModalDefaults, loadingModalDefaults);
        angular.extend(tempModalOptions, loadingModalOptions, customLoadingModalOptions);

        return show(tempModalDefaults, tempModalOptions);
    };

    this.hideLoadingModal = function() {
        $modalStack.dismissAll();
    };

}]);
