import { Component, OnInit, ViewChild } from "@angular/core";
import {} from "googlemaps";
import { AppService } from "./service/app.service";
import { interval, timer } from "rxjs";
import { callbackify } from "util";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  origin = {};
  destination = { lat: 18.85476, lng: -97.098305 };
  time: any;
  constructor(private appService: AppService) {}

  public renderOptions = {
    suppressMarkers: true
  };

  public markerOptions = {
    origin: {
      icon:
        "https://www.shareicon.net/data/32x32/2015/09/02/94547_package_512x512.png",
      infoWindow: ``
    },
    destination: {
      icon:
        "https://www.shareicon.net/data/32x32/2015/08/23/89547_person_512x512.png"
    }
  };
  ngOnInit() {


    navigator.geolocation.getCurrentPosition(pos => {
      this.origin = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    });
  }

  mapClicked(e) {
    this.destination = { lat: e.coords.lat, lng: e.coords.lng };
    console.log(e.coords.lat, e.coords.lng);
  }

  getDistance(): any {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [this.origin],
        destinations: [this.destination],
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      },
      (responseDis, status) => {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
          alert(status);
        } else {
          this.time =
            responseDis.rows[0].elements[0].distance.text +
            " " +
            responseDis.rows[0].elements[0].duration.text;
          console.log(
            responseDis.rows[0].elements[0].distance.text +
              " " +
              responseDis.rows[0].elements[0].duration.text
          );
        }
      }
    );
    return this.time;
  }

  Go() {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(pos => {
        this.origin = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      });
      this.getDistance();
    }, 1000);
  }
}
