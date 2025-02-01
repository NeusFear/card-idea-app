"use client";
import React, {useState} from "react";
import Rules from "@/components/Rules";
import {NewCard} from "@/data/Types";
import Game from "@/components/Game";
import InputForm from "@/components/InputForm";
import Cards from "@/components/Cards";
import Navigation from "@/components/Navigation";

export default function Home() {

    //UI Tab state
    const [tab, setTab] = useState("rules");

    //Cards state
    const [missions, setMissions] = useState<NewCard[]>([]);
    const [items, setItems] = useState<NewCard[]>([]);

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <header className="bg-gray-800 px-8 md:py-16 py-4">
                <h1 className="md:text-6xl text-4xl font-bold text-white">Poor Preparations</h1>
                <p className="md:text-xl text-sm text-neutral-300 pl-2">Review the game&apos;s rules and submit card ideas below!</p>
            </header>
            <Navigation currentTab={tab} setCurrentTab={setTab} />
            <main className="items-center flex-grow">
                { tab === "missions" || tab === "items" ? <InputForm tab={tab} missions={missions} setMissions={setMissions} items={items} setItems={setItems} /> : null }
                {tab == "rules" && <Rules />}
                {tab == "missions" && <Cards route="missions" setCards={setMissions} cards={missions} />}
                {tab == "items" && <Cards route="items" setCards={setItems} cards={items} />}
                {tab == "test" && <Game />}
            </main>
            <footer className="bg-gray-800 text-center text-white p-8">
                Thanks for helping me come up with card ideas!
            </footer>
        </div>
    );
}
