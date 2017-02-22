class ErrorAlert extends React.Component {
    render() {
        return (
            <div id="search-error" className="alert alert-danger" role="alert">
                {this.props.errorMsg}
            </div>  
        )                              
    }
}
