class Weather extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        var tempString = parseInt(this.props.temperature);
        var tempUnits;
        var windUnits;
        if (this.props.units === "imperial") {
                tempUnits = "\xB0 F";
                windUnits = "mph";
        } else if (this.props.units === "metric") {
                tempUnits = "\xB0 C";
                windUnits = "kph";
        } else {
                tempUnits = "\xB0 K";
                windUnits = "kph";
        }
        tempString += tempUnits;
        
        return (
                <div>
                    <div className="container">
                        <h2 className="current-city-h2">Here&lsquo;s the current weather for {this.props.location}...</h2>
                    <button onClick={(e) => this.save(e)} className="btn btn-submit pull-right save-btn">
                        Save this place for later?
                    </button>
                        <h4>Currently there&lsquo;s {this.props.weather} outside.</h4>
                        <h4 className="current-weather"><small>"{this.props.description}"</small></h4>
                        <img src={this.props.iconURL} ></img>
                        <h4>It&lsquo;s {tempString} outside. Be prepared.</h4>
                        <p>Humidity: {this.props.humidity}%</p>
                        <p>Wind Speed: {this.props.windSpeed}{windUnits}</p>
                        <p>Pressure: {this.props.pressure}hPa</p>
                    </div>

                </div>
        );
    }

    save(e) {
        e.preventDefault();

        this.props.onSave(this.props.query);
    }
}
