class PrefDropDown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUnits: this.props.unitsLoaded
        };
    }

    render() {
        return (
            <div className="container preferences">
                <h1 className="preferences-header">Unit Preferences</h1>
                <div className="pref-dropdown">
                    <form>
                        <select ref="dropdown" className="form-control" value={this.state.currentUnits}
                            onChange={(e) => this.unitsChosen(e)}
                        >
                            <option value="imperial">Imperial</option>
                            <option value="metric">Metric</option>
                            <option value="kelvin">Kelvin</option>
                        </select>
                    </form>
                </div>
            </div>
        )
    }

    showHideMenu(e) {
        e.preventDefault();
    }

    unitsChosen(e) {
        e.preventDefault();

        var units = this.refs.dropdown.value;
        var chosen = "yes";

        this.props.unitsChosen(units, chosen);

        this.setState({
            currentUnits: units
        });
    }
}
