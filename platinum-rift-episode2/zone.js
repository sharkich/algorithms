class Zone {
    constructor(options) {
        this.id = options.id;
        this.platinum = options.platinum;
        this.pods = [0, 0];
        this.owner = undefined;
        this.isVisible = undefined;
        this.links = [];
    }

    update(options) {
        this.owner = options.owner;
        this.pods = options.pods;
        this.isVisible = options.isVisible;
        this.platinum = options.platinum;
    }

    addLink(zone) {
        this.links.push(zone.id);
    }

    get neighborhoods() {
        return this.links.length;
    }

    get isHasMyPODs() {
        return this.pods[MY_ID] > 0;
    }

    get isMyZone() {
        return this.id === MY_ID;
    }
}
