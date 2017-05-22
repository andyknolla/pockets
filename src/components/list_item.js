import React from 'react';
// import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import edit from '../../public/edit.png';
import trash from '../../public/trash.png';



const ListItem = ({listing}) => (
  //const listing = props.listing
  <Link to={`/${listing.id}`} className="">
    <li className="six columns card">

    <div className="title">{listing.attributes.title}
      <span className="icons">
        <img src={edit} alt="edit" className="icon"/>
        <img src={trash} alt="delete" className="icon" />
      </span>
    </div>
    <div className="url">{listing.attributes.url}</div>
  </li>
</Link>


);

export default ListItem;
