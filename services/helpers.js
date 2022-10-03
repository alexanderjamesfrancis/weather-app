import {
    unixToLocalTime,
    kmTOMiles,
    mpsToMph,
    timeTo12HourFormat
} from "./converters"

export const getWindSpeed = (unitSystem, visibilityInMeters) =>
    unitSystem == "metric"
    ? (visibilityInMeters/ 1000).toFixed(1)
    : kmTOMiles(visibilityInMeters /1000)

export const getTime = (unitSystem, currentTime, timezone) =>
    unitSystem == "metric"
    ?unixToLocalTime(currentTime, timezone)
    : timeTo12HourFormat(unixToLocalTime(currentTime, timezone))

export const getAMPM = (unitSystem, currentTime, timezone) =>
    unitSystem === "imperial"
    ? unixToLocalTime(currentTime, timezone).split(":")[0] >= 12
    ? "PM"
    : "AM"
    : ""

export const getWeekDay = (weatherData) => {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    return weekday[
        new Date((weatherData.dt + weatherData.timezone) * 1000).getUTCDate()
    ]
}    