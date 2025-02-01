import React from "react";

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

export default Rules;