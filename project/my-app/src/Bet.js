import React from 'react';
import Deck from './Deck'
import { useEffect, useState } from 'react';
import ShowCard from './CardReal'
import Hand from './Hand';
import Card from './Card';
import HouseHand from './HouseHand'
import { Button } from 'react-bulma-components';
import { Form } from 'react-bulma-components';
import { Columns } from 'react-bulma-components';


const { Input, Field, Control, Label } = Form;

function Bet(props) {
    let [pot, setPot] = useState(props.pot);
    let [currentBet, setBet] = useState(0);
    let [hasBet, setHasBet] = useState(props.controller.hasBet);
    let realPot = props.pot;


    return (
        <div>
            <h2>Pot: {pot + " " + props.controller.currency}</h2>
            <h2> Current: {currentBet}</h2>
            {!hasBet ? <div>

                <Columns>
                    <Columns.Column size={2} offset={5} >
                        <Form.Field>
                            <Form.Label>
                                Bet
                     </Form.Label>
                            <Form.Field kind="addons">
                                <Form.Control fullwidth>
                                    <Form.Input id='bet' type='number' step='500'></Form.Input>
                                </Form.Control>
                                <Form.Control>
                                    <Button id='betButton' onClick={() => {
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

                                            props.controller.hasBet = true;

                                            //Unhide (Does this do anything?)
                                            props.controller.houseHand.getHand()[1].hidden = false
                                            props.controller.playerHand.getHand()[0].hidden = false
                                            props.controller.playerHand.getHand()[1].hidden = false

                                            let res = document.getElementsByClassName('freeCard');

                                            console.log(res.length);
                                            for (let i = 0; i < res.length; i++) {
                                                res[i].classList.remove('hidden');
                                            }

                                            //manual load images
                                            res[0].src = require('./assets/playingCard/' + props.controller.houseHand.getHand()[1].value + "_" + props.controller.houseHand.getHand()[1].suit + '_white.png').default;
                                            res[1].src = require('./assets/playingCard/' + props.controller.playerHand.getHand()[0].value + "_" + props.controller.playerHand.getHand()[0].suit + '_white.png').default;
                                            res[2].src = require('./assets/playingCard/' + props.controller.playerHand.getHand()[1].value + "_" + props.controller.playerHand.getHand()[1].suit + '_white.png').default;

                                            setHasBet(props.controller.hasBet)
                                        }
                                    }
                                    }>Place Bet</Button>
                                </Form.Control>
                            </Form.Field>
                        </Form.Field>

                    </Columns.Column>
                </Columns>
            </div> : <div></div>}

            {hasBet ? <Button onClick={() => { if (props.controller.inPlay) { props.callBack() } }}>Continue</Button> : <span></span>}
        </div>
    )

}

export default Bet
