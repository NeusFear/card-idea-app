import {NewCard} from "@/data/Types";
import React, {useEffect, useRef, useState} from "react";
import Download from "@/components/Download";

function Cards({ route, setCards, cards }: { route: string, setCards: (cards: NewCard[]) => void, cards: NewCard[] }) {

    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch("/api/get_" + route); // Fetch data from API route
            console.log(response);
            if (!response.ok) throw new Error('Failed to fetch data');
            const result = await response.json();
            setCards(result)
        } catch (error) {
            if (!loading) return;
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
                        <Card index={index} cardType={route} key={index} card={card}/>
                    ))}
                </div>
            </div>
        );
    }
}

function Card({cardType, card, index}: { cardType: string, card: NewCard, index: number }) {

    const [editing, setEditing] = useState(false);
    const [description, setDescription] = useState(card.desc);
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    // Detect if the device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleDoubleClick = () => {
        if (!isMobile) {
            setEditing(true)
        }
    };

    const handleUpdate = async (event: React.FormEvent) => {

        event.preventDefault();

        setEditing(false);

        try {
            const response = await fetch("/api/update_element_desc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: cardType, // If this card is a mission or an item
                    desc: description,   // The current description
                    newDesc: updatedDescription, // The new description
                }),
            });

            const data = await response.json();
            console.log("Data log: " + data);
            if (!response.ok) throw new Error('Failed to fetch data: ' + response);
            setDescription(data.description);
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setDescription(updatedDescription)
        }
    };

    const handleDelete = async (event: React.FormEvent) => {

        event.preventDefault();

        setEditing(false);

        try {
            const response = await fetch("/api/delete_element", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: cardType, // If this card is a mission or an item
                    desc: description,   // The current description
                }),
            });

            const data = await response.json();
            console.log("Data log: " + data);
            if (!response.ok) throw new Error('Failed to fetch data: ' + response);
            setDescription("Deleting...");
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setDescription("[Deleted]")
        }
    };

    const cancelEditing = () => {
        setUpdatedDescription("");
        setEditing(false);
    }

    return (
        <div className="bg-gray-700 p-3 rounded-xl h-[525px] w-[375px] content-center flex flex-col"
             id={"card_" + index}>
            {editing && <EditCardDesc
                currentDesc={description}
                setUpdatedDescription={setUpdatedDescription}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                cancelEditing={cancelEditing}
            />}
            {!editing && <p className="text-white font-semibold text-2xl flex-grow content-center"
                            onDoubleClick={() => handleDoubleClick()}>{description}</p>}
            <p className="text-gray-400 capitalize p-2">Submitted by: {card.submitter}</p>
        </div>
    )
}

function EditCardDesc({currentDesc, setUpdatedDescription, handleUpdate, handleDelete, cancelEditing}: {
    currentDesc: string,
    setUpdatedDescription: (value: (((prevState: string) => string) | string)) => void,
    handleUpdate: (event: React.FormEvent) => Promise<void>,
    handleDelete: (event: React.FormEvent) => Promise<void>,
    cancelEditing: () => void,
}) {

    const [currentText, setCurrentText] = useState(currentDesc)
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const updateDescFields = (value:string) => {
        setUpdatedDescription(value);
        setCurrentText(value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevents a new line from being added
            submitButtonRef.current?.click();
        }
        if (e.key === "Escape") {
            e.preventDefault();
            cancelEditing();
        }
    };

    useEffect(() => {
        textAreaRef.current?.focus();
        textAreaRef.current?.setSelectionRange(currentText.length, currentText.length);
    }, []);

    return (
        <form className="text-white flex-grow content-center flex flex-col items-center">
            <textarea ref={textAreaRef} className="text-white font-semibold text-2xl table-cell align-middle flex-grow text-center bg-transparent text-wrap w-full p-10"
                      onKeyDown={handleKeyDown} //Disable enter and instead accept form
                      value={currentText} placeholder="Type a new card description" spellCheck={true}
            onChange={(event) => updateDescFields(event.target.value)}/>
            <button ref={submitButtonRef} className="h-10 bg-blue-400 rounded-xl p-2 font-semibold w-full mt-2" onClick={event => handleUpdate(event)}>Update Description</button>
            <div className="flex flex-row gap-2 mt-2 w-full">
                <button className="flex-grow h-10 bg-red-600 text-white rounded-xl p-2 font-semibold" onClick={event => handleDelete(event)}>Delete</button>
                <button className="flex-grow h-10 bg-red-400 rounded-xl p-2 font-semibold" onClick={cancelEditing}>Cancel</button>
            </div>
        </form>
    )
}

export default Cards;