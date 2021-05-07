import React from 'react';
import Deck from './Deck'
import { useEffect, useState } from 'react';
import ShowCard from './CardReal'
import Hand from './Hand';
import Card from './Card';
import HouseHand from './HouseHand'
import PlayerReal from './PlayerReal'
import { Button, Columns } from 'react-bulma-components';

function PlayerHand(props) {

    let [test, setTest] = useState(1);
    let [isStand, setStand] = useState(false);
    let [bust, setBust] = useState(false);
    let [double, setDouble] = useState(false);
    let [isHit, setHit] = useState(false);
    let [isSplit, setSplit] = useState(false);
    let [playerHand] = useState(props.hand);

    let [isStand2, setStand2] = useState(true);
    let [bust2, setBust2] = useState(false);
    let [test2, setTest2] = useState(1);

    let houseHand = props.handHouse
    //let playerHand = props.hand;
    let deck = props.deck;
    let masterDeck = deck.deck;
    let playerHand2;

    let controller = props.controller;
    let [hasBet, setHasBet] = useState(controller.hasBet)



    return (
        <div >

            <HouseHand hand={houseHand} deck={deck} />
            {(isStand && isStand2) ? houseHand.getHandValue() : <div></div>}

            <div>
                {!isSplit ? <div>
                    <PlayerReal hand={playerHand} deck={deck} />
                    <p className='hidden freeCard'>{playerHand.getHandValue()}</p>
                </div> :
                    <div>
                        <Columns>
                            <Columns.Column offset={3} size={3}>
                                <PlayerReal hand={props.controller.playerHand} deck={deck} />
                                <p className='freeCard'>{controller.playerHand.getHandValue()}</p>
                            </Columns.Column>
                            <Columns.Column offset={0} size={3}>
                                <PlayerReal hand={props.controller.playerHand2} deck={deck} />
                                <p className='freeCard'>{controller.playerHand2.getHandValue()}</p>
                            </Columns.Column>
                        </Columns>
                    </div>
                }

                <span>
                    {!isStand ? <Button onClick={() => {
                        if (!props.controller.hasBet) {
                            //alert("bet first");
                            document.getElementById('bet').placeholder = "Place Bet First";
                            return;
                        }
                        deck.deal(playerHand);
                        setTest(test + 1);
                        setHit(true);
                        if (playerHand.getHandValue() > 21) {
                            controller.checkLose();
                           
                            setStand(true);
                            setBust(true);
                            controller.inPlay = true;
                            controller.hasSet1 = true;

                            if (controller.hasSet1 && controller.hasSet2) {
                                houseHand.getHand()[0].hidden = false;
                            }
                            //
                        }

                    }}>Hit</Button> : <span></span>}
                    {(!double && !bust && !isStand) ? <Button onClick={() => {
                        if (!props.controller.hasBet) {
                            // alert("bet first");
                            document.getElementById('bet').placeholder = "Place Bet First";
                            return;
                        }
                        setStand(true);

                        

                        controller.inPlay = true;
                        controller.hasSet1 = true;

                        controller.setHouse();
                        if (controller.hasSet1 && controller.hasSet2) {
                            houseHand.getHand()[0].hidden = false;
                        }
                    }}>Stand</Button> : <span></span>}
                    {(!bust && !isStand && !isHit && !isSplit) ? <Button id="doubleButton" onClick={() => {
                        if (!props.controller.hasBet) {
                            // alert("bet first");
                            document.getElementById('bet').placeholder = "Place Bet First";

                            return;
                        }
                        setDouble(true);
                        setStand(true);

                        houseHand.getHand()[0].hidden = false;
                        deck.deal(playerHand);


                        controller.inPlay = true;

                        if (playerHand.getHandValue() > 21) {

                            controller.checkLose();
                            setStand(true);
                            setBust(true);
                            controller.inPlay = true;
                            //
                        } else {
                            controller.setHouse();
                        }



                    }}>Double Down</Button> : <span></span>}
                    {(!isSplit && !isHit &&!isStand) ? <Button id='splitButton' onClick={() => {
                        if (!props.controller.hasBet) {
                            // alert("bet first");
                            document.getElementById('bet').placeholder = "Place Bet First";

                            return;
                        }
                        if (playerHand.getHand()[0].value !== playerHand.getHand()[1].value) {
                            return;
                        } else {
                        

                            controller.playerHand2 = new Hand();
                            //playerHand2 = controller.playerHand2

                            controller.playerHand2.getHand().push(playerHand.getHand()[1]);
                            controller.playerHand.getHand().pop();

                            deck.deal(controller.playerHand);
                            deck.deal(controller.playerHand2);
                            playerHand = controller.playerHand;
                            playerHand2 = controller.playerHand2
                            setSplit(true);
                            setStand2(false);
                            controller.splitMode = true;
                            controller.inPlay2 = false;
                            controller.hasSet2 = false;
                        }

                    }
                    }>Split</Button> : <span></span>}



                    {isSplit ?//SECOND KIT
                        <div id="secondButtons"> {!isStand2 ? <Button onClick={() => {
                            if (!props.controller.hasBet) {
                                //alert("bet first");
                                document.getElementById('bet').placeholder = "Place Bet First";
                                return;
                            }
                            deck.deal(controller.playerHand2);
                            setTest2(test2 + 1);

                            if (controller.playerHand2.getHandValue() > 21) {
                                controller.checkLose();
                                //houseHand.getHand()[0].hidden = false;
                                setStand2(true);
                                setBust2(true);
                                controller.inPlay2 = true;
                                controller.hasSet2 = true;
                                //
                                if (controller.hasSet1 && controller.hasSet2) {
                                    houseHand.getHand()[0].hidden = false;
                                }
                            }

                        }}>Hit</Button> : <span></span>}
                            {(!bust2 && !isStand2) ? <Button onClick={() => {
                                if (!props.controller.hasBet) {
                                    // alert("bet first");
                                    document.getElementById('bet').placeholder = "Place Bet First";
                                    return;
                                }
                                setStand2(true);

                                // houseHand.getHand()[0].hidden = false;
                                controller.inPlay2 = true;
                                controller.hasSet2 = true;
                                controller.setHouse();

                                if (controller.hasSet1 && controller.hasSet2) {
                                    houseHand.getHand()[0].hidden = false;
                                }
                            }}>Stand</Button> : <span></span>}
                        </div> : <span></span>}

                </span>
            </div>
        </div >
    )
}

export default PlayerHand;
