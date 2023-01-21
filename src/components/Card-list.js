import React from 'react';
import Card from './Card';
import "../styles/card-list.css";

export default function CardList(props) {
    
    

    const pokemonList = props.list.map((pokemon) => {
        return <Card key={pokemon} name={pokemon} validateSelection={props.validateSelection} />
    });


    return (
        <div className='list-container'>
            {pokemonList}      
        </div>
    )
}
