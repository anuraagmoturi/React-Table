
import React from 'react'
import FlatButton from 'material-ui/FlatButton';

const Delete = ({req, handleDelete}) => {
  return (
    <FlatButton 
      onClick={() => handleDelete(req)}
    label="Delete" secondary={true} />
  )
}

export default Delete

