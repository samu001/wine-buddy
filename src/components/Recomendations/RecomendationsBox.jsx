import React from "react";
import RecomendedItem from "./RecomenedItem";

export default function RecomendationsBox(props) {
    const matchesEl = props.matches.map((item, i) => {
        return (
            <RecomendedItem
                key={i}
                title={item.title}
                price={item.price}
                imgUrl={item.imageUrl}
                description={item.description}
            />
        );
    });

    return (
        <div>
            <div className="matches">{matchesEl}</div>
        </div>
    );
}