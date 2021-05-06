import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bulma-components';


function Trivia(props) {
    //let trivia = await triviaMachine();
    let [trivia, setTrivia] = useState('');

    return (
        <div>
            <h3>{trivia}</h3>
            <Button onClick={() => {
                if (props.controller.hasBet) {
                    triviaMachine(props.controller.playerHand.getHandValue()).then(val => setTrivia(val))
                }
                else {
                    setTrivia("Bet first to reveal your Hand! (Nice try)")
                }
            }}>Click here for cool facts of your Hand</Button>

        </div>
    )

}

async function triviaMachine(num) {
    const options = await axios({
        method: 'GET',
        url: 'https://numbersapi.p.rapidapi.com/' + num + '/trivia',
        params: { json: 'false', notfound: 'floor', fragment: 'false' },
        headers: {
            'x-rapidapi-key': 'c26a08c82cmshc5e9181d8ae1865p16ddb7jsnc3ea9ca8a82c',
            'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
        }
    })
    return options.data.text;
}

export default Trivia;