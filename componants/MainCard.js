import Image from "next/image"
import { ctof } from "../services/converters"
import styles from "./MainCard.module.css"

export const MainCard =({
    city,
    country,
    description,
    iconName,
    unitSystem,
    weatherData
}) => {
return (
    <div className={styles.wrapper}>
        <h1 className={styles.location}>
            {city}, {country}
        </h1>
        <p className={styles.description}>{description}</p>
        <Image
            width="300px"
            height="300px"
            src={`/icons/${iconName}.svg`}
            alt="weatherIcon"
        />
        <h1 className={styles.temperature}>
            {unitSystem =="metric"
            ? Math.round(weatherData.main.temp - 273.15)
            : Math.round(ctof((weatherData.main.feels_like) - 273.15) * 9/5 + 32)}
            °{unitSystem =="metric" ? "C" : "F"}
        </h1>
        <p>
            Feels Like{" "}
            {unitSystem == "metric"
            ? Math.round(weatherData.main.feels_like - 273.15) 
            : Math.round(ctof((weatherData.main.feels_like) - 273.15) * 9/5 + 32)}
            °{unitSystem =="metric" ? "C" : "F"}
        </p>
    </div>
)}