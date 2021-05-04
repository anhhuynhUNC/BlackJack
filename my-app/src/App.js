import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import React from 'react';
import Deck from './Deck'
import { useEffect, useState } from 'react';
import ShowCard from './CardReal'
import Hand from './Hand';
import axios from 'axios'

import CurrencySelect from './CurrencySelect'

import Bet from './Bet';
import Controller from './Controller'
import PlayerHand from './PlayerHand'
//import HouseHand from './HouseHand';

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
houseHand.getHand()[0].hidden = true //set hide
deck.deal(playerHand);
deck.deal(playerHand);

let controller = new Controller(deck, playerHand, houseHand, 2500);

function App() {



  let [superTest, setTest] = useState(true);
  let [newPot, convertPot] = useState(0);
  let [currencies, setCurrency] = useState({});

  //test ace
  //playerHand.hand.push(new Card(1, 'spades'));

  useEffect(() => {
    (async () => {
      exchange();
      getCurrency();
    })();
  }, [])

  async function getCurrency() {
    const options = await axios({
      method: 'GET',
      url: 'https://fixer-fixer-currency-v1.p.rapidapi.com/symbols',
      headers: {
        'x-rapidapi-key': 'c26a08c82cmshc5e9181d8ae1865p16ddb7jsnc3ea9ca8a82c',
        'x-rapidapi-host': 'fixer-fixer-currency-v1.p.rapidapi.com'
      }
    });
    setCurrency(Object.keys(options.data.symbols));
    return options.data.symbols;
  }

  async function exchange() {
    const options = await axios({
      method: 'GET',
      url: 'https://fixer-fixer-currency-v1.p.rapidapi.com/convert',
      params: { amount: controller.pot, to: 'VND', from: 'USD' },
      headers: {
        'x-rapidapi-key': 'c26a08c82cmshc5e9181d8ae1865p16ddb7jsnc3ea9ca8a82c',
        'x-rapidapi-host': 'fixer-fixer-currency-v1.p.rapidapi.com'
      }
    });
    convertPot(options.data.result);
   // controller.pot = options.data.result;
    return options.data.result;
  }
  function test() {
    //alert('woall')

    //controller.test -= 1;
    controller.nextDeal();
    if (controller.pot === 0) {
      controller.gameOver();
    }

    //console.log(controller.playerHand.getHand());
    setTest(!superTest);
  }

  function RenderHelp() {
    //Fill currency
    let select = document.getElementById('selectCurrency');
   // let list = select.options;

    for(let i = 0; i < currencies.length; i ++){
        let option = document.createElement('option');
        option.value = currencies[i];
        option.text =  currencies[i];

        select.add(option)
    }
    
    return (
      <div className="App">
        <h1>TEST</h1>

        <PlayerHand hand={controller.playerHand} deck={controller.deck} handHouse={controller.houseHand} controller={controller} pot={controller.pot} />

        <Bet pot={controller.pot} controller={controller} callBack={test} />

      </div>
    )
  }

  return (
    <div>
      <RenderHelp />
      {newPot}
      <CurrencySelect currencies = {currencies}/>
    </div>
  );
}
//
export default App;
