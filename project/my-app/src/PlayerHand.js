import React from 'react';
import Deck from './Deck'
import { useEffect, useState } from 'react';
import ShowCard from './CardReal'
import Hand from './Hand';
import Card from './Card';
import HouseHand from './HouseHand'
import PlayerReal from './PlayerReal'
import { Button } from 'react-bulma-components';

function PlayerHand(props) {

    let [test, setTest] = useState(1);
    let [isStand, setStand] = useState(false);
    let [bust, setBust] = useState(false);



    let houseHand = props.handHouse
    let playerHand = props.hand;
    let deck = props.deck;
    let masterDeck = deck.deck;

    let controller = props.controller;
    let [hasBet, setHasBet] = useState(controller.hasBet)

    return (
        <div >

            <HouseHand hand={houseHand} deck={deck} />
            {isStand ? houseHand.getHandValue() : <div></div>}

            <div>
            <PlayerReal hand={playerHand} deck={deck} />
                <p className='hidden freeCard'>{playerHand.getHandValue()}</p>
                <span>
                    {!isStand ? <Button onClick={() => {
                        if (!props.controller.hasBet) {
                            //alert("bet first");
                            document.getElementById('bet').placeholder = "Place Bet First";
                            return;
                        }
                        deck.deal(playerHand);
                        setTest(test + 1);
                        if (playerHand.getHandValue() > 21) {
                            controller.checkLose();
                            houseHand.getHand()[0].hidden = false;
                            setStand(true);
                            setBust(true);
                            controller.inPlay = true;
                            //
                        }

                    }}>Hit</Button> : <span></span>}
                    {!bust ? <Button onClick={() => {
                        if (!props.controller.hasBet) {
                            // alert("bet first");
                            document.getElementById('bet').placeholder = "Place Bet First";
                            return;
                        }
                        setStand(true);
                        houseHand.getHand()[0].hidden = false;
                        controller.inPlay = true;
                        controller.setHouse();
                    }}>Stand</Button> : <span></span>}
                </span>
            </div>
        </div>
    )
}

export default PlayerHand;
