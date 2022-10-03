import {useState, useEffect} from "react"
import styles from "../styles/Home.module.css"

const App = () => {

    const [cityInput, setCityInput] = useState("Riga")
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

    return (
        <div className={styles.wrapper}>
            <p>Weather App wrapper</p>
        </div>
    )
}

export default App