"use client";
import { useState, useRef } from "react";

interface Item {
  type: string;
  name: string;
}

const data: Item[] = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

export default function Home() {

  const [items, setItems] = useState<Item[]>(data);
  const [fruit, setFruit] = useState<Item[]>([]);
  const [vegetable, setVegetable] = useState<Item[]>([]);
  const timeOutRef = useRef(new Map<string,NodeJS.Timeout>)

  function setItem(newItem:Item) {

    setItems((prevItems) => prevItems.filter((item) => item.name !== newItem.name));
    if (newItem.type === "Fruit") {
      setFruit((prevItems) => [...prevItems, newItem]);
    } else {
      setVegetable((prevItems) => [...prevItems, newItem]);
    }

    const timeout = setTimeout(() => {
      returnItemToItems(newItem)
    }, 5000);

    const timeOutmap = timeOutRef.current;
    timeOutRef.current = timeOutmap.set(newItem.name,timeout);
  }
  

  function returnItemToItems(newItem:Item) {
    const timeout =  timeOutRef.current;
    clearTimeout(timeout.get(newItem.name));
    timeout.delete(newItem.name);

    setItems((prevItems) => [...prevItems, newItem]);
    if(newItem.type === "Fruit"){
      setFruit((prevItems) =>
      prevItems.filter((item: Item) => item.name !== newItem.name)
    );
    }else{
      setVegetable((prevItems) =>
      prevItems.filter((item: Item) => item.name !== newItem.name)
    );
    }

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-baseline justify-between font-mono text-sm lg:flex">
        <div className="item">
          {items.map((item, index) => {
            return (
              <div
                className="card-custom"
                key={index}
                onClick={() => setItem(item)}
              >
                {item.name}
              </div>
            );
          })}
        </div>

        <div className="fruit">
          <div
            className="card-custom bg-slate-300 text-black"
            style={{ width: "150px" }}
          >
            Fruit
          </div>
          {fruit.map((item,index) => {
            return (
              <div
                className="card-custom"
                key={index}
                onClick={() => returnItemToItems(item)}
              >
                {item.name}
              </div>
            );
          })}
        </div>

        <div className="vegetable">
          <div
            className="card-custom bg-slate-300 text-black"
            style={{ width: "150px" }}
          >
            Vegetable
          </div>
          {vegetable.map((item,index) => {
            return (
              <div
                className="card-custom"
                key={index}
                onClick={() => returnItemToItems(item)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
