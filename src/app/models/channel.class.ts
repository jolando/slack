export class Channel {
    name: string;
    description: string;
    userIdList: [];
    createdBy: string;

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.description = obj ? obj.description : '';
        this.userIdList = obj ? obj.userIdList : '';
        this.createdBy = obj ? obj.createdBy : '';
    }

    public toJSON() {
        return {
            name: this.name,
            description: this.description,
            userIdList: this.userIdList,
            createdBy: this.createdBy
        }
    }
}