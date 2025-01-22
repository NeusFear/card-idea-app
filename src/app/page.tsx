"use client";
import {useEffect, useState} from "react";

interface Card {
    _id: string,
    desc: string,
    submitter: string
}

export default function Home() {

    const [tab, setTab] = useState("missions");
    const [input, setInput] = useState("");
    const [missions, setMissions] = useState<string[]>([]);
    const [items, setItems] = useState<string[]>([]);

    const addMission = () => {
        if (input.trim() !== "") {
            setMissions([...missions, input]); // Add the new item to the array
            setInput(""); // Clear the input field
        }
    };

    const addItem = () => {
        if (input.trim() !== "") {
            setItems([...items, input]); // Add the new item to the array
            setInput(""); // Clear the input field
        }
    };

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await fetch("/api/missions");
                if (!response.ok) throw new Error("Failed to fetch missions");
                const data = await response.json();
                setMissions(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching missions: " + error);
            }
        };

        fetchMissions();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-800 px-8 py-16">
                <h1 className="text-6xl font-bold text-white">Card Idea Generator</h1>
                <p className="text-xl text-neutral-300 pl-2">Submit your ideas below, as many as you like!</p>
            </header>
            <nav className="bg-gray-900 text-white px-14 pt-4 flex flex-row gap-x-4 border-b">
                <Tab title={"Missions"} active={tab == "missions"} onClick={() => setTab("missions")} />
                <Tab title={"Items"} active={tab == "items"} onClick={() => setTab("items")} />
            </nav>
            <main className="items-center flex-grow">
                <div className={"bg-gray-700 p-3 flex flex-row"}>
                    <input type="text" onChange={(event) => setInput(event.target.value)} value={input} className={"rounded-l-xl p-4 flex-grow cursor-text"} placeholder={tab == "missions" ? "Mission Idea" : "Item Idea"} />
                    <button onClick={tab == "missions" ? addMission : addItem} className={"rounded-r-xl py-4 px-16 bg-gray-800 text-white font-semibold cursor-pointer"} >Submit</button>
                </div>
                {tab == "missions" && <Cards cards={missions}/>}
                {tab == "items" && <Cards cards={items}/>}
            </main>
            <footer className="bg-gray-800 text-center text-white p-8">
                Thanks for helping me come up with card ideas!
            </footer>
        </div>
    );
}

function Tab({ title, active, onClick }: { title: string, active: boolean, onClick: () => void }) {
    return (
        <div
            className={(
                active ?
                "bg-gray-700 text-white border-white transform translate-y-[1px]" : //Active tab styles
                "bg-gray-800 text-neutral-400 border-neutral-600") + //Inactive tab styles
                " border-t border-x px-4 py-1 rounded-t-xl cursor-pointer"} //Common tab styles
            onClick={onClick}>
            {title}
        </div>
    )
}

function Cards({ cards }: { cards: string[] }) {

    return (
        <div className="flex flex-row flex-wrap p-4 gap-4 text-center">
            {cards.map((card, index) => (
                <Card key={index} card={card}/>
            ))}
        </div>
    );
}

function Card({ card }: { card: string }) {
    return (
        <div className="bg-gray-700 p-3 rounded-xl h-[35rem] w-[25rem] content-center">
            <p className="text-white font-semibold text-2xl capitalize">{card}</p>
        </div>
    )
}
