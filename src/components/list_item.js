import React from 'react';
import { Link } from 'react-router-dom';
import edit from '../../public/resources/edit.png';
import trash from '../../public/resources/trash.png';

const ListItem = ({listing}) => (
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
