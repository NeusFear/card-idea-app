"use client";
import React, {useEffect, useState} from "react";
import {exportAsImage} from "../../lib/exportAsImage";

interface NewCard {
    desc: string,
    submitter: string
}

export default function Home() {

    //UI Tab state
    const [tab, setTab] = useState("rules");

    //Cards state
    const [missions, setMissions] = useState<NewCard[]>([]);
    const [items, setItems] = useState<NewCard[]>([]);

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <header className="bg-gray-800 px-8 py-16">
                <h1 className="text-6xl font-bold text-white">Poor Preparations</h1>
                <p className="text-xl text-neutral-300 pl-2">Review the game&apos;s rules and submit card ideas below!</p>
            </header>
            <nav className="bg-gray-900 text-white px-14 pt-4 flex flex-row gap-x-4 border-b">
                <Tab title={"Game Rules"} active={tab == "rules"} onClick={() => setTab("rules")} />
                <Tab title={"Missions"} active={tab == "missions"} onClick={() => setTab("missions")} />
                <Tab title={"Preparations"} active={tab == "items"} onClick={() => setTab("items")} />
                <Tab title={"Play The Game"} active={tab == "test"} onClick={() => setTab("test")} />
            </nav>
            <main className="items-center flex-grow">
                { tab === "missions" || tab === "items" ? <InputForm tab={tab} missions={missions} setMissions={setMissions} items={items} setItems={setItems} /> : null }
                {tab == "rules" && <Rules />}
                {tab == "missions" && <Cards route="/api/get_missions" setCards={setMissions} cards={missions} />}
                {tab == "items" && <Cards route="/api/get_items" setCards={setItems} cards={items} />}
                {tab == "test" && <Game />}
            </main>
            <footer className="bg-gray-800 text-center text-white p-8">
                Thanks for helping me come up with card ideas!
            </footer>
        </div>
    );
}

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
            <div className="flex flex-col overflow-x-hidden text-center p-32">
                <p className="text-xl text-gray-800 font-bold">Select a role to play:</p>
                <div className="flex flex-rowoverflow-x-hidden justify-center gap-4 m-8">
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
                <button className="bg-red-400 rounded-xl hover:bg-red-500 w-60 p-2 font-bold text-white" onClick={() => setCardsRandom()}>Refresh Cards</button>
            </div>
        )
    }
}

function TestCard({card, cycleCard} : {card: NewCard, cycleCard: () => void} ) {
    return (
        <button className="group bg-gray-700 hover:-translate-y-6 transition-transform p-3 rounded-xl h-[320px] w-[240px] content-center flex flex-col" onClick={() => cycleCard()}>
            <p className="text-white font-semibold text-2xl flex-grow content-center">{card?.desc}</p>
            <p className="transform translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity">Cycle Card</p>
        </button>
    )
}

function Tab({ title, active, onClick }: { title: string, active: boolean, onClick: () => void }) {
    return (
        <div
            className={(
                active ?
                "bg-gray-700 text-white border-white transform translate-y-[1px]" : //Active tab styles
                "bg-gray-800 text-neutral-400 border-neutral-600") + //Inactive tab styles
                " border-t border-x px-4 py-1 rounded-t-xl cursor-pointer md:flex-grow-0 flex-grow text-center"} //Common tab styles
            onClick={onClick}>
            {title}
        </div>
    )
}

function InputForm({tab, missions, setMissions, items, setItems}: {
    tab: string,
    missions: NewCard[],
    setMissions: (value: (((prevState: NewCard[]) => NewCard[]) | NewCard[])) => void,
    items: NewCard[],
    setItems: (value: (((prevState: NewCard[]) => NewCard[]) | NewCard[])) => void
}) {

    //Current Input State (common)
    const [input, setInput] = useState("");
    const [submitterName, setSubmitterName] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {

        event.preventDefault();

        if (!(tab == "missions" || tab == "items")) return alert("Please select a tab.");
        if (submitterName == "") return alert("Please include your first name in the Your Name field.")
        if (input == "") return alert("Please include some text to place on the card.")

        const newData = { submitter: submitterName, desc: input };

        try {
            const response = await fetch(tab == "missions" ? "/api/add_mission" : "/api/add_item", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });

            if (response.ok) {
                if (tab == "missions") setMissions([...missions, newData]); // Add the new item to the array
                if (tab == "items") setItems([...items, newData]); // Add the new item to the array
                setInput(""); // Clear the input field
            } else {
                throw new Error('Failed to add data');
            }
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    return(
        <form className={"bg-gray-700 p-3 flex md:flex-row flex-col md:gap-0 gap-2"}>
            <input required type="text"
                   onChange={(event) => setInput(event.target.value)} value={input}
                   className={"md:rounded-l-xl md:rounded-none rounded-xl p-4 flex-grow cursor-text"} placeholder={tab == "missions" ? "Mission Idea" : "Item Idea"} />
            <input required type="text"
                   onChange={(event) => setSubmitterName(event.target.value)} value={submitterName}
                   className={"md:rounded-none rounded-xl md:border-l-4 border-gray-800 p-4 flex-grow cursor-text"} placeholder={"Your Name"} />
            <button onClick={handleSubmit}
                    className={(submitterName == "" ? "cursor-not-allowed" : "cursor-pointer") + " md:rounded-r-xl md:rounded-none rounded-xl py-4 px-16 bg-gray-800 text-white font-semibold"} >Submit</button>
        </form>
    )
}

function Rules() {
    return (
        <div className="pt-10 text-center text-xl xl:px-80 lg:px-60 md:px-24 px-10">
            <p>This game is about completing complicated tasks with what you&apos;ve got.</p>
            <br/>
            <p>The rules to the game are simple:</p>
            <ul className="items-left text-left p-10 list-decimal">
                <li>Select a player to be the Task Master, it doesn&apos;t matter who, everyone will get to play as this person eventually.</li>
                <li>Pass out 5 Preparation Cards to each player other than the Task Master</li>
                <li>Look at your Preparations, because you will have to complete the Task Master&apos;s task using some of these items in your hand.</li>
                <li>The Task Master places one Task card where every player can read it.</li>
                <li>Each player can now discard 2 of their Preparations and exchange them for 2 more from the deck if desired.</li>
                <li>Once all players are satisfied with their Preparations they are to go one by one starting to the left of the Task Master and explain to the Task Master how they plan to accomplish the task using 3 of their Preparations</li>
                <li>The Task Master now select which of the players has won the opportunity to complete the task. Give that player the Task card to keep track of points.</li>
                <li>Play as many rounds as you like, the player with the most Task Cards at the end of the game wins! Take turns being the task master in a clockwise order after each turn.</li>
            </ul>
        </div>
    );
}

function Download({numCards}: {numCards: number}) {

    const exportAll = () => {
        for (let index = 0; index < numCards; index++) {
            exportAsImage(document.getElementById("card_" + index.toString()), "card_" + index)
        }
    }

    return (
        <button className="text-center text-xl px-20 py-4 bg-gray-800 rounded-xl text-white" onClick={() => exportAll()}>
            Download {numCards} cards as images
        </button>
    );
}

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
