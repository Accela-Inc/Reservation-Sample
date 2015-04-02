//Recreation Server API
/**
 * Represents an address within the United States
 */
class Address {
    longitude: number; //Geospacial coordinates
    latitude: number; //Geospacial coordinates
    street: string; //Exmaple: 1234 Sesame St.
    city: string; //Example: McLean
    state: string; //Example: Virginia
    zip: string; //Example: 22101 or "22101-1234" in case of full zips.
}

/**
 * A Gallery Image has an Icon representation for a full sized image
 */
class GalleryImage {
    //constructor();
    constructor(iconUrl?: string, fullImgUrl?: string) {
        this.icon = iconUrl;
        this.fullImage = fullImgUrl;
    }
    
    icon: string; //URL to Icon image
    fullImage: string; //URL to full image
}

/**
 * Captures information about the attribute of a Site or Location
 */
class FeatureAttribute<T> {
//    constructor(); //default ctor
//    constructor(name?: string, value?:T);
    constructor(name?: string, value?: T, desc?: string) { //preset common parameters
        this.name = name;
        this.value = value;
        this.description = desc;
    }

    name: string;
    value: T;
    description: string;
}

/**
 * A LocationDetail contains all the information for a given location.
 * For example: A Campground's name, address, etc
 */
class LocationDetail {
   
    objectId: number; //Database identifier. Never displayed to the user.

    title: string; //Example the name of a camp ground
    address: Address; //See Address class
    operatingOrganization: string; //Example: Department of Forestry
    operatingOrganizationPhone: string; //Example: (703) 555-1234 - The phone number to the organization which operates the site
    reservationPhone: string; //Example: (703) 555-1324 - The phone number to the organization which can reserve a given site
    totalReservableSites: number; //Example 33 - defines how many sites the location has which can be reserved (includes camp sites, rv sites, shelters, etc)
    reservationPolicies: string; //A very large string which describes all the legal mumbojumbo of reserving or canceling a reservation.
    cancellationDaysBeforeReservation: number; //Example: 5 - Cancellation must occur before 5 days from the date of reservervation.
    availabilityStartMonth: number; //The calendar month which defines the first month a reservation can be made. Example 5 - May
    availabilityStartDay: number; ////The calendar day (within respective calendar month) which defines the first date which reservations can be made. Example: 1 - First day of May
    availabilityEndMonth: number; //The calendar month which defines the last month for whcih reservations can be made. Example 12 - December
    availabilityEndDay: number; ////The calendar day (with in respective calendar month) which defines the last day in which reservations can be made. Example: 31 - Last day of December
    priceMin: number; //defines the minimum cost for a stay overnight - denormalized from site's cost structure to facilitate searching for "affordable" location to stay.
    priceMax: number; //defines the maximum cost for a stay overnight - denormalized from site's cost structure to facilitate searching for "affordable" location to stay.
    
    features: FeatureAttribute<any>[]; // Collection of Feature/Attributes for a location

    //non queryable attributes
    mapTilesBaseURL: string; // the base URL to a set of map tiles, eg: http://www.someurl.com/tiles/
    image: GalleryImage; // The primary image to display for the site
    banner: GalleryImage; // The banner image to use in branding

}

/**
 * Defines a reservable type of site
 */
 enum SiteType {
    tentSite = 1,      // Tent Site
    rvSite = 2,        // Recreational Vehicle (RV) Site
    picnicShelter = 4, // Picnic Shelter
    groupTentSite = 8, // Group Tent Site
    trailerSite = 16,  // Trailer site
    cabin = 32,        // Cabin Site
    boat = 64,         // Boat Site --?
    yurt = 128         // Yurt Site
}



/**
 * A Cost Period defines a period of time within a calendar year,
 *   and the associated rates to reserve the site on a daily basis. 
 */
class CostPeriod {

    constructor();
    constructor(startMonth?: number, startDay?: number, endMonth?: number, endDay?: number, minDur?: number, weekdayRate?: number, weekendRate?: number, notAvailable?: boolean);
    constructor(startMonth?:number, startDay?: number, endMonth?:number, endDay?: number, minDur?: number, weekdayRate?: number, weekendRate?: number, notAvailable?: boolean) {
        this.startMonth = startMonth;
        this.startDay = startDay;
        this.endMonth = endMonth;
        this.endDay = endDay;
        this.minimumDuration = minDur;
        this.weekdayRate = weekdayRate;
        this.weekendRate = weekendRate;
        this.notAvailable = notAvailable;
    }

    startMonth: number; // The calendar month which defines the beginning of this period.
    startDay: number; // The day of the startMonth which defines the beginning of this period.
    endMonth: number; // The calendar month which defines the end of this period.
    endDay: number; // The day of the calendar month which defines the end of this period.
    minimumDuration: number; // the miniumum duration stay which is applicable in this cost period.
    weekdayRate: number; // The price in USD for spending the night during a weeknight (Sunday - Thursday). 
    weekendRate: number; // The price in USD for spending the night during a weekend night (Friday and Saturday).
    notAvailable: boolean; // Indicates that the site is not available during this period.
}

/**
 * A Cost Structure defines several CostPeriods and the available rates.
 * A Cost Structure may have one or more overlapping CostPeriods if the CostPeriod's
 *  Distinguish themselves with different minimumDuration values. 
 * When calculating a total cost, it is necessary to select the appropriate cost period
 *  based on the duration of the reservation.
 */
class CostStructure {

    periods: CostPeriod[];

    constructor();
    constructor(periods?: CostPeriod[]);
    constructor(periods?: CostPeriod[]) {
        this.periods = periods;
    }
    
    /**
     * Calculates the cost of a reservation based on the reservation Start/End dates
     *  and the defined CostPeriods of the Site.
     */
    calculateCost(startDate: Date, endDate: Date): number {
        //TODO: Implement correctly
        return (endDate.getTime() - startDate.getTime()) * 25;
    }
}

/**
 * Represents the Lat and Lng coordinate values on a map.
 */
class MapCoordinates {
    lat: number;
    lng: number;
}

/**
 * Defines a type of surface, for drive ways, tent pads, etc.
 */
enum SurfaceType {
    gravel = 0,
    pavement = 1,
    dirt = 2
}

/**
 * Defines the type of shade available at a particular site.
 */
enum ShadeType {
    none = 0, // no shade is available
    full = 1, // the site is completely covered in shade
    partial = 2 // the site has partial shade
}

/** 
 * Defines basic information about a reservable site.
 */
class SiteBasic {

    objectId: number; // Database identifier. Never displayed to user.
    locationObjectId: number; //The Database Identifier for the location which a site belongs

    type: SiteType; // The type of site
    siteIdentifier: string; // A short identifier, eg: "A001"
    coords: MapCoordinates; // Defines where this site is located on the map

    //non queryable attributes 
    image: GalleryImage; // The primary image to display for the site
}

/**
 * Extended details for a specific site
 */
class SiteDetail extends SiteBasic {
    description: string; // A verbose description of the site.
    maxAccommodatingUnits: number; // Number tents/rvs/hourse/etc supported depending on site type.
    minDuration: number; // the minimum number of days this site is reservable. Eg 1
    maxDuration: number; // the maximum number of days this site is reservable. Eg 15
    advancedReservationPeriod: number; // The number of days before the desired reservation startDate customers are allowed to make a reservation.
    //  Eg. If this value is 30, and I desired to make a reservation started on May 31th, I can make a reservation anytime 
    //    between May 1st and May 30th.
    title: string;

    features: FeatureAttribute<any>[]; //a list of features associated with this site.

    //non queryable attributes 
    cost: CostStructure; // Defines the costs associated with the site.
}

/**
 * An Activity specifies something a customer can "do" while at a given location.
 */
class Activity {
    objectId: number; // Database identifier - never displayed to a user.
    locationObjectId: number; //Database identifier for the location where this activity is accessible.
    title: string; // The name of an activity;
    descriptionHtml: string; //A block of text with a detailed description of an activity
    image: GalleryImage; //An image for the activity.
    
    //TODO: Costs?
    //TODO: Event Calendar?
}

/**
 * An event is much like an activity except it has a definitive start/end date.
 */
class EventDetail extends Activity {
    start: Date; // The start of an event
    end: Date; // The end date of an event

    reservationRequired: boolean; // defines whether the event requires a registration or not.
}

/**
 * Specifies a leg on an itinerary, where a customer is staying, and for how long.
 *  also keeps track of selected activities.
 */
class ItineraryBasic {
    start: Date; // Defines the beginning of an Itinerary item
    end: Date; // Defines the end of an Itinerary item

    locationObjectId: number; //Specifies the location where a customer will be staying during the start/end dates
    siteObjectId: number; // Specifies the specific site within a location where a customer will be staying.
    activities: Activity[]; // A collection of activities the customer wishes to particpate with during their stay.
}

/**
 * Itinerary detail provides more information about an itinerary which would not be readily available.
 */
class ItineraryDetail extends ItineraryBasic {
    location: LocationDetail; // The complete information about the location of their stay.
    site: SiteDetail; // The complete information about the site of their stay.
    activity: Activity[]; // a Collection of activities selected by the customer.
}

/**
 * Collection of ItineraryBasic objects.
 */
class ItineraryCart {
    legs: ItineraryBasic[];
}

/**
 * A user of the system
 */
class RecUser {

    objectId: number; // the database object id - never display to user

    userName: string; //the username used to authenticate with.
    firstName: string; // A user's first name
    lastName: string; // a user's last name
    userTitle: string; // user title or description.
    profilePicture: GalleryImage; // a user's profile picture.
}

/**
 * Represents a review of something, like a Location
 */
class Review {
    objectId: number; //A Database ObjectID, never display to user
    locationObjectId: number; //The Object ID for the location which this is a review of.
    summary: string; // the short summary review
    rating: number; // a value between 1 and 5 where 5 is the best rating.
    description: string; //a verbose review write up
    reviewBy: RecUser; // the user who submitted the review.
    reviewByTitle: string; // the title of the user who submitted the review.
}

/**
 * Specifies which dates ARE not available.
 */
class SiteAvailability extends SiteBasic {
    bookedRanges: DateRange[]; // specifies the dates which are not available for booking.
}

/**
 * A Date Range, specifies a start and end date.
 * The precisions is to the day
 */
class DateRange {
    startDate: Date;
    endDate: Date;
}


class SiteAvailabilityCriteria extends DateRange {
    siteObjectId: number; //The site ID to search for.
    locationObjectId: number; //The location to search for available sites.
    //super class specifies parameters for start/end date which specifiy the date range to search for availability.
    //Either a siteObjectId or locationObjectId are required. 
    //If not start/end date is specified, then the server will assume start is the current date, and end is +3 months.
}

/**
 * Defines a query for information from the server.
 */
class Query<T> {
    criteria: T; //defines the criteria for a query
    startRow: number = 0; //defines the record number to start returning results. Support for pagination.
    rowCount: number = 25; //the number of rows to return for the query.
}

/**
 * Defines the results of a query where T is the type of records being returned.
 */
class QueryResults<T> {
    results: T[];
    startRow: number; //defines the record number to start returning results. Support for pagination.
    totalRecords: number; //the number of rows the query would have returned had there been no restriction on rowCount. Support for pagination.
}

/**
 * Used to return results from an async call to the server.
 */
class ASyncReply<T> {
    success: (result: T) => void;
    failure: (error: ASyncFailureResult) => void;

    constructor(success?: (result: T) => void);
    constructor(success?: (result: T) => void, failure?: (error: ASyncFailureResult) => void);
    constructor(success?: (result: T) => void, failure?: (error: ASyncFailureResult) => void) {
        this.success = success;
        this.failure = failure;
    }
}

/**
 * If an Async call fails, this object contains information as to why it failed.
 */
class ASyncFailureResult {
    statusCode: number;
    error: string;
}

/**
 * Defines the results of a reservation request
 */
class ReservationResults {
    success: boolean; 
    failureReason: string; // if there is a failure completing the reservation, this text describes why.
    paymentUrl: string; // The URL to direct the user's web browser to complete payments.
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