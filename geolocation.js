class CurrentLocationWeather extends React.Component {
    render() {
        return (
            <div className="button-block">
                <button className="geobutton" id="geo-button" type="submit" onClick={(e) => this.onPress(e)}><small>Current{<br/>}Location</small></button>
            </div>
        )
    }

    onPress(){
        if ("geolocation" in navigator) {
            var geocoordinates;
            var latitude;
            var longitude;
            var coords;

            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude.toFixed(2);
                longitude = position.coords.longitude.toFixed(2);
                var coords = "lat=" + latitude + "&lon=" + longitude;

                this.props.onPress(coords);
            });
        }
    }
}
