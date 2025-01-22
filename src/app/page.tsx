"use client";
import React, {useEffect, useState} from "react";

interface NewCard {
    desc: string,
    submitter: string
}

export default function Home() {

    //UI Tab state
    const [tab, setTab] = useState("missions");
    //Current Input State (common)
    const [input, setInput] = useState("");
    const [submitterName, setSubmitterName] = useState("");

    //Cards state
    const [missions, setMissions] = useState<NewCard[]>([]);
    const [items, setItems] = useState<NewCard[]>([]);

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

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <header className="bg-gray-800 px-8 py-16">
                <h1 className="text-6xl font-bold text-white">Card Idea Generator</h1>
                <p className="text-xl text-neutral-300 pl-2">Submit your ideas below, as many as you like!</p>
            </header>
            <nav className="bg-gray-900 text-white px-14 pt-4 flex flex-row gap-x-4 border-b">
                <Tab title={"Missions"} active={tab == "missions"} onClick={() => setTab("missions")} />
                <Tab title={"Items"} active={tab == "items"} onClick={() => setTab("items")} />
            </nav>
            <main className="items-center flex-grow">
                <form className={"bg-gray-700 p-3 flex md:flex-row flex-col md:gap-0 gap-2"}>
                    <input required type="text"
                           onChange={(event) => setInput(event.target.value)} value={input}
                           className={"md:rounded-l-xl md:rounded-none rounded-xl p-4 flex-grow cursor-text"} placeholder={tab == "mission" ? "Mission Idea" : "Item Idea"} />
                    <input required type="text"
                           onChange={(event) => setSubmitterName(event.target.value)} value={submitterName}
                           className={"md:rounded-none rounded-xl md:border-l-4 border-gray-800 p-4 flex-grow cursor-text"} placeholder={"Your Name"} />
                    <button onClick={handleSubmit}
                            className={(submitterName == "" ? "cursor-not-allowed" : "cursor-pointer") + " md:rounded-r-xl md:rounded-none rounded-xl py-4 px-16 bg-gray-800 text-white font-semibold"} >Submit</button>
                </form>
                {tab == "missions" && <Cards route="/api/get_missions" setCards={setMissions} cards={missions} />}
                {tab == "items" && <Cards route="/api/get_items" setCards={setItems} cards={items} />}
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
                " border-t border-x px-4 py-1 rounded-t-xl cursor-pointer md:flex-grow-0 flex-grow text-center"} //Common tab styles
            onClick={onClick}>
            {title}
        </div>
    )
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
            <div className="flex flex-row flex-wrap p-4 gap-4 justify-center items-center text-center">
                {cards.map((card, index) => (
                    <Card key={index} card={card}/>
                ))}
            </div>
        );
    }
}

function Card({ card }: { card: NewCard }) {
    return (
        <div className="bg-gray-700 p-3 rounded-xl h-[35rem] w-[25rem] content-center flex flex-col">
            <p className="text-white font-semibold text-2xl flex-grow content-center">{card.desc}</p>
            <p className="text-gray-400 capitalize p-2">Submitted by: {card.submitter}</p>
        </div>
    )
}
