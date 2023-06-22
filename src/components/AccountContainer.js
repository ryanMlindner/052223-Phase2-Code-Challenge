import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

const APIURL = "http://localhost:8001/transactions"

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedCategory, setSortedCategory] = useState(false);
  const [sortedDescription, setSortedDescription] = useState(false);

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
    
    if (sortedCategory) {
      displayList.sort((a,b) => (a.category > b.category) ? 1 : -1)
    }
    if (sortedDescription) {
      displayList.sort((a,b) => (a.description > b.description) ? 1 : -1)
    }
    return displayList;
  }

  function toggleCategorySorted() {
    if (sortedDescription) {
      setSortedDescription(false);
    }
    setSortedCategory(sortedCategory => !sortedCategory);
  }

  function toggleDescriptionSorted() {
    if (sortedCategory) {
      setSortedCategory(false);
    }
    setSortedDescription(sortedDescription => !sortedDescription);
  }

  return (
    <div>
      <Search updateSearchTerm={updateSearchTerm}/>
      <button className="ui button" onClick={toggleCategorySorted}>
        Toggle Category Sort
      </button>
      <button className="ui button" onClick={toggleDescriptionSorted}>
        Toggle Description Sort
      </button>
      <AddTransactionForm addNewTransaction={addNewTransaction}/>
      <TransactionsList transactions={filterTransactions()}/>
    </div>
  );
}

export default AccountContainer;
