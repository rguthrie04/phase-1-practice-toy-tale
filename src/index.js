let addToy = false;
let toyCollectionDiv = document.querySelector("div#toy-collection")
let toyForm = document.querySelector(".add-toy-form")

fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(function(toysArray){
    toysArray.forEach(function(toyObj){
      turnToyToCard(toyObj)

    }
  )})
//{} -> HTML
  function turnToyToCard(toy) {
    let toyCarDiv = document.createElement('div')
    toyCarDiv.className = "card"
    let toyNameH2 = document.createElement("h2")
    toyNameH2.innerText = toy.name
    let toyImage = document.createElement('img')
    toyImage.src = toy.image
    toyImage.className = "toy-avatar"
    toyImage.alt = toy.name

    let likesP = document.createElement('p')
    likesP.innerText = `${toy.likes} Likes`

    let likeButton = document.createElement('button')
    likeButton.className = 'like-btn'
    likeButton.innerText = "like <3"

    toyCarDiv.append(toyNameH2, toyImage, likesP, likeButton)
    toyCollectionDiv.append(toyCarDiv)

    likeButton.addEventListener('click', function(e){
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify ({
          likes: toy.likes + 1
        })
      })
      .then(res => res.json())
      .then(function(updateToyObj) {
        toy.likes - updateToyObj.likes
        likesP.innerText = `${updateToyObj.likes} Likes`}

      )

    })
 } 

toyForm.addEventListener('submit', function(e){
  e.preventDefault()
  let newName = e.target.name.value
  let newImage = e.target.image.value
  
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newName,
      image: newImage,
      likes: 0
    })
    
  })
  .then(res=> res.json())
  .then(function(newToy){
    turnToyToCard(newToy)
  })
})



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});