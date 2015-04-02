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
    public description: string;
    public value: T;
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
    * Returns an array of GalleryImage objects for a given Location.
    * query.criteria - defines the objectId for a location for which to return a galary of images.
    */
    getBasicItinerary(query: Query<number>, callback: ASyncReply<QueryResults<ItineraryBasic>>): void;
    /**
    * Returns an array of GalleryImage objects for a given Location.
    * query.criteria - defines the objectId for a location for which to return a galary of images.
    */
    getLocationGallery(query: Query<number>, callback: ASyncReply<QueryResults<GalleryImage>>): void;
    /**
    * Returns an array of GalleryImage objects for a given Site.
    * query.criteria - defines the objectId for a site for which to return a galary of images.
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
declare class RecreationServerTestHarness implements RecreationServer {
    public locationAttributes: FeatureAttribute<any>[];
    public siteAttributes: FeatureAttribute<any>[];
    public siteTypes: FeatureAttribute<any>[];
    public locationImages: GalleryImage[];
    public costPeriod1: CostPeriod[];
    public costPeriod2: CostPeriod[];
    public costPeriod3: CostPeriod[];
    public location: LocationDetail;
    public mapMinLat: number;
    public mapMaxLat: number;
    public mapMinLng: number;
    public mapMaxLng: number;
    /** Set presets to false generate completely random site details.
    *  When true site type and coordinates will be predefined. Currently there are 24 available presets.
    */ 
    public usePresetData: boolean;
    public activities: Activity[];
    public reviews: Review[];
    public events: EventDetail[];
    public itineraries: ItineraryBasic[];
    public sites: SiteDetail[];
    constructor();
    public getRandomItineraries(): ItineraryBasic[];
    public getLocationGallery(query: Query<number>, callback: ASyncReply<QueryResults<GalleryImage>>): void;
    public getSiteGallery(query: Query<number>, callback: ASyncReply<QueryResults<GalleryImage>>): void;
    /**
    * Returns SiteDetail object which contains much more information about a given site
    */
    public getSiteDetail(siteObjectId: number, callback: ASyncReply<SiteDetail>): void;
    public filterSitesByExample(query: Query<SiteDetail>, reservationStart: Date, reservationEnd: Date, callback: ASyncReply<QueryResults<SiteBasic>>): void;
    public filterSites(query: Query<SiteDetail>, site_id: number, callback: ASyncReply<QueryResults<SiteBasic>>): void;
    public filterSitebyID(site_id: number): SiteDetail;
    public getBasicItinerary(query: Query<number>, callback: ASyncReply<QueryResults<ItineraryBasic>>): void;
    public getActivities(query: Query<Activity>, callback: ASyncReply<QueryResults<Activity>>): void;
    public getReviews(query: Query<Review>, callback: ASyncReply<QueryResults<Review>>): void;
    public getEvents(query: Query<EventDetail>, callback: ASyncReply<QueryResults<EventDetail>>): void;
    public makeReservation(intinerary: ItineraryCart, callback: ASyncReply<ReservationResults>): void;
    private getRandomEvents();
    private genEvent();
    private getRandomReviews();
    private genReview();
    private getRandomActivities();
    private genActivity();
    /**
    * Generates a random site list or if desired random site with some preset data.
    * @param {number} totalReservableSites
    * @returns {Array} A random site list.
    * @private
    */
    private getRandomSiteList(totalReservableSites);
    private getRandomLocation();
    private getRandomItinierary();
    private getRandomSite(idx?);
    public getSiteList(): SiteDetail[];
    public getSiteTypeList(): FeatureAttribute<any>[];
    public getSiteAttributes(): FeatureAttribute<any>[];
    private getSite();
    private getRandomLocationAttributes();
    private getRandomSiteAttributes();
    private getRandomSiteType(caseValue?);
    private getRandomCostStructure();
    private getRandomMapCoordinates();
    /**
    * Sets exact coordinates and type.
    */
    public setPresetData(detail: SiteDetail, idx?: number): void;
}
declare var __names: string[];
declare var __titles: string[];
declare var __places: string[];
declare var __things: string[];
declare var __affects: string[];
declare var __actions: string[];
declare var __adjectives: string[];
declare var __adverbs: string[];
declare var __verbs: string[];
declare var __intros: string[];
declare var __etcs: string[];
declare var __summaries: string[];
declare var __reviews: string[];
/**
* Returns a random date in the future.
*/
declare function genRandomDateInFuture(min: number, max: number): Date;
/**
* Returns a random date in the future, after the supplied date
*/
declare function genRandomDateInFutureFromStart(start: Date, min: number, max: number): Date;
/**
* Generates a random integer between min and max. An overload for getRandom(min,max);
*/
declare function genNumber(min: number, max: number): number;
/**
* Generates a Random Boolean
*/
declare function genBool(): boolean;
/**
* Generates a random string of a given length;
*/
declare function genString(length: number): string;
/**
* Returns a random value from the array of strings passed in.
*/
declare function getRandomString(possibleValues: string[]): string;
declare function getRandomArrayValue(possibleValues: any[]): any;
/**
* Examines the input string for special input tokes [__ and ] which designate placeholder for additional text.
*/
declare function fillString(input: string): string;
/**
* Returns a random whole number between the min & max values
*/
declare function getRandom(min: number, max: number): number;
/**
* Returns a random integer between the min & max values
*/
declare function getRandomInt(min: number, max: number): number;
