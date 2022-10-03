import Image from "next/image"
import { ctof } from "../services/converters"
import styles from "./MainCard.modules.css"

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
        <image
            width="300px"
            height="300px"
            src={`/icons/${iconName}.svg`}
            alt="weatherIcon"
        />
        <h1 className={styles.temperature}>
            {unitSystem =="metric"
            ?Math.round(weatherData.main.temp)
            : Math.round(ctof(weatherData.main.temp))}
            °{unitSystem =="metric" ? "C" : "F"}
        </h1>
        <p>
            {unitSystem == "metric"
            ? Math.round(weatherData.main.feels__like)
            : Math.round(ctof(weatherData.main.feels_like))}
            °{unitSystem =="metric" ? "C" : "F"}
        </p>
    </div>
)}