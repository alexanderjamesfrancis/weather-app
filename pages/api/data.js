export default async function handler(req, res) {
    const {cityInput} = req.body
    
    const getWeatherData = await fetch(
        //Sort API key
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
        //`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric$appid=${process.env.OPENWEATHERMAP_API_KEY}`
    )
    console.log(getWeatherData);

    const data =await getWeatherData.json()
    res.status(200).json(data)
}