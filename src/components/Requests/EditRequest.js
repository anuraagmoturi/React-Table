import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import * as actions from '../../actions'

import FlatButton from 'material-ui/FlatButton';


class EditRequest extends Component {

constructor(props){
  super(props);
  this.state = { 
    id: this.props.id,
    requests: this.props.requests || [],
    request: this.props.request || []
  }

  this.updateRequest = this.updateRequest.bind(this);
  this.saveButton = this.saveButton.bind(this);

}


updateRequest(event) {
  
  const field = event.target.name;
  let request = this.state.request;
  request[field] = event.target.value;
  this.setState({ request: request });

  
}

async saveButton(){

  const request = {...this.state.request}
  request.updated_at = new Date().toLocaleDateString();
  await this.setState({request})


  this.props.update_request(this.state.request)
  this.props.history.push('/requests')
}

  render(){
    return (
      <Fragment>
        <AppBar
          title="Edit Request"
          showMenuIconButton={false}
        />
        <TextField
          id="id"
          key={"id"}
          name="id"
          onChange={this.updateRequest}
          defaultValue={this.state.request.id}
        /> <br />
        <TextField
          id="title"
          key={"title"}
          name="title"
          onChange={this.updateRequest}
          defaultValue={this.state.request.title}
        /><br />
        <TextField
          id="status"
          key={"status"}
          name="status"
          onChange={this.updateRequest}
          defaultValue={this.state.request.status}
        /><br />
        <FlatButton
          onClick={this.saveButton}
          label="Save" primary={true} />
      </Fragment>
    )
  }
}

function getReqById(requests, id){
  const request = requests.filter(req => req.id == id);
  if (request.length) return request[0];
  return null;
}

function mapStateToProps({requests}, ownProps){
  debugger
  let id = null;
  if(ownProps){
    id = ownProps.match.params.id;
  }
  let request = getReqById(requests, id)

  return {
    id,
    requests,
    request
  }
}

export default connect(mapStateToProps,actions)(EditRequest) 