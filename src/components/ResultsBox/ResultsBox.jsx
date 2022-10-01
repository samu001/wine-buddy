import React from "react";
import "./ResultsBox.css";
import PairedWine from "../PairedWine/PairedWine";

export default function ResultsBox(props) {
    const pairedWines = props.pairedWines;

    const pairedWinesEl = pairedWines.map((item, key) => {
        return <PairedWine key={key} wineName={item} />;
    });

    return (
        <div className="results-container">
            <h2>Wines that go well with {props.searchQuery}</h2>
            <div className="paired-wines-container">{pairedWinesEl}</div>
        </div>
    );
}