import { useEffect, useState } from 'react';

function ShowCard(props) {
    let attribute;
    let attr2;
    props.hidden ? attribute = 'hidden' : attribute = 'non'
    props.isFirstHidden ? attr2 = 'forceHide' : attr2 = 'freeCard';
    const img = require('./assets/playingCard/' + props.value + "_" + props.suit + '_white.png').default;
    const imgHidden = require('./assets/playingCard/hidden.png').default;
    let useImage = '';
    if (!props.hidden) {
        useImage = img;
    } else {
        useImage = imgHidden;
    }

    return (

        <img className={`${attribute} ${attr2}`} src={useImage}></img>

    )


}

export default ShowCard;