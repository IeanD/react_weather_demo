var API_KEY = "f7588b89501d64f9208a6de63e4315f2";
var stateTest;

class App extends React.Component {
    constructor(props) {
        super(props);
        var unitPrefs;
        if(localStorage.getItem("unitPrefs")) {
            unitPrefs = localStorage.getItem("unitPrefs");
        } else {
            unitPrefs = "imperial";
        }
        this.state = {
            savedLocations: [],
            searchError: false,
            coords: null,
            currentUnits: unitPrefs
        };
    }

    componentDidMount() {
        var savedLocationsJSON = localStorage.getItem("savedLocations");
        var savedLocations = JSON.parse(savedLocationsJSON);
        try {
            if (savedLocations[0]) {
                this.setState({
                    savedLocations: savedLocations
                });
                this.searchForWeather(savedLocations[0], this.state.currentUnits);
            }
        } catch(error) { }
    }

    render() {
        return (
            <div className="container main-body">
                <CurrentLocationWeather 
                    onPress={(coords) => this.searchForWeather(coords, this.state.currentUnits)}
                />
                <BoreasHeader 
                    title="Boreas"
                />
                <SearchWeather 
                    onSearch={(query) => this.onSearch(query)}
                />
                {
                    this.state.searchError ? (
                        <ErrorAlert 
                            errorMsg="That's not a valid search term. Please search by city name, city ID or ZIP code."
                        />
                    ) : null
                }
                {
                    this.state.location ? (
                        <Weather
                            location={this.state.location}
                            description={this.state.description}
                            weather={this.state.weather}
                            temperature={this.state.temperature}
                            pressure={this.state.pressure}
                            humidity={this.state.humidity}
                            windSpeed={this.state.windSpeed}
                            iconURL={this.state.iconURL}
                            units={this.state.currentUnits}
                            query={this.state.query}
                            onSave={(location) => this.saveLocation(location)}
                        />
                    ) : null
                }
                <SavedLocations
                    savedLocations={this.state.savedLocations}
                    onSaveClick={(location) => this.searchForWeather(location)}
                    onDeleteClick={(location) => this.deleteLocation(location)}
                />
                <PrefDropDown
                    unitsLoaded = {this.state.currentUnits} 
                    unitsChosen={(units, choice) => this.setUnits(units, choice)}
                />   
            </div>
        );
    }

    onSearch(query) {
        this.setState({
            searchError: false
        });

        var queryValue = query;

        this.searchForWeather(queryValue, this.state.currentUnits);
    }

    setUnits(units, choice) {
        localStorage.setItem("unitPrefs", units);
        this.setState({
            currentUnits: units
        })
        if (choice === "yes" && this.state.query) {
            this.searchForWeather(this.state.query, units);
        }
    }

    saveLocation(location) {
        var savedLocations = this.state.savedLocations;
        if (savedLocations.indexOf(location < 0)) {
            savedLocations.push(location);
            this.setState(savedLocations);

            var stringedLocationJSON = JSON.stringify(savedLocations);
            localStorage.setItem("savedLocations", stringedLocationJSON);
        }
    }

    deleteLocation(location) {
        var savedLocations = this.state.savedLocations;
        if (savedLocations.indexOf(location) > -1) {
            savedLocations.splice(savedLocations.indexOf(location), 1);

            this.setState({
                savedLocations: savedLocations
            });

            var stringedLocationJSON = JSON.stringify(savedLocations);
            localStorage.setItem("savedLocations", stringedLocationJSON);
        }
    }

    searchForWeather(location, units) {
        var responseURL = "https://www.bell-towne.com/api/weather/?";
        if (!location.startsWith("lat=")) {
            responseURL += "q=";
        }
        responseURL += location + "&units=" + units + "&appid=" + API_KEY;

        fetch(responseURL)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            var locationName = json.name;
            var locationWeatherShort = json.weather[0].main;
            var locationWeatherLong = json.weather[0].description;
            var locationIconID = json.weather[0].icon;
            var locationTempKelvin = json.main.temp;
            var locationHumidity = json.main.humidity;
            var locationWindSpeed = json.wind.speed;
            var locationPressure = json.main.pressure
            
            this.setState({
                location: locationName,
                weather: locationWeatherShort,
                description: locationWeatherLong,
                iconURL: "http://openweathermap.org/img/w/" + locationIconID + ".png",
                temperature: locationTempKelvin,
                humidity: locationHumidity,
                windSpeed: locationWindSpeed,
                pressure: locationPressure,
                query: location
            });
        })
        .catch((error) => {
            this.setState({
                searchError: true
            });
        });
    }
}

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
