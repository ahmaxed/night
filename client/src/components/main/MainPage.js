import React from 'react';
import { updateSearch, addUser } from '../../actions/barActions';
import { connect } from 'react-redux';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      input: "",
      bars:null,
      attendees: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  onClick(e){
    console.log(e.target.id);
    this.props.addUser({yelpId: e.target.id, userId: this.props.id});
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e){
    this.props.updateSearch({_id: this.props.id, lastSearch: this.state.input})
    .then(res => {
      this.setState({bars: res.data[0],
        attendees: res.data[1]
      });
    });
  }
  onKeyDown(e){
    if(e.keyCode === 13) {
      this.onSubmit();
    }
  }

  render(){
    function GetAttendees(props) {
      if(props.attendees[props.bar.id]) {
        return <h5>{props.attendees[props.bar.id].users.length} attending</h5>;
      }
       return <h5>0 attending</h5>;
    }

    var bars = null;

    if(this.state.bars){
      bars = this.state.bars.map((bar, index )=>
        <li key={index} className="list-group-item row" onClick={this.props.onClick} id={bar.id} >
          <div className="col-sm-3 col-xs-4">
            <img className="img-responsive" src={bar.image_url} alt={bar.name}/>
          </div>

          <div className = "col-sm-9 col-xs-8">
            <h4><a href={bar.url}>{bar.name}</a></h4>
            <GetAttendees bar={bar} attendees={this.state.attendees}/>
            <button id={bar.id} type="button" className = "btn btn-default" onClick = {this.onClick}>
              go
            </button>
          </div>
        </li>
      );
    }

    return (
      <div className="container">
        <h1> Hi </h1>
        <div className="input-group">
            <input  name = "input" value = {this.state.input} type="text" onChange = {this.onChange} onKeyDown = {this.onKeyDown} className="form-control" placeholder="Search for..."/>
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
export default connect(mapStateToProps, {updateSearch, addUser})(MainPage);
