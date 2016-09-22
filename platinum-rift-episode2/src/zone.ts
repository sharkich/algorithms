export class Zone {
    public id: number;
    public platinum: number = 0;
    public owner: number = -1;
    public pods: number[] = [0,0];
    public isVisible: boolean;

    public isChangedOwner: boolean;
    public isChangedPods: boolean;

    public links: number[] = [];

    constructor(id: number, platinum: number = 0) {
        this.id = id;
        this.platinum = platinum;
    }

    addLink(zoneID: number) {
        this.links.push(zoneID);
    }

    update(owner: number,
           pods0: number,
           pods1: number,
           isVisible: boolean,
           platinum: number) {
        this.isChangedOwner = this.owner !== owner;
        this.owner = owner;
        this.isChangedPods = this.pods[0] !== pods0 || this.pods[1] !== pods1;
        this.pods[0] = pods0;
        this.pods[1] = pods1;
        this.isVisible = isVisible;
        this.platinum = platinum;
    }
}
