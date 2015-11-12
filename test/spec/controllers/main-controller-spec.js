'use strict';

describe('Controller: MainCtrl', function() {

    //Mock scenario

    beforeEach(function() {
        module(function ($provide) {
            // Fake StoreService Implementation returning a promise
            $provide.value('MainSrv', {
                getData: function() {
                    return {
                        then: function(callback) {
                            return callback({
                                title: {},
                                personalData: {},
                                training: [],
                                complementaryTraining: [],
                                experience: [],
                                skills: [],
                                languages: [],
                                social: []
                            });
                        }
                    };
                },
                showLoading: function() {
                	return null;
                }
            });

            return null;
        });
    });

    // load the controller's module
    beforeEach(module('cvparallaxAngularApp'));


    var MainCtrl,
        MainSrv,
        scope,
        rootScope,
        createController;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, _MainSrv_) {
        scope = $rootScope.$new();
        MainSrv = _MainSrv_;
        rootScope = $rootScope;
        

	    MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });

        createController = function() {
	        return $controller('MainCtrl', {
	            $scope: scope

	        });
	    };
    }));
    

    describe('initial scope variables', function() {

        it('should attach a list of cities to the scope', function() {
            expect(scope.cities.length).toBe(2);
        });

        it('should attach an options default object to the scope', function() {
            expect(scope.mapOptions).toEqual(jasmine.any(Object));
        });
    });

    describe('get data', function() {

        it('should make a http GET request for data',  inject(function ($httpBackend) {


            var modalHtml = 'views/partials/modalLoading.html',
            	url = 'https://dl.dropboxusercontent.com/u/2251063/appData/CVData/jsonCV.json';

	    	
			spyOn(MainSrv, 'getData').and.callThrough();

			createController();

        	$httpBackend.expectGET(modalHtml);

	        $httpBackend.whenGET(url).respond({});
	        $httpBackend.expectGET(url);


        }));

    });

});
