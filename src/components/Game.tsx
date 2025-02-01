import React, {useEffect, useState} from "react";
import {NewCard} from "@/data/Types";

function Game() {

    const [active, setActive] = useState(false);
    const [judge, setJudge] = useState(true);

    const startAsJudge = () => {
        setJudge(true);
        setActive(true);
    }

    const startAsPlayer = () => {
        setActive(true);
        setJudge(false);
    }

    if (!active) {
        return (
            <div className="flex flex-col overflow-x-hidden text-center py-32">
                <p className="text-xl text-gray-800 font-bold">Select a role to play:</p>
                <div className="flex md:flex-row flex-col overflow-x-hidden justify-center gap-4 m-8">
                    <button className="bg-gray-800 px-8 py-2 h-14 rounded-2xl text-white" onClick={() => startAsJudge()}>I&apos;m the Task Master</button>
                    <button className="bg-gray-800 px-8 py-2 h-14 rounded-2xl text-white" onClick={() => startAsPlayer()}>I&apos;m a player</button>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <button className="bg-gray-400 rounded-lg text-gray-900 m-4 py-1 px-4" onClick={() => setActive(false)}>Go Back</button>
                { judge ? <TaskMasterTest /> : <PreparerTest /> }
            </div>
        )
    }

}

function TaskMasterTest() {

    const [results, setResults] = useState<NewCard[]>([]);
    const [dealing, setDealing] = useState(true);
    const [cards, setCards] = useState<NewCard[]>([]);

    const setCardsRandom = () => {
        const randomCards:NewCard[] = [
            results[Math.round(Math.random() * results.length)],
        ]
        setCards(randomCards)
    }

    function setCardRandom(index: number) {
        setCards(cards => {
            const newItems = [...cards];
            newItems[index] = results[Math.round(Math.random() * results.length)];
            return newItems;
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/get_missions"); // Fetch data from API route
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setResults(result);
                const randomCards:NewCard[] = [
                    result[Math.round(Math.random() * result.length)],
                ]
                setCards(randomCards)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setDealing(false);
            }
        };

        fetchData();
    }, []);

    if (dealing) {
        return (
            <div className="text-center text-xl mt-32 animate-bounce">Dealing Cards...</div>
        );
    } else {
        return(
            <div className="flex flex-col overflow-x-hidden gap-4 items-center">
                <p className="font-bold text-gray-600 text-lg">Click on a card to cycle it for a new one</p>
                <div className="flex flex-row flex-wrap p-4 gap-4 justify-center items-center text-center">
                    {cards.map((card, index) => (
                        <TestCard key={index} card={card} cycleCard={() => setCardRandom(index)}/>
                    ))}
                </div>
                <button className="bg-red-400 rounded-xl hover:bg-red-500 w-60 p-2 font-bold text-white" onClick={() => setCardsRandom()}>Refresh Mission</button>
            </div>
        )
    }
}

function PreparerTest() {

    const [dealing, setDealing] = useState(true);
    const [cards, setCards] = useState<NewCard[]>([]);
    const [results, setResults] = useState<NewCard[]>([]);

    const setCardsRandom = () => {
        const randomCards:NewCard[] = [
            results[Math.round(Math.random() * results.length)],
            results[Math.round(Math.random() * results.length)],
            results[Math.round(Math.random() * results.length)],
            results[Math.round(Math.random() * results.length)],
            results[Math.round(Math.random() * results.length)],
        ]
        setCards(randomCards)
    }

    function setCardRandom(index: number) {
        setCards(cards => {
            const newItems = [...cards];
            newItems[index] = results[Math.round(Math.random() * results.length)];
            return newItems;
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/get_items"); // Fetch data from API route
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setResults(result);

                const randomCards:NewCard[] = [
                    result[Math.round(Math.random() * result.length)],
                    result[Math.round(Math.random() * result.length)],
                    result[Math.round(Math.random() * result.length)],
                    result[Math.round(Math.random() * result.length)],
                    result[Math.round(Math.random() * result.length)],
                ]
                setCards(randomCards)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setDealing(false);
            }
        };

        fetchData();
    }, []);

    if (dealing) {
        return (
            <div className="text-center text-xl mt-32 animate-bounce">Dealing Cards...</div>
        );
    } else {
        return(
            <div className="flex flex-col overflow-x-hidden gap-4 items-center">
                <p className="font-bold text-gray-600 text-lg">Click on a card to cycle it for a new one</p>
                <button className="flex flex-row flex-wrap p-4 gap-4 justify-center items-center text-center">
                    {cards.map((card, index) => (
                        <TestCard key={index} card={card} cycleCard={() => setCardRandom(index)} />
                    ))}
                </button>
                <button className="bg-red-400 rounded-xl hover:bg-red-500 w-60 p-2 font-bold text-white mb-10" onClick={() => setCardsRandom()}>Refresh Cards</button>
            </div>
        )
    }
}

function TestCard({card, cycleCard} : {card: NewCard, cycleCard: () => void} ) {
    return (
        <button className="group bg-gray-700 lg:hover:-translate-y-6 transition-transform p-3 rounded-xl h-[320px] w-[240px] content-center flex flex-col" onClick={() => cycleCard()}>
            <p className="text-white font-semibold text-2xl flex-grow content-center">{card?.desc}</p>
            <p className="transform translate-y-10 opacity-0 lg:group-hover:opacity-100 transition-opacity">Cycle Card</p>
        </button>
    )
}

export default Game;