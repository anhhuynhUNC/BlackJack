import React from 'react';
import Deck from './Deck'
import { useEffect, useState } from 'react';
import ShowCard from './CardReal'
import Hand from './Hand';
import Card from './Card';
import HouseHand from './HouseHand'

function Bet(props) {
    let [pot, setPot] = useState(props.pot);
    let [currentBet, setBet] = useState(0);
    let [hasBet, setHasBet] = useState(props.controller.hasBet);
    let realPot = props.pot;


    return (
        <div>
            <h2>Pot: {pot}</h2>
            <h2> Current: {currentBet}</h2>
            {!hasBet ? <div>
                <label>Bet  </label>
                <input id='bet' type='number' step='500'></input>
                <button onClick={() => {
                    let bet = parseInt(document.getElementById('bet').value);
                    if (isNaN(bet) || bet < 1 || bet > pot) {
                        document.getElementById('bet').value = '';
                        document.getElementById('bet').placeholder = "Not Valid";
                    } else {
                        document.getElementById('bet').placeholder = '';
                        setPot(pot - bet);
                        setBet(bet);
                        realPot = realPot - bet;
                        props.controller.setPot(realPot);
                        props.controller.setBet(bet);
                        console.log(props.controller.realPot);
                        console.log(props.controller.bet);
                        props.controller.hasBet = true;
                        setHasBet(props.controller.hasBet)
                    }
                }
                }>Place Bet</button>
            </div> : <div></div>}

            {hasBet? <button onClick = {()=> {if(props.controller.inPlay){props.callBack()}}}>Continue</button>:<span></span>}
        </div>
    )

}

export default Bet
