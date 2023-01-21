import React, {useState, useEffect} from 'react'
import listOfPokemon from '../list-of-pokemon';
import CardList from './Card-list';
import "../styles/game-container.css";

const GameContainer = (props) => {

    const [level, setLevel] = useState(1);
    const [pokemonArray, setPokemonArray] = useState([]);
    const [pokemonNameList, setPokemonNameList] = useState([]);
    const [cardList, setCardList] = useState();
    const [cards, setCards] = useState(4);
    const [cardsPicked, setCardsPicked] = useState();


    useEffect(() => {
        if (props.restartedGame === true) {
            setLevel(1);
            setCards(4);
            setCardsPicked();
            setPokemonArray([]);
            setPokemonNameList([]);
            setCardList([]);
            props.toggleRestartedGame(false);
            newCards();
        }    
    }, [props.restartedGame]);

    const calculateRequiredCards = (level) => {

        switch(level) {
            case 1:
                setCards(4)
                break;
            case 2:
                setCards(6)
                break;
            case 3:
                setCards(8)
                break;
            case 4:
                setCards(10)
                break;
            case 5:
                setCards(12)
                break;
            default:
                setCards(12)
        }
    }

    useEffect(() => {
        calculateRequiredCards(level);
    }, [level]);

    //generate random sequence of numbers between 1-151 and store in array
    const generatePokemonArray = (cards) => {

        const generatedPokemonArray = [];

        for (let i = 0; i < cards; i++) {
            let newValue = Math.floor(Math.random() * (150 - 0) + 0);
            while (generatedPokemonArray.includes(newValue)) {
                newValue = Math.floor(Math.random() * (150 - 0) + 0);
            }
            generatedPokemonArray.push(newValue );
        }; 
        setPokemonArray(generatedPokemonArray);
    }

    //generate pokemon names based on random numbers generated from generatePokemonArray and store in array
    const generatePokemonNameList = (pokemonArray) => {

        const nameList = [];

        for (let i = 0; i < pokemonArray.length; i++) {
            let name = listOfPokemon[pokemonArray[i]].name;
            nameList.push(name);
        };
        setPokemonNameList(nameList);
    }

    useEffect(() => {
        generatePokemonArray(cards);
    }, [cards])


    useEffect(() => {
            generatePokemonNameList(pokemonArray);
    }, [pokemonArray])
    
    
    const shuffleCards = (pokemonNameList) => {
        for (let i = pokemonNameList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = pokemonNameList[i];
            pokemonNameList[i] = pokemonNameList[j];
            pokemonNameList[j] = temp;
        }
        setCardList(pokemonNameList)
    }

    useEffect(() => {
        setCardList(pokemonNameList);
    }, [cardList, pokemonNameList])
    

    
    const validateSelection = (card) => {
        if (!cardsPicked) {
            setCardsPicked(
                [card]
            );
            shuffleCards(cardList);
            props.updateScore();        
        }
        else {
            let cardExists = false;
            shuffleCards(cardList);
            for (let i=0; i<cardsPicked.length; i++) {
                if (card === cardsPicked[i]) {
                    (cardExists = true)
                }
            }
            if (cardExists === false) {
                setCardsPicked([...cardsPicked, card]);
            } else {
                if (props.score > props.highScore) {
                    props.updateHighScore(props.score);
                }
                props.toggleGameOverlay();
                return
            }
            props.updateScore();
            if (cardsPicked.length === cards - 1) {
                setCardsPicked();
                setLevel(level + 1);
                newCards();
            }
        }
    }

    const newCards = () => {
        setPokemonArray([]);
        setPokemonNameList([]);
        setCardList([]);
        generatePokemonArray(cards);
        generatePokemonNameList(pokemonArray)
    }
    

  return (
        <div className="card-container" >
            <CardList list={pokemonNameList} validateSelection={validateSelection} />
        </div>        
  )
}

export default GameContainer;