export class HostDTO {

  constructor(
    public fbId: string,
    public name: string,
    public surname: string,
    public pictureUri: string,
    public mail: string,

    public phoneNumber: string,
    public address: string,
    public averageRanking: number,
    public totalReviewerCount: number,
    public isVerfiedUser: boolean,
    public mongoKey: string) {

  }
}
