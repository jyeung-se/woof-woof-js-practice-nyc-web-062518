
document.addEventListener("DOMContentLoaded", function() {

  const dogBar = document.getElementById("dog-bar")
  const dogInfo = document.getElementById("dog-info")
  const dogSpan = document.createElement("span")

     fetch("http://localhost:3000/pups")
    .then(dogs => dogs.json())
    .then(data => addToBar(data))


  function addToBar(allDogs) {
    // console.log(allDogs)
    let dogArray = [...allDogs]
    dogArray.forEach(function(dog) {

      let newDog = document.createElement("span")
      newDog.innerText = `${dog.name}`
      dogBar.appendChild(newDog)
      newDog.addEventListener("click", function(e) {
        if (e.target.innerText === newDog.innerText) {
          dogInfo.setAttribute("data-dog-id", dog.id)
          dogInfo.innerHTML = `
          <img src=${dog.image}>
          <h2>${e.target.innerText}</h2>
          <button id=dog-good-bad-button>Good Dog!</button>
          `
          let button = document.getElementById("dog-good-bad-button")
          // debugger

            if (button.innerText === "Good Dog!") {
              button.innerText = "Bad Dog!"

            button.addEventListener("click", function(e) {
              id = parseInt(e.target.parentElement.dataset.dogId)
              // debugger
              if (e.target.innerText === "Bad Dog!"){
                e.target.innerHTML = "Good Dog!"
                 fetch(`http://localhost:3000/pups/${id}`, {
                   method: 'PATCH',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(
                     {
                       isGoodDog: false,
                     }
                   )
                 })
                 console.log(`${dog.name} is a Bad Dog!`)
               } else {
                 e.target.innerHTML = "Bad Dog!"
                 fetch(`http://localhost:3000/pups/${id}`, {
                   method: 'PATCH',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(
                     {
                       isGoodDog: true,
                     }
                   )
                 })
                 console.log(`${dog.name} is a Good Dog!`)
               }
             })
           }
         }
       })
   })
 }

})
