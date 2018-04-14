import React from 'react';
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions'


class PopoverBox extends React.Component {
  state = {
    open: false,
    request: this.props.request
  };


  componentDidMount(){
    this.setState({request: this.props.request})
  }

   handleButton= async (str) => {

    const request = { ...this.state.request }
    request.status = str
    await this.setState({request})

    this.props.update_request(this.state.request)

    this.handleClose()
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Approve"
       
        primary={true}
        onClick={()=>this.handleButton('Approved')}
      />,
      <FlatButton
        label="Deny"
      
        primary={true}
        onClick={() => this.handleButton('Denied')}
      />,
      <FlatButton
        label="Pending"
        
        primary={true}
       
        onClick={() => this.handleButton('Pending')}
      />,
    ];

    return (
      <div>
        <RaisedButton label={this.props.statusLabel} onClick={this.handleOpen} />
        <Dialog
          title="Request Status"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Do you want to change the status of the Request?
        </Dialog>
      </div>
    );
  }
}


export default connect(null,actions)(PopoverBox)