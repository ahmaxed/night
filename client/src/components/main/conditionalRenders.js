import React from 'react';

export function GetNumberOfUsersAttending(props) {
  if(props.barModel[props.bar.id]) {
    return <h5>{props.barModel[props.bar.id].users.length} attending</h5>;
  }
  return <div></div>;
}

export function GetIfUserIsAttending(props) {
  var currentBar = props.barModel[props.bar.id];

  //if not logged in
  if (!props.id) { return <div></div>; }

  for (var i=0; i < currentBar.users.length; i++) {
    if(currentBar.users[i] === props.id) {
      return <button id={props.bar.id} type="button" className="btn btn-danger" onClick={props.onRemoveUser}>cancel</button>;
    }
  }
  
  return <button id={props.bar.id} type="button" className="btn btn-success" onClick={props.onAddUser}>attend</button>; 
}
