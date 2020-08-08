import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  key = 'YourApiKey';
  url: any;

  constructor(private http: HttpClient) { 
    this.url = 'http://api.openweathermap.org/data/2.5/forecast?q=';
  }

  getWeatherData(city, country) {
    return this.http.get(this.url + city + ',' + country + '&APPID=' + this.key);
  }
}
