//defer 
// make a main fx
// call main fx 


//fetchQuotes()
//fetch the API info from the server from 
// from:     'http://localhost:3000/quotes?_embed=likes'
    //dont use this to create or delete quotes though! just to populate
    // iterate through each quote to get the quote info 
    // use forEach and send each quote to a display function

//display quote
    //there is a quote container w/id of quote list = capture and name
    // make a new li with a class of "quote-card"
    // make a new blockquote with a class of of block quote 
    // make a new p with a clas sof 'mb-0'
        // append the p to the blockquote
    // make a new footer w/a class of 'blockquote-footer'
        // append the footer to the blockquote
    // make a break 
        // append the break to the blockquote
    // make a button with a class of 'btn-success' and an ID of the quote
    // set the inner text of the button to Likes: <span>#{quote.likes.length}</span>??
    // put an event listener on the button with a function to create a new like
        //append the buttn to the blockquote
    // make a button with a class of 'btn-danger' and an ID of the quote
    // set the inner text of the button to Delte
    // put an event listener on the button with a function to delete the quote
            //append the buttn to the blockquote
    //append the block quote to the li 

    // append the li to the ul 


//like quote 
    // sends a post request to http://localhost:3000/likes
    // The body of the request should be a JSON object containing a key of quoteId, with an integer value. Use the ID of the quote you're creating the like for — e.g. { quoteId: 5 } to create a like for quote 5
    // get the id from the button's id 
    // make sure its an INTEGER 

// delete quote 
    // sends a delete request to 'http://localhost:3000/quotes' - but the specific id 
    
// newquotelistener 
    //event listener on the form 

// newquote 
         //prevent default on submitting the form
        // send a post request 
        //reset the form 
        //display the new quote



function main(){
    fetchQuotes()
    newQuoteListener()
}

const populateURL = 'http://localhost:3000/quotes?_embed=likes'
const quoteContainer = document.querySelector('#quote-list')
const form = document.querySelector("#new-quote-form")

function fetchQuotes(){
    fetch(populateURL)
    .then(resp => resp.json())
    .then( quotes => {
        quotes.forEach(quote => {
            displayQuote(quote)
        })
    })

}



function displayQuote(quote){
    
    const newli = document.createElement('li')
    newli.className = "quote-card"
    newli.id = quote.id
    
    const newBlockquote = document.createElement('blockquote')
    newBlockquote.className = 'blockquote'
    
    const newP = document.createElement('p')
    newP.className = 'mb-0'
    newP.innerText = quote.quote

    const newFooter = document.createElement('footer')
    newFooter.className = 'blockquote-footer'
    newFooter.innerText = quote.author

    const newBreak = document.createElement('br')

    const newLikeButton = document.createElement('button')
    newLikeButton.className = 'btn-success'
    newLikeButton.id = quote.id
    if (quote.likes){
        newLikeButton.dataset.likes = parseInt(quote.likes.length)
        newLikeButton.innerHTML = `Likes: <span>${newLikeButton.dataset.likes}</span>`
    } else {
        newLikeButton.dataset.likes = 0
        newLikeButton.innerHTML = `Likes: <span>${newLikeButton.dataset.likes}</span>`
        }
    newLikeButton.addEventListener('click', likeQuote)

    const newDeleteButton = document.createElement('button')
    newDeleteButton.className = 'btn-danger'
    newDeleteButton.id = quote.id
    newDeleteButton.innerText = "Delete"
    newDeleteButton.addEventListener('click', deleteQuote)

    const newEditButton = document.createElement('button')
    newEditButton.className = 'btn-edit'
    newEditButton.id = quote.id
    newEditButton.innerText = "Edit"
    newEditButton.addEventListener('click', editQuote)

    


    newBlockquote.append(newP, newFooter, newBreak, newLikeButton, newDeleteButton, newEditButton)
    newli.append(newBlockquote)
    quoteContainer.append(newli)
    
}





function likeQuote(e){
    const id = parseInt(e.target.id)

    const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify(
        { quoteId : parseInt(id)
        })
      }
    
      fetch(`http://localhost:3000/likes`, reqObj)
        .then((res) => res.json())
        .then(newLike => {
                let likeBtn = document.querySelector(`button[id='${id}']`)
                likeBtn.dataset.likes =  parseInt(likeBtn.dataset.likes) + 1 
                likeBtn.innerText = `Likes: ${likeBtn.dataset.likes}`       
            })
        }


    
// delete quote 
    // sends a delete request to 'http://localhost:3000/quotes' - but the specific id 
function deleteQuote(e){

    const id = e.target.id

      const reqObj = {
        method: 'DELETE'
      }

      fetch(`http://localhost:3000/quotes/${id}`, reqObj)
      .then(resp => resp.json())
      .then(quote => {
        e.target.parentElement.parentElement.remove()

    })
    }





function newQuoteListener(){
 
    form.addEventListener('submit', createNewQuote)


}

function createNewQuote(e){
    e.preventDefault()

    const newQuote = {
        quote: e.target['quote'].value,
        author: e.target['author'].value
      }
  
  
      const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify(newQuote)
      }
  
      fetch('http://localhost:3000/quotes', reqObj)
        .then((res) => res.json())
        .then(quote => {
          form.reset()
          displayQuote(quote) 
        })


}

function editQuote(e){
    console.log("edit")
}


main()