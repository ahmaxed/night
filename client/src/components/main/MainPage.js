import React from 'react';
import { updateSearch, addUser, removeUser } from '../../actions/barActions';
import { GetNumberOfUsersAttending, GetIfUserIsAttending } from './conditionalRenders';
import { connect } from 'react-redux';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      input: ""
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
    this.onRemoveUser = this.onRemoveUser.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onAddUser(e){
    this.props.addUser({yelpId: e.target.id, userId: this.props.id});
  }

  onRemoveUser(e){
    this.props.removeUser({yelpId: e.target.id, userId: this.props.id});
  }

  onChange(e){
    this.setState({input: e.target.value});
  }

  onSubmit(e){
    this.props.updateSearch({_id: this.props.id, lastSearch: this.state.input})
    .then(res => {
      this.setState({bars: this.props.bars.bars,
        barModel: this.props.bars.barModel
      });
    });
  }

  onKeyDown(e){
    if(e.keyCode === 13) {
      this.onSubmit();
    }
  }

  render(){
    //console.log(this.props.bars.bars);
    //console.log(this.props.bars.barModel);
    var bars = null;
    if(this.props.bars.bars){
      bars = this.props.bars.bars.map((bar, index )=>
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
            <GetNumberOfUsersAttending bar={bar} barModel={this.props.bars.barModel} />
            <GetIfUserIsAttending bar={bar} barModel={this.props.bars.barModel} id={this.props.id} onAddUser={this.onAddUser} onRemoveUser={this.onRemoveUser} />
          </div>
        </li>
      );
    }

    return (
      <div className="container">
        <div className="input-group">
            <input name="input"  type="text" value={this.state.input} onChange={this.onChange} onKeyDown={this.onKeyDown} className="form-control" placeholder="Search for..."/>
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
      id: state.auth.user.id,
      lastSearch: state.auth.user.lastSearch,
      bars: state.bars
    }
}
export default connect(mapStateToProps, {updateSearch, addUser, removeUser})(MainPage);
