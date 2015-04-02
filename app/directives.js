'use strict';

/* Directives */
(function () {
    var appDirectives = angular.module('siteReservationDirectives', []);

    appDirectives.directive("filterCheckboxGroup", function() {
        return {
            restrict: "A",
            // templateUrl: 'partials/site-filter.html',
            link: function (scope, element, attrs) {
                // Determine initial checked boxes
                if (scope.filteredArray.indexOf(scope.item.id) !== -1) {
                    element[0].checked = true;
                }
                // Update filteredArray on click
                element.bind('click', function () {
                    var index = scope.filteredArray.indexOf(scope.item.id);
                    // Add if checked
                    if (element[0].checked) {
                        if (index === -1) {
                            scope.filteredArray.push(scope.item.id);
                        }
                    } else { 
                        // Remove if unchecked
                        if (index !== -1) {
                            scope.filteredArray.splice(index, 1);    
                        }
                    }
                    // Sort and update DOM display
                    scope.$apply(scope.filteredArray.sort(function (a, b) {
                        return a - b
                    }));
                });
            }
        }
    });

    appDirectives.directive('siteMarkerPopupContent', function() {
        var directiveDefinitionObject =  {
            restrict: 'E',
            templateUrl: 'app/partials/site-marker-popup-content.html',
            templateNamespace: 'html',
            controllerAs: 'stringAlias',
            scope: false,
            transclude: true, // we want to insert custom content inside the directive
            link: function(scope, element, attrs) {
                scope.dialogStyle = {};
                if (attrs.width) {
                    scope.dialogStyle.width = attrs.width;
                }
                if (attrs.height) {
                    scope.dialogStyle.height = attrs.height;
                }
                scope.hideModal = function() {
                    scope.show = false;
                };
            }
        };

        return directiveDefinitionObject;
    });

    /** JQuery Plugin for image gallery. **/
    appDirectives.directive('magnificPopup', function(){
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var options = {
                    delegate : 'a',
                    type : 'image',
                    tLoading : 'Loading image #%curr%...',
                    mainClass : 'mfp-img-mobile',
                    gallery : {
                        enabled : true,
                        navigateByImgClick : true,
                        preload : [ 0, 1 ]
                        // Will preload 0 - before current, and 1 after the
                        // current image
                    },
                    image : {
                        tError : '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc : function(item) {
                            return item.el.attr('title');
                        }
                    }
                }
                $(element).magnificPopup(options);
            }
        };
    });

    /** JQuery Plugin for slim scroll bars. **/
    appDirectives.directive('slimScroll', function() {
        return {
            restrict: "A",
            link: function (scope, element, attrs){
                var options = {
                    height: '245px',
                    color: '#fff',
                    alwaysVisible: true
                }
                $(element).slimScroll(options);
            }
        };
    });

    appDirectives.directive('myItinerary', function() {
        return {
            restrict: 'EA',
            controller: function($scope, $attrs) {
                $scope.$on('handleBroadcast', function() {
                    $scope.message = 'Directive: ';// + itineraryService.message;
                });
            },
            templateUrl: 'app/partials/my-itinerary.html'
            // templateUrl: 'itinerary.html'
        };
    });

    appDirectives.directive('siteReviews', function() {
        return {
            restrict: 'EA',
            templateUrl: 'app/partials/site-reviews.html'
        };
    });

    appDirectives.directive('locationGallery', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/partials/location-gallery.html'
        };
    });

    appDirectives.directive('loadingIndicator', function() {
        return {
            restrict: 'EA',
            templateUrl: 'app/partials/loading-indicator.html'
        };
    });

    /** JQuery Plugin for sliding show hide element. **/
    appDirectives.directive('slideToggle', slideToggle);
    slideToggle.$inject = ['$animate'];
    function slideToggle($animate){
        return {
            restrict: "A",
            link: function (scope, element, attrs){
                var options = {}
                $(element).toggle(options);
            }
        };
    };

    /**
     * Checklist-model
     * AngularJS directive for list of checkboxes
     */
    appDirectives.directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
      // contains
      function contains(arr, item) {
        if (angular.isArray(arr)) {
          for (var i = 0; i < arr.length; i++) {
            if (angular.equals(arr[i], item)) {
              return true;
            }
          }
        }
        return false;
      }

      // add
      function add(arr, item) {
        arr = angular.isArray(arr) ? arr : [];
        for (var i = 0; i < arr.length; i++) {
          if (angular.equals(arr[i], item)) {
            return arr;
          }
        }    
        arr.push(item);
        return arr;
      }  

      // remove
      function remove(arr, item) {
        if (angular.isArray(arr)) {
          for (var i = 0; i < arr.length; i++) {
            if (angular.equals(arr[i], item)) {
              arr.splice(i, 1);
              break;
            }
          }
        }
        return arr;
      }

      // http://stackoverflow.com/a/19228302/1458162
      function postLinkFn(scope, elem, attrs) {
        // compile with `ng-model` pointing to `checked`
        $compile(elem)(scope);

        // getter / setter for original model
        var getter = $parse(attrs.checklistModel);
        var setter = getter.assign;

        // value added to list
        var value = $parse(attrs.checklistValue)(scope.$parent);

        // watch UI checked change
        scope.$watch('checked', function(newValue, oldValue) {
          if (newValue === oldValue) { 
            return;
          } 
          var current = getter(scope.$parent);
          if (newValue === true) {
            setter(scope.$parent, add(current, value));
          } else {
            setter(scope.$parent, remove(current, value));
          }
        });

        // watch original model change
        scope.$parent.$watch(attrs.checklistModel, function(newArr, oldArr) {
          scope.checked = contains(newArr, value);
        }, true);
      }

      return {
        restrict: 'A',
        priority: 1000,
        terminal: true,
        scope: true,
        compile: function(tElement, tAttrs) {
          if (tElement[0].tagName !== 'INPUT' || !tElement.attr('type', 'checkbox')) {
            throw 'checklist-model should be applied to `input[type="checkbox"]`.';
          }

          if (!tAttrs.checklistValue) {
            throw 'You should provide `checklist-value`.';
          }

          // exclude recursion
          tElement.removeAttr('checklist-model');
          
          // local scope var storing individual checkbox model
          tElement.attr('ng-model', 'checked');

          return postLinkFn;
        }
      };
    }]);

    appDirectives.directive('availabilityCalendar', ['$rootScope', '$compile', 'recService', 'calService', 
        function($rootScope, $compile, recService, calService) {
        var getTemplate = function() {
            var daysOfWeek = ['s', 'm', 't', 'w', 't', 'f', 's'];
            var displayedMonths = calService.getDisplayedMonths(6);
            var tpl = [];
            var dateTrailer = "-01";

            for (var h = 0; h < displayedMonths.length; h++) {
                var tmpDate = displayedMonths[h] + dateTrailer;
                var monthLength = moment(tmpDate).daysInMonth();
                var monthShort = moment(tmpDate).format("MM");
                var year = moment(tmpDate).year();
                var startDay = moment(tmpDate).day();
                var rows = Math.ceil((monthLength + startDay) / 7);
                var dayOfMonth = 1;
                tpl.push('<div class="globalFloatLeft calendar animate-show"');
                tpl.push(' ng-class="{\'\' : checkInClick, \'checkout\' : !checkInClick}"');
                tpl.push('>');
                tpl.push('<table class="cal">');
                tpl.push('<tr><th colspan="7" class="header">' + moment(tmpDate).format("MMMM YYYY") + '</th></tr>');
                tpl.push('<tr class="week names">');
                daysOfWeek.forEach(function (day) {
                  tpl.push('<td class="cal-head day">' + day.toUpperCase() + '</td>');
                });
                tpl.push('</tr>');

                for (var i = 0; i < rows; i++) {
                    tpl.push('<tr>');
                    for (var j = 0; j < 7; j++) {
                        tpl.push('<td>');
                        if (dayOfMonth <= monthLength && (i > 0 || j >= startDay)) {
                            var currentDate = displayedMonths[h] + "-" + calService.zeroPad(dayOfMonth);
                            var comparisonDate = year + "-" + monthShort + "-" + calService.zeroPad(dayOfMonth);
                            tpl.push('<div data-date="' + currentDate + 'T00:00:00"');
                            tpl.push(' ng-click="clickDay($event)"');
                            tpl.push(' class="cal-day');
                            tpl.push(calService.getCSSClass(currentDate, comparisonDate));
                            tpl.push('">');
                            tpl.push(dayOfMonth + '</div>');
                            dayOfMonth++;
                        }
                        tpl.push('</td>');
                    }
                    tpl.push('</tr>');
                }
                tpl.push('</table></div>');
            };
                
            return tpl.join('');
        };

        var directiveDefinitionObject = {
            restrict: 'E',
            replace: false,
            transclude: true,
            scope: false,
            template: getTemplate(),
            templateNamespace: 'html',
            controller: function($scope, $element) {
                $scope.checkInClick = true;
                $scope.rangeMsg = 'Select an arrival date.';
                $scope.clickDay = function(evt) {
                    var target = $(evt.target);
                    var date = evt.target.dataset.date;
                    var value = target.attr('data-date');
                    $('.inRangeSelectedDate').removeClass('inRangeSelectedDate');
                    
                    if($scope.checkInClick) {
                        $scope.rangeMsg = 'Select an departure date.';
                        $('.checkInSelectedDate').removeClass('checkInSelectedDate');
                        $('.checkOutSelectedDate').removeClass('checkOutSelectedDate');
                        calService.setCheckInDate(date);
                        target.addClass("checkInSelectedDate");
                        $scope.checkInClick = !$scope.checkInClick;
                    } else if(calService.isDateRangeValid(date)) {
                        $('.checkOutSelectedDate').removeClass('checkOutSelectedDate');
                        calService.setCheckOutDate(date);
                        target.addClass("checkOutSelectedDate");
                        $scope.setRange();
                        $scope.checkInClick = !$scope.checkInClick;
                    }
                };

                $scope.setRange = function() {
                    var duration = calService.getReservedDuration();
                    var tmpMoment = calService.incrementMoment(moment($rootScope.checkInDate));
                    $('.inRangeSelectedDate').removeClass('inRangeSelectedDate');
                    for (var i = 1; i < duration; i++) {
                        if (calService.isDateBooked(tmpMoment)) {
                            $rootScope.checkOutDate = null;
                            $('.checkOutSelectedDate').removeClass('checkOutSelectedDate');
                            $('.inRangeSelectedDate').removeClass('inRangeSelectedDate');
                            $rootScope.rangeMsg = 'Selected range is invalid.';
                            break;
                        } else {
                            $scope.rangeMsg = 'Select a new arrival date or book now.';
                        }
                        $('.availableDate[data-date="' + tmpMoment.format("YYYY-MM-DD") + 'T00:00:00"]').addClass('inRangeSelectedDate');
                        tmpMoment = calService.incrementMoment(tmpMoment);
                    };
                    $rootScope.calculateCost();
                };

                $rootScope.updateAvailabilityDisplay = function() {
                    if($rootScope.bookedDates != null) {
                        var el, tmpMoment, endMoment, duration, tmpRange;
                        var bookedDates = $rootScope.bookedDates;
                        for (var i = 0; i < bookedDates.length; i++) {
                            tmpMoment = moment(bookedDates[i].startDate);
                            endMoment = moment(bookedDates[i].endDate);
                            tmpRange = moment().range(tmpMoment, endMoment);
                            duration = calService.getDateDuration(tmpMoment, endMoment);

                            for (var j = 0; j <= duration; j++) {
                                if (tmpRange.contains(tmpMoment)) {
                                    el = $('.availableDate[data-date="' + tmpMoment.format("YYYY-MM-DD") + 'T00:00:00"]');
                                    el.removeClass('availableDate').addClass('bookedDate');
                                    el.off();
                                    tmpMoment = calService.incrementMoment(tmpMoment);
                                }
                            }
                        }
                    }
                };
            }
        };

        return directiveDefinitionObject;
    }]);

}());
