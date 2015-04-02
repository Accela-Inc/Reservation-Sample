'use strict';

/* Filters */
(function(){	
    var appFilters = angular.module('siteReservationFilters', []);

    appFilters.filter('applyMapFilter', function() {
      return function(input, uppercase) {
        var _testHarness = new RecreationServerTestHarness();
        alert(uppercase);

        input = input || '';
        var out = "";
        for (var i = 0; i < input.length; i++) {
          out = input.charAt(i) + out;
        }
        // conditional based on optional argument
        if (uppercase) {
          out = out.toUpperCase();
        }
        return out;
      };
    })

/*
    var uniqueItems = function (data, key) {
        var result = new Array();
        for (var i = 0; i < data.length; i++) {
            var value = data[i][key];

            if (result.indexOf(value) == -1) {
                result.push(value);
            }

        }
        return result;
    };

    appFilters.filter('onlyBooleanValueFilter', [function(){
        return function(input, param){
            var ret = [];
            if(!angular.isDefined(param)) param = true;
            angular.forEach(input, function(v){
                if(angular.isDefined(v.active) && v.active === param){
                    ret.push(v);
                }
            });
            return ret;
        };
    }])
   

    appFilters.filter('groupBy', function () {
        return function (collection, key) {
            if (collection === null) {
                return;
            }
            return uniqueItems(collection, key);
        };
    });
*/
    appFilters.filter('searchFor', function(){
        // See http://jsfiddle.net/rzgWr/12/ for grouping filter
        // All filters must return a function. The first parameter
        // is the data that is to be filtered, and the second is an
        // argument that may be passed with a colon (searchFor:searchString)

        return function(arr, searchString){

            if(!searchString){
                return arr;
            }

            var result = [];

            searchString = searchString.toLowerCase();

            // Using the forEach helper method to loop through the array
            angular.forEach(arr, function(item){

                if(item.siteIdentifier.toLowerCase().indexOf(searchString) !== -1){
                    result.push(item);
                }

            });

            return result;
        };
    });

}());