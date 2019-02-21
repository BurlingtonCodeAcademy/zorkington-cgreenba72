let currentRoom = null;

let gameInventory = {
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

openingScene = console.log("182 Main St. You are standing on Main Street between Church and South Winooski. \n There is a door here. A keypad sits on the handle. On the door is a handwritten sign.")
const start = () => {
  level1()
  //level2()*/

}
start()
let password = "12345";
let code = ""
async function level1() {
  currentRoom = "182 Main St. - Outside"
  let firstStatment = await ask("<_ ");
  while (true) {
    let enterCode = firstStatment.toLowerCase().includes("enter code") || firstStatment.toLowerCase().includes("key in")

    if (enterCode) {
      code = parseDoorCode(firstStatment);
    }
    if (firstStatment === "read sign") {
      console.log('The sign says "Welcome to Burlington Code Academy! Come on \n up to the second floor. If the door is locked, use the code \n 12345."')
    }
    else if (firstStatment === "take sign") {
      console.log("That would be selfish. How will other students find their way?")
    }
    else if (firstStatment === "open door") {
      console.log("The door is locked. There is a keypad on the door handle.")
    }
    else if (enterCode) {
      if (code === password) {
        console.log("Success! The door opens. You enter the foyer and the door shuts behind you.")
        level2();
        //break;
      }
      else {
        console.log("Bzzzzt! The door is still locked.")
      }
    }
    else {
      console.log("Sorry I don't know how to " + firstStatment + ".")
    }
    firstStatment = await ask("<_ ");
  }
};

async function level2() {
  currentRoom = "182 Main St.- Foyer"
  console.log("Welcome to room 182 Main St.- Foyer")
  console.log(`You are in a foyer. Or maybe it's an antechamber. Or a \n vestibule. Or an entryway. Or an atrium. Or a narthex. \n But let's forget all that fancy flatlander vocabulary, \n and just call it a foyer. In Vermont, this is pronounced \n "FO-ee-yurr". A copy of Seven Days lies in a corner.`)
  

  while (true) {
    let input = await ask("<_ ");
    const sevenDaysPaper = "Seven Days Paper";
    if (input === "take paper" || input === "take seven days") {
      console.log(`You pick up the paper and leaf through it looking for comics \n and ignoring the articles, just like everybody else does.`)
      gameInventory.addPlayerItem(sevenDaysPaper)
    }
    else if (input === "i" || input === "inventory" || input === "take inventory") {
      console.log("You are carrying: " + gameInventory.playerInventory)
    }
    else if (input === "drop paper" || input === "drop seven days") {
      gameInventory.removePlayerItem(sevenDaysPaper)
      gameInventory.addRoomItem(sevenDaysPaper)
    }
    else {
      console.log("Please type something else.")
    }
  }
};
