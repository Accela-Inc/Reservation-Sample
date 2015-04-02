/// <reference path="RecreationCore.ts"/>

class RecreationServerTestHarness implements RecreationServer { 
    locationAttributes: FeatureAttribute<any>[] = [
        new FeatureAttribute<boolean>("Equestrian", false, "Equestrian riding is permitted."),
        new FeatureAttribute<boolean>("equestrianRental", false, "Equestrian rentals available."),
        new FeatureAttribute<boolean>("golfCourse", false, "Has a golf course."), //Has a golf course
        new FeatureAttribute<boolean>("discCourse", false, "Has a disc golf course."), //Has a disc golf course
        new FeatureAttribute<boolean>("fishing", false, "Has opportunities to fish."), //Has opportunities to fish
        new FeatureAttribute<boolean>("miniGolf", false, "Has a mini-golf course."), //Has a minigolf course
        new FeatureAttribute<boolean>("boatLaunch", false, "Has a boat launch."), //Has a boat launch
        new FeatureAttribute<boolean>("boatRentals", false, "Has boat rentals."), //Has boat rentals
        new FeatureAttribute<boolean>("motorBoatsPermitted", false, "Boats with gasoline engines are permitted."), //Boats with gasoline engines are permitted
        new FeatureAttribute<boolean>("waterSkiing", false, "Water feature supports water skiing."), //Water feature supports water skiing.
        new FeatureAttribute<boolean>("skiing", false, "Has skiing slope."), //Has skiing slope. 
        new FeatureAttribute<boolean>("snowboarding", false, "Has snowboarding slope"), //Has snowboarding slope
        new FeatureAttribute<boolean>("marina", false, "Has a Marina"),  //Has a Marina
        new FeatureAttribute<boolean>("kayakOrCanoeRentals", false, "Kayaks or Canoes rentals"), //Rents Kayaks or Canoes
        new FeatureAttribute<boolean>("swimmingPool", false, "Has a swimming pool."), //Has a swimming pool
        new FeatureAttribute<boolean>("swimmingBeach", false, "Has a beach and swimming in a natural water feature."), //Has a beach and swimming in a natural water feature
        new FeatureAttribute<boolean>("picnicShelters", false, "Has picnic shelters."), //Has picnic shelters
        new FeatureAttribute<boolean>("playground", false, "Has a playgound."), //Has a playgound
        new FeatureAttribute<boolean>("meetingRoom", false, "Has a common shared meeting room."), //Has a common/shared meeting room
        new FeatureAttribute<boolean>("campStore", false, "Has a camp store."), //Has a camp store
        new FeatureAttribute<boolean>("playingFields", false, "Has large fields for baseball, football, soccer."), //Has large fields for baseball/football/soccer
        new FeatureAttribute<boolean>("tennis", false, "Has tennis courts."), //Has tennis courts
        new FeatureAttribute<boolean>("hikingTrails", false, "Has hiking trails."), //Has hiking trails
        new FeatureAttribute<boolean>("mountainBikeTrails", false, "Has mountain biking trails."), //Has mountain biking trails
        new FeatureAttribute<boolean>("atvTrail", false, "Has ATV Trail riding."), //Has ATV Trail riding
        new FeatureAttribute<boolean>("restrooms", false, "Location supports enclosed restrooms."), //Location supports enclosed restrooms
        new FeatureAttribute<boolean>("showers", false, "Location has showers."), //Location has showers
        new FeatureAttribute<boolean>("hotwater", false, "Location supports hot water of some sort."), //Location supports hot water of some sort
        new FeatureAttribute<boolean>("guidedPrograms", false, "location has programs guided by someone. Eg guided hikes, wildlife programs, etc."), //location has programs guided by someone. Eg guided hikes, wildlife programs, etc
        new FeatureAttribute<boolean>("restaurant", false, "The location has a restaurant/cafe with prepared foods"), //The location has a resturant/cafe with prepared foods
        new FeatureAttribute<boolean>("amphitheater", false, "The location has a amphitheater"), //The location has a amphitheater
        new FeatureAttribute<boolean>("groupTenting", false, "Has group camping sites."), //Has group camping sites
        new FeatureAttribute<boolean>("tentSites", false, "Has sites for tents."), //Has sites for tents
        new FeatureAttribute<boolean>("cabinLodging", false, "Has cabins for rent."), //Has cabins for rent
        new FeatureAttribute<boolean>("hotelLodging", false, "Has lodging in a hotel type of facility."), //Has lodging in a hotel type of facility
        new FeatureAttribute<boolean>("picnicShelterRentals", false, "Picnic shelter rentals available."), // can rent picnic shelters
        new FeatureAttribute<boolean>("recreationalVehicleSites", false, "Sites available for RVs") //location has sites for RVs
    ];
 
    siteAttributes: FeatureAttribute<any>[] = [
        new FeatureAttribute<boolean>("handicapAccessible", false, "Handicap accessible"), // Is this site handdicap accessible 
        new FeatureAttribute<boolean>("electricHookup", false, "Electric hook-up"),  // Does this site have electric hookup
        new FeatureAttribute<boolean>("septicHookup", false, "Septic hook-up"), // Does this site have a sewage / septic hookup.
        new FeatureAttribute<boolean>("generatorsAllowed", false, "Generators allowed"), // does this site permit the use of generators.
        new FeatureAttribute<boolean>("parkingLevel", false, "Parking level"), // Defines whether the parking area is level
        new FeatureAttribute<boolean>("boatAccessible", false, "Boat accessible"), // Is this site adjacent to a boat slip
        new FeatureAttribute<boolean>("horseAccomodation", false, "Horse accommodations"), // Site support the stay of horses
        new FeatureAttribute<boolean>("petsAllowed", false, "Pets allowed"), // Whether pets are allowed during the stay at the site.
        // new FeatureAttribute<string>("generatorRules", false, "Generators are permitted between 9am and sunset."), // general rules for the use of a generator. 
        new FeatureAttribute<number>("maxOccupants", 5, "Maximum occupants"), // the maximum number of people who may stay at this site
        new FeatureAttribute<number>("minOccupants", 1, "Minimum occupants"), // The mimimum number of people who may stay at this site.
        new FeatureAttribute<number>("parkingLength", 25, "Parking length"), // The length in feet of the parking area.
        new FeatureAttribute<SurfaceType>("parkingSurface", SurfaceType.gravel, "Parking surface"),  // The parking surface type
        new FeatureAttribute<ShadeType>("shade", ShadeType.full, "Shade") // The type of shade available at the site.
    ];

    siteTypes: FeatureAttribute<any>[] = [
        new FeatureAttribute<SiteType>("tent", SiteType.tentSite, "Tent"), // Tent Site
        new FeatureAttribute<SiteType>("rv", SiteType.rvSite, "RV"), //Recreational Vehicle (RV) Site
        new FeatureAttribute<SiteType>("picnicShelter", SiteType.picnicShelter, "Picnic Shelter"), // Picnic Shelter
        new FeatureAttribute<SiteType>("grouptent", SiteType.groupTentSite, "Group Tent"), // Group Tent Site
        new FeatureAttribute<SiteType>("trailer", SiteType.trailerSite, "Trailer"), // Trailer site
        new FeatureAttribute<SiteType>("cabin", SiteType.cabin, "Cabin"), // Cabin Site
        new FeatureAttribute<SiteType>("boat", SiteType.boat, "Boat"), // Boat Site
        new FeatureAttribute<SiteType>("yurt", SiteType.yurt, "Yurt") // Yurt Site
    ];

    locationImages: GalleryImage[] = [
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

    costPeriod1: CostPeriod[] = [new CostPeriod(1, 1, 3, 31, 1, 10, 15, false), new CostPeriod(4, 1, 6, 30, 3, 15, 25, false), new CostPeriod(7, 1, 10, 31, 2, 10, 15, false), new CostPeriod(11, 1, 12, 31, 1, 5, 5, false)];
    costPeriod2: CostPeriod[] = [new CostPeriod(1, 1, 2, 27, 1, 7, 14, false), new CostPeriod(3, 1, 5, 31, 2, 9, 18, false), new CostPeriod(6, 1, 9, 30, 3, 10, 15, false), new CostPeriod(10, 1, 12, 31, 0, 0, 0, true)];
    costPeriod3: CostPeriod[] = [new CostPeriod(1, 1, 3, 31, 1, 5, 5, false), new CostPeriod(4, 1, 9, 30, 3, 15, 25, false), new CostPeriod(10, 1, 12, 31, 1, 5, 5, false)];

    location: LocationDetail;

    mapMinLat: number = 80;
    mapMaxLat: number = -30;

    mapMinLng: number = -150;
    mapMaxLng: number = 90;
    /** Set presets to false generate completely random site details.
     *  When true site type and coordinates will be predefined. Currently there are 24 available presets.
     */ 
    usePresetData: boolean = true;

    activities: Activity[] = [];
    reviews: Review[] = [];
    events: EventDetail[] = [];
    // Itinerary basic array
    itineraries: ItineraryBasic[] = [];
    sites: SiteDetail[] = [];

    constructor() {
        this.location = this.getRandomLocation();
        this.activities = this.getRandomActivities();
        this.reviews = this.getRandomReviews();
        this.events = this.getRandomEvents();
        this.sites = this.getRandomSiteList(this.location.totalReservableSites);
        this.itineraries = this.getRandomItineraries();
    }

    getRandomItineraries(): ItineraryBasic[] {
        var revs: ItineraryBasic[] = [];
        for (var i: number = 0; i < 50; i++) {
            revs[i] = this.getRandomItinierary();
        }

        return revs;
    }

    getLocationGallery(query: Query<number>, callback: ASyncReply<QueryResults<GalleryImage>>): void {
        var total: number = getRandom(4, this.locationImages.length);
        var imgs: GalleryImage[] = [];
        for (var i: number = 0; i < total; i++)
        {
            imgs[i] = getRandomArrayValue(this.locationImages);
        }
        var qr: QueryResults<GalleryImage> = new QueryResults<GalleryImage>();
        qr.startRow = query.startRow;
        qr.totalRecords = imgs.length;
        qr.results = imgs;

        callback.success(qr);
    }

    getSiteGallery(query: Query<number>, callback: ASyncReply<QueryResults<GalleryImage>>): void {
        this.getLocationGallery(query, callback);
    }

    /**
     * Returns SiteDetail object which contains much more information about a given site
    */
    getSiteDetail(siteObjectId: number, callback: ASyncReply<SiteDetail>): void {
        callback.success(getRandomArrayValue(this.sites));
    }

    filterSitesByExample(query: Query<SiteDetail>, reservationStart: Date, reservationEnd: Date, callback: ASyncReply<QueryResults<SiteBasic>>): void 
    {
        var filtered: SiteDetail[] = [];
        var rnd: number = getRandom(0, this.sites.length);

        for (var i: number = 0; i < rnd; i++) {
            filtered[i] = getRandomArrayValue(this.sites);
        }

        var qr: QueryResults<SiteDetail> = new QueryResults<SiteDetail>();
        qr.results = filtered;
        qr.startRow = 0;
        qr.totalRecords = filtered.length;
        callback.success(qr);

    }

    filterSites(query: Query<SiteDetail>, site_id: number, callback: ASyncReply<QueryResults<SiteBasic>>): void
    {
        var page: SiteBasic[] = [];
        var idx: number = 0;
        for (var i: number = query.startRow; i < (query.startRow + query.rowCount); i++)
        {
            page[idx++] = this.sites[i];
        }
        var qr: QueryResults<SiteBasic> = new QueryResults<SiteBasic>();
        qr.startRow = query.startRow;
        qr.totalRecords = this.activities.length;
        qr.results = page;
        callback.success(qr);
    }

    filterSitebyID(site_id: number): SiteDetail
    {
        var page: SiteDetail = new SiteDetail();
        page = this.sites.filter(i=> i.objectId == site_id)[0];
        if (page == undefined)
        {
            return new SiteDetail();
        }
        page.title = genString(10);
        return page;
    }
    getBasicItinerary(query: Query<number>, callback: ASyncReply<QueryResults<ItineraryBasic>>): void
    {
        var page: ItineraryBasic[] = [];
        var idx: number = 0;
        for (var i: number = query.startRow; i < (query.startRow + query.rowCount); i++)
        {
            page[idx++] = this.itineraries[i];
        }
        var qr: QueryResults<ItineraryBasic> = new QueryResults<ItineraryBasic>();
        qr.startRow = query.startRow;
        qr.totalRecords = this.activities.length;
        qr.results = page;
        callback.success(qr);
    }
    getActivities(query: Query<Activity>, callback: ASyncReply<QueryResults<Activity>>): void
    {
        var page: Activity[] = [];
        var idx: number = 0;
        for (var i: number = query.startRow; i < (query.startRow + query.rowCount); i++)
        {
            page[idx++] = this.activities[i];
        }
        var qr: QueryResults<Activity> = new QueryResults<Activity>();
        qr.startRow = query.startRow;
        qr.totalRecords = this.activities.length;
        qr.results = page;
        callback.success(qr);
    }

    getReviews(query: Query<Review>, callback: ASyncReply<QueryResults<Review>>): void
    {
        var page: Review[] = [];
        var idx: number = 0;
        for (var i: number = query.startRow; i < (query.startRow + query.rowCount); i++)
        {
            page[idx++] = this.reviews[i];
        }
        var qr: QueryResults<Review> = new QueryResults<Review>();
        qr.startRow = query.startRow;
        qr.totalRecords = this.reviews.length;
        qr.results = page;
        callback.success(qr);
    }

    getEvents(query: Query<EventDetail>, callback: ASyncReply<QueryResults<EventDetail>>): void
    {
        var page: EventDetail[] = [];
        var idx: number = 0;
        for (var i: number = query.startRow; i < (query.startRow + query.rowCount); i++)
        {
            page[idx++] = this.events[i];
        }
        var qr: QueryResults<EventDetail> = new QueryResults<EventDetail>();
        qr.startRow = query.startRow;
        qr.totalRecords = this.activities.length;
        qr.results = page;
        callback.success(qr);
    }

    makeReservation(intinerary: ItineraryCart, callback: ASyncReply<ReservationResults>): void
    {
        var rr: ReservationResults = new ReservationResults();
        rr.paymentUrl = "http://www.kinsail.com";
        rr.success = true;

        callback.success(rr);
    }

    private getRandomEvents(): EventDetail[]
    {
        var evts: EventDetail[] = [];
        for (var i: number = 0; i < 500; i++)
        {
            evts[i] = this.genEvent();
        }
        return evts;
    }

    private genEvent(): EventDetail
    {
        var ed: EventDetail = new EventDetail();
        ed.objectId = genNumber(1, 10);
        ed.locationObjectId = genNumber(1, 3);
        ed.descriptionHtml = genString(25);
        ed.image = getRandomArrayValue(this.locationImages);
        ed.title = genString(10);
        ed.start = genRandomDateInFuture(10, 50);
        ed.end = genRandomDateInFutureFromStart(ed.start, 1, 5);
        ed.reservationRequired = genBool();

        return ed;
    }

    private getRandomReviews(): Review[]
    {
        var revs: Review[] = [];
        for (var i: number = 0; i < 3; i++)
        {
            revs[i] = this.genReview();
        }

        return revs;
    }

    private genReview(): Review
    {
        var r: Review = new Review();
        r.description = getRandomArrayValue(__reviews);;
        r.rating = genNumber(1, 5);
        r.reviewBy = getRandomArrayValue(__names);
        r.reviewByTitle = getRandomArrayValue(__titles);
        r.summary = genString(50);

        return r;
    }

    private getRandomActivities(): Activity[]
    {
        var act: Activity[] = [];
        for (var i: number = 0; i < 20; i++)
        {
            act[i] = this.genActivity();
        }

        return act;
    }

    private genActivity(): Activity
    {
        var act: Activity = new Activity();
        act.descriptionHtml = genString(50);
        act.image = getRandomArrayValue(this.locationImages);
        act.title = genString(10);
        act.locationObjectId = genNumber(1, 3);
        act.objectId = genNumber(1, 500);
        return act;
    }
    
    /**
    * Generates a random site list or if desired random site with some preset data.
    * @param {number} totalReservableSites
    * @returns {Array} A random site list.
    * @private
    */
    private getRandomSiteList(totalReservableSites: number): Array<SiteDetail>
    {
        var sites = new Array();
        for (var i: number = 0; i < totalReservableSites; i++) {
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
    }

    private getRandomLocation(): LocationDetail
    {
        var loc: LocationDetail = new LocationDetail();
        var addr: Address = new Address();
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
        loc.mapTilesBaseURL = "";//TODO:
        loc.operatingOrganization = genString(35);
        loc.operatingOrganizationPhone = genNumber(100, 999) + "-" + genNumber(100, 999) + "-" + genNumber(1000, 9999);
        loc.priceMin = genNumber(5, 10);
        loc.priceMax = genNumber(loc.priceMin, 35);
        loc.reservationPhone = genNumber(100, 999) + "-" + genNumber(100, 999) + "-" + genNumber(1000, 9999);
        loc.reservationPolicies = genString(10);
        loc.title = genString(10);
        loc.totalReservableSites = genNumber(20, 24); // Increase the max value to randomize.

        return loc;
    }

    private getRandomItinierary(): ItineraryBasic
    {
        var detail: ItineraryBasic = new ItineraryBasic();
        detail.locationObjectId = genNumber(1, 10);
        detail.siteObjectId = genNumber(1, 10);
        detail.start = genRandomDateInFuture(1, 2);
        detail.end = genRandomDateInFutureFromStart(detail.start, 1, 3);
        //for (var a: number; a < 3; a++) {
        //    var act: Activity = new Activity();
        //    act = this.genActivity();
        detail.activities = this.activities.filter(i=> i.locationObjectId == detail.locationObjectId);
        //}
        detail.siteObjectId = genNumber(1, 3);
        return detail;
    }

    private getRandomSite(idx: number = null): SiteDetail
    {
        var detail: SiteDetail = new SiteDetail();

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
    }

    public getSiteList() {
        this.sites = this.getRandomSiteList(this.location.totalReservableSites);
        return this.sites;
    }

    public getSiteTypeList() {
        return this.siteTypes;
    }

    public getSiteAttributes() {
        return this.siteAttributes;
    }

    private getSite(): SiteDetail
    {
        var detail: SiteDetail = new SiteDetail();

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
    }

    private getRandomLocationAttributes(): FeatureAttribute<any>[]
    {
        var attrs: FeatureAttribute<any>[] = [];
        var rnd: number = getRandom(0, this.locationAttributes.length);

        for (var i: number = 0; i < rnd; i++)
        {
            attrs[i] = getRandomArrayValue(this.locationAttributes);

            if (attrs[i].value instanceof Boolean)
            {
                attrs[i].value = genBool();
            }

            if (attrs[i].value instanceof Number)
            {
                attrs[i].value = getRandom(0, attrs[i].value);
            }

            if (attrs[i].value instanceof String)
            {
                attrs[i].value = genString(attrs[i].value.length);//TODO this could be the slow problem
            }
        }

        return attrs;
    }

    private getRandomSiteAttributes(): FeatureAttribute<any>[]
    {
        var attrs: FeatureAttribute<any>[] = [];
        var rnd: number = getRandom(0, this.siteAttributes.length);

        for (var i: number = 0; i < rnd; i++)
        {
            attrs[i] = getRandomArrayValue(this.siteAttributes);

            if (attrs[i].value instanceof Boolean)
            {
                attrs[i].value = genBool();
            };

            if (attrs[i].value instanceof Number)
            {
                attrs[i].value = getRandom(0, attrs[i].value);
            };

            if (attrs[i].value instanceof String)
            {
                attrs[i].value = genString(attrs[i].value.length); //TODO invstigate this further
            };
        };

        return attrs;
    }

    private getRandomSiteType(caseValue : number = null): SiteType
    {
        var rnd: number = (caseValue) ? caseValue : getRandom(0, 7);
        switch (rnd)
        {
            case 0:
                return SiteType.tentSite;
            case 1:
                return SiteType.rvSite;
            case 2:
                return SiteType.picnicShelter;
            case 3:
                return SiteType.cabin;
            case 4:
                return SiteType.boat;
            case 5:
                return SiteType.trailerSite;
            case 6:
                return SiteType.groupTentSite;
            case 7:
                return SiteType.yurt;
        };
    }

    private getRandomCostStructure(): CostStructure
    {
        var rnd: number = getRandom(0, 2);
        switch (rnd)
        {
            case 0:
                return new CostStructure(this.costPeriod1);
            case 1:
                return new CostStructure(this.costPeriod2);
            case 2:
                return new CostStructure(this.costPeriod3);
        };
    }

    private getRandomMapCoordinates(): MapCoordinates
    {
        var coords: MapCoordinates = new MapCoordinates();
        coords.lat = getRandomInt(this.mapMinLat, this.mapMaxLat);
        coords.lng = getRandomInt(this.mapMinLng, this.mapMaxLng);
        return coords;
    }

    /**
     * Sets exact coordinates and type.
     */
    public setPresetData(detail: SiteDetail, idx: number = null): void
    {
        var _coords: MapCoordinates = new MapCoordinates();
        //Tent, rv, picnic, rv, cabin, boat, handicap, group
        var presetCoords = [
            {lat: 82, lng: -87, type: SiteType.tentSite},
            {lat: 80, lng: -96, type: SiteType.tentSite},
            {lat: 79, lng: -116, type: SiteType.tentSite},
            {lat: 78, lng: -142, type: SiteType.tentSite},
            {lat: 82, lng: -139, type: SiteType.tentSite},
            {lat: 81, lng: -147, type: SiteType.tentSite},

            {lat: 32, lng: 50, type: SiteType.rvSite},
            {lat: 44, lng: 14, type: SiteType.rvSite},
            {lat: 47, lng: 32, type: SiteType.rvSite},
            {lat: 23, lng: 23, type: SiteType.rvSite},
            {lat: 41, lng: 56, type: SiteType.rvSite},

            {lat: 72, lng: 62, type: SiteType.picnicShelter},

            {lat: 41, lng: -161, type: SiteType.cabin},
            {lat: 27, lng: -122, type: SiteType.cabin},
            {lat: 30, lng: -140, type: SiteType.cabin},
            {lat: 42, lng: -128, type: SiteType.cabin},
            {lat: 46, lng: -151, type: SiteType.cabin},
 
            {lat: -3, lng: 53, type: SiteType.boat},
            {lat: 73, lng: 2, type: SiteType.boat},
            {lat: 78, lng: -21, type: SiteType.boat},
            {lat: 80, lng: -46, type: SiteType.boat},
            {lat: 66, lng: 7, type: SiteType.boat},

            {lat: 72, lng: -128, type: SiteType.trailerSite},

            {lat: 68, lng: 21, type: SiteType.groupTentSite}
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
    }
};

var __names: string[] = ["Sean", "Tim", "Jacob", "Jon", "Pete", "Alex", "Bryan", "Tiffany", "Phil", "Dane", "Walter", "Amanda"];
var __titles: string[] = ["CEO", "Dog Lover", "Hiking Enthusiast", "Mountaineer"];
var __places: string[] = ["Greenberry's", "Starbucks", "the well", "FedEx", "Kinsail", "Kazan", "The Thia place", "the mountain", "the trail", "the field"];
var __things: string[] = ["soap", "spoon", "vase", "pickle", "pail", "goose", "dress", "fruit", "bitcoin", "laptop", "furniture", "jellyfish", "ghost", "doll", "program"];
var __affects: string[] = ["stomach bloating", "bad gas", "high", "mental paralysis", "a limp"];
var __actions: string[] = ["walk", "hike", "swim", "climb"];
var __adjectives: string[] = ["big", "tiny", "small"];
var __adverbs: string[] = ["silicitiously", "acutely", "dimly", "evenly", "highly", "mockingly", "respectfully"];
var __verbs: string[] = ["answer", "bury", "coach", "disapprove", "dust", "enjoy", "fill", "hum", "influence", "jam", "license", "melt"];

var __intros: string[] = ["[__names] went to [__places] in order to [__actions].", "[__names] and [__names] always try to avoid [__places] as it tends to cause [__affects].", "When visiting [__places] it is always a problem for [__names] and [__names] because their [__thing] [__verbs] all day long.", "it isn't [__adverbs] for [__names] to [__verbs] because of thier [____adjectives] [__things]!", "Once upon a time in a [__places] [__adverbs] away [_-names], [__names], and [_names] [__adverbs] [__adverbs] each other."];
var __etcs: string[] = ["The [__things] they were creating was not [__verbs]ed enough.", "Who knows how long it would have taken them if it wasn't for [__names] interrupting.", "If it wasn't for [__names] they would have never been searching for the [__things] for a [__adjectives] amount of time!", "Their hunt for the [__things] was never ending.", "They [__verbs] for the [__things], hoping that maybe one day their [__affects] would wear off before it was theirs!"];
var __summaries: string[] = ["Afterall, how could they have continued in light of their [__affects]?", "Thus avoid [__places] which cause [__affects]. You won't regret it!", "It is quite apparent that too much [__actions] is [__verbs] for you.", "In summary, never [__verbs] the [__things], it'll cause [__affects] of the [__things]!", "The End!"];
var __reviews: string[] = [
"My husband, myself, and my 12 year old brother stayed here for two nights and enjoyed it. We were in town for me to run a race (mudrun) and to visit the beach. It was the cheapest place around, and all we had to do was bring a tent!",
"My visit was exceptional! I am a beginning camper and I have stayed at 10 sites. This is an experience I have never imagined. The People were great, the site is above and beyond. I can’t wait until I get back!",
"My husband and I spent a week-end with our daughter's family. They had been previously and loved how kid friendly it is. Their 8 & 11 year old boys take their bikes and ride freely throughout the park and they like the playground equipment."
];

/**
 * Returns a random date in the future.
 */
function genRandomDateInFuture(min: number, max: number): Date
{

    var dt: Date = new Date();

    return genRandomDateInFutureFromStart(dt, min, max);
}

/**
 * Returns a random date in the future, after the supplied date
 */
function genRandomDateInFutureFromStart(start: Date, min: number, max: number): Date
{
    //var dt: Date = new Date(start.getDate());
    var dt: Date = new Date();
    var rnd = genNumber(min, max);
    return new Date(start.getDate() + rnd);
}

/**
 * Generates a random integer between min and max. An overload for getRandom(min,max);
 */
function genNumber(min: number, max: number)
{
    return getRandom(min, max);
}

/**
 * Generates a Random Boolean
 */
function genBool()
{
    return (1 == getRandom(0, 1));
}

/**
 * Generates a random string of a given length;
 */
function genString(length: number): string
{

    // return "x";
    //Fixme this function is very slow and needs to be refactored
    var str: string = getRandomString(__intros);
    var endStr: string = getRandomString(__summaries);

    while ((str.length + endStr.length) < length)
    {
        str += getRandomString(__etcs);
    }

    str += endStr;

    return str.substring(0, length);
}

/**
 * Returns a random value from the array of strings passed in.
 */
function getRandomString(possibleValues: string[])
{
    var rnd: number = getRandom(0, (possibleValues.length - 1));

    return fillString(possibleValues[rnd]);
}

function getRandomArrayValue(possibleValues: any[])
{
    var rnd: number = getRandom(0, (possibleValues.length - 1));
    return possibleValues[rnd];
}

/**
 * Examines the input string for special input tokes [__ and ] which designate placeholder for additional text. 
 */
function fillString(input: string): string
{

    var openToken: string = "[__";
    var closeToken: string = "]";

    var sidx: number = input.indexOf(openToken);
    while (sidx >= 0)
    {
        var eidx: number = input.indexOf(closeToken, sidx);
        var varName = input.substring(sidx + 1, eidx);

        var beginStr: string = input.substring(0, sidx);
        var endStr: string = input.substr(eidx + 1);
        try
        {
            var possibleValues: string[] = eval(varName);
            var rndResult = getRandom(0, possibleValues.length);
            var placeHolderValue: string = possibleValues[rndResult];
            if (placeHolderValue.indexOf(openToken) >= 0)
            {
                placeHolderValue = fillString(placeHolderValue);
            }
            input = beginStr + placeHolderValue + endStr;
        } catch (e)
        {
            input = beginStr + "ERR" + endStr;
        }

        sidx = input.indexOf(openToken);
    }

    return input;

}

/**
 * Returns a random whole number between the min & max values
 */
function getRandom(min: number, max: number): number
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random integer between the min & max values
 */
function getRandomInt(min: number, max: number): number
{
    return Math.round(Math.random() * (max - min) + min);
}




