import Card from './Card'

export default class Hand {
    constructor() {
        this.hand = [];
        this.handValue = 0;
        this.size = this.hand.length;
    }
    getHandValue() {
        let numAces = 0;

        this.handValue = this.hand.map(item => {
            if (item.value > 10) {
                return 10;
            } else {
                return item.value;
            }
        }).reduce((accumulator, current) => {
            if(accumulator === 1){
                accumulator = 11;
                numAces ++;
            }
            
            if(current === 1){
               current = 11;
               numAces ++;
            }

            return accumulator + current;
        })

        for(let i = 0; i < numAces; i ++){
            if(this.handValue > 21){
                this.handValue -= 10;
            }
        }

        return this.handValue;
    }

    getSize() {
        return this.size;
    }

    getHand() {
        return this.hand;
    }

    addCard(card) {
        this.hand.push(card);
        this.size = this.hand.length;
    }


}