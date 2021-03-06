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

//# sourceMappingURL=RecreationCore.js.map
