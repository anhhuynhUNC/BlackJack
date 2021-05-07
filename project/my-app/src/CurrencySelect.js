import React from 'react';
import Deck from './Deck'
import { useEffect, useState } from 'react';
import ShowCard from './CardReal'
import Hand from './Hand';
import Card from './Card';
import { Button, Form,Field } from 'react-bulma-components';

function CurrencySelect(props) {
    let select = document.createElement('select');
    // let list = select.options;
    // console.log(props.currencies)
    // for(let i = 0; i < props.currencies.length; i ++){
    //     let option = document.createElement('option');
    //     option.value = props.currencies[i];
    //     option.text = props.currencies[i];

    //     select.add(option)
    // }
    let x = 10;
    let [testVal, setVal] = useState("AED");

    return (
        <div >
            <Form.Field>
                <Form.Label>Select Your Currencies</Form.Label>
                <Form.Select id="selectCurrency" onChange={(event) => {
                    setVal(event.target.value);
                }}></Form.Select>
            </Form.Field>
            <SelectButton callBack={props.callBack} value={testVal} callBack2={props.callBack2} callBack3={props.callBack3} />
        </div>
    )
}

function SelectButton(props) {



    return (
        <div>
            <Button id='menuButton' onClick={() => { props.callBack3() }}>Retrieve accepted Currencies</Button>
            <Button id='menuButton1' onClick={() => { props.callBack(props.value) }}>Exchange</Button>
            <Button id='menuButton2' onClick={() => { props.callBack2() }}>Skip</Button>
        </div>
    )
}

export default CurrencySelect;