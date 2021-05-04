import React from 'react';
import Deck from './Deck'
import { useEffect, useState } from 'react';
import ShowCard from './CardReal'
import Hand from './Hand';
import Card from './Card';

function CurrencySelect(props) {
    let select = document.createElement('select');
   // let list = select.options;

    for(let i = 0; i < props.currencies.length; i ++){
        let option = document.createElement('option');
        option.value = props.currencies[i];
        option.text = props.currencies[i];

        select.add(option)
    }

    return (
        <div >
            <label>Select Currencies</label>
            <select id = "selectCurrency"></select>
          
        </div>
    )
}

function Select(list){
    let selectForm = document.createElement('select');
    
    
    return selectForm
}

export default CurrencySelect;