/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory1(transactions) {
  if(transactions.length===0){
    return [];
  }
  let result=[];
  const map=new Map();
  for(let i=0;i<transactions.length;i++){
      const transaction = transactions[i];
      if(map.has(transaction.category)){
        map.set(transaction.category,map.get(transaction.category)+transaction.price);
      }
      else{
        map.set(transaction.category,transaction.price);
      }
  }
  map.forEach((value, key) => {
    result.push({ category: key, totalSpent: value });
  });
  return result;
}

function calculateTotalSpentByCategory(transactions) {
  if(transactions.length===0){
    return [];
  }
  let result={};
  transactions.forEach((transaction)=>{
    const{category,price}=transaction;
    if(result.hasOwnProperty(category)){
      result[category]+=price;
    }
    else{
      result[category]=price;
    }
  })
  return Object.entries(result).map(([key,value])=>({category:key,totalSpent:value}))
}
module.exports = calculateTotalSpentByCategory;