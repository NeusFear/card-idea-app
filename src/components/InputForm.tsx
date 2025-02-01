import {NewCard} from "@/data/Types";
import React, {useState} from "react";

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

        const newData = { submitter: submitterName, desc: input, collectionName: tab };

        try {
            const response = await fetch("/api/add_element", {
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
                   onChange={(event) => setInput(event.target.value)}
                   value={input}
                   className={"md:rounded-l-xl md:rounded-none rounded-xl p-4 flex-grow cursor-text"}
                   placeholder={tab == "missions" ? "Mission Idea" : "Item Idea"} />
            <input required type="text"
                   onChange={(event) => setSubmitterName(event.target.value)}
                   value={submitterName}
                   className={"md:rounded-none rounded-xl md:border-l-4 border-gray-800 p-4 flex-grow cursor-text"}
                   placeholder={"Your Name"} />
            <button onClick={handleSubmit}
                    className={(submitterName == "" ? "cursor-not-allowed" : "cursor-pointer") + " md:rounded-r-xl md:rounded-none rounded-xl py-4 px-16 bg-gray-800 text-white font-semibold"} >Submit</button>
        </form>
    )
}

export default InputForm;