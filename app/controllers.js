'use strict';

/* Controllers */
(function() {
    var mainController = angular.module('mainController', []);
 
    /**
     * MainController
     */
    mainController.controller('MainCtrl', MainCtrl);
    MainCtrl.$inject = ['$window', '$rootScope', '$scope', '$compile', '$modal', '$http',
                        '$timeout', '$activityIndicator', 
                        'calService', 'recService', 'filterFilter', 
                        'leafletEvents', 'leafletData', 'leafletBoundsHelpers', 'appConfig'];
    function MainCtrl($window, $rootScope, $scope, $compile, $modal, $http, $timeout, $activityIndicator, calService, recService, filterFilter, leafletEvents, leafletData, leafletBoundsHelpers, appConfig) {
        $rootScope.locationId = recService.getLocationId();
        $rootScope.siteGallery = [];
        $scope.baseUrl = $rootScope.locationId;
        $rootScope.mapZoomMin = 17;
        $rootScope.mapZoomMax = 19;
        $rootScope.zoomDefault = 17;

        recService.getLocationDetail($rootScope.locationId, function(results) {
            $scope.baseUrl = results.baseUrl || $rootScope.locationId;
            $rootScope.locationName = results.title;
            $rootScope.locationCityState = results.address.city + ', ' + results.address.state;
            $rootScope.locationState = results.address.state;
            $rootScope.locationFeatures = results.features;
            $rootScope.locationDescription = results.description;

            $rootScope.groupId = results.groupId;
            $rootScope.partnerCode = results.partnerCode;
            $rootScope.partnerType = results.partnerType;
            $rootScope.itemId = '';
            recService.getLocationGallery(function(results) {
                $rootScope.locationGallery = results.photos;
            });

            $rootScope.mapZoomMin = results.map.zoomMin;
            $rootScope.mapZoomMax = results.map.zoomMax;
            $rootScope.zoomDefault = results.map.zoomDefault;

            // console.log('locationId: %o', $rootScope.locationId);
            // console.log('result: %o', results);
        });

        $scope.url = appConfig.domain + ':' + appConfig.port;
        $scope.urlDomain = appConfig.domain + '/';
        $scope.urlRegisterPath = 'secure/register/begin.asp';
        $scope.urlBaseImage = $scope.baseUrl + '/resources/images/';
        $scope.urlThumbImage = $scope.urlBaseImage + 'thumb/';
        $scope.logo = $scope.urlBaseImage + 'logo.png';
        $scope.logo_secondary = $scope.urlBaseImage + 'logo_secondary.png';
        $scope.photo = ($rootScope.locationId == 851899) ? 'scenic_24.jpg' : 'scenic_16.jpg';
        $scope.backgroundPhoto = $scope.urlBaseImage + $scope.photo;
        $scope.loginMsg = 'Login/Sign Up';
        $scope.AILoading = false;
        $scope.menuLogin = false;
        $scope.menuItinerary = false;
        $scope.menuDateFilter = false;
        $scope.menuSiteFilter = false;
        $scope.menuAttributeFilter = false;
        $scope.isCheckoutDisabled = false;

        $scope.keyup = function($event) {
            if($event.keyCode == 27) {
                $rootScope.closeMenus($event);
            }
        };
        $scope.doLogin = function($event) {
            $scope.AILoading = true;
            $rootScope.closeMenus($event);
            $timeout($scope.hideLoading, 500);
        };

        $scope.hideLoading = function() {
            $scope.loginMsg = "Welcome "
            $scope.AILoading = false;
        };

        $scope.cancelBubble = function($event) {
            $event.stopPropagation();
        };

        $rootScope.closeMenus = function($event, bodyClick) {
            if($event) {
                $event.stopPropagation();
            }
            $scope.menuLogin = false;
            $scope.menuItinerary = false;
            if(!bodyClick) {
                $scope.menuDateFilter = false;
            }
            $scope.menuSiteFilter = false;
            $scope.menuAttributeFilter = false;
        };

        $scope.toggleLoginMenu = function($event) {
            $event.stopPropagation();
            if($scope.menuLogin) {
                $scope.menuLogin = false;
            } else {
                $rootScope.closeMenus($event);
                $scope.menuLogin = true;
            }
        };

        $scope.toggleItineraryMenu = function($event) {
            $event.stopPropagation();
            $scope.itinerary = recService.getBasicItinerary(function(results) {
                $scope.itinerary = results;
                // console.log($scope.itinerary);
            });
            if($scope.menuItinerary) {
                $scope.menuItinerary = false;
            } else {
                $rootScope.closeMenus($event);
                $scope.menuItinerary = true;
            }
        };

        $scope.toggleDateFilterMenu = function($event) {
            $event.stopPropagation();
            if($scope.menuDateFilter == true) {
                $scope.menuDateFilter = false;
            } else {
                $rootScope.closeMenus($event);
                $scope.menuDateFilter = true;
            }
        };

        $scope.toggleSiteFilterMenu = function($event) {
            $event.stopPropagation();
            if($scope.menuSiteFilter) {
                $scope.menuSiteFilter = false;
            } else {
                $rootScope.closeMenus($event);
                $scope.menuSiteFilter = true;
            }
        };

        $scope.toggleAttributeFilterMenu = function($event) {
            $event.stopPropagation();
            if($scope.menuAttributeFilter) {
                $scope.menuAttributeFilter = false;
            } else {
                $rootScope.closeMenus($event);
                $scope.menuAttributeFilter = true;
            }
        };

        $scope.closeMenu = function ($event) {
            // $rootScope.closeMenus($event);
        };

        $rootScope.checkout = function($event) {
            var url = $scope.urlDomain + $scope.urlRegisterPath;
            url += '?p=' + $rootScope.partnerCode;
            url += '&pt=' + $rootScope.partnerType;
            url += '&GroupID=' + $rootScope.groupId;
            url += '&ItemID=' + $rootScope.siteDetail.siteId;
            url += '&Item' + $rootScope.locationId + 'Quantity=' + calService.getReservedDuration();
            url += '&ArrivalDate=' + $rootScope.checkInDate;
            url += '&DepartureDate=' + $rootScope.checkOutDate;
            url += '&SiteName=' + $rootScope.siteDetail.siteIdentifier;

            $rootScope.closeMenus($event);
            $rootScope.closeSiteDetail();
            // $scope.logCheckout(url);
            $window.location.href = url;
        };

        $scope.logCheckout = function(url) {
            console.log('arrive: ', $rootScope.checkInDate);
            console.log('depart: ', $rootScope.checkOutDate);
            console.log('duration: ', calService.getReservedDuration());
            console.log('Name: ', $scope.siteName);
            console.log('URL: ', url);
        };

    };

    /**
     * Controller for top navigation bar
     */
    mainController.controller('NavBarCtrl', function () {
        this.isCollapsed = true;
    });

    /**
     * Map Controller
     */
    mainController.controller('SiteMapCtrl', SiteMapCtrl);
    SiteMapCtrl.$inject = ['$rootScope', '$scope', '$compile', '$modal', '$location', 'recService', 'calService', 'filterFilter', '$activityIndicator',
                           'leafletEvents', 'leafletData', 'leafletBoundsHelpers'];
    function SiteMapCtrl($rootScope, $scope, $compile, $modal, $location, recService, calService, filterFilter, $activityIndicator, leafletEvents, leafletData, leafletBoundsHelpers) {

        var markerPopupWidth = 225;
        var markerPopupHeight = 150;

        $scope.siteList = [];
        $scope.filterValues = [];
        $scope.activeMarker = null;
        $scope.filterAttributeActive = false;
        $scope.filterDateActive = false;
        $scope.filters = {
            types: [],
            attributes: [],
            shadeTypes: [
              {name: 'None', value: 0},
              {name: 'Full', value: 1},
              {name: 'Partial', value: 2},
              {name: 'All', value: 3},
            ],
            availability: {
                reservationStart: moment().format('L'),
                reservationEnd: moment().add(1, 'days').format('L')
            }
        };

        $scope.shadeTypes = [
              {name: 'None', value: 0},
              {name: 'Full', value: 1},
              {name: 'Partial', value: 2},
              {name: 'All', value: 3},
        ];
        // $scope.selectedShadeType = $scope.filters.shadeTypes[3].value;

        $scope.applyFilter = function ($event, filterActive) {
            $scope.markers = {};
            $scope.filterAttributeActive = filterActive || false;
            if($scope.applyDateFilter == true) {
                $scope.applyDateFilter($event, filterActive);
            } else {                
                recService.filterSitesByExample(function(results) {
                    $scope.siteList = results;
                    $scope.addMarkers();
                }, $scope.siteDetailForQuery);
                $rootScope.closeMenus($event);
            }
        };

        recService.filterSitesByExample(function(results) {
            $scope.siteList = results;
            $scope.siteListOriginal = results;
            $scope.siteTypes = recService.getSiteTypeList();
            $scope.siteAttributes = recService.getSiteAttributeList();
            $scope.siteDetailForQuery = recService.getSiteDetailForFilter();
            $scope.checkAllTypes();
            $scope.filterValuesType = [];
            $scope.setSiteTypes();
            $scope.addMarkers();
        });

        $scope.applyDateFilter = function ($event, filterActive) {
            var availableStartDate = moment($scope.filters.availability.reservationStart).format('YYYY-MM-DD');
            var availableEndDate = moment($scope.filters.availability.reservationEnd).format('YYYY-MM-DD');
            $scope.filterDateActive = filterActive || false;
            $scope.markers = {};
            recService.filterSitesByExample(function(results) {
                $scope.siteList = results;
                $scope.addMarkers();
            }, $scope.siteDetailForQuery, {reservationStart: availableStartDate, reservationEnd: availableEndDate});
            $rootScope.closeMenus($event);
        };

        $scope.resetDateFilter = function ($event) {
            $scope.filters.availability.reservationStart = moment().format('L');
            $scope.filters.availability.reservationEnd = moment().add(1, 'days').format('L');
            $scope.filterDateActive = false;
            $scope.applyDateFilter($event);
        };

        $scope.checkAllTypes = function() {
            $scope.filters.types = angular.copy($scope.siteTypes);
            $scope.siteDetailForQuery.criteria.type = null;
        };

        $scope.unCheckAllAttributes = function() {
            $scope.filters.attributes = [];
            $scope.siteDetailForQuery.criteria.features = $scope.filters.attributes;
        };

        $scope.resetFilterSites = function(event) {
            $scope.filterAttributeActive = false;
            $scope.siteList = $scope.siteListOriginal;
            $scope.checkAllTypes();
            $scope.unCheckAllAttributes();
            $scope.applyFilter(event);
        };

        $scope.filterSitesByDate = function(event, attribute) {
            $scope.siteDetailForQuery.criteria.features = $scope.filters.attributes;
        };

        $scope.filterSitesByType = function(event, attValue) {
            var typeValue = 0;
            attValue = (attValue) ? parseInt(attValue) : null;
            if (attValue) {            
                var idx = $scope.filterValuesType.indexOf(attValue);
                if (event.target.checked) {
                    $scope.filterValuesType.push(attValue);
                } else if (attValue != null) {
                    $scope.filterValuesType.splice(idx, 1);
                }
            } else {
                $scope.setSiteTypes();
            }
            
            // console.log($scope.filters.types);
            angular.forEach($scope.filterValuesType, function(value, key) {
                typeValue += parseInt(value);
            });
            $scope.filterAttributeActive = true;
            $scope.siteDetailForQuery.criteria.type = typeValue;
            $scope.siteDetailForQuery.criteria.features = null;
        };

        $scope.setSiteTypes = function() {
            $scope.filterValuesType = [];
            angular.forEach($scope.siteTypes, function(value, key) {
                $scope.filterValuesType.push(value.value);
            });
        };

        $scope.selectedShadeType = 3;
        $scope.filterShadeType = function() {
            console.log('selectedShadeType: ' + $scope.selectedShadeType);
            // recServer.getFeatureAttribute($scope.filters.attributes.push({name: 'shadeType', value: $scope.selectedShadeType.value, description: 'Shade Type'});
            $scope.siteDetailForQuery.criteria.features = $scope.filters.attributes;
        };

        $scope.filterSitesByAttribute = function(event) {
            $scope.siteDetailForQuery.criteria.features = $scope.filters.attributes;
        };

        $scope.isTypeCheckbox = function(type) {
            return typeof type === 'boolean';
        };

        $scope.isTypeNumber = function(type) {
            return typeof type === 'number';
        };

        $scope.isTypeInput = function(type) {
            return type === 'maxOccupants';
        }

        $scope.isTypeSelect = function(type) {
            return type === 'shade';
        }

        $scope.getMarkerIcon = function(type) {
            var obj = recService.getMarkerIcon(type);
            var className = "fa fa-" + obj.icon;
            return className;
        }

        $scope.getFeatureIcon = function(type) {
            var obj = recService.getFeatureIcon(type);
            var className = "fa fa-" + obj.icon;
            return className;
        }

        // Calculate the marker popup offset if the popup is too close to maxbound coordinates
        $scope.getOffset = function(lat, lng) {
            var point = {
                x: 0,
                y: -45
            };
            var maxH = (markerPopupWidth/2) - 25;
            
            if (lat > 68) {
                point.y = markerPopupHeight - 5;
            }
            if (lng > 55) {
                point.x = -maxH;
            }
            if (lng < -130) {
                point.x = maxH;
            }
            return point;
        };

        // Calculate the marker arrow location
        $scope.getCSS = function(lat, lng) {
            var posX = 'center';
            var posY = (lat > 68) ? 'top' : 'bottom';
            if (lng > 55) {
                posX = 'right';
            }
            if (lng < -130) {
                posX = 'left';
            }
            return 'markerPopup ' + posY + '_'  + posX;
        };

        $scope.addMarkers = function(){
            $scope.markers = {};
            for (var i = 0; i < $scope.siteList.length; i++) {
                var site = $scope.siteList[i];
                var coordLat = site.coords.Y;
                var coordLng = site.coords.X;
                var marker = {};
                var _icon = recService.getMarkerIcon(site.type, $scope.getOffset(coordLat, coordLng));
                var _className = $scope.getCSS(coordLat, coordLng);

                marker['details'] = site;
                marker['lat'] = coordLat;
                marker['lng'] = coordLng;
                marker['draggable'] = false;
                marker['popupOptions'] = {
                    'keepInView': true,
                    // 'autoPan': true,
                    'maxWidth': markerPopupWidth,
                    'className': _className
                };
                marker['icon'] = _icon;
                marker['message'] = '<site-marker-popup-content></site-marker-popup-content>';
                $scope.markers[site.siteId] = marker;
            }
        };

        $rootScope.updateSiteGallery = function() {
            $rootScope.siteGallery = [];
            var siteDetail = $rootScope.siteDetail;
            if (siteDetail) {
                if (siteDetail.image && siteDetail.image.fullImageUrl) {
                    $rootScope.siteGallery.push(siteDetail.image.fullImageUrl);
                }

                if (siteDetail.photos) {
                    for (var i = 0; i < siteDetail.photos.length; i++) {
                        $rootScope.siteGallery.push(siteDetail.photos[i].fullImageUrl);
                    }
                }
            }
        };

        $scope.setActiveMarker = function(siteId) {
            $scope.activeMarker = $scope.markers[siteId];
        };

        $scope.selectMarker = function(siteId) {
            $scope.setActiveMarker(siteId);
            $scope.activeMarker.focus = true;
        };

        $scope.openMarkerPopup = function(siteId, _node) {
            if(siteId) {
                var marker = $scope.markers[siteId];
                // console.log('coords: {X: ' +  marker.details.coords.X + ', Y:' + marker.details.coords.Y + '}, lat: ' + marker.lat + ', lng: ' + marker.lng + '}');
                $scope.setActiveMarker(siteId);
                if ($scope.markers[siteId].focus) {                
                    recService.getSiteDetail(siteId, function(result) {
                        $rootScope.siteDetail = result;
                        $rootScope.updateSiteGallery();
                        $scope.detailFeatureIcons = [];
                        $scope.detailFeatureBullets = [];
                        if($rootScope.siteDetail && $rootScope.siteDetail.features) {
                            $scope.detailFeatureList = $rootScope.siteDetail.features || [];
                            angular.forEach($scope.detailFeatureList, function(value, key) {
                                var icon = recService.getFeatureIcon(value.name);
                                //FIXME value description and icon need to be tied together.
                                $scope.detailFeatureIcons.push(icon);
                                $scope.detailFeatureBullets.push(value.bullet);
                            });
                            
                            var childscope = $scope.$new();
                            var thumb = $scope.urlBaseImage + 'site/thumb/' + $scope.siteDetail.image.thumbUrl;
                            childscope.marker = marker;
                            childscope.siteThumbnail = thumb;
                            $compile(_node)(childscope);
                        }
                    });
                }
            }
        };

        $scope.$on('leafletDirectiveMarker.popupopen', function(e, args) {
            var siteId = args.markerName;
            var _node = args.leafletEvent.popup._contentNode;
            $scope.openMarkerPopup(siteId, _node);
        });

// Click map to determine coordinates
        $scope.events = {
            map: {
                enable: ['click'],
                logic: "broadcast"
            }
        };

        $scope.$on("leafletDirectiveMap.click", function(event, args) {
            console.log("LatLng: " + args.leafletEvent.latlng.lat + ', ' + args.leafletEvent.latlng.lng);
        });

        $scope.openSiteDetail = function(siteId) {
            $scope.activeMarker.focus = false;
            recService.getSiteAvailability(siteId, function(result) {
                $location.path("/detail/" + siteId);
                $rootScope.bookedDates = result.bookedRanges;
                window.setTimeout(function(){ 
                    $rootScope.updateAvailabilityDisplay();
                }, 1);
            });
        };

        angular.extend($scope, {
            markers: $scope.markers,
            // defaultCenter : {
            //     lat: -98.64499,
            //     lng: 34.71739,
            //     zoom : $rootScope.mapZoomMin
            // },
            tiles: {
                url: $scope.urlBaseImage + 'map/{z}/{x}/{y}.png'
            },
            defaults : {
                tileLayerOptions : {
                    reuseTiles : true,
                    noWrap : true
                },
                scrollWheelZoom : true,
                attributionControl : false,
                minZoom : $rootScope.mapZoomMin,
                maxZoom : $rootScope.mapZoomMax
            }
        });


        // $scope.$watch("defaultCenter.zoom", function(zoom) {
        //     $scope.tiles.url = (zoom < 19)
        //             ? $scope.urlBaseImage + 'map/{z}/{x}/{y}.png'
        //             //"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //             : $scope.urlBaseImage + 'map/{z}/{x}/{y}.png';
        // });

        $scope.setMapBounds = function() {
            leafletData.getMap().then(
            function(map) {
// FIXME set Fawn Creek  center
//"centerX": 34.719948230364345
//"centerY": -98.70809197425841
//Fawn Creek bounding box
                var southWest = L.latLng(34.7160, -98.7120);
                var northEast = L.latLng(34.7260, -98.6920);
                var center = L.latLng(34.719948230364345, -98.70809197425841);

                if($rootScope.locationId == 851899) {                    
//Doris bounding box
// FIXME set Fawn Creek  center
//"centerX": 34.71788907992521
//"centerY": -98.64553213119507
                    var southWest = L.latLng(34.714875, -98.650030);
                    var northEast = L.latLng(34.719908, -98.639955);
                    var center = L.latLng(34.71788907992521, -98.64553213119507);
                }

                var bounds = L.latLngBounds(southWest, northEast);
                map.setMaxBounds(bounds);
                map.panTo(center);
                // map.setView(center, $rootScope.mapZoomMin);


            });
        };
        $scope.setMapBounds();
    };

    /**
     * Site Reservation Controller
     */
    mainController.controller('SiteDetailCtrl', SiteDetailCtrl);
    SiteDetailCtrl.$inject = ['$rootScope', '$scope', '$window', '$location', '$routeParams', 'recService', 'calService'];
    function SiteDetailCtrl($rootScope, $scope, $window, $location, $routeParams, recService, calService) {
        var id = $routeParams.siteId;
        if ($rootScope.siteDetail) {
            $scope.minDuration = 2;
            $scope.checkoutBtnDisabled = true;
            calService.setDefaultDates();

            $rootScope.calculateCost = function() {
                var cost = 0;
                var costStartDate, costEndDate;
                var date = $rootScope.checkInDate;
                var departDate = $rootScope.checkOutDate;
                var duration = calService.getReservedDuration();
                var suffix = (duration > 1) ? ' nights' : ' night';
                $scope.subTotalText = '(' + duration + suffix + ') Subtotal: ';

                angular.forEach($rootScope.siteDetail.cost.periods, function(value, key) {
                    var year = moment(date).year();
                    costStartDate = value.startMonth + '/' + value.startDay + '/' + year;
                    costEndDate = value.endMonth + '/' + value.endDay + '/' + year;
                    for (var i = 0; i < duration; i++) {
                        if(calService.isBetween(costStartDate, costEndDate, date) && calService.isBeforeDeparture(date, departDate)) {
                            if(calService.isWeekEnd(date)) {
                                cost += value.weekendRate;
                            } else {
                                cost += value.weekdayRate;
                            }
                        } else {
                            cost = duration * 5;
                            // console.log('cost: ', cost);
                        }
                        date = moment(date).add(1, 'days').format('L');
                    }
                });
                $scope.reserveCost = cost;
                if(duration > $scope.minDuration) {
                    $scope.checkoutBtnDisabled = false;
                } else {
                    if (departDate != null && (duration < $scope.minDuration)) {
                        $scope.rangeMsg = 'Minimum of ' + $scope.minDuration + ' nights.';
                    }
                    $scope.checkoutBtnDisabled = true;
                }
            };
            $rootScope.calculateCost();

            $scope.detailFeatureList = $rootScope.siteDetail.features;
            $scope.carouselIndex = 0;
            $scope.rate = 4;
            $scope.max = 5;
            $scope.isReadonly = true;
            $scope.reviewListAverage = 4;
            $scope.totalRatings = '(2)';
            // $rootScope.updateSiteGallery();
        };

        $rootScope.closeSiteDetail = function () {
            $scope.checkoutBtnDisabled = true;
            $location.path("/");
        };

        $scope.clear = function ($event) {
            $scope.dateArrive = null;
            $scope.dateDepart = null;
            $scope.closeMenu($event);
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return false; //( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.dateArrive; //$scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

    };

    /**
     * My Itinerary Controller
     */
    mainController.controller('ItineraryCtrl', ItineraryCtrl);
    ItineraryCtrl.$inject = ['$scope'];
    function ItineraryCtrl($scope) {
        // $scope.AILoading = true;
        $scope.itinerary = recService.getBasicItinerary(function(results) {
            console.log($scope.itinerary);
            $scope.itinerary = results;
        });
        $scope.isDisabled = false; //!$scope.itinerary.length;
    };

    /**
     * My Itinerary Controller
     */
    mainController.controller('CalendarCtrl', CalendarCtrl);
    CalendarCtrl.$inject = ['$scope', 'calService'];
    function CalendarCtrl($scope, calService) {
    };

    /**
     * Site Ratings Controller
     */
    mainController.controller('SiteRatingCtrl', SiteRatingCtrl);
    SiteRatingCtrl.$inject = ['$scope', 'recService'];
    function SiteRatingCtrl($scope, recService) {
        $scope.AILoading = true;
        $scope.rate = 4;
        $scope.max = 5;
        $scope.isReadonly = true;
        $scope.reviewListAverage = 4;
        $scope.reviewList = [];

        recService.getReviewList(function(results) {
            $scope.reviewList = results;
            $scope.AILoading = false;
        });
            
        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [ {
            stateOn : 'glyphicon-star',
            stateOff : 'glyphicon-star-empty'
        }];
    };

    /**
     * Location Photo Gallery Controller
     */
    mainController.controller('LocPhotoGalleryCtrl', LocPhotoGalleryCtrl);
    LocPhotoGalleryCtrl.$inject = ['$scope', 'recService'];
    function LocPhotoGalleryCtrl($scope, recService) {
        $scope.AILoading = true;

        // recService.getLocationGallery(function(results) {
        //     $scope.AILoading = false;
        //     $scope.locationGallery = results.photos;
        // });
    };

}());