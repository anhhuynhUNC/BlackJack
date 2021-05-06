import Card from './Card'
import Hand from './Hand'

export default class Deck {
    constructor()  {
        this.size = 52;
        this.deck = [];


        for(let i = 1; i < 14; i ++){
            this.deck.push(new Card(i,'spades'))
        }

        for(let i = 1; i < 14; i ++){
            this.deck.push(new Card(i,'clubs'))
        }

        for(let i = 1; i < 14; i ++){
            this.deck.push(new Card(i,'diamonds'))
        }

        for(let i = 1; i < 14; i ++){
            this.deck.push(new Card(i,'hearts'))
        }



    }

    shuffle(){
        for(let i = this.deck.length - 1; i > 0; i --){
            let j = Math.floor (Math.random() * (i + 1));
            let temp = this.deck[j];
            this.deck[j] = this.deck[i];
           this.deck[i] = temp;
        }


    }

    deal(hand){
        hand.addCard(this.deck.shift());

    }
}