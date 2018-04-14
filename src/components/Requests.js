import React, {Component, Fragment} from 'react'
import RequestTable from './Requests/RequestTable'
import AppBar from 'material-ui/AppBar';

class Requests extends Component {

state ={
  value:''
}
  handleChange = ()=>{
    this.setState({value: ''})
  }

  render(){
    return(
      <Fragment>
        <AppBar
          title="Requests"
          showMenuIconButton={false}
        />
        <div><RequestTable /></div>
      </Fragment>
    )
  }
}

export default Requests;