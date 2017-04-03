/*global marioApp, _ */

'use strict';

marioApp.factory('HttpSrv', ['$http', '$q', function ($http, $q) {
    function includeParamsInUrl(url, params) {
        var finalUrl = url;

        if (params) {
            _.each(_.keys(params), function(param) {
                var paramRegExp = new RegExp(':' + param, 'g');

                finalUrl = finalUrl.replace(paramRegExp, params[param]);
            });
        }

        return finalUrl;
    }

    function resolve(deferred) {
        return function(response) {
            deferred.resolve(response.data || response);
        };
    }

    function reject(deferred) {
        return function(error) {
            deferred.reject(error.errorData || error);
        };
    }

    function httpWrapper(method, url, dataOrConfig, config) {
        var deferred = $q.defer();

        $http[method](url, dataOrConfig, config)
            .success(resolve(deferred))
            .error(reject(deferred));

        return deferred.promise;
    }

    function httpDelete(url, params, config) {
        return httpWrapper('delete', includeParamsInUrl(url, params), config);
    }

    function httpGet(url, params, config) {
        return httpWrapper('get', includeParamsInUrl(url, params), config);
    }


    function httpPost(url, data, params, config) {
        return httpWrapper('post', includeParamsInUrl(url, params), data, config);
    }

    function httpPut(url, data, params, config) {
        return httpWrapper('put', includeParamsInUrl(url, params), data, config);
    }

    return {
        'delete': httpDelete,
        get: httpGet,
        post: httpPost,
        put: httpPut
    };

}]);
