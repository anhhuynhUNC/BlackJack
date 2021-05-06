import firebase from 'firebase'
import { useState } from 'react';
import { Heading, Button } from 'react-bulma-components'
import { lbToggle1, lbToggle2 } from './cssHelper'

let lbToggle = false;
function Leaderboards(props) {
    //let admin = require('firebase-admin')
    let [temp, setTemp] = useState([]);

    //lb1 = [1,2,3];c

    async function fetch() {
        const db = firebase.database();
        const scoreRef = db.ref('Leaderboard');
        
        scoreRef.orderByValue().on('value', snap => {
            let temp = [];
           let temp2 = [];

            let anotherVar = true
            snap.forEach(function (data) {
                temp.push("" + data.key + ": " + data.val());
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
            
            setTemp(temp2);
        })

        return 1;
    }
    
    return (
        <span>
            <Button onClick={() => {
                fetch();
                if (!lbToggle) {
                    lbToggle2()
                    lbToggle = true;
                } else {
                    lbToggle1()
                    lbToggle = false;
                }
            }}>Show Leaderboards</Button>
            <div id='leaderboard'>

                <Heading>Leaderboards</Heading>
                {temp.map(item => { return (<h2>{item + ' USD'}</h2>) })}


            </div>
        </span>
    )
}





export default Leaderboards;