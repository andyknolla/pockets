import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';


const ListItem = ({listing}) => (
  //const listing = props.listing
  <Card className="card">
    <Link to={`/${listing.id}`} ><CardHeader
      title={listing.attributes.title}
      subtitle={listing.attributes.url}
      actAsExpander={true}
      showExpandableButton={true}
    /></Link>
    <CardActions>
      <Link to={`/${listing.id}`} ><FlatButton to="/about" label="Details" /></Link>
    </CardActions>
    <CardText expandable={true}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
  </Card>
);

export default ListItem;
