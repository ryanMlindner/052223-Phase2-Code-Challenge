import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

const APIURL = "http://localhost:8001/transactions"

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(APIURL)
    .then(res => res.json())
    .then(data => {setTransactions(data);})
  }, [])
  
  function addNewTransaction(transaction) {
    fetch(APIURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transaction),
    })
    .then(res => res.json())
    .then(data => {
      setTransactions(transactions => [...transactions, data]);
    })
  }

  function updateSearchTerm(term) {
    setSearchTerm(term);
  }

  function filterTransactions() {
    const displayList = transactions.filter(transaction => 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return displayList;
  }


  return (
    <div>
      <Search updateSearchTerm={updateSearchTerm}/>
      <AddTransactionForm addNewTransaction={addNewTransaction}/>
      <TransactionsList transactions={filterTransactions()}/>
    </div>
  );
}

export default AccountContainer;
