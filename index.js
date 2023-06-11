// Database Functions/variables
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://champions-1d6cc-default-rtdb.firebaseio.com/"
} 
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoutOutInDB = ref(database, "shoutOut")

//HTML variables
const endorseInputFieldEl = document.getElementById("endorseInputField")
const fromInputFieldEl = document.getElementById("fromInputField")
const toInputFieldEl = document.getElementById("toInputField")
const addShoutOutEl = document.getElementById("addShoutOut")
const ulEl = document.getElementById("ul")

// EventListeners to push values to database
addShoutOutEl.addEventListener("click", function(){
    let publish = {
    endorseValue: endorseInputFieldEl.value,
    fromValue: fromInputFieldEl.value,
    toValue: toInputFieldEl.value
    }
    if(publish.endorseValue && publish.fromValue && publish.toValue){ 
        push(shoutOutInDB, publish)
        clear()    
    }else{
        alert("Please fill out all fields.")
    }
})

//functions to clear input fields
function clear() {
    endorseInputFieldEl.value = ""
    fromInputFieldEl.value = ""
    toInputFieldEl.value = ""  
}

function clearShoutOutListEl(){
     ulEl.innerHTML = ""
}

//functions to get keys/values from database
onValue (shoutOutInDB, function(snapshot){
    let shoutOutObjects = snapshot.val()
    let shoutOutArray = Object.entries(shoutOutObjects)

   clearShoutOutListEl()

    for( let i = 0; i < shoutOutArray.length; i++){
        let shoutOut = shoutOutArray[i]
        addToEndorsements(shoutOut[1])

    }

})

//functions to add inputs to the HTML
function addToEndorsements(shoutValue) {
    let newToValue = document.createElement("p")
    let newShoutValue = document.createElement("li")
    let newFromValue = document.createElement("p")

    
    let publishShout = shoutValue.endorseValue
    let publisihFrom = shoutValue.fromValue
    let publishTo = shoutValue.toValue
    
//     console.log(publishShout, publisihFrom, publishTo)
    newToValue.textContent = `To: ${publishTo}`
    newShoutValue.textContent = publishShout
    newFromValue.textContent = `From: ${publisihFrom}`


    ulEl.append(newToValue, newShoutValue, newFromValue)
}
