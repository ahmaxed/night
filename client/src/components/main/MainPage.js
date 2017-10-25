import React from 'react';
import { updateSearch, addUser } from '../../actions/barActions';
import { connect } from 'react-redux';

function GetAttendees(props) {
  if(props.attendees[props.bar.id]) {
    return <h5>{props.attendees[props.bar.id].users.length} attending</h5>;
  }
  return <div></div>;
}

function GetUserStatus(props) {
  console.log(props.id);
  console.log(props.attendees[props.bar.id]);
  if (!props.id) { 
    return <div></div>;
  } 
	
  if(props.attendees[props.bar.id]){
    for (var i=0; i < props.attendees[props.bar.id].users.length; i++) {   
    console.log(i);
      if(props.attendees[props.bar.id].users[i] === props.id) {
        return <button id={props.bar.id} type="button" className="btn btn-danger" onClick={props.onClick}>cancel</button>;
      }
    }
  }
  
  return <button id={props.bar.id} type="button" className="btn btn-success" onClick={props.onClick}>attend</button>;
}

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
    var bars = null;

    if(this.state.bars){
      bars = this.state.bars.map((bar, index )=>
        <li key={index} className="list-group-item row" onClick={this.props.onClick} id={bar.id} >
          <div className="colsx col-xs-12 col-sm-5 col-md-4 col-lg-3">
	         <img className="img-responsive" src={bar.image_url} alt={bar.name}/>
	       </div>
	       
	       <div className="xs col-xs-7 col-sm-4 col-md-4 col-lg-6">
	         <h4><a className="btn btn-secondary" href={bar.url}>{bar.name}</a></h4>
	         <h5>{bar.location.display_address[0]}</h5>
	         <h5>{bar.location.display_address[1]}</h5>
	       </div>
          
          <div className="xs xxs col-xs-5 col-sm-3 col-md-4 col-lg-3 text-right">
          	<h5 id="phone">{bar.display_phone}</h5>
            <GetAttendees bar={bar} attendees={this.state.attendees} />
            <GetUserStatus bar={bar} attendees={this.state.attendees} id={this.props.id} onClick={this.onClick} />
          </div>
        </li>
      );
    }

    return (
      <div className="container">
        <div className="input-group">
            <input name = "input" value={this.state.input} type="text" onChange={this.onChange} onKeyDown={this.onKeyDown} className="form-control" placeholder="Search for..."/>
            <span className="input-group-btn">
              <button className="btn btn-secondary" onClick={this.onSubmit} type="button">Go!</button>
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
