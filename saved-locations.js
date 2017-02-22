class SavedLocations extends React.Component {
    render() {
        return (
            <div className="container">
                <h1 className="saved-cities">Saved Locations</h1>
                <hr />
                <ul className="list-unstyled saved-list">
                    {
                        this.props.savedLocations.map((location) => (
                            <li key={location} ref={location}>
                                <a href="#" onClick={(e) => this.onSavedClick(e, location)} className="li-link">
                                    {location}
                                </a>
                                <button onClick={(e) => this.onDeleteClick(e, location)} className="savedLi-btn pull-right">
                                    remove
                                </button>
                                <br />
                                <br />
                            </li>
                        ))
                    }
                </ul>
                <hr />
            </div>
        )
    }

    onSavedClick(e, location) {
        e.preventDefault();

        this.props.onSaveClick(location);
    }

    onDeleteClick(e, location) {
        e.preventDefault();

        this.props.onDeleteClick(location);
    }
}
