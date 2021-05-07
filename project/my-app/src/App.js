import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import React from 'react';

import { Button, Heading } from 'react-bulma-components';
import { useEffect, useState } from 'react';
import ShowCard from './CardReal'

import axios from 'axios'

import Deck from './Deck'
import Hand from './Hand';
import { Bet } from './Bet';
import Controller from './Controller'
import PlayerHand from './PlayerHand'

//Menu Kit
import CurrencySelect from './CurrencySelect'
import Menu from './Menu'
//import HouseHand from './HouseHand';

//Other Kit
import Trivia from './Trivia'
import Jokes from './Jokes'
import { lbToggle1, lbToggle2 } from './cssHelper'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import startFirebaseUI from './Login'
import LoginPage from './LoginPage';
import Leaderboards from './Leaderboards';

//Initial
let deck = new Deck();
deck.shuffle();
deck.shuffle();
// deck.shuffle();
let masterDeck = deck.deck;
let houseHand = new Hand();
let playerHand = new Hand();
let pot = 2500;
deck.deal(houseHand);
deck.deal(houseHand);
deck.deal(playerHand);
deck.deal(playerHand);

//SPLIT TEST
// playerHand.getHand()[0].value = 5;
// playerHand.getHand()[1].value = 5;

houseHand.getHand()[0].hidden = true //set hide
houseHand.getHand()[1].hidden = true
playerHand.getHand()[0].hidden = true
playerHand.getHand()[1].hidden = true;
houseHand.getHand()[0].isFirstHidden = true //Force hide first house

let controller = new Controller(deck, playerHand, houseHand, 2500);

let leaderboard = []; //Initial load ld
let lbToggle = false;

let hasDone = false;
let hasDouble = false;
let userHigh = 0;

let hasRetrieved = false;
function App() {
  let [superTest, setTest] = useState(true);
  let [newPot, convertPot] = useState(2500);
  let [currencies, setCurrency] = useState({});
  let [realLeaderboard, setLb] = useState([]);
  let [hasPassLb, setLbMode] = useState(2500)
  let [isSplit, setSplit] = useState(false);

  let [currentBet, setBet] = useState(0);

  //SET CURRENCY API (CHANGE TO FALSE TO REVEAL)
  let [hasSetPot, setRealPot] = useState(false)


  //Auth change state (allow continue session)
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setLogin(true);
      setUser(user);

      if (!hasDone) {
        getLb(user)
        hasDone = true;
      }


      // User is signed in.
    } else {
      // No user is signed in.
      //Start Login UI
      //startFirebaseUI('#loginUi')
    }
  });




  let [hasLogin, setLogin] = useState(false);
  let [user, setUser] = useState(null);




  //Fill when done fetch (run twice ?) (Uncommnet)


  useEffect(() => {
    (async () => {
      //exchange(); (why does this work?)
      getCurrency()

      //SWITCH OFF API

      //Start Auth

      //Retrieve Leaderboards from database



    })();
  }, [])

  //if login Template

  //Async functs
  function writeUserData(name, val) {
    let obj = {};
    obj[name] = val;

    return firebase.database().ref('Leaderboard').update(obj);

  }

  function updateUserTheme(name, val) {
    let obj = {};
    obj[name] = val;

    return firebase.database().ref('Theme').update(obj);

  }

  //Get leaderboard
  async function getLb(user) {
    const db = firebase.database();
    const scoreRef = db.ref('Leaderboard');
    let temp2 = [];
    scoreRef.orderByValue().once('value', snap => {
      let temp = [];


      let anotherVar = true
      snap.forEach(function (data) {
        temp.push("" + data.key + ": " + data.val());

        //Set User lowest Lb
        if (user != null) {

          if (data.key == user.displayName) {

            userHigh = data.val();
          }
        }

        //Set lowest Lb
        if (anotherVar) {
          controller.lowestScore = data.val()
        }

        anotherVar = false;
      })
      let x = 0
      temp.reverse();
      while (x < 10) {
        if (temp[x] != undefined) temp2.push(temp[x])
        x++;
      }
      // alert(controller.pot + 'bet: ' + controller.bet)
      //setLbMode(controller.lowestScore);
      setLb(temp2);


    })

    return temp2;
  }

  //Get currency from api
  async function getCurrency() {
    let tempCur;
    const options = await axios({
      method: 'GET',
      url: 'https://currencyscoop.p.rapidapi.com/currencies',
      headers: {
        'x-rapidapi-key': 'c26a08c82cmshc5e9181d8ae1865p16ddb7jsnc3ea9ca8a82c',
        'x-rapidapi-host': 'currencyscoop.p.rapidapi.com'
      }
    });
    setCurrency(Object.keys(options.data.response.fiats));
    tempCur = options.data.response.fiats;

    fillCurrency();

    return options.data.response.fiats;
  }


  //CALLBACKS
  //Callback for exchange currency
  async function exchange(curren) {
    const options = await axios({
      method: 'GET',
      url: 'https://fixer-fixer-currency-v1.p.rapidapi.com/convert',
      params: { amount: controller.pot, to: curren, from: 'USD' },
      headers: {
        'x-rapidapi-key': 'c26a08c82cmshc5e9181d8ae1865p16ddb7jsnc3ea9ca8a82c',
        'x-rapidapi-host': 'fixer-fixer-currency-v1.p.rapidapi.com'
      }
    });
    convertPot(Math.round(options.data.result));
    controller.pot = Math.round(options.data.result);
    controller.currency = curren;

    setRealPot(true);

    return Math.round(options.data.result);
  }

  async function exchangeBack() {
    const options = await axios({
      method: 'GET',
      url: 'https://fixer-fixer-currency-v1.p.rapidapi.com/convert',
      params: { amount: controller.highScore, to: 'USD', from: controller.currency },
      headers: {
        'x-rapidapi-key': 'c26a08c82cmshc5e9181d8ae1865p16ddb7jsnc3ea9ca8a82c',
        'x-rapidapi-host': 'fixer-fixer-currency-v1.p.rapidapi.com'
      }
    });
    //convertPot(options.data.result);
    //controller.highScore = Math.round(options.data.result);
    //controller.currency = 'USD';

    return Math.round(options.data.result);
  }

  //
  function setDouble2() {
    hasDouble = false;
  }



  //Skip currency
  function skip() {
    controller.pot = 2500;
    controller.currency = 'USD';

    setRealPot(true);

  }

  //FEtch
  function fillCurrency() {
    //Fill currency

    let select = document.getElementById('selectCurrency');
    // let list = select.options;
    if (select != undefined && select!= null) {
      for (let i = 0; i < currencies.length; i++) {
        let option = document.createElement('option');
        option.value = currencies[i];
        option.text = currencies[i];

        select.add(option)
      }
    }
  }


  //Dealing next hand funct
  function test() {
    controller.nextDeal();
    if (controller.pot <= 0) {
      controller.gameOver();
    }
    //setDouble2(false);
    setTest(!superTest);
  }

  //full restart(not Reload)
  function restart() {
    controller.restart();
    controller.pot = newPot;
    //setDouble2(false);
    setTest(!superTest);
  }
  //modal settings
  let modal = document.getElementById('lostModal')


  //Helper render (for organization)
  function RenderHelp() {
    return (
      <div className="App">
        <Heading>Black Jack</Heading>

        <PlayerHand hand={controller.playerHand} deck={controller.deck} handHouse={controller.houseHand} controller={controller} pot={controller.pot} setDouble2={setDouble2} />

        <Bet pot={controller.pot} controller={controller} callBack={test} />
      </div>
    )
  }


  return (
    <div >
      {!hasLogin ? <div id='loginPage'>
        <LoginPage />
        <StyledFirebaseAuth uiConfig={startFirebaseUI()} firebaseAuth={firebase.auth()} />
      </div> :
        <div>

          {!hasSetPot ? <div id='menuContainer'>

            <Menu />
            <CurrencySelect currencies={currencies} callBack={exchange} callBack2={skip} callBack3={getCurrency} />
          </div>
            :
            <div>
              <div id='lostModal'> <Heading>You ran out of Money!</Heading>
                {(controller.highScore > controller.lowestScore && controller.highScore > userHigh) ? <h2 id='modalSub'>You have made it into the Leaderboards. Submit Score?</h2> : <p></p>}
                {(controller.highScore > controller.lowestScore && controller.highScore > userHigh) ? <Button onClick={() => {
                  if (controller.currency === 'USD') {
                    writeUserData(user.displayName, controller.highScore)
                    userHigh = controller.highScore
                  } else {
                    exchangeBack().then(val => { writeUserData(user.displayName, val); userHigh = val })
                    //writeUserData(user.displayName, val))


                  }
                }}>Submit</Button> : <span></span>}
                <Button onClick={() => {
                  let modal = document.getElementById('lostModal');
                  let body = document.getElementById('topContainer');
                  body.style.opacity = 1;
                  modal.style.display = 'none';
                  modal.style.opacity = 1;
                  restart();
                }}>Restart</Button>
              </div>
              <div id='topContainer'>
                <Button onClick={() => restart()}>Restart</Button>
                <Leaderboards />

                <Button color='' onClick={() => {
                  firebase.auth().signOut().then(() => {
                    setLogin(false);
                    setUser(null);

                    //exit currency exchange state
                    setRealPot(false);
                    // Sign-out successful.
                  }).catch((error) => {
                    // An error happened.
                  });
                }}>Logout</Button>

                <RenderHelp />
                <div id='trivia'>
                  <Trivia num={controller.playerHand.getHandValue()} controller={controller} />
                  <Button>BBBBB</Button>

                </div>
                <div id='joke'>
                  <Jokes />
                </div>
              </div>
            </div>}
        </div>}


    </div>
  );
}
// <CurrencySelect currencies={currencies} callBack={exchange} />
export default App;
