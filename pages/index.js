import {useState, useEffect} from "react"

import { MainCard } from "../componants/MainCard"
import { ContentBox } from "../componants/ContentBox"
import { Header } from "../componants/Header"
import { DateAndTime } from "../componants/DateAndTime"
import { Search } from "../componants/Search" 
import { MetricsBox } from "../componants/MetricsBox"
import { UnitSwitch } from "../componants/UnitSwitch"
import { LoadingScreen } from "../componants/LoadingScreen"
import { ErrorScreen } from "../componants/ErrorScreen"

import styles from "../styles/Home.module.css"

const App = () => {

    const [cityInput, setCityInput] = useState("Nottingham")
    const [triggerFetch, setTriggerFetch] = useState(true)
    const [weatherData, setWeatherData] = useState()
    const [unitSystem, setUnitSystem] = useState("metric")

    useEffect(() =>{
        const getData = async () => {
            const res = await fetch("api/data", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({cityInput})
            })
            const data = await res.json()
            setWeatherData({...data})
            setCityInput("")
        }
        getData()    
        }, [triggerFetch])

    console.log(weatherData);
    
    const changeSystem = () => 
        unitSystem == "metric"
            ? setUnitSystem("imperial")
            : setUnitSystem("metric")



    return weatherData && ! weatherData.message ?  
    (
        <div className={styles.wrapper}>
            <MainCard
                city={weatherData.name}
                country={weatherData.sys.country}
                description={weatherData.weather[0].description}
                iconName={weatherData.weather[0].icon}
                unitSystem={unitSystem}
                weatherData={weatherData}
            />
            <ContentBox>
                <Header>
                    <DateAndTime 
                        weatherData={weatherData}
                        unitSystem={unitSystem}
                    />
                    <Search
                        placeholder="Search a city..."
                        value={cityInput}
                        onFocus = {(e) => {
                            e.target.value = ""
                            e.target.placeholder=""
                        }}
                        onChange= {(e) => {
                            setCityInput(e.target.value)
                        }}
                        onKeyDown = {(e) => {
                            e.keyCode === 13 && setTriggerFetch(!triggerFetch)
                            e.target.placeholder = "Search a city..."
                        }}
                    />
                </Header>
                <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
                <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
            </ContentBox>                 
        </div>
    ) : weatherData && weatherData.message ? (
        <ErrorScreen errorMessage="City Not Found, try again!">
            <Search
                onFocus={(e) => (e.target.value="")}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyDown={(e) => e.keyCode === 13 && setTriggerFetch(!triggerFetch)}
            />    
        </ErrorScreen>
    ) : ( <LoadingScreen loadingMessage="Loading Data..." />

    )
    



}

export default App