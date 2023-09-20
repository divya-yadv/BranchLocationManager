export class Branch {
  public id: number;
  public bU_CODE5: string;

  //public OPENED_AT: string;
  public address: string;
  public city: string;
  public statE_NAME: string;
  public countrY_NAME: string;
  public currency: string;
  public phone: string;
  public businesS_HOURS: string;
  public latitude: number;
  public longitude: number;

  constructor(Id: number, BU_CODE5: string,  ADDRESS: string, CITY: string, STATE_NAME: string, COUNTRY_NAME: string, CURRENCY: string, PHONE: string, BUSINESS_HOURS: string, LATITUDE: number, LONGITUDE: number) {

    this.id = Id;

    this.bU_CODE5 = BU_CODE5;

  

    //this.OPENED_AT = OPENED_AT;

    this.address = ADDRESS;

    this.city = CITY;

    this.statE_NAME = STATE_NAME;

    this.countrY_NAME = COUNTRY_NAME;

    this.currency = CURRENCY;

    this.phone = PHONE;

    this.businesS_HOURS = BUSINESS_HOURS;

    this.latitude = LATITUDE;

    this.longitude = LONGITUDE;

  }
}
