import React from 'react';
import ListItem from './list_item';

const List = (props) => {
  const listItems = props.listings.map((listing) => {
    return <ListItem key={listing.id} listing={listing} />
  });

  return (
    <ul>
      {listItems}
    </ul>
  );
};

export default List;
