'use strict';

/* Services */
(function() {
  var appServices = angular.module('siteReservationServices', ['ngResource']);

  appServices.factory('recService', ['$location', '$routeParams', '$rootScope', '$http', 'appConfig', 
    function($location, $routeParams, $rootScope, $http, appConfig) {
      var getLocationId = function() {
        var locationId = '';
        var regex = /[?&]([^=#]+)=([^&#]*)/g;
        var url = window.location.href;
        var params = {};
        var match;
        while(match = regex.exec(url)) {
            locationId = params[match[1]] = match[2];
        }
        return locationId;
      };

      var config = {
        locationId: getLocationId(),
        domain: appConfig.domain,
        port: appConfig.port,
        primaryPath: appConfig.primaryPath
      };

      var getAppConfig  = function() {
        return appConfig;
      };

      var recServer = new KinsailRecServer($http, config);

      var getLocationDetail = function(id, succeed) {
        var reply = new ASyncReply();
        reply.success = function(result) {
            succeed(result);
        };
        return recServer.getLocationDetail(id, reply);
      };

      var getSiteTypeList = function() {
        return recServer.getSiteTypeList();
      };

      var getSiteAttributeList = function() {
        return recServer.getSiteAttributeList();
      };

      var getFeatureAttribute = function(attribute) {
        return new FeatureAttribute(attribute.name, attribute.value, attribute.description);
      };

      var getSiteDetail = function(id, succeed) {
        var reply = new ASyncReply();
        reply.success = function(result) {
            succeed(result);
        };
        return recServer.getSiteDetail(id, reply);
      };

      var getSiteDetailForFilter = function() {
        var query = new Query();
        query.criteria = new SiteDetail();
        return query;
      };

      var getSiteAvailability = function(id, succeed) {
        var reply = new ASyncReply();
        reply.success = function(result) {
            succeed(result);
        };
        return recServer.getSiteAvailability(id, reply);
      };

      /** FIXME This data should be moved to server or derived from site types. **/
      var getLocationLegend = function() {
        return [{
          'type' : 'Available'
        }, {
          'type' : 'Unavailable'
        }, {
          'type' : 'Non-Reservable'
        }, {
          'type' : 'Park Use Only'
        }, {
          'type' : 'No Site'
        }, {
          'type' : 'Restriction'
        }];
      };

      /** FIXME This data should be moved to server or derived from site types. **/
      var getMarkerIcon = function(type, anchorPoints) {
        var x = (anchorPoints && anchorPoints.x) || 0;
        var y = (anchorPoints && anchorPoints.y) || -45;
        var iconObject = {
          type: 'awesomeMarker',
          prefix: 'fa',
          // type: 'div',
          // prefix: 'fa',
          // popupAnchor: [x, y],
          // icon: 'flag',
          // html: '<div>&nbsp;</div>',
          markerColor: 'red'
        };

        switch (type) {
            case 1: //Tent
                iconObject.icon = 'ban';
                iconObject.markerColor = 'darkgreen';
                return iconObject;
            case 2: //RV
                iconObject.icon = 'bus';
                iconObject.markerColor = 'darkred';
                return iconObject;
            case 3: // Tent and RV
                iconObject.icon = 'ban';
                iconObject.markerColor = 'darkgreen';
                return iconObject;
            case 4: //Picnic
                iconObject.icon = 'cutlery';
                iconObject.markerColor = 'orange';
                return iconObject;
            case 8:  //Group Tent
                iconObject.icon = 'group';
                iconObject.markerColor = 'orange';
                return iconObject;
            case 16: //Trailer
                iconObject.icon = 'wheelchair';
                iconObject.markerColor = 'darkpurple';
                return iconObject;
            case 32: //Cabin
                iconObject.icon = 'home';
                iconObject.markerColor = 'cadetblue';
                return iconObject;
            case 64: //Boat
                iconObject.icon = 'anchor';
                iconObject.markerColor = 'blue';
                return iconObject;
            case 128: //Accessible
                iconObject.icon = 'star';
                iconObject.markerColor = 'blue';
                return iconObject;

          }
          return iconObject;
      };

      /** FIXME This data should be moved into the test harness. **/
      var getFeatureIcon = function(description) {
        switch (description) {
            case 'handicapAccessible':
                return {
                    icon: 'fa fa-wheelchair',
                    description: 'Handicap accessible'
                };
            case 'electricHookup':
                return {
                    icon: 'fa fa-plug',
                    description: 'Electric hook-up'
                };
            case 'septicHookup':
                return {
                    icon: 'maki-icon sanitary-dump-station-black',
                    description: 'Septic hook-up'
                };
            case 'generatorsAllowed':
                return {
                    icon: 'fa fa-lightbulb-o',
                    description: 'Generators allowed'
                };
            case 'boatAccessible':
                return {
                    icon: 'maki-icon boat-launch-black',
                    description: 'Boat accessible'             
                };
            case 'horseAccomodation':
                return {
                    icon: 'maki-icon horseback-riding-black',
                    description: 'Horse accomodation'
                };
            case 'minOccupants':
                return {
                    icon: 'fa fa-male',
                    description: 'Min occupants'
                };
            case 'maxOccupants':
                return {
                    icon: 'fa fa-group',
                    description: 'Max occupants'
                };
            case 'picnicShelters':
                return {
                    icon: 'maki-icon picnic-black',
                    description: 'Picnic shelters'
                };
            case 'petsAllowed':
                return {
                    icon: 'maki-icon pets-on-leash-black',
                    description: 'Pets allowed'           
                };
            case 'shade':
                return {
                    icon: 'fa fa-tree',
                    description: 'Shade'           
                };
            default: 
                return {
                    icon: 'maki-icon camping-black',
                    description: ''
                };
          }
      };

      var getReviewList = function(succeed) {
        var query = {
            criteria: {rating: 4},
            startRow: 0, 
            rowCount: 2
        };
        var reply = new ASyncReply();
        reply.success = function(result) {
            succeed(result.results);
        };
        return [];
      };

      var getLocationGallery = function(succeed) {
        var query = {
            criteria: {number: 4},
            startRow: 0, 
            rowCount: 4
        };
        var reply = new ASyncReply();
        reply.success = function(result) {
            succeed(result);
        };
        return recServer.getLocationGallery(query, reply);
      };

      var getSiteGallery = function(succeed) {
        var query = {
            criteria: {number: 4},
            startRow: 0, 
            rowCount: 4
        };
        var reply = new ASyncReply();
        reply.success = function(result) {
            succeed(result.results);
        };
        return recServer.getSiteGallery(query, reply);
      };

      var getBasicItinerary = function(succeed) {
        var query = {
            criteria: {number: 4},
            startRow: 0, 
            rowCount: 4
        };
        var reply = new ASyncReply();
        // var it = new ItineraryBasic;
        reply.success = function(result) {
            succeed(result.results);
        };
        //FIXME the recService does not return correct ItineraryBasics
        // return recServer.getBasicItinerary(query, reply);
        return [{
                activities: [{
                    title: "Reserved Cabin", 
                    descriptionHtml: "3 nights in cabin x991."
                }],
                start: "Dec 2 2014",
                end: "Dec 5 2014",
                locationObjectId: 6,
                siteObjectId: 1
            }, {
                activities: [{
                    title: "Reserved Tent Site", 
                    descriptionHtml: "2 nights at site x364."
                }],
                start: "Dec 5 2014",
                end: "Dec 7 2014",
                locationObjectId: 6,
                siteObjectId: 2
            }];
      };

      var getCost = function(succeed, siteId) {
        var reply = new ASyncReply();
 
        reply.success = function(result) {
            succeed(result.cost);
        };

        return recServer.getSiteDetail(siteId, reply);
      };

      var filterSitesByExample = function(succeed, sitedetail, availabilityDates) {
        var reply = new ASyncReply();
        var reservationStart = (availabilityDates) ? availabilityDates.reservationStart : null;
        var reservationEnd = (availabilityDates) ? availabilityDates.reservationEnd : null;
        reply.success = function(result) {
            succeed(result.results);
        };

        return recServer.filterSitesByExample(sitedetail, reservationStart, reservationEnd, reply);
      };

      var filterSites = function(id, succeed) {
        var reply = new ASyncReply();
        var detail = new SiteDetail();
        reply.success = function(result) {
            succeed(result.results);
        };

        return recServer.filterSites(detail, id, null, reply);
      };

      return {
        getLocationId: getLocationId,
        getAppConfig: getAppConfig,
        getLocationDetail: getLocationDetail,
        getSiteTypeList: getSiteTypeList,
        getSiteAttributeList: getSiteAttributeList,
        getFeatureAttribute: getFeatureAttribute,
        getSiteDetail: getSiteDetail,
        getSiteDetailForFilter: getSiteDetailForFilter,
        getSiteAvailability: getSiteAvailability,
        getMarkerIcon: getMarkerIcon,
        getFeatureIcon: getFeatureIcon,
        getLocationLegend: getLocationLegend,
        getReviewList: getReviewList,
        getLocationGallery: getLocationGallery,
        getSiteGallery: getSiteGallery,
        getBasicItinerary: getBasicItinerary,
        filterSitesByExample: filterSitesByExample,
        filterSites: filterSites
      };
  }]);

  appServices.factory('calService', ['$rootScope', function($rootScope) {
      var today = moment().format("YYYY-MM-DD");
      $rootScope.bookedDates = [];
      return {
          getDisplayedMonths: function(monthsToDisplay) {
              var displayedMonths = [];
              var _monthsToDisplay = (isNaN(monthsToDisplay) || !monthsToDisplay) ? 1 : monthsToDisplay;
              for (var i = 0; i < _monthsToDisplay; i++) {
                  displayedMonths.push(moment(today).add(i, 'months').format("YYYY-MM"));
              }
              return displayedMonths;
          },
          getCSSClass: function(currentDate, comparisonDate) {
              var CSS_CLASS = "";
              if (this.isAfterToday(currentDate)) {
                  CSS_CLASS = " availableDate";
              }
              return CSS_CLASS;
          },
          setCheckInDate: function(date) {
              $rootScope.checkInDate = moment(date).format("L");
          },
          setCheckOutDate: function(date) {
              $rootScope.checkOutDate = moment(date).format("L");
          },
          isDateActionable: function(currentDate, comparisonDate) {
              var isActionable = true;
              if (!this.isAfterToday(currentDate) || this.isDateBooked(comparisonDate)) {
                  isActionable = false;
              }
              return isActionable;
          },
          getDay: function(date) {
              return moment(date).format("D");
          },
          getMonth: function(date) {
              return moment(date).format("M");
          },
          getYear: function(date) {
              return moment(date).format("YYYY");
          },
          isBeforeDeparture: function(date, dateEnd) {
              return moment(date).isBefore(dateEnd);
          },
          isBetween: function(dateStart, dateEnd, dateToCheck) {
              var _dateStart = moment(dateStart);
              var _dateEnd = moment(dateEnd);
              var _dateToCheck = moment(dateToCheck);

              return moment(_dateToCheck).isBefore(_dateEnd) && moment(_dateToCheck).isAfter(_dateStart);
          },
          isAfter: function() {
            return moment($rootScope.checkOutDate).isAfter($rootScope.checkInDate);
          },
          isWeekEnd: function(date) {
              var day = moment(date).day();
              return day == 0 || day == 6;
          },
          setDefaultDates: function() {
              $rootScope.checkInDate = null;
              $rootScope.checkOutDate = null;
          },
          getDateDuration: function(startMoment, endMoment) {
              var duration = (endMoment) ? endMoment.diff(startMoment, 'days') : 0;
              return (isNaN(duration) || duration < 0) ? 0 : duration;
          },
          getReservedDuration: function() {
              var start = moment($rootScope.checkInDate);
              var end = moment($rootScope.checkOutDate);
              return this.getDateDuration(start, end);
          },
          incrementMoment: function(moment, days) {
              var days = days || 1;
              return moment.add(days, 'days');
          },
          isDateRangeValid: function(end) {
              var startMoment = moment($rootScope.checkInDate);
              var endMoment = (end) ? moment(end) : moment($rootScope.checkOutDate);
              var isValidRange = endMoment && endMoment.isAfter(startMoment);

              if (isValidRange) {
                var tmpMoment = startMoment;
                for (var i = 1; i < this.getDateDuration(startMoment, endMoment); i++) {
                    var str = tmpMoment.format('YYYY-MM-DD');
                    if (this.isDateBooked(str)) {
                      $rootScope.checkOutDate = null;
                      return false;
                    }
                    tmpMoment = this.incrementMoment(tmpMoment);
                }
              }
              return isValidRange;
          },
          isDateBooked: function(date) {
              var start, end, range, isBooked = false;
              var bookedDates = $rootScope.bookedDates;

              for (var i = 0; i < bookedDates.length; i++) {
                start = moment(bookedDates[i].startDate);
                end = moment(bookedDates[i].endDate);
                range = moment().range(start, end);

                isBooked = range.contains(date);
                if (isBooked == true) {break;}
              }
              return isBooked;
          },
          isAfterToday: function(currentDate) {
              return moment(currentDate).isAfter(today);
          },
          zeroPad: function (num, places) {
              var zero = (places || 2) - num.toString().length + 1;
              return Array(+(zero > 0 && zero)).join("0") + num;
          }
      };
  }]);

  appServices.factory('reservationService', ['$rootScope', 'recService', function($rootScope, recService) {
      var reservationService = {};

      reservationService.message = '';
      reservationService.siteDetail = [];
      reservationService.siteGallery = [];

      reservationService.prepForBroadcast = function(id) {
          this.message = id;
          recService.filterSites(id, function(results) {
              reservationService.siteDetail = results;
          });

          recService.getSiteGallery(function(results) {
              reservationService.siteGallery = results;
          });
          this.broadcastItem();
      };

      reservationService.broadcastItem = function() {
          $rootScope.$broadcast('handleReserveSite');
      };

      return reservationService;
  }]);

}());