/**
* Represents an address within the United States
*/
declare class Address {
    public longitude: number;
    public latitude: number;
    public street: string;
    public city: string;
    public state: string;
    public zip: string;
}
/**
* A Gallery Image has an Icon representation for a full sized image
*/
declare class GalleryImage {
    constructor(iconUrl?: string, fullImgUrl?: string);
    public icon: string;
    public fullImage: string;
}
/**
* Captures information about the attribute of a Site or Location
*/
declare class FeatureAttribute<T> {
    constructor(name?: string, value?: T, desc?: string);
    public name: string;
    public value: T;
    public description: string;
}
/**
* A LocationDetail contains all the information for a given location.
* For example: A Campground's name, address, etc
*/
declare class LocationDetail {
    public objectId: number;
    public title: string;
    public address: Address;
    public operatingOrganization: string;
    public operatingOrganizationPhone: string;
    public reservationPhone: string;
    public totalReservableSites: number;
    public reservationPolicies: string;
    public cancellationDaysBeforeReservation: number;
    public availabilityStartMonth: number;
    public availabilityStartDay: number;
    public availabilityEndMonth: number;
    public availabilityEndDay: number;
    public priceMin: number;
    public priceMax: number;
    public features: FeatureAttribute<any>[];
    public mapTilesBaseURL: string;
    public image: GalleryImage;
    public banner: GalleryImage;
}
/**
* Defines a reservable type of site
*/
declare enum SiteType {
    tentSite = 1,
    rvSite = 2,
    picnicShelter = 4,
    groupTentSite = 8,
    trailerSite = 16,
    cabin = 32,
    boat = 64,
    yurt = 128,
}
/**
* A Cost Period defines a period of time within a calendar year,
*   and the associated rates to reserve the site on a daily basis.
*/
declare class CostPeriod {
    constructor();
    constructor(startMonth?: number, startDay?: number, endMonth?: number, endDay?: number, minDur?: number, weekdayRate?: number, weekendRate?: number, notAvailable?: boolean);
    public startMonth: number;
    public startDay: number;
    public endMonth: number;
    public endDay: number;
    public minimumDuration: number;
    public weekdayRate: number;
    public weekendRate: number;
    public notAvailable: boolean;
}
/**
* A Cost Structure defines several CostPeriods and the available rates.
* A Cost Structure may have one or more overlapping CostPeriods if the CostPeriod's
*  Distinguish themselves with different minimumDuration values.
* When calculating a total cost, it is necessary to select the appropriate cost period
*  based on the duration of the reservation.
*/
declare class CostStructure {
    public periods: CostPeriod[];
    constructor();
    constructor(periods?: CostPeriod[]);
    /**
    * Calculates the cost of a reservation based on the reservation Start/End dates
    *  and the defined CostPeriods of the Site.
    */
    public calculateCost(startDate: Date, endDate: Date): number;
}
/**
* Represents the Lat and Lng coordinate values on a map.
*/
declare class MapCoordinates {
    public lat: number;
    public lng: number;
}
/**
* Defines a type of surface, for drive ways, tent pads, etc.
*/
declare enum SurfaceType {
    gravel = 0,
    pavement = 1,
    dirt = 2,
}
/**
* Defines the type of shade available at a particular site.
*/
declare enum ShadeType {
    none = 0,
    full = 1,
    partial = 2,
}
/**
* Defines basic information about a reservable site.
*/
declare class SiteBasic {
    public objectId: number;
    public locationObjectId: number;
    public type: SiteType;
    public siteIdentifier: string;
    public coords: MapCoordinates;
    public image: GalleryImage;
}
/**
* Extended details for a specific site
*/
declare class SiteDetail extends SiteBasic {
    public description: string;
    public maxAccommodatingUnits: number;
    public minDuration: number;
    public maxDuration: number;
    public advancedReservationPeriod: number;
    public title: string;
    public features: FeatureAttribute<any>[];
    public cost: CostStructure;
}
/**
* An Activity specifies something a customer can "do" while at a given location.
*/
declare class Activity {
    public objectId: number;
    public locationObjectId: number;
    public title: string;
    public descriptionHtml: string;
    public image: GalleryImage;
}
/**
* An event is much like an activity except it has a definitive start/end date.
*/
declare class EventDetail extends Activity {
    public start: Date;
    public end: Date;
    public reservationRequired: boolean;
}
/**
* Specifies a leg on an itinerary, where a customer is staying, and for how long.
*  also keeps track of selected activities.
*/
declare class ItineraryBasic {
    public start: Date;
    public end: Date;
    public locationObjectId: number;
    public siteObjectId: number;
    public activities: Activity[];
}
/**
* Itinerary detail provides more information about an itinerary which would not be readily available.
*/
declare class ItineraryDetail extends ItineraryBasic {
    public location: LocationDetail;
    public site: SiteDetail;
    public activity: Activity[];
}
/**
* Collection of ItineraryBasic objects.
*/
declare class ItineraryCart {
    public legs: ItineraryBasic[];
}
/**
* A user of the system
*/
declare class RecUser {
    public objectId: number;
    public userName: string;
    public firstName: string;
    public lastName: string;
    public userTitle: string;
    public profilePicture: GalleryImage;
}
/**
* Represents a review of something, like a Location
*/
declare class Review {
    public objectId: number;
    public locationObjectId: number;
    public summary: string;
    public rating: number;
    public description: string;
    public reviewBy: RecUser;
    public reviewByTitle: string;
}
/**
* Specifies which dates ARE not available.
*/
declare class SiteAvailability extends SiteBasic {
    public bookedRanges: DateRange[];
}
/**
* A Date Range, specifies a start and end date.
* The precisions is to the day
*/
declare class DateRange {
    public startDate: Date;
    public endDate: Date;
}
declare class SiteAvailabilityCriteria extends DateRange {
    public siteObjectId: number;
    public locationObjectId: number;
}
/**
* Defines a query for information from the server.
*/
declare class Query<T> {
    public criteria: T;
    public startRow: number;
    public rowCount: number;
}
/**
* Defines the results of a query where T is the type of records being returned.
*/
declare class QueryResults<T> {
    public results: T[];
    public startRow: number;
    public totalRecords: number;
}
/**
* Used to return results from an async call to the server.
*/
declare class ASyncReply<T> {
    public success: (result: T) => void;
    public failure: (error: ASyncFailureResult) => void;
    constructor(success?: (result: T) => void);
    constructor(success?: (result: T) => void, failure?: (error: ASyncFailureResult) => void);
}
/**
* If an Async call fails, this object contains information as to why it failed.
*/
declare class ASyncFailureResult {
    public statusCode: number;
    public error: string;
}
/**
* Defines the results of a reservation request
*/
declare class ReservationResults {
    public success: boolean;
    public failureReason: string;
    public paymentUrl: string;
}
/**
* primary interface for obtaining information from the server.
*/
interface RecreationServer {
    /**
    * Returns LocationDetail object which contains much more information about a given site
    */
    getLocationDetail(locationObjectId: number, callback: ASyncReply<LocationDetail>): void;
    /**
    * Returns an array of GalleryImage objects for a given Location.
    * query.criteria - defines the objectId for an itinerary.
    */
    getBasicItinerary(query: Query<number>, callback: ASyncReply<QueryResults<ItineraryBasic>>): void;
    /**
    * Returns an array of GalleryImage objects for a given Location.
    * query.criteria - defines the objectId for a location for which to return a gallery of images.
    */
    getLocationGallery(query: Query<number>, callback: ASyncReply<QueryResults<GalleryImage>>): void;
    /**
    * Returns an array of GalleryImage objects for a given Site.
    * query.criteria - defines the objectId for a site for which to return a gallery of images.
    */
    getSiteGallery(query: Query<number>, callback: ASyncReply<QueryResults<GalleryImage>>): void;
    /**
    * Returns SiteDetail object which contains much more information about a given site
    */
    getSiteDetail(siteObjectId: number, callback: ASyncReply<SiteDetail>): void;
    /**
    * Returns a collection of SiteBasic objects which match the given criteria
    *  passed in as siteExample.
    *
    * query.criteria -  is a partially populated SiteDetail object. Each value supplied
    *  in the criteria object specifies filter criteria to use to filter available sites.
    *
    * reservationStart & reservationEnd - specify the desired reservation start/end dates.
    *
    * Passing in null values for the siteExample, reservationStart, and reservationEnd parameters
    *  will return a complete list of SiteBasic objects for the given location.
    */
    filterSitesByExample(query: Query<SiteDetail>, reservationStart: Date, reservationEnd: Date, callback: ASyncReply<QueryResults<SiteBasic>>): void;
    /**
    * Returns a DateRange array of dates which are not available for booking.
    * query.criteria - defines the objectId for a sites booked date range.
    */
    getSiteAvailability(siteObjectId: number, callback: ASyncReply<SiteAvailability>): void;
    /**
    * Returns a list of available activites at a given location.
    * query.criteria - defines the objectId for a location for which to return activities.
    */
    getActivities(query: Query<Activity>, callback: ASyncReply<QueryResults<Activity>>): void;
    /**
    * returns reviews for a given location
    * query.criteria - defines the objectId for a location for which to return reviews
    */
    getReviews(query: Query<Review>, callback: ASyncReply<QueryResults<Review>>): void;
    /**
    * returns a collection of upcoming events for a given location
    *
    * query.criteria - defines the objectId for a location for which to return events.
    */
    getEvents(query: Query<EventDetail>, callback: ASyncReply<QueryResults<EventDetail>>): void;
    /**
    * Completes a reservation for a given user and itinerary.
    */
    makeReservation(intinerary: ItineraryCart, callback: ASyncReply<ReservationResults>): void;
}
