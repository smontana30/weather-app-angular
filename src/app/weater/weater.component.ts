import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherServiceService } from '../weatherService.service';

@Component({
  selector: 'app-weater',
  templateUrl: './weater.component.html',
  styleUrls: ['./weater.component.css']
})
export class WeaterComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  weatherData: any;

  constructor(private weatherService: WeatherServiceService) { }

  passILocations = {
    city: 'Miami',
    country: 'US',
  }
  weatherImgArr = ['assets/sun.png', 'assets/rain.png', 'assets/cloud.png', 
    'assets/ice.png', 'assets/snow.png', 'assets/strom.png', 'assets/wind.png'];
  value = 'look up a city';
  forcastObj = [
    {
      cityName: '',
      temp: '',
      minTemp: '',
      maxTemp: '',
      feelsLike: '',
      description: '',
      humidity: '',
      seaLevel: '',
      date: '',
      weatherImg: '',
    },
    {
      cityName: '',
      temp: '',
      minTemp: '',
      maxTemp: '',
      feelsLike: '',
      description: '',
      humidity: '',
      seaLevel: '',
      date: '',
      weatherImg: '',
    },
    {
      cityName: '',
      temp: '',
      minTemp: '',
      maxTemp: '',
      feelsLike: '',
      description: '',
      humidity: '',
      seaLevel: '',
      date: '',
      weatherImg: '',
    },
    {
      cityName: '',
      temp: '',
      minTemp: '',
      maxTemp: '',
      feelsLike: '',
      description: '',
      humidity: '',
      seaLevel: '',
      date: '',
      weatherImg: '',
    },
    {
      cityName: '',
      temp: '',
      minTemp: '',
      maxTemp: '',
      feelsLike: '',
      description: '',
      humidity: '',
      seaLevel: '',
      date: '',
      weatherImg: '',
    }
  ]

  setCityCountry(val: string) {
    if (val.length == 0 && this.searchInput.nativeElement.value == null) {
      alert("Error no city has been searched for");
      return;
    }
    // console.log(val);
    // const input = this.searchInput.nativeElement.value;
    // if (val.length == 0) {
    //   console.log(input);
    //   let cityCountry = input.split(',');
    //   this.passILocations.city = cityCountry[0];
    //   this.passILocations.country = cityCountry[1];

    //   this.getWeather();
    //   return;
    // }
    let cityCountry = val.split(',');
    this.passILocations.city = cityCountry[0];
    this.passILocations.country = cityCountry[1];
    this.getWeather();
    setTimeout(() => {
      this.getMultiWeather();
    }, 1000);
  }

  getWeather() {
    return this.weatherService
    .getWeatherData( this.passILocations.city, this.passILocations.country)
    .subscribe((data) => {
      console.log(data);
      this.weatherData = data;
    })
  }

  getMultiWeather() {
    let j = 0;
    for(let i = 0; i < this.weatherData.list.length; i++) {
      if (j >= this.forcastObj.length) {
        break;
      }
      this.forcastObj[j].cityName = this.weatherData.city.name;
      this.forcastObj[j].description = this.weatherData.list[i].weather[0].description;
      this.forcastObj[j].temp = (this.weatherData.list[i].main.temp - 273.15).toFixed(0);
      this.forcastObj[j].humidity = this.weatherData.list[i].main.humidity;
      this.forcastObj[j].feelsLike = (this.weatherData.list[i].main.feels_like - 273.15).toFixed(0);
      this.forcastObj[j].maxTemp = (this.weatherData.list[i].main.temp_max - 273.15).toFixed(0);
      this.forcastObj[j].minTemp = (this.weatherData.list[i].main.temp_min - 273.15).toFixed(0);
      this.forcastObj[j].seaLevel = this.weatherData.list[i].main.sea_level;
      this.forcastObj[j].date = this.weatherData.list[i].dt_txt;
      if (this.forcastObj[j].description.includes('rain')) {
        this.forcastObj[j].weatherImg = this.weatherImgArr[1];
      }
      else if (this.forcastObj[j].description.includes('clear')) {
        this.forcastObj[j].weatherImg = this.weatherImgArr[0];

      }
      else if (this.forcastObj[j].description.includes('cloud')) {
        this.forcastObj[j].weatherImg = this.weatherImgArr[2];
      }
      else if (this.forcastObj[j].description.includes('hail')) {
        this.forcastObj[j].weatherImg = this.weatherImgArr[3];
      }
      else if (this.forcastObj[j].description.includes('snow')) {
        this.forcastObj[j].weatherImg = this.weatherImgArr[4];
      }
      else if (this.forcastObj[j].description.includes('wind')) {
        this.forcastObj[j].weatherImg = this.weatherImgArr[6];
      }
      else if (this.forcastObj[j].description.includes('thunder')) {
        this.forcastObj[j].weatherImg = this.weatherImgArr[5];
      }
      i += 6;
      j++;
    }
    console.log(this.forcastObj);
  }

  ngOnInit() {
    this.weatherService
    .getWeatherData( this.passILocations.city, this.passILocations.country)
    .subscribe((data) => {
      console.log(data);
      this.weatherData = data;
    });
    setTimeout(() => {
      this.getMultiWeather();
    }, 1000);
  }

}
