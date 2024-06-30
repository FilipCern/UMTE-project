import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { Geolocation, Position } from '@capacitor/geolocation';
import { useEffect, useState } from 'react';

const Tab1: React.FC = () => {
  const [location, setLocation] = useState<Position>()
  const [weatherData, setWeatherData] = useState()
  console.log(weatherData);

useEffect(() => {
  const getLocation = async () => {
    
  const coord = await Geolocation.getCurrentPosition()
  setLocation(coord)
  }
  getLocation()
}, [])


useEffect(() =>{

  const getWeather =() => {
    const units ="metric"
    const latitude = location?.coords.latitude
    const longitude = location?.coords.longitude
    const key = "a650ef29fa068dfd05b04dc4c003dff1"
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${key}`)
  .then ((response) => response.json())
  .then((data) => setWeatherData(data))
  }

  if (location) getWeather()
},[location]) //Useeffect se zavolá vždy když se změnít location

//9209af450fbbd9fed829ae862433008d
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
