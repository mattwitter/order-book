function reconcileOrder(existingBook, incomingOrder) {
  let updatedBook = []
  if (existingBook.length === 0) {
    existingBook.push(incomingOrder)
    return existingBook
  }
  if ((existingBook[0].type === 'buy' && incomingOrder.type === 'sell') && (existingBook[0].quantity === incomingOrder.quantity) && (existingBook[0].price === incomingOrder.price)) {
    return updatedBook
    //'fulfills an order and removes the matching order when the book contains a matching order of the same quantity'
  }
  else if ((existingBook[0].type === 'buy' && incomingOrder.type === 'sell') && (existingBook[0].quantity > incomingOrder.quantity) && (existingBook[0].price === incomingOrder.price)) {
    const updatedQuantity = existingBook[0].quantity - incomingOrder.quantity
    existingBook[0].quantity = updatedQuantity
    return existingBook
    //fulfills an order and reduces the matching order when the book contains a matching order of a larger quantity
  }
  else if ((existingBook[0].type === 'buy' && incomingOrder.type === 'sell') && (existingBook[0].quantity < incomingOrder.quantity) && (existingBook[0].price === incomingOrder.price)) {
    const remainderQuantity = incomingOrder.quantity - existingBook[0].quantity
    incomingOrder.quantity = remainderQuantity
    updatedBook.push(incomingOrder)
    return updatedBook
    //partially fulfills an order, removes the matching order and adds the remainder of the order to the book when the book contains a matching order of a smaller quantity
  }
  else if ((existingBook[0].type === 'buy') && (incomingOrder.type === 'sell') && (existingBook[0].quantity === incomingOrder.quantity) && (incomingOrder.price <= existingBook[0].price)) {
    return updatedBook
  }
  else {
    existingBook.push(incomingOrder)
    return existingBook
  }
}

module.exports = reconcileOrder