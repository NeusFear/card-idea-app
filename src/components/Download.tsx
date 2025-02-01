import {exportAsImage} from "../../lib/exportAsImage";
import React from "react";

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

export default Download;