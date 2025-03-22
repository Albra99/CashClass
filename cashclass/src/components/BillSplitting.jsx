// src/components/BillSplitting.jsx
import React, { useState } from "react";

function BillSplitting() {
  const [people, setPeople] = useState([]);
  const [payment, setPayment] = useState(0);

  const addPerson = (name) => {
    setPeople([...people, { name, amountPaid: 0 }]);
  };

  const trackPayment = (name, amount) => {
    setPeople(people.map(person =>
      person.name === name ? { ...person, amountPaid: amount } : person
    ));
  };

  return (
    <div>
      <h2>Bill Splitting</h2>
      <input
        type="text"
        placeholder="Add a person"
        onBlur={(e) => addPerson(e.target.value)}
      />
      <div>
        {people.map(person => (
          <div key={person.name}>
            <p>{person.name}</p>
            <input
              type="number"
              placeholder="Amount Paid"
              onChange={(e) => trackPayment(person.name, Number(e.target.value))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BillSplitting;
