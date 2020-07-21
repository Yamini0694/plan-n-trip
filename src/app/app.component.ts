import { Component } from "@angular/core";
import { Trip } from "./trip";
import { AppService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  trips = new Array<Trip>();
  p: number = 1;
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.getAllTrips();
  }
  
  getAllTrips() {
    this.appService.getAll().subscribe(
      (res) => {
        this.trips = res;
        this.trips = this.trips.sort(
          (a, b) => <any>new Date(b.start) - <any>new Date(a.start)
        );
      },
      (err) => console.log("Could not fetch due to " + err)
    );
  }

  updateTrip(trip: Trip) {
    this.appService.update(trip).subscribe(
      (res) => {
        if (res.id != null) this.getAllTrips();
        else console.log("could not update");
      },
      (err) => console.log("could not update", err)
    );
  }

  deleteTrip(id: number) {
    this.appService.delete(id).subscribe(
      (res) => {
        if (res) this.getAllTrips();
        else console.log("could not delete");
      },
      (err) => console.log("could not delete", err)
    );
  }
}
