import React from 'react';
import { updateSearch } from '../../actions/barActions';
import { connect } from 'react-redux';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      input: "",
      bars:null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e){
    this.props.updateSearch({_id: this.props.id, lastSearch: this.state.input})
    .then(res => {
        console.log(res);
        this.setState({bars: res.data});
      });
  }

  render(){
    console.log(this.state.bars);
    var bars = null;
    if(this.state.bars){
      bars = this.state.bars.map((bar, index )=>
        <li key={index} className="list-group-item row" onClick={this.props.onClick} id = {bar.id} >
          <div className="col-sm-3 col-xs-4">
            <img className="img-responsive" src={bar.image_url} alt={bar.name}/>
          </div>

          <div className = "col-sm-9 col-xs-8">
            <h4><a href={bar.url}>{bar.name}</a></h4>
            <h5>0 people going</h5>
              <button type="button" className = "btn btn-default">
                go
              </button>
          </div>

        </li>);
    }

    console.log(this.props.id);
    return (
      <div className="container">
        <h1> Hi </h1>
        <div className="input-group">
            <input  name = "input" value = {this.state.input} type="text" onChange = {this.onChange} className="form-control" placeholder="Search for..."/>
            <span className="input-group-btn">
              <button className="btn btn-secondary" onClick = {this.onSubmit} type="button">Go!</button>
            </span>
        </div>
        <ul className="list-group">
        {bars}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      id: state.auth.user.id
    }
}
export default connect(mapStateToProps, {updateSearch})(MainPage);
