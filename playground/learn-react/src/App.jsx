import React, { useState } from 'react';

function Posts({itemList}){

  return itemList.map(item =>
     <div key={item.id}>
      <h1>hello {item.name}</h1>
      <p>welcome to the channel</p>
    </div>
  )

}

const App = () => {
    const items =[
      {id:1, name:"omkar"},
      {id:2, name:"alex"},
      {id:3, name:"bob"},
      {id:4, name:"cat"}
    ]

    return (
      <>
       <Posts itemList={items}></Posts>
      </>
    );
};

export default App;
