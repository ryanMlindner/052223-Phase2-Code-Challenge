import React from "react";

const APIURL = "http://localhost:8001/transactions"

function Transaction({ transaction, handleDelete }) {

  function deleteTransaction() {
    fetch(`${APIURL}/${transaction.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(handleDelete(transaction))
  }

  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
      <button className="ui button" onClick={deleteTransaction}>Delete</button>
    </tr>
  );
}

export default Transaction;
