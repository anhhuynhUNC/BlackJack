

function ShowCard(props){
    let attribute;
    props.hidden? attribute ='hidden': attribute='non' 
    return(
        
        <h3 className = {attribute}>{props.value + ' ' + props.suit}</h3>
    )


}

export default ShowCard;