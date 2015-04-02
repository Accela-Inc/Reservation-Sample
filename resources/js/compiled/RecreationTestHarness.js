var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//Recreation Server API
/**
* Represents an address within the United States
*/
var Address = (function () {
    function Address() {
    }
    return Address;
})();

/**
* A Gallery Image has an Icon representation for a full sized image
*/
var GalleryImage = (function () {
    //constructor();
    function GalleryImage(iconUrl, fullImgUrl) {
        this.icon = iconUrl;
        this.fullImage = fullImgUrl;
    }
    return GalleryImage;
})();

/**
* Captures information about the attribute of a Site or Location
*/
var FeatureAttribute = (function () {
    //    constructor(); //default ctor
    //    constructor(name?: string, value?:T);
    function FeatureAttribute(name, value, desc) {
        this.name = name;
        this.value = value;
        this.description = desc;
    }
    return FeatureAttribute;
})();

/**
* A LocationDetail contains all the information for a given location.
* For example: A Campground's name, address, etc
*/
var LocationDetail = (function () {
    function LocationDetail() {
    }
    return LocationDetail;
})();

/**
* Defines a reservable type of site
*/
var SiteType;
(function (SiteType) {
    SiteType[SiteType["tentSite"] = 1] = "tentSite";
    SiteType[SiteType["rvSite"] = 2] = "rvSite";
    SiteType[SiteType["picnicShelter"] = 4] = "picnicShelter";
    SiteType[SiteType["groupTentSite"] = 8] = "groupTentSite";
    SiteType[SiteType["trailerSite"] = 16] = "trailerSite";
    SiteType[SiteType["cabin"] = 32] = "cabin";
    SiteType[SiteType["boat"] = 64] = "boat";
    SiteType[SiteType["yurt"] = 128] = "yurt";
})(SiteType || (SiteType = {}));

/**
* A Cost Period defines a period of time within a calendar year,
*   and the associated rates to reserve the site on a daily basis.
*/
var CostPeriod = (function () {
    function CostPeriod(startMonth, startDay, endMonth, endDay, minDur, weekdayRate, weekendRate, notAvailable) {
        this.startMonth = startMonth;
        this.startDay = startDay;
        this.endMonth = endMonth;
        this.endDay = endDay;
        this.minimumDuration = minDur;
        this.weekdayRate = weekdayRate;
        this.weekendRate = weekendRate;
        this.notAvailable = notAvailable;
    }
    return CostPeriod;
})();

/**
* A Cost Structure defines several CostPeriods and the available rates.
* A Cost Structure may have one or more overlapping CostPeriods if the CostPeriod's
*  Distinguish themselves with different minimumDuration values.
* When calculating a total cost, it is necessary to select the appropriate cost period
*  based on the duration of the reservation.
*/
var CostStructure = (function () {
    function CostStructure(periods) {
        this.periods = periods;
    }
    /**
    * Calculates the cost of a reservation based on the reservation Start/End dates
    *  and the defined CostPeriods of the Site.
    */
    CostStructure.prototype.calculateCost = function (startDate, endDate) {
        //TODO: Implement correctly
        return (endDate.getTime() - startDate.getTime()) * 25;
    };
    return CostStructure;
})();

/**
* Represents the Lat and Lng coordinate values on a map.
*/
var MapCoordinates = (function () {
    function MapCoordinates() {
    }
    return MapCoordinates;
})();

/**
* Defines a type of surface, for drive ways, tent pads, etc.
*/
var SurfaceType;
(function (SurfaceType) {
    SurfaceType[SurfaceType["gravel"] = 0] = "gravel";
    SurfaceType[SurfaceType["pavement"] = 1] = "pavement";
    SurfaceType[SurfaceType["dirt"] = 2] = "dirt";
})(SurfaceType || (SurfaceType = {}));

/**
* Defines the type of shade available at a particular site.
*/
var ShadeType;
(function (ShadeType) {
    ShadeType[ShadeType["none"] = 0] = "none";
    ShadeType[ShadeType["full"] = 1] = "full";
    ShadeType[ShadeType["partial"] = 2] = "partial";
})(ShadeType || (ShadeType = {}));

/**
* Defines basic information about a reservable site.
*/
var SiteBasic = (function () {
    function SiteBasic() {
    }
    return SiteBasic;
})();

/**
* Extended details for a specific site
*/
var SiteDetail = (function (_super) {
    __extends(SiteDetail, _super);
    function SiteDetail() {
        _super.apply(this, arguments);
    }
    return SiteDetail;
})(SiteBasic);

/**
* An Activity specifies something a customer can "do" while at a given location.
*/
var Activity = (function () {
    function Activity() {
    }
    return Activity;
})();

/**
* An event is much like an activity except it has a definitive start/end date.
*/
var EventDetail = (function (_super) {
    __extends(EventDetail, _super);
    function EventDetail() {
        _super.apply(this, arguments);
    }
    return EventDetail;
})(Activity);

/**
* Specifies a leg on an itinerary, where a customer is staying, and for how long.
*  also keeps track of selected activities.
*/
var ItineraryBasic = (function () {
    function ItineraryBasic() {
    }
    return ItineraryBasic;
})();

/**
* Itinerary detail provides more information about an itinerary which would not be readily available.
*/
var ItineraryDetail = (function (_super) {
    __extends(ItineraryDetail, _super);
    function ItineraryDetail() {
        _super.apply(this, arguments);
    }
    return ItineraryDetail;
})(ItineraryBasic);

/**
* Collection of ItineraryBasic objects.
*/
var ItineraryCart = (function () {
    function ItineraryCart() {
    }
    return ItineraryCart;
})();

/**
* A user of the system
*/
var RecUser = (function () {
    function RecUser() {
    }
    return RecUser;
})();

/**
* Represents a review of something, like a Location
*/
var Review = (function () {
    function Review() {
    }
    return Review;
})();

/**
* Specifies which dates ARE not available.
*/
var SiteAvailability = (function (_super) {
    __extends(SiteAvailability, _super);
    function SiteAvailability() {
        _super.apply(this, arguments);
    }
    return SiteAvailability;
})(SiteBasic);

/**
* A Date Range, specifies a start and end date.
* The precisions is to the day
*/
var DateRange = (function () {
    function DateRange() {
    }
    return DateRange;
})();

var SiteAvailabilityCriteria = (function (_super) {
    __extends(SiteAvailabilityCriteria, _super);
    function SiteAvailabilityCriteria() {
        _super.apply(this, arguments);
    }
    return SiteAvailabilityCriteria;
})(DateRange);

/**
* Defines a query for information from the server.
*/
var Query = (function () {
    function Query() {
        this.startRow = 0;
        this.rowCount = 25;
    }
    return Query;
})();

/**
* Defines the results of a query where T is the type of records being returned.
*/
var QueryResults = (function () {
    function QueryResults() {
    }
    return QueryResults;
})();

/**
* Used to return results from an async call to the server.
*/
var ASyncReply = (function () {
    function ASyncReply(success, failure) {
        this.success = success;
        this.failure = failure;
    }
    return ASyncReply;
})();

/**
* If an Async call fails, this object contains information as to why it failed.
*/
var ASyncFailureResult = (function () {
    function ASyncFailureResult() {
    }
    return ASyncFailureResult;
})();

/**
* Defines the results of a reservation request
*/
var ReservationResults = (function () {
    function ReservationResults() {
    }
    return ReservationResults;
})();

/// <reference path="RecreationCore.ts"/>
var RecreationServerTestHarness = (function () {
    function RecreationServerTestHarness() {
        this.locationAttributes = [
            new FeatureAttribute("Equestrian", false, "Equestrian riding is permitted."),
            new FeatureAttribute("equestrianRental", false, "Equestrian rentals available."),
            new FeatureAttribute("golfCourse", false, "Has a golf course."),
            new FeatureAttribute("discCourse", false, "Has a disc golf course."),
            new FeatureAttribute("fishing", false, "Has opportunities to fish."),
            new FeatureAttribute("miniGolf", false, "Has a mini-golf course."),
            new FeatureAttribute("boatLaunch", false, "Has a boat launch."),
            new FeatureAttribute("boatRentals", false, "Has boat rentals."),
            new FeatureAttribute("motorBoatsPermitted", false, "Boats with gasoline engines are permitted."),
            new FeatureAttribute("waterSkiing", false, "Water feature supports water skiing."),
            new FeatureAttribute("skiing", false, "Has skiing slope."),
            new FeatureAttribute("snowboarding", false, "Has snowboarding slope"),
            new FeatureAttribute("marina", false, "Has a Marina"),
            new FeatureAttribute("kayakOrCanoeRentals", false, "Kayaks or Canoes rentals"),
            new FeatureAttribute("swimmingPool", false, "Has a swimming pool."),
            new FeatureAttribute("swimmingBeach", false, "Has a beach and swimming in a natural water feature."),
            new FeatureAttribute("picnicShelters", false, "Has picnic shelters."),
            new FeatureAttribute("playground", false, "Has a playgound."),
            new FeatureAttribute("meetingRoom", false, "Has a common shared meeting room."),
            new FeatureAttribute("campStore", false, "Has a camp store."),
            new FeatureAttribute("playingFields", false, "Has large fields for baseball, football, soccer."),
            new FeatureAttribute("tennis", false, "Has tennis courts."),
            new FeatureAttribute("hikingTrails", false, "Has hiking trails."),
            new FeatureAttribute("mountainBikeTrails", false, "Has mountain biking trails."),
            new FeatureAttribute("atvTrail", false, "Has ATV Trail riding."),
            new FeatureAttribute("restrooms", false, "Location supports enclosed restrooms."),
            new FeatureAttribute("showers", false, "Location has showers."),
            new FeatureAttribute("hotwater", false, "Location supports hot water of some sort."),
            new FeatureAttribute("guidedPrograms", false, "location has programs guided by someone. Eg guided hikes, wildlife programs, etc."),
            new FeatureAttribute("restaurant", false, "The location has a restaurant/cafe with prepared foods"),
            new FeatureAttribute("amphitheater", false, "The location has a amphitheater"),
            new FeatureAttribute("groupTenting", false, "Has group camping sites."),
            new FeatureAttribute("tentSites", false, "Has sites for tents."),
            new FeatureAttribute("cabinLodging", false, "Has cabins for rent."),
            new FeatureAttribute("hotelLodging", false, "Has lodging in a hotel type of facility."),
            new FeatureAttribute("picnicShelterRentals", false, "Picnic shelter rentals available."),
            new FeatureAttribute("recreationalVehicleSites", false, "Sites available for RVs")
        ];
        this.siteAttributes = [
            new FeatureAttribute("handicapAccessible", false, "Handicap accessible"),
            new FeatureAttribute("electricHookup", false, "Electric hook-up"),
            new FeatureAttribute("septicHookup", false, "Septic hook-up"),
            new FeatureAttribute("generatorsAllowed", false, "Generators allowed"),
            new FeatureAttribute("parkingLevel", false, "Parking level"),
            new FeatureAttribute("boatAccessible", false, "Boat accessible"),
            new FeatureAttribute("horseAccomodation", false, "Horse accommodations"),
            new FeatureAttribute("petsAllowed", false, "Pets allowed"),
            new FeatureAttribute("maxOccupants", 5, "Maximum occupants"),
            new FeatureAttribute("minOccupants", 1, "Minimum occupants"),
            new FeatureAttribute("parkingLength", 25, "Parking length"),
            new FeatureAttribute("parkingSurface", 0 /* gravel */, "Parking surface"),
            new FeatureAttribute("shade", 1 /* full */, "Shade")
        ];
        this.siteTypes = [
            new FeatureAttribute("tent", 1 /* tentSite */, "Tent"),
            new FeatureAttribute("rv", 2 /* rvSite */, "RV"),
            new FeatureAttribute("picnicShelter", 4 /* picnicShelter */, "Picnic Shelter"),
            new FeatureAttribute("grouptent", 8 /* groupTentSite */, "Group Tent"),
            new FeatureAttribute("trailer", 16 /* trailerSite */, "Trailer"),
            new FeatureAttribute("cabin", 32 /* cabin */, "Cabin"),
            new FeatureAttribute("boat", 64 /* boat */, "Boat"),
            new FeatureAttribute("yurt", 128 /* yurt */, "Yurt")
        ];
        this.locationImages = [
            new GalleryImage("thumbnail/gallery1.png", "gallery1.png"),
            new GalleryImage("thumbnail/gallery2.png", "gallery2.png"),
            new GalleryImage("thumbnail/gallery3.png", "gallery3.png"),
            new GalleryImage("thumbnail/gallery4.png", "gallery4.png"),
            new GalleryImage("thumbnail/gallery5.png", "gallery5.png"),
            new GalleryImage("thumbnail/gallery6.png", "gallery6.png"),
            new GalleryImage("thumbnail/gallery7.png", "gallery7.png"),
            new GalleryImage("thumbnail/gallery8.png", "gallery8.png"),
            new GalleryImage("thumbnail/gallery9.png", "gallery9.png")
        ];
        this.costPeriod1 = [new CostPeriod(1, 1, 3, 31, 1, 10, 15, false), new CostPeriod(4, 1, 6, 30, 3, 15, 25, false), new CostPeriod(7, 1, 10, 31, 2, 10, 15, false), new CostPeriod(11, 1, 12, 31, 1, 5, 5, false)];
        this.costPeriod2 = [new CostPeriod(1, 1, 2, 27, 1, 7, 14, false), new CostPeriod(3, 1, 5, 31, 2, 9, 18, false), new CostPeriod(6, 1, 9, 30, 3, 10, 15, false), new CostPeriod(10, 1, 12, 31, 0, 0, 0, true)];
        this.costPeriod3 = [new CostPeriod(1, 1, 3, 31, 1, 5, 5, false), new CostPeriod(4, 1, 9, 30, 3, 15, 25, false), new CostPeriod(10, 1, 12, 31, 1, 5, 5, false)];
        this.mapMinLat = 80;
        this.mapMaxLat = -30;
        this.mapMinLng = -150;
        this.mapMaxLng = 90;
        /** Set presets to false generate completely random site details.
        *  When true site type and coordinates will be predefined. Currently there are 24 available presets.
        */
        this.usePresetData = true;
        this.activities = [];
        this.reviews = [];
        this.events = [];
        // Itinerary basic array
        this.itineraries = [];
        this.sites = [];
        this.location = this.getRandomLocation();
        this.activities = this.getRandomActivities();
        this.reviews = this.getRandomReviews();
        this.events = this.getRandomEvents();
        this.sites = this.getRandomSiteList(this.location.totalReservableSites);
        this.itineraries = this.getRandomItineraries();
    }
    RecreationServerTestHarness.prototype.getRandomItineraries = function () {
        var revs = [];
        for (var i = 0; i < 50; i++) {
            revs[i] = this.getRandomItinierary();
        }

        return revs;
    };

    RecreationServerTestHarness.prototype.getLocationGallery = function (query, callback) {
        var total = getRandom(4, this.locationImages.length);
        var imgs = [];
        for (var i = 0; i < total; i++) {
            imgs[i] = getRandomArrayValue(this.locationImages);
        }
        var qr = new QueryResults();
        qr.startRow = query.startRow;
        qr.totalRecords = imgs.length;
        qr.results = imgs;

        callback.success(qr);
    };

    RecreationServerTestHarness.prototype.getSiteGallery = function (query, callback) {
        this.getLocationGallery(query, callback);
    };

    /**
    * Returns SiteDetail object which contains much more information about a given site
    */
    RecreationServerTestHarness.prototype.getSiteDetail = function (siteObjectId, callback) {
        callback.success(getRandomArrayValue(this.sites));
    };

    RecreationServerTestHarness.prototype.filterSitesByExample = function (query, reservationStart, reservationEnd, callback) {
        var filtered = [];
        var rnd = getRandom(0, this.sites.length);

        for (var i = 0; i < rnd; i++) {
            filtered[i] = getRandomArrayValue(this.sites);
        }

        var qr = new QueryResults();
        qr.results = filtered;
        qr.startRow = 0;
        qr.totalRecords = filtered.length;
        callback.success(qr);
    };

    RecreationServerTestHarness.prototype.filterSites = function (query, site_id, callback) {
        var page = [];
        var idx = 0;
        for (var i = query.startRow; i < (query.startRow + query.rowCount); i++) {
            page[idx++] = this.sites[i];
        }
        var qr = new QueryResults();
        qr.startRow = query.startRow;
        qr.totalRecords = this.activities.length;
        qr.results = page;
        callback.success(qr);
    };

    RecreationServerTestHarness.prototype.filterSitebyID = function (site_id) {
        var page = new SiteDetail();
        page = this.sites.filter(function (i) {
            return i.objectId == site_id;
        })[0];
        if (page == undefined) {
            return new SiteDetail();
        }
        page.title = genString(10);
        return page;
    };
    RecreationServerTestHarness.prototype.getBasicItinerary = function (query, callback) {
        var page = [];
        var idx = 0;
        for (var i = query.startRow; i < (query.startRow + query.rowCount); i++) {
            page[idx++] = this.itineraries[i];
        }
        var qr = new QueryResults();
        qr.startRow = query.startRow;
        qr.totalRecords = this.activities.length;
        qr.results = page;
        callback.success(qr);
    };
    RecreationServerTestHarness.prototype.getActivities = function (query, callback) {
        var page = [];
        var idx = 0;
        for (var i = query.startRow; i < (query.startRow + query.rowCount); i++) {
            page[idx++] = this.activities[i];
        }
        var qr = new QueryResults();
        qr.startRow = query.startRow;
        qr.totalRecords = this.activities.length;
        qr.results = page;
        callback.success(qr);
    };

    RecreationServerTestHarness.prototype.getReviews = function (query, callback) {
        var page = [];
        var idx = 0;
        for (var i = query.startRow; i < (query.startRow + query.rowCount); i++) {
            page[idx++] = this.reviews[i];
        }
        var qr = new QueryResults();
        qr.startRow = query.startRow;
        qr.totalRecords = this.reviews.length;
        qr.results = page;
        callback.success(qr);
    };

    RecreationServerTestHarness.prototype.getEvents = function (query, callback) {
        var page = [];
        var idx = 0;
        for (var i = query.startRow; i < (query.startRow + query.rowCount); i++) {
            page[idx++] = this.events[i];
        }
        var qr = new QueryResults();
        qr.startRow = query.startRow;
        qr.totalRecords = this.activities.length;
        qr.results = page;
        callback.success(qr);
    };

    RecreationServerTestHarness.prototype.makeReservation = function (intinerary, callback) {
        var rr = new ReservationResults();
        rr.paymentUrl = "http://www.kinsail.com";
        rr.success = true;

        callback.success(rr);
    };

    RecreationServerTestHarness.prototype.getRandomEvents = function () {
        var evts = [];
        for (var i = 0; i < 500; i++) {
            evts[i] = this.genEvent();
        }
        return evts;
    };

    RecreationServerTestHarness.prototype.genEvent = function () {
        var ed = new EventDetail();
        ed.objectId = genNumber(1, 10);
        ed.locationObjectId = genNumber(1, 3);
        ed.descriptionHtml = genString(25);
        ed.image = getRandomArrayValue(this.locationImages);
        ed.title = genString(10);
        ed.start = genRandomDateInFuture(10, 50);
        ed.end = genRandomDateInFutureFromStart(ed.start, 1, 5);
        ed.reservationRequired = genBool();

        return ed;
    };

    RecreationServerTestHarness.prototype.getRandomReviews = function () {
        var revs = [];
        for (var i = 0; i < 3; i++) {
            revs[i] = this.genReview();
        }

        return revs;
    };

    RecreationServerTestHarness.prototype.genReview = function () {
        var r = new Review();
        r.description = getRandomArrayValue(__reviews);
        ;
        r.rating = genNumber(1, 5);
        r.reviewBy = getRandomArrayValue(__names);
        r.reviewByTitle = getRandomArrayValue(__titles);
        r.summary = genString(50);

        return r;
    };

    RecreationServerTestHarness.prototype.getRandomActivities = function () {
        var act = [];
        for (var i = 0; i < 20; i++) {
            act[i] = this.genActivity();
        }

        return act;
    };

    RecreationServerTestHarness.prototype.genActivity = function () {
        var act = new Activity();
        act.descriptionHtml = genString(50);
        act.image = getRandomArrayValue(this.locationImages);
        act.title = genString(10);
        act.locationObjectId = genNumber(1, 3);
        act.objectId = genNumber(1, 500);
        return act;
    };

    /**
    * Generates a random site list or if desired random site with some preset data.
    * @param {number} totalReservableSites
    * @returns {Array} A random site list.
    * @private
    */
    RecreationServerTestHarness.prototype.getRandomSiteList = function (totalReservableSites) {
        var sites = new Array();
        for (var i = 0; i < totalReservableSites; i++) {
            if (this.usePresetData) {
                sites.push(this.getRandomSite(i));
                if (i > 24) {
                    break;
                }
            } else {
                sites[i] = this.getRandomSite();
            }
        }
        return sites;
    };

    RecreationServerTestHarness.prototype.getRandomLocation = function () {
        var loc = new LocationDetail();
        var addr = new Address();

        // addr.city = genString(50);
        // addr.latitude = parseFloat(genNumber(0, 99) + "." + genNumber(1000000, 9999999));
        // addr.longitude = parseFloat(genNumber(0, 99) + "." + genNumber(1000000, 9999999));
        // addr.state = genString(2);
        // addr.street = genNumber(1000, 9999) + " " + genString(15) + " Street";
        // var zip: string = ("0000" + genNumber(0, 99999));
        // addr.zip = zip.substr(zip.length - 5);
        loc.address = addr;
        loc.availabilityEndDay = 31;
        loc.availabilityEndMonth = 12;
        loc.availabilityStartDay = 1;
        loc.availabilityStartMonth = 1;

        // loc.banner = new GalleryImage("http://upload.wikimedia.org/wikipedia/commons/e/ed/1956_LK_Campsite_on_George_River_%28pano%29.jpg", "http://upload.wikimedia.org/wikipedia/commons/e/ed/1956_LK_Campsite_on_George_River_%28pano%29.jpg");
        // loc.image = new GalleryImage("http://1.bp.blogspot.com/-xBnfvrtsZLE/TcANtMhh-sI/AAAAAAAAC2Y/VHuBcpZcN90/s640/P1100300+sign.jpg", "http://1.bp.blogspot.com/-xBnfvrtsZLE/TcANtMhh-sI/AAAAAAAAC2Y/VHuBcpZcN90/s640/P1100300+sign.jpg");
        loc.cancellationDaysBeforeReservation = 5;
        loc.features = this.getRandomLocationAttributes();
        loc.mapTilesBaseURL = ""; //TODO:
        loc.operatingOrganization = genString(35);
        loc.operatingOrganizationPhone = genNumber(100, 999) + "-" + genNumber(100, 999) + "-" + genNumber(1000, 9999);
        loc.priceMin = genNumber(5, 10);
        loc.priceMax = genNumber(loc.priceMin, 35);
        loc.reservationPhone = genNumber(100, 999) + "-" + genNumber(100, 999) + "-" + genNumber(1000, 9999);
        loc.reservationPolicies = genString(10);
        loc.title = genString(10);
        loc.totalReservableSites = genNumber(20, 24); // Increase the max value to randomize.

        return loc;
    };

    RecreationServerTestHarness.prototype.getRandomItinierary = function () {
        var detail = new ItineraryBasic();
        detail.locationObjectId = genNumber(1, 10);
        detail.siteObjectId = genNumber(1, 10);
        detail.start = genRandomDateInFuture(1, 2);
        detail.end = genRandomDateInFutureFromStart(detail.start, 1, 3);

        //for (var a: number; a < 3; a++) {
        //    var act: Activity = new Activity();
        //    act = this.genActivity();
        detail.activities = this.activities.filter(function (i) {
            return i.locationObjectId == detail.locationObjectId;
        });

        //}
        detail.siteObjectId = genNumber(1, 3);
        return detail;
    };

    RecreationServerTestHarness.prototype.getRandomSite = function (idx) {
        if (typeof idx === "undefined") { idx = null; }
        var detail = new SiteDetail();

        detail.advancedReservationPeriod = getRandom(2, 15);
        if (idx != null) {
            this.setPresetData(detail, idx);
        } else {
            detail.coords = this.getRandomMapCoordinates();
            detail.type = this.getRandomSiteType();
        }
        detail.cost = this.getRandomCostStructure();
        detail.description = genString(50);
        detail.image = getRandomArrayValue(this.locationImages);
        detail.maxAccommodatingUnits = getRandom(1, 3);
        detail.minDuration = getRandom(1, 3);
        detail.maxDuration = getRandom(detail.minDuration, detail.minDuration + 10);
        detail.siteIdentifier = "x" + getRandom(100, 999); //genString(3)
        detail.objectId = genNumber(1, 3);
        detail.features = this.getRandomSiteAttributes();

        return detail;
    };

    RecreationServerTestHarness.prototype.getSiteList = function () {
        this.sites = this.getRandomSiteList(this.location.totalReservableSites);
        return this.sites;
    };

    RecreationServerTestHarness.prototype.getSiteTypeList = function () {
        return this.siteTypes;
    };

    RecreationServerTestHarness.prototype.getSiteAttributes = function () {
        return this.siteAttributes;
    };

    RecreationServerTestHarness.prototype.getSite = function () {
        var detail = new SiteDetail();

        detail.advancedReservationPeriod = getRandom(2, 15);
        detail.coords = this.getRandomMapCoordinates();
        detail.type = this.getRandomSiteType();
        detail.cost = this.getRandomCostStructure();
        detail.description = genString(50);
        detail.image = getRandomArrayValue(this.locationImages);
        detail.maxAccommodatingUnits = getRandom(1, 3);
        detail.minDuration = getRandom(1, 3);
        detail.maxDuration = getRandom(detail.minDuration, detail.minDuration + 10);
        detail.siteIdentifier = "x" + getRandom(100, 999);
        detail.features = this.getRandomSiteAttributes();
        detail.title = genString(10);

        return detail;
    };

    RecreationServerTestHarness.prototype.getRandomLocationAttributes = function () {
        var attrs = [];
        var rnd = getRandom(0, this.locationAttributes.length);

        for (var i = 0; i < rnd; i++) {
            attrs[i] = getRandomArrayValue(this.locationAttributes);

            if (attrs[i].value instanceof Boolean) {
                attrs[i].value = genBool();
            }

            if (attrs[i].value instanceof Number) {
                attrs[i].value = getRandom(0, attrs[i].value);
            }

            if (attrs[i].value instanceof String) {
                attrs[i].value = genString(attrs[i].value.length); //TODO this could be the slow problem
            }
        }

        return attrs;
    };

    RecreationServerTestHarness.prototype.getRandomSiteAttributes = function () {
        var attrs = [];
        var rnd = getRandom(0, this.siteAttributes.length);

        for (var i = 0; i < rnd; i++) {
            attrs[i] = getRandomArrayValue(this.siteAttributes);

            if (attrs[i].value instanceof Boolean) {
                attrs[i].value = genBool();
            }
            ;

            if (attrs[i].value instanceof Number) {
                attrs[i].value = getRandom(0, attrs[i].value);
            }
            ;

            if (attrs[i].value instanceof String) {
                attrs[i].value = genString(attrs[i].value.length); //TODO invstigate this further
            }
            ;
        }
        ;

        return attrs;
    };

    RecreationServerTestHarness.prototype.getRandomSiteType = function (caseValue) {
        if (typeof caseValue === "undefined") { caseValue = null; }
        var rnd = (caseValue) ? caseValue : getRandom(0, 7);
        switch (rnd) {
            case 0:
                return 1 /* tentSite */;
            case 1:
                return 2 /* rvSite */;
            case 2:
                return 4 /* picnicShelter */;
            case 3:
                return 32 /* cabin */;
            case 4:
                return 64 /* boat */;
            case 5:
                return 16 /* trailerSite */;
            case 6:
                return 8 /* groupTentSite */;
            case 7:
                return 128 /* yurt */;
        }
        ;
    };

    RecreationServerTestHarness.prototype.getRandomCostStructure = function () {
        var rnd = getRandom(0, 2);
        switch (rnd) {
            case 0:
                return new CostStructure(this.costPeriod1);
            case 1:
                return new CostStructure(this.costPeriod2);
            case 2:
                return new CostStructure(this.costPeriod3);
        }
        ;
    };

    RecreationServerTestHarness.prototype.getRandomMapCoordinates = function () {
        var coords = new MapCoordinates();
        coords.lat = getRandomInt(this.mapMinLat, this.mapMaxLat);
        coords.lng = getRandomInt(this.mapMinLng, this.mapMaxLng);
        return coords;
    };

    /**
    * Sets exact coordinates and type.
    */
    RecreationServerTestHarness.prototype.setPresetData = function (detail, idx) {
        if (typeof idx === "undefined") { idx = null; }
        var _coords = new MapCoordinates();

        //Tent, rv, picnic, rv, cabin, boat, handicap, group
        var presetCoords = [
            { lat: 82, lng: -87, type: 1 /* tentSite */ },
            { lat: 80, lng: -96, type: 1 /* tentSite */ },
            { lat: 79, lng: -116, type: 1 /* tentSite */ },
            { lat: 78, lng: -142, type: 1 /* tentSite */ },
            { lat: 82, lng: -139, type: 1 /* tentSite */ },
            { lat: 81, lng: -147, type: 1 /* tentSite */ },
            { lat: 32, lng: 50, type: 2 /* rvSite */ },
            { lat: 44, lng: 14, type: 2 /* rvSite */ },
            { lat: 47, lng: 32, type: 2 /* rvSite */ },
            { lat: 23, lng: 23, type: 2 /* rvSite */ },
            { lat: 41, lng: 56, type: 2 /* rvSite */ },
            { lat: 72, lng: 62, type: 4 /* picnicShelter */ },
            { lat: 41, lng: -161, type: 32 /* cabin */ },
            { lat: 27, lng: -122, type: 32 /* cabin */ },
            { lat: 30, lng: -140, type: 32 /* cabin */ },
            { lat: 42, lng: -128, type: 32 /* cabin */ },
            { lat: 46, lng: -151, type: 32 /* cabin */ },
            { lat: -3, lng: 53, type: 64 /* boat */ },
            { lat: 73, lng: 2, type: 64 /* boat */ },
            { lat: 78, lng: -21, type: 64 /* boat */ },
            { lat: 80, lng: -46, type: 64 /* boat */ },
            { lat: 66, lng: 7, type: 64 /* boat */ },
            { lat: 72, lng: -128, type: 16 /* trailerSite */ },
            { lat: 68, lng: 21, type: 8 /* groupTentSite */ }
        ];

        if (idx != null && presetCoords[idx]) {
            _coords.lat = presetCoords[idx].lat;
            _coords.lng = presetCoords[idx].lng;
            detail.type = presetCoords[idx].type;
            detail.coords = _coords;
        } else {
            detail.coords = this.getRandomMapCoordinates();
            detail.type = this.getRandomSiteType();
        }
    };
    return RecreationServerTestHarness;
})();
;

var __names = ["Sean", "Tim", "Jacob", "Jon", "Pete", "Alex", "Bryan", "Tiffany", "Phil", "Dane", "Walter", "Amanda"];
var __titles = ["CEO", "Dog Lover", "Hiking Enthusiast", "Mountaineer"];
var __places = ["Greenberry's", "Starbucks", "the well", "FedEx", "Kinsail", "Kazan", "The Thia place", "the mountain", "the trail", "the field"];
var __things = ["soap", "spoon", "vase", "pickle", "pail", "goose", "dress", "fruit", "bitcoin", "laptop", "furniture", "jellyfish", "ghost", "doll", "program"];
var __affects = ["stomach bloating", "bad gas", "high", "mental paralysis", "a limp"];
var __actions = ["walk", "hike", "swim", "climb"];
var __adjectives = ["big", "tiny", "small"];
var __adverbs = ["silicitiously", "acutely", "dimly", "evenly", "highly", "mockingly", "respectfully"];
var __verbs = ["answer", "bury", "coach", "disapprove", "dust", "enjoy", "fill", "hum", "influence", "jam", "license", "melt"];

var __intros = ["[__names] went to [__places] in order to [__actions].", "[__names] and [__names] always try to avoid [__places] as it tends to cause [__affects].", "When visiting [__places] it is always a problem for [__names] and [__names] because their [__thing] [__verbs] all day long.", "it isn't [__adverbs] for [__names] to [__verbs] because of thier [____adjectives] [__things]!", "Once upon a time in a [__places] [__adverbs] away [_-names], [__names], and [_names] [__adverbs] [__adverbs] each other."];
var __etcs = ["The [__things] they were creating was not [__verbs]ed enough.", "Who knows how long it would have taken them if it wasn't for [__names] interrupting.", "If it wasn't for [__names] they would have never been searching for the [__things] for a [__adjectives] amount of time!", "Their hunt for the [__things] was never ending.", "They [__verbs] for the [__things], hoping that maybe one day their [__affects] would wear off before it was theirs!"];
var __summaries = ["Afterall, how could they have continued in light of their [__affects]?", "Thus avoid [__places] which cause [__affects]. You won't regret it!", "It is quite apparent that too much [__actions] is [__verbs] for you.", "In summary, never [__verbs] the [__things], it'll cause [__affects] of the [__things]!", "The End!"];
var __reviews = [
    "My husband, myself, and my 12 year old brother stayed here for two nights and enjoyed it. We were in town for me to run a race (mudrun) and to visit the beach. It was the cheapest place around, and all we had to do was bring a tent!",
    "My visit was exceptional! I am a beginning camper and I have stayed at 10 sites. This is an experience I have never imagined. The People were great, the site is above and beyond. I can’t wait until I get back!",
    "My husband and I spent a week-end with our daughter's family. They had been previously and loved how kid friendly it is. Their 8 & 11 year old boys take their bikes and ride freely throughout the park and they like the playground equipment."
];

/**
* Returns a random date in the future.
*/
function genRandomDateInFuture(min, max) {
    var dt = new Date();

    return genRandomDateInFutureFromStart(dt, min, max);
}

/**
* Returns a random date in the future, after the supplied date
*/
function genRandomDateInFutureFromStart(start, min, max) {
    //var dt: Date = new Date(start.getDate());
    var dt = new Date();
    var rnd = genNumber(min, max);
    return new Date(start.getDate() + rnd);
}

/**
* Generates a random integer between min and max. An overload for getRandom(min,max);
*/
function genNumber(min, max) {
    return getRandom(min, max);
}

/**
* Generates a Random Boolean
*/
function genBool() {
    return (1 == getRandom(0, 1));
}

/**
* Generates a random string of a given length;
*/
function genString(length) {
    // return "x";
    //Fixme this function is very slow and needs to be refactored
    var str = getRandomString(__intros);
    var endStr = getRandomString(__summaries);

    while ((str.length + endStr.length) < length) {
        str += getRandomString(__etcs);
    }

    str += endStr;

    return str.substring(0, length);
}

/**
* Returns a random value from the array of strings passed in.
*/
function getRandomString(possibleValues) {
    var rnd = getRandom(0, (possibleValues.length - 1));

    return fillString(possibleValues[rnd]);
}

function getRandomArrayValue(possibleValues) {
    var rnd = getRandom(0, (possibleValues.length - 1));
    return possibleValues[rnd];
}

/**
* Examines the input string for special input tokes [__ and ] which designate placeholder for additional text.
*/
function fillString(input) {
    var openToken = "[__";
    var closeToken = "]";

    var sidx = input.indexOf(openToken);
    while (sidx >= 0) {
        var eidx = input.indexOf(closeToken, sidx);
        var varName = input.substring(sidx + 1, eidx);

        var beginStr = input.substring(0, sidx);
        var endStr = input.substr(eidx + 1);
        try  {
            var possibleValues = eval(varName);
            var rndResult = getRandom(0, possibleValues.length);
            var placeHolderValue = possibleValues[rndResult];
            if (placeHolderValue.indexOf(openToken) >= 0) {
                placeHolderValue = fillString(placeHolderValue);
            }
            input = beginStr + placeHolderValue + endStr;
        } catch (e) {
            input = beginStr + "ERR" + endStr;
        }

        sidx = input.indexOf(openToken);
    }

    return input;
}

/**
* Returns a random whole number between the min & max values
*/
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
* Returns a random integer between the min & max values
*/
function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
//# sourceMappingURL=RecreationTestHarness.js.map
