export class Trip {
  id: number;
  destination: string;
  start: Date;
  duration: number;
  comment: string;

  constructor(json?) {
    if (json) {
      this.id = json.id;
      this.destination = json.destination;
      this.start = json.start;
      this.duration = json.duration;
      this.comment = json.comment;
    }
  }

  // Utils
  static toArray(jsons: any[]): Trip[] {
    let trips: Trip[] = [];
    if (jsons != null) {
      for (let jsonV of jsons) {
        trips.push(new Trip(jsonV));
      }
    }
    return trips;
  }
}
