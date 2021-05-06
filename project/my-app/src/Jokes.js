import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bulma-components';

function Jokes(props) {
    let [jokes,setJoke] = useState({});
    let [type,setType] = useState('');
    
    let joke;
    let part1;
    let part2;

    return (
        <div>
            {(type === 'single') ? <h3>{jokes.joke}</h3> : 
                <div>
                    <h3>{jokes.setup}</h3>
                    <h3>{jokes.delivery}</h3>
                </div>}
            <Button onClick ={()=>{
                jokeMachine().then(val => {setJoke(val); setType(val.type)})

            }}> Get some Jokes! </Button>


        </div>

    )
}

async function jokeMachine() {
    const options = await axios({

        method: 'GET',
        url: 'https://jokeapi-v2.p.rapidapi.com/joke/pun,programming' + '?safe-mode',
        params: {
            type: 'twopart,joke',
            format: 'json',
            blacklistFlags: 'nsfw,racist,sexist,religious'
        },
        headers: {
            'x-rapidapi-key': 'c26a08c82cmshc5e9181d8ae1865p16ddb7jsnc3ea9ca8a82c',
            'x-rapidapi-host': 'jokeapi-v2.p.rapidapi.com'
        }
    })

    return options.data;
}

export default Jokes;