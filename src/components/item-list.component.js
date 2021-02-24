import React, { useState, useEffect } from "react";
import axios from 'axios';
import { CardColumns } from 'react-bootstrap';
import ItemListElement from './item-list-element.component';

export default function ItemList() {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/items/')
    .then(res => {
      setItems(res.data)
    })
  .catch((error) => {
    console.log(error);
  })

  },[])

  const deleteItem = (itemId) => {
    console.log('deleting ' + itemId);
    axios.delete('http://localhost:4000/items/delete-item/' + itemId).then((res) => {
      console.log(items[itemId] + ' successfully deleted!')
      delete items[itemId]
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
  <div classname="table-wrapper">
    <CardColumns>
      {items.map((item, index)=> <ItemListElement obj={item} key={index} deleteItem={deleteItem} />)}
    </CardColumns>
  </div>
  )
}


