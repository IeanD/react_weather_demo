class SearchWeather extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="container">
                <p className="description pull-right">enter a city or zip code</p>
                <br />
                <form className="clearFloat" onSubmit={(e) => this.onSearch(e)}>
                    <div className="form-group input-group">
                        <input type="text" ref="query" className="form-control" />
                        <span className="input-group-btn">
                            <button className="btn btn-submit searchButton" type="submit">get weather</button>
                        </span>
                    </div>
                </form>
            </div>
        )
    }
    onSearch(e) {
        e.preventDefault();

        this.props.onSearch(this.refs.query.value);
    }
}
