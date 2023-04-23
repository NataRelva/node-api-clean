import { PurchaseModel } from "../../../../../domain/models/financial/purchase-entity";

class Purchase {
  public date: Date;
  public total: number;

  constructor(date: Date, total: number) {
    this.date = date;
    this.total = total;
  }
}

class Day {
  public label: string;
  public total: number;
  public purchases: Purchase[];

  constructor(label: string) {
    this.label = label;
    this.total = 0;
    this.purchases = [];
  }
}

class Month {
  public label: string;
  public total: number;
  public days: Day[];

  constructor(label: string) {
    this.label = label;
    this.total = 0;
    this.days = [];
  }

  public findOrCreateDay(dayLabel: string): Day {
    let day = this.days.find(d => d.label === dayLabel);
    if (!day) {
      day = new Day(dayLabel);
      this.days.push(day);
    }
    return day;
  }
}

class Year {
  public label: string;
  public total: number;
  public months: Month[];

  constructor(label: string) {
    this.label = label;
    this.total = 0;
    this.months = [];
  }

  public findOrCreateMonth(monthLabel: string): Month {
    let month = this.months.find(m => m.label === monthLabel);
    if (!month) {
      month = new Month(monthLabel);
      this.months.push(month);
    }
    return month;
  }
}

class PurchaseHistory {
  public years: Year[];

  constructor() {
    this.years = [];
  }

  public addPurchase(purchase: Purchase) {
    const year = this.years.find(y => y.label === purchase.date.getFullYear().toString());
    if (!year) {
      const newYear = new Year(purchase.date.getFullYear().toString());
      this.years.push(newYear);
      newYear.total += purchase.total;
      const newMonth = newYear.findOrCreateMonth(purchase.date.getMonth().toString());
      newMonth.total += purchase.total;
      const newDay = newMonth.findOrCreateDay(purchase.date.getDate().toString());
      newDay.total += purchase.total;
      newDay.purchases.push(purchase);
    } else {
      year.total += purchase.total;
      const month = year.findOrCreateMonth(purchase.date.getMonth().toString());
      month.total += purchase.total;
      const day = month.findOrCreateDay(purchase.date.getDate().toString());
      day.total += purchase.total;
      day.purchases.push(purchase);
    }
  }
}

export class PurchaseHistoryGrouped {
  public years: Year[];

  constructor(purchases: PurchaseModel[]) {
    const history = new PurchaseHistory();
    purchases.forEach(p => {
      history.addPurchase(new Purchase(p.createdAt, p.total));
    });
    this.years = history.years;
  }

  public get(): any { 
    return this.years;
  }
}