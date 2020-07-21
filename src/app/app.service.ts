import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Trip } from "./trip";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  // get all trips
  getAll() {
    return this.http
      .get(environment.baseUrl, {
        observe: "response",
        headers: this.httpOptions.headers,
      })
      .pipe(
        map((response) => {
          let content: any = response.body;
          return Trip.toArray(content);
        })
      )
      .pipe(
        catchError((err) => {
          return Observable.throw(err.message);
        })
      );
  }

  // update existing trip using id
  update(trip: Trip) {
    let body = JSON.stringify(trip);
    return this.http
      .put(environment.baseUrl + "/" + trip.id, body, {
        observe: "response",
        headers: this.httpOptions.headers,
      })
      .pipe(
        map((response) => {
          let content: any = response.body;
          return new Trip(content);
        })
      )
      .pipe(
        catchError((err) => {
          return Observable.throw(err.message);
        })
      );
  }

  // delete existing trip using id
  delete(id: number) {
    return this.http
      .delete(environment.baseUrl + "/" + id, {
        observe: "response",
        headers: this.httpOptions.headers

      })
      .pipe(
        map((res) => {
          let content: any = res.body;
          return new Trip(content);
        })
      )
      .pipe(
        catchError((err) => {
          return Observable.throw(err.message);
        })
      );
  }
}
