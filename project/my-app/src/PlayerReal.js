import React from 'react';
import Deck from './Deck'
import { useEffect, useState } from 'react';
import ShowCard from './CardReal'
import Hand from './Hand';
import Card from './Card';

function PlayerReal(props) {

    
    let [isStand, setStand] = useState(false);

    let playerHand = props.hand;
    let deck = props.deck;
    let masterDeck = deck.deck;
    
    let [test,setTest] = useState(playerHand.getHandValue());
    

    return (
        <div id = 'playerHand'>
            <h2>Player Hand</h2>
            {playerHand.getHand().map(items => (
                <ShowCard value={items.value} suit={items.suit} hidden = {items.hidden}/>
            ))
            }
            
          
        </div>
    )
}

export default PlayerReal;