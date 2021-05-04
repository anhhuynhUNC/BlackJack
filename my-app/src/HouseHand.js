import React from 'react';
import Deck from './Deck'
import { useEffect, useState } from 'react';
import ShowCard from './CardReal'
import Hand from './Hand';
import Card from './Card';

function HouseHand(props) {

    
    let [isStand, setStand] = useState(false);

    let houseHand = props.hand;
    let deck = props.deck;
    let masterDeck = deck.deck;
    
    let [test,setTest] = useState(houseHand.getHandValue());
    

    return (
        <div id = 'houseHand'>
            <h2>House Hand</h2>
            {houseHand.getHand().map(items => (
                <ShowCard value={items.value} suit={items.suit} hidden = {items.hidden}/>
            ))
            }
            
          
        </div>
    )
}

export default HouseHand;
