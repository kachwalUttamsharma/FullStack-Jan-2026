import React from "react";
import { useCallback } from "react";
import { useState } from "react";

const ItemList = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [count, setCount] = useState(0);

  const removeItem = useCallback((itemToRemove) => {
    console.log("remove item function is called");
    setItems((prev) => prev.filter((i) => i != itemToRemove));
  }, []);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <RenderList items={items} removeItem={removeItem} />
    </div>
  );
};

const RenderList = React.memo(({ items, removeItem }) => {
  console.log("render list component is executed");
  return (
    <>
      {items?.map((item, index) => {
        return (
          <div key={index}>
            <p>{item}</p>
            <button onClick={() => removeItem(item)}>Remove</button>
          </div>
        );
      })}
    </>
  );
});

export default ItemList;

// applies to functions only
// useCallback -> caches the function defination/address
// usememo -> cahces the function return value based on dependency array
// memo -> caches the component itself based on props
