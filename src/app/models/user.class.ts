export class user {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;

    constructor(obj? any) {
        this.uid = obj ? obj.uid : '';
        this.displayName = obj ? obj.displayName : '';
        this.email = obj ? obj.email : '';
        this.phoneNumber = obj ? obj.phoneNumber : '';
        this.photoURL = obj ? obj.photoURL : '';
        this.providerId = obj ? obj.providerId : '';
    }
}