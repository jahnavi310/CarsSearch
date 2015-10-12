

angular.module('getDropDownsService', [])

	.factory('FillDropDowns', function($http, $q) {
	    return {
	        getData: function (url) {
	            var q = $q.defer();
	            $http.get(url).success(function (results) {
	                // We got a successful response so pass on the results
	                q.resolve(results);
	            }).error(function (errorResults) {
	                // Something went wrong, let's pass that along
	                q.reject(errorResults);
	            });
	            return q.promise;
	        }
	    }    
});
