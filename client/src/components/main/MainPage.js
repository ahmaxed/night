import React from 'react';
import { loadBars } from '../../actions/eventActions';
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
    this.props.loadBars(this.state.input).then(
      res => {this.setState({bars: res.data.businesses});
    console.log(res.data.businesses)}
    );
  }

  render(){
    console.log(this.state.bars);
    var bars = null;
    if(this.state.bars){
      bars = this.state.bars.map((bar, index )=>
        <li key={index} className="list-group-item row" onClick={this.props.onClick} id = {bar.id} >
          <div className="col-sm-3 col-xs-4">
            <img className="img-responsive" src={bar.image_url}/>
          </div>

          <div className = "col-sm-9 col-xs-8">
            <h5><a href={bar.transactions.url}>{bar.name}</a></h5>
            <h5>0 people going</h5>
          </div>
          <button type="button" className = "btn btn-default">
            go
          </button>
        </li>);
    }

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

export default connect(null, {loadBars})(MainPage);
