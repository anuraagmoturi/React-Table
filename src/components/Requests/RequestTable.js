import React, { Component, Fragment } from 'react'
import Moment from 'react-moment';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Link } from 'react-router-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux'
import * as actions from '../../actions'

import Edit from '../Buttons/Edit'
import Delete from '../Buttons/Delete'

import PopoverBox from '../Popover'

class RequestTable extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      value: "All",
      requests: this.props.requests || []
       };
  }

  componentWillReceiveProps(nextProps){
      this.setState({ requests: nextProps.requests })
  }


  handleChange = async (event, index, value) => {
    console.log("value from drop", value)
    await this.setState({ value })
    console.log('value from state',this.state.value);

    }

  filterStatus() {
    if (this.state.value == "All") {
      return [...this.state.requests]
    } else {
      return [...this.state.requests.filter(req => req.status == this.state.value)]
    }
  }

  delete(req){
    this.props.delete_request(req)
  }
 

  renderTable() {
    const filteredValues = this.filterStatus()
      return filteredValues.map((req) => {
        return (
          <TableRow key={req.id} >
            <TableRowColumn>{req.title}</TableRowColumn>
            <TableRowColumn><PopoverBox request={req} statusLabel={req.status}/></TableRowColumn>

            <TableRowColumn>
              <Moment format="YYYY-MM-DD">
                {req.created_at}
              </Moment>
            </TableRowColumn>
            <TableRowColumn>
              <Moment format="YYYY-MM-DD">
                {req.updated_at}
              </Moment>
            </TableRowColumn>
            <TableRowColumn><Link to={'/edit/' + req.id}><Edit /></Link></TableRowColumn>
            <TableRowColumn>
              <Delete 
              req={req}
              handleDelete={this.delete.bind(this)}
              />
            </TableRowColumn>
          </TableRow>
        )
      })
  
    
  }

  render() {
    return (
     <Fragment>
        <FlatButton label="Filter By:" disabled={true} />
      <div>
        
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={'All'} primaryText="All" />
          <MenuItem value={'Approved'} primaryText="Approved" />
          <MenuItem value={'Pending'} primaryText="Pending" />
          <MenuItem value={'Denied'} primaryText="Denied" />
        </DropDownMenu>
        <br />

      </div>

        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>

              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Created</TableHeaderColumn>
              <TableHeaderColumn>Updated</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>


            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderTable()}
          </TableBody>
        </Table>
     
      </Fragment>
    )
  }
}

function mapStateToProps({requests}) {
  debugger
  return {
    requests: requests.sort(function (a, b) {
      return new Date(b.updated_at) - new Date(a.updated_at);
    }) 
  }

}

export default connect(mapStateToProps, actions)(RequestTable); 
