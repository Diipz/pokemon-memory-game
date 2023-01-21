import React, {useState, useEffect} from 'react'
import "../styles/card.css";

const Card = (props) => {


  const [state, setState] = useState({
    imageOfPokemon: "",
  });

  useEffect(() => {
      (async () => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`, {mode: 'cors'})
          const data = await response.json();
          setState({imageOfPokemon: data.sprites.other.dream_world.front_default})
      })()
  }, [props]);

  const name = props.name;
  const capitalisedName = name && name.charAt(0).toUpperCase() + name.slice(1);


  
  return (
    <div className='card' onClick={() => props.validateSelection(name)}>
      <img className='pokemon-image' src={state.imageOfPokemon} alt={`a wild ${name} pokemon`} />
      <p>{capitalisedName}</p>
    </div>
  )
}

export default Card;