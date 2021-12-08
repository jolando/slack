export class Message {
    userIdList: [];
    createdBy: string;

    constructor(obj?: any) {
        this.userIdList = obj ? obj.userIdList : '';
        this.createdBy = obj ? obj.createdBy : '';
    }

    public toJSON() {
        return {
            userIdList: this.userIdList,
            createdBy: this.createdBy,
        }
    }
}