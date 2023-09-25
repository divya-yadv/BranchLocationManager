export class Branch {
  public buCode5: string;
  public status: string;
  public openedDt: Date;
  public address: string;
  public city: string;
  public stateName: string;
  public countryName: string;
  public currency: string;
  public phone: string;
  public businessHours: string;
  public latitude:number ;
  public longitude: number;
  

  constructor(buCode5: string, address: string, city: string, stateName: string, countryName: string, currency: string, phone: string, businessHours: string, latitude: number, longitude: number, status: string, openedDt: Date) {

    this.buCode5 = buCode5;

    this.status = status;

    this.openedDt = openedDt;

    this.address = address;

    this.city = city;

    this.stateName = stateName;

    this.countryName = countryName;

    this.currency = currency;

    this.phone = phone;

    this.businessHours = businessHours;

    this.latitude = latitude;

    this.longitude = longitude;

  }
}
