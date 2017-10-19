import React from 'react';
import { loadBars } from '../../actions/eventActions';
import { connect } from 'react-redux';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      input: "",
      bars:[]
    }
    this.props.loadBars("chicago").then(res => console.log(res.data.businesses));
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e){
    this.props.loadBars(this.state.input).then(
      res => {this.setState({bars: res.data.businesses});
    console.log(res.data.businesses)}
    );
  }

  render(){
    return (
      <div className="jumbotron">
        <h1> Hi </h1>
        <div className="input-group">
            <input  name = "input" value = {this.state.input} type="text" onChange = {this.onChange} className="form-control" placeholder="Search for..."/>
            <span className="input-group-btn">
              <button className="btn btn-secondary" onClick = {this.onSubmit} type="button">Go!</button>
            </span>
        </div>
      </div>
    );
  }
}

export default connect(null, {loadBars})(MainPage);
