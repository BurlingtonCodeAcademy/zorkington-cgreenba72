let currentRoom = null;
let caffeinatedItem = ""
let gameStatus = {
  playerInventory: [],
  currentRoomInventory: [],

  addPlayerItem(itemName) {
    this.playerInventory.push(itemName)
  },
  removePlayerItem(itemName) {
    this.playerInventory.splice(this.playerInventory.indexOf(itemName), 1)
  },
  addRoomItem(itemName) {
    this.currentRoomInventory.push(itemName)
  }
};


const parseDoorCode = (codeEntry) => {
  if (codeEntry.includes("enter code")) {
    return codeEntry.slice(11)
  }
  else {
    return codeEntry.slice(7)
  }
}


const readline = require('readline');

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}


const start = () => {
  if (currentRoom === null) {
    theRules()
  }
  else if (currentRoom === "182 Main St. - Outside") {
    level1()
  }
  else if (currentRoom === "182 Main St.- Foyer") {
    level2()
  }
  else if (currentRoom === "182 Main St.- Classroom") {
    level3()
  }
  else if (currentRoom === "Muddy Waters") {
    level4()
  }
  else {
    level5()
  }

}
start()

async function theRules() {
  let gameRules = console.log(`
  Welcome to text adventure game Zorkington. Do you wish to play? 
  Type "Yes" to continue. All other commands will exit the program.
  `)
  let input = await ask("<_ ");
  let inputAnyCase = input.toLowerCase()
  if (inputAnyCase.includes("yes")) {
    console.log(`
    Hello! This story takes place in Burlington, Vermont in the year 2019.
    This game takes typed commands in the form of a verb and noun.
    Example: "Read menu"..."open door".... etc... Good luck!` )
    currentRoom = "182 Main St. - Outside"
    start()
  }
  else {
    process.exit()
  }
}

let password = "12345";
let code = ""
let count = 0
async function level1() {
  openingScene = console.log(`
  182 Main St. You are standing on Main Street between Church and 
  South Winooski. There is a door here. A keypad sits on the handle. 
  On the door is a handwritten sign.
  `)
  gameStatus.currentRoom = "182 Main St. - Outside"
  let playing= true
  while (playing) {
    let input = await ask("<_ ");
    let inputAnyCase = input.toLowerCase()
    let enterCode = inputAnyCase.toLowerCase().includes("enter code") || inputAnyCase.toLowerCase().includes("key in")

    if (enterCode) {
      code = parseDoorCode(inputAnyCase);
    }
    if (inputAnyCase.includes("read") && inputAnyCase.includes("sign")) {
      console.log('\nThe sign says "Welcome to Burlington Code Academy! Come on \n up to the second floor. If the door is locked, use the code 12345.\n')
    }
    else if (inputAnyCase.includes("take") && inputAnyCase.includes("sign")) {
      console.log("\nThat would be selfish. How will other students find their way?\n")
    }
    else if (inputAnyCase.includes("open") && inputAnyCase.includes("door")) {
      console.log("\nThe door is locked. There is a keypad on the door handle.\n")
    }
    else if (enterCode) {
      if (code === password) {
        console.log("\nSuccess! The door opens. You enter the foyer and the door shuts behind you.\n")
        currentRoom = "182 Main St.- Foyer"
        playing = false
      }
      else {
        console.log("\nBzzzzt! The door is still locked.")
      }
    }
    else {
      count++
      console.log("\nSorry I don't know how to " + inputAnyCase + ". Try using a verb and then noun, as a command...\n")
      //console.log(count) 
      if (count >= 3) {
        console.log("\nHINT HINT: Look at the last sentence....\n")
      }

    }
  }
  start()
};

async function level2() {
  currentRoom = "\n182 Main St.- Foyer"
  console.log("\nWelcome to room 182 Main St.- Foyer")
  console.log(`
  You are in a foyer. Or maybe it's an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex. 
  But let's forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced
  "FO-ee-yurr". A copy of Seven Days lies in a corner.
   `)
  let playing = true
  while (playing) {
    let input = await ask("<_ ");
    let inputAnyCase = input.toLowerCase()
    const sevenDaysPaper = "Seven Days Paper";
    if (inputAnyCase.includes("go") && inputAnyCase.includes("up") || inputAnyCase.includes("upstairs")) {
      currentRoom = "182 Main St.- Classroom"
      playing = false
    }
    else if (inputAnyCase.includes("take") && inputAnyCase.includes("paper") || inputAnyCase.includes("seven days")) {
      console.log(`\nYou pick up the paper... and its added to your inventory. \n`)
      gameStatus.addPlayerItem(sevenDaysPaper)
      //console.log(gameStatus.playerInventory.includes(sevenDaysPaper))
    }
    else if (!gameStatus.playerInventory.includes(sevenDaysPaper) && inputAnyCase.includes("read") && inputAnyCase.includes("paper") || inputAnyCase.includes("seven days")) {
      console.log("\nIn order to read the paper you must have it in your possesion!\n")
    }
    else if (gameStatus.playerInventory.includes(sevenDaysPaper) && inputAnyCase.includes("read") && inputAnyCase.includes("paper") || inputAnyCase.includes("seven days")) {
      console.log(`\nYou leaf through 'Seven Days' looking for comics ignoring the articles, just like everybody else does.\n`)
    }
    else if (inputAnyCase.includes("inventory") || inputAnyCase.includes("take inventory")) {
      console.log("\nYou are carrying: " + gameStatus.playerInventory + "\n")
    }
    else if (inputAnyCase.includes("drop") && inputAnyCase.includes("paper") || inputAnyCase.includes("seven days")) {
      gameStatus.removePlayerItem(sevenDaysPaper)
      gameStatus.addRoomItem(sevenDaysPaper)
      console.log("Item has been removed from Inventory..")
    }
    else {
      console.log("\nPlease type something else.\n")
    }
  }
  start()
};

async function level3() {
  currentRoom = "182 Main St.- Classroom"
  let playing = true
  console.log("\nYou walk up to the BCA Classroom and you find a babbling and incoherint Alex Chaffee... \n")
  while (playing) {
    let input = await ask("<_ ");
    let inputAnyCase = input.toLowerCase()
    //console.log(gameStatus.playerInventory)
    //console.log(caffeinatedItem)
    if (inputAnyCase.includes("speak") || inputAnyCase.includes("talk") && inputAnyCase.includes("alex")) {
      console.log(`
      He seems like he's on low battery and needs a boost of energy... 
      He's muttering a word that begins  with 'C' You say 'Cat', he shakes his head in disgust...
      You say 'Car', he shakes his head, and his eyes begin to shut..
      Suddenly, a light bulb goes off in your head and you say 'Coffee!'
      Alex's eye's open wide and he nods, and then falls asleep standing up...
      `)
    }
    else if (inputAnyCase.includes("coffee")) {
      console.log(`
      You quickly run out of the classroom on a quest to find coffee for Alex!
      `)
      currentRoom = "Muddy Waters"
      playing = false
    }
  }

  start()
};

async function level4() {
  currentRoom = "Muddy Waters"
  let playing = true
  //let caffeinatedItem=""
  console.log(`
    You hustle back out to main street in search of coffee for Alex. 
    You see the sign for Muddy Waters and decide you must act quickly, 
    so you enter Muddy Waters...
    `)
  console.log(`
    Inside Muddy Waters it is dimly lit... people mill about, reading books, talking to one another, 
    all un-aware of the dire mission you are on. 
    You see that you must go to the front of muddy waters to get coffee... 
    `)
  while (playing) {
    let input = await ask("<_ ");
    let inputAnyCase = input.toLowerCase()
    if (inputAnyCase.includes("go") || inputAnyCase.includes("front")) {
      console.log(`
    You walk to the front of Muddy Waters and look over the menu trying to decide what get Alex..
      `)
    }
    else if (inputAnyCase.includes("inventory") || inputAnyCase.includes("take inventory")) {
      console.log("\nYou arerying: " + gameStatus.playerInventory + "\n")
    }
    else if (inputAnyCase.includes("look") || inputAnyCase.includes("menu")) {
      console.log(`
      Drip Coffee: $3
      Espresso: $3 
      Double Espresso: $5
      Smoked Maple Latte w/ a side of Avocado Toast: $25
      `)
    }
    else if (inputAnyCase.includes("drip coffee")) {
      caffeinatedItem = "Drip Coffee"
      console.log(`
    You ask for a ${caffeinatedItem} to-go and pay $3.... 
    Then you turn and head back towards the BCA classroom to save Alex!`)
      gameStatus.addPlayerItem(caffeinatedItem)
      currentRoom = "182 Main St.- Classroom with Coffee in Hand"
      playing = false
    }

    else if (inputAnyCase.includes("espresso")) {
      caffeinatedItem = "Espresso"
      console.log(`
      You ask for a ${caffeinatedItem} to-go and pay $3....
      Then you turn and head back towards the BCA classroom to save Alex!`)
      gameStatus.addPlayerItem(caffeinatedItem)
      currentRoom = "182 Main St.- Classroom with Coffee in Hand"
      playing = false
    }
    else if (inputAnyCase.includes("double espresso")) {
      caffeinatedItem = "Double Espresso"
      console.log(`
      You ask for a ${caffeinatedItem} to-go and pay $5....
      Then you turn and head back towards the BCA classroom to save Alex!`)
      gameStatus.addPlayerItem(caffeinatedItem)
      currentRoom = "182 Main St.- Classroom with Coffee in Hand"
      playing = false
    }
    else if (inputAnyCase.includes("smoked maple")) {
      caffeinatedItem = "Smoked Maple Latte w/ a side of Avocado Toast"
      console.log(`
      You ask for a ${caffeinatedItem} to-go and pay $25.... 
      Then you turn and head back towards the BCA classroom to save Alex!`)
      gameStatus.addPlayerItem(caffeinatedItem)
      currentRoom = "182 Main St.- Classroom with Coffee in Hand"
      playing = false
    }
    else {
      console.log("\nPlease type something else.\n")
    }
  }
  start()
}

async function level5() {
  console.log(`
  You've returned with a ${caffeinatedItem} for Alex. He's sleeping on the classroom floor..
  `)
  let playing=true
  while (playing) {
    let input = await ask("<_ ");
    let inputAnyCase = input.toLowerCase()
    if (inputAnyCase.includes("coffee") ||inputAnyCase.includes("give")) {
    console.log(`
  You place the ${caffeinatedItem} in front of him hoping the smell will wake him up. You see 
  him slowly starting to react. His eyes open and he weakly reaches for the cup. As he drinks it 
  he comes back to life. Alex then explains recursion in Javascript, as 
  if nothing ever happened...... THE END! Thanks for playing
  `)
  playing=false  
  }
  }
  process.exit()
};