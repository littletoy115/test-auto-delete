"use client";
import { useState, useRef } from "react";

interface Item {
  type: string;
  name: string;
}

export default function Home() {
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

  const [items, setItems] = useState<Item[]>(data);
  const [fruit, setFruit] = useState<Item[]>([]);
  const [vegetable, setVegetable] = useState<Item[]>([]);

  function setItem(name: string, type: string) {
    const newItem: Item = { name, type };
    console.log(newItem, "newItem");
    setItems((prevItems) => prevItems.filter((item) => item.name !== name));
    if (type === "Fruit") {
      setFruit((prevItems) => [...prevItems, newItem]);
    } else {
      setVegetable((prevItems) => [...prevItems, newItem]);
    }
    setTimeout(() => {
      setItems((prevItems) => {
        if (!prevItems.some((item) => item.name === newItem.name)) {
          return [...prevItems, newItem];
        } else {
          return prevItems;
        }
      });
      setFruit((prevItems) =>
        prevItems.filter((item: Item) => item.name !== name)
      );
      setVegetable((prevItems) =>
        prevItems.filter((item: Item) => item.name !== name)
      );
    }, 5000);
  }

  function returnItemToItems(name: string, type: string) {
    const newItem: Item = { name, type };
    setItems((prevItems) => [...prevItems, newItem]);
    setFruit((prevItems) =>
      prevItems.filter((item: Item) => item.name !== name)
    );
    setVegetable((prevItems) =>
      prevItems.filter((item: Item) => item.name !== name)
    );
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
                onClick={() => setItem(item.name, item.type)}
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
          {fruit.map((item: any, index: any) => {
            return (
              <div
                className="card-custom"
                key={index}
                onClick={() => returnItemToItems(item.name, item.type)}
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
          {vegetable.map((item: any, index: any) => {
            return (
              <div
                className="card-custom"
                key={index}
                onClick={() => returnItemToItems(item.name, item.type)}
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
