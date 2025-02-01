import {NewCard} from "@/data/Types";
import React, {useEffect, useState} from "react";
import Download from "@/components/Download";

function Cards({ route, setCards, cards }: { route: string, setCards: (cards: NewCard[]) => void, cards: NewCard[] }) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(route); // Fetch data from API route
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                console.log("Fetched data: " + result);
                setCards(result)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="text-center text-xl mt-32 animate-bounce">Loading...</div>
        );
    } else {
        return (
            <div className="flex flex-col">
                <div className="p-8 text-center">
                    <Download numCards={cards.length} />
                </div>
                <div className="flex flex-row flex-wrap p-4 gap-4 justify-center items-center text-center">
                    {cards.map((card, index) => (
                        <Card index={index} key={index} card={card}/>
                    ))}
                </div>
            </div>
        );
    }
}

function Card({ card, index }: { card: NewCard, index: number }) {
    return (
        <div className="bg-gray-700 p-3 rounded-xl h-[525px] w-[375px] content-center flex flex-col" id={"card_" + index}>
            <p className="text-white font-semibold text-2xl flex-grow content-center">{card.desc}</p>
            <p className="text-gray-400 capitalize p-2">Submitted by: {card.submitter}</p>
        </div>
    )
}

export default Cards;