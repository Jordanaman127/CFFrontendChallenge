import React from "react";

interface ICard {
  img: string;
  name: string;
  age: string;
  email: string;
  city: string;
}
export const Card = ({ img, name, age, city, email }: ICard) => (
  <div className="border rounded-lg border-slate-400 p-4 h-60">
    <div className="flex">
      <img src={img} alt={`picture-of-${name}`} />
      <div className="flex-row pl-4">
        <h1 className="text-3xl font-semibold">{name}</h1>
        <p className="text-lg">Age: {age}</p>
        <p className="text-lg">City: {city}</p>
      </div>
    </div>
    <p className="text-xl border-t-2 mt-6">Contact Email: {email}</p>
  </div>
);
