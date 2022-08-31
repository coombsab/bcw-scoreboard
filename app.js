
let playerDefault = "Khodym"
let scoreDefault = 20
let scoreChangeIncrement = 1
let score = scoreDefault


let players = []
// players = [
//   {
//     name: "Khodym",
//     score: 20,
//     id: generateId()
//   }
// ]

function incrementScore (id) {
  let currentPlayer = getPlayerById(id)
  if (currentPlayer) {
    currentPlayer.score++
    savePlayers()
    drawScore()
  }
  
}

function decrementScore (id) {
  let currentPlayer = getPlayerById(id)
  if (currentPlayer) {
    currentPlayer.score--
    savePlayers()
    drawScore()
  }
}

function resetScores () {
  players.forEach(player => player.score = scoreDefault)
  drawScore()
}

function getPlayerById (id) {
  console.log(players.find(player => player.id === id))
  return players.find(player => player.id === id)
}

function drawScore () {
  let template = ""

  players.sort(function(a,b) {
    let textA = a.name.toUpperCase()
    let textB = b.name.toUpperCase()
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
  })

  players.forEach(player => {
    console.log (player.name, player.score, player.id)
    template+= `
    <div class="col-md-4 ps-5 pe-5 pt-3 pb-3 p-md-5">
      <div class="row card-style-theme-accent text-theme-secondary p-3 justify-content-center">
        <div class="col-10 align-self-center">
          <span class="fw-bold fs-1" id="player-name-${player.id}">${player.name}</span>
        </div>
        <div class="col-2">
          <i id="delete-player-icon" title="Remove player" aria-hidden="true" class="player-delete mdi mdi-delete-circle-outline fs-1" onclick="deletePlayer('${player.id}')"></i>
        </div>
        <div class="col-3 card-score card-style-theme-secondary text-theme-primary d-flex justify-content-center align-items-center">
            <span class="scoreboard" id="scoreboard">${player.score}</span>
        </div>
        <div class="row justify-content-around p-3">
          <div class="col-4 mx-0 px-0">
            <button class="btn-card btn bg-transparent-theme-secondary fw-bold" onclick="incrementScore('${player.id}')">Plus</button>
          </div>
          <div class="col-4">
            <button class="btn-card btn bg-transparent-theme-secondary fw-bold" onclick="decrementScore('${player.id}')">Minus</button>
          </div>
        </div>
      </div>
    </div>
    `
  })

  document.getElementById("scorecards").innerHTML = template
  players.forEach(player => adjustPlayerNameSize(player.id))
}

function adjustPlayerNameSize (id) {
  let currentPlayer = getPlayerById(id)
  let nameLength = currentPlayer.name.length
  let cardID = "player-name-" + id
  let element = document.getElementById(cardID)

  switch (nameLength) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      untoggleTextSize(element)
      element.classList.toggle("fs-1")
      break
    case 6:
      untoggleTextSize(element)
      element.classList.toggle("fs-2")
      break
    case 7:
      untoggleTextSize(element)
      element.classList.toggle("fs-3")
      break
    case 8:
      untoggleTextSize(element)
      element.classList.toggle("fs-4")
    case 9:
    default:
      untoggleTextSize(element)
  }
}

function untoggleTextSize (element) {
  let possibleScripts = ["fs-1", "fs-2", "fs-3", "fs-4", "fs-5", "fs-6"]

  possibleScripts.forEach(script => element.classList.contains(script) ? element.classList.toggle(script) : '')
}

function addPlayer(event) {
  event.preventDefault()

  let form = event.target
  let name = form.name.value
  let currentPlayer = players.find(player => player.name.toUpperCase() === name.toUpperCase())

  if (name != "") {
    if (!currentPlayer) {
      let newPlayer = {
        name: name,
        score: scoreDefault,
        id: generateId()
      }
      console.log("Adding player", newPlayer)
      players.push(newPlayer)
      savePlayers()
    } else {
      alert("Player already exists")
    }
  } else {
    alert("Enter name form must not be empty")
  }

  form.reset()
}

function savePlayers () {
  window.localStorage.setItem("players", JSON.stringify(players))
  drawScore()
}

function deletePlayer(id) {
  let index = players.findIndex(player => player.id === id)
  let removed = players.splice(index, 1)
  savePlayers()
}


function loadPlayers () {
  let playersData = JSON.parse(window.localStorage.getItem("players"))
  if (playersData) {
    players = playersData
  } else {
    
  }
}

/**
 * Defines the Properties of a Player
 * @typedef {{name: string, score: number, id: string}} Player
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
 function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadPlayers()
drawScore()