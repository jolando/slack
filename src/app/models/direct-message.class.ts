export class DirectMessage {
    createdBy: string;
    level: number;
    userIdList: [];

    constructor(obj?: any) {
        this.createdBy = obj ? obj.createdBy : '';
        this.level = 2;
        this.userIdList = obj ? obj.userIdList : '';
    }

    public toJSON() {
        return {
            createdBy: this.createdBy,
            level: this.level,
            userIdList: this.userIdList
        }
    }
}