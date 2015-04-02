/// <reference path="RecreationCore.ts"/>

class KinsailRecServer implements RecreationServer { 
    private http;
    private config;
    private domain: string;
    private port: string;
    private primaryPath: string;
    private secondaryPath: string;
    private locationId: string;
    private url: string;

    constructor(http, config) {
        this.http = http;
        this.config = config;
        this.domain = this.config.domain;
        this.port = (this.config.port) ? ':' + this.config.port : '';
        this.locationId = this.config.locationId || '';
        this.primaryPath = this.config.primaryPath || '';
        this.url = this.domain + this.port + this.primaryPath + this.locationId
    }

    siteAttributes: FeatureAttribute<any>[] = [
        new FeatureAttribute<boolean>("handicapAccessible", false, "Handicap accessible"), // Is this site handdicap accessible 
        new FeatureAttribute<boolean>("electricHookup", false, "Electric hook-up"),  // Does this site have electric hookup
        new FeatureAttribute<boolean>("septicHookup", false, "Septic hook-up"), // Does this site have a sewage / septic hookup.
        new FeatureAttribute<boolean>("generatorsAllowed", false, "Generators allowed"), // does this site permit the use of generators.
        new FeatureAttribute<boolean>("parkingLevel", false, "Parking level"), // Defines whether the parking area is level
        new FeatureAttribute<boolean>("boatAccessible", false, "Boat accessible"), // Is this site adjacent to a boat slip
        new FeatureAttribute<boolean>("horseAccomodation", false, "Horse accommodations"), // Site support the stay of horses
        new FeatureAttribute<boolean>("petsAllowed", false, "Pets allowed"), // Whether pets are allowed during the stay at the site.
        new FeatureAttribute<number>("maxOccupants", 5, "Maximum occupants"), // the maximum number of people who may stay at this site
        new FeatureAttribute<number>("minOccupants", 1, "Minimum occupants"), // The mimimum number of people who may stay at this site.
        new FeatureAttribute<number>("parkingLength", 25, "Parking length"), // The length in feet of the parking area.
        new FeatureAttribute<SurfaceType>("parkingSurface", SurfaceType.gravel, "Parking surface"),  // The parking surface type
        new FeatureAttribute<ShadeType>("shade", ShadeType.full, "Shade") // The type of shade available at the site.
    ];

    getSiteAttributeList() {
        return this.siteAttributes;
    }

    siteTypes: FeatureAttribute<any>[] = [
        new FeatureAttribute<SiteType>("tent", SiteType.tentSite, "Tent"), // Tent Site
        new FeatureAttribute<SiteType>("rv", SiteType.rvSite, "RV"), //Recreational Vehicle (RV) Site
        new FeatureAttribute<SiteType>("picnicShelter", SiteType.picnicShelter, "Picnic Shelter"), // Picnic Shelter
        new FeatureAttribute<SiteType>("grouptent", SiteType.groupTentSite, "Group Tent"), // Group Tent Site
        new FeatureAttribute<SiteType>("trailer", SiteType.trailerSite, "Trailer"), // Trailer site
        new FeatureAttribute<SiteType>("cabin", SiteType.cabin, "Cabin"), // Cabin Site
        new FeatureAttribute<SiteType>("boat", SiteType.boat, "Boat"), // Boat Site
        // new FeatureAttribute<SiteType>("yurt", SiteType.yurt, "Yurt") // Yurt Site
    ];
    
    getSiteTypeList() {
        return this.siteTypes;
    }

    shadeTypes:FeatureAttribute<ShadeType>[] = [
        new FeatureAttribute<ShadeType>("none", ShadeType.none, "None"),
        new FeatureAttribute<ShadeType>("full", ShadeType.full, "Full"),
        new FeatureAttribute<ShadeType>("partial", ShadeType.partial, "Partial")
    ];

    getShadeType() {
        return this.shadeTypes;
    }

    getLocationDetail(locationObjectId: number, callback: ASyncReply<LocationDetail>): void {
        this.url;
        var responsePromise = this.http.get(this.url + '/details');
        console.log(this.url + '/details');
        responsePromise.success(function(data, status, headers, config) {
            callback.success(data);
        });
        responsePromise.error(function(data, status, headers, config) {
            console.log('Server response error site detail: ', data);
        });
    }

    getSiteDetail(siteObjectId: number, callback: ASyncReply<SiteDetail>): void {
        var responsePromise = this.http.get(this.url + '/sites/' +  (siteObjectId).toString() + '/details');
        responsePromise.success(function(data, status, headers, config) {
            callback.success(data);
        });
        responsePromise.error(function(data, status, headers, config) {
            console.log('Server response error site detail: ', data);
        });
    }
 
    filterSitesByExample(query: Query<SiteDetail>, reservationStart: Date, reservationEnd: Date, callback: ASyncReply<QueryResults<SiteBasic>>): void {
        var params = '';
        var amp = '';
        if (query) {
            params = '/details?';
            if(query.criteria.type) {
                params += 'type:or=' + query.criteria.type; 
            }
            if (query.criteria.features) {
                for (var i = 0; i < query.criteria.features.length; i++) {
                    amp = (i > 0 || query.criteria.type) ? '&' : '';
                    params += amp + query.criteria.features[i].name + '=1';
                }
            }
            if (reservationStart && reservationEnd) {
                amp = (query.criteria.type || query.criteria.features) ? '&' : '';
                params += amp + 'AvailableStartDate=' + reservationStart + '&AvailableEndDate=' + reservationEnd;
            }
        }
        console.log(this.url + '/sites' + params);
        var responsePromise = this.http.get(this.url + '/sites' + params);
        responsePromise.success(function(data, status, headers, config) {
            callback.success(data);
        });
        responsePromise.error(function(data, status, headers, config) {
          console.log("filterSitesByExample failed!");
        });
    }

    getSiteAvailability(siteObjectId: number, callback: ASyncReply<SiteAvailability>): void {
        var responsePromise = this.http.get(this.url + '/sites/' +  (siteObjectId).toString() + '/availability');
        responsePromise.success(function(data, status, headers, config) {
            callback.success(data);
        });
        responsePromise.error(function(data, status, headers, config) {
          console.log("filterSitesByExample failed!");
        });
    }

    getActivities(query: Query<Activity>, callback: ASyncReply<QueryResults<Activity>>): void {}

    getReviews(query: Query<Review>, callback: ASyncReply<QueryResults<Review>>): void {}

    getEvents(query: Query<EventDetail>, callback: ASyncReply<QueryResults<EventDetail>>): void {}

    makeReservation(intinerary: ItineraryCart, callback: ASyncReply<ReservationResults>): void {}

    getBasicItinerary(query: Query<number>, callback: ASyncReply<QueryResults<ItineraryBasic>>): void {}

    getLocationGallery(query: Query<number>, callback: ASyncReply<QueryResults<GalleryImage>>): void {
        var responsePromise = this.http.get(this.url + '/details');

        responsePromise.success(function(data, status, headers, config) {
            callback.success(data);
        });
        responsePromise.error(function(data, status, headers, config) {
          console.log("getLocationGallery failed!");
        });
    }

    getSiteGallery(query: Query<number>, callback: ASyncReply<QueryResults<GalleryImage>>): void {}

}