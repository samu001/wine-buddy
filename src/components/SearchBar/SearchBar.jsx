import { useEffect, useState } from "react";
import "./SearchBar.css";
import RecomendationsBox from "../Recomendations/RecomendationsBox";
import ResultsBox from "../ResultsBox/ResultsBox";
import SliderEl from "../UI/SliderEl";

export default function SearchBar() {
    const API_KEY = "9f9874c4519949798c78d38210fba603";

    const noMatchObj = {
        imageUrl:
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    };

    const [isLoading, setIsLoading] = useState(false);
    const [pairedWines, setPairedWines] = useState("");
    const [productMatches, setProductMatches] = useState();
    const [foodText, setFoodText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [initialPage, setInitialPage] = useState(true);
    const [maxPrice, setMaxPrice] = useState(25);

    // HANDLE THE FETCH
    const handleFetch = (e) => {
        // Prevent Reload
        e.preventDefault();
        // SetLoading to true
        setIsLoading(true);
        setSearchQuery(foodText);
        setInitialPage(false);
        fetch(
            `https://api.spoonacular.com/food/wine/pairing?apiKey=9f9874c4519949798c78d38210fba603&food=${foodText}&maxPrice=${maxPrice}`
        )
            .then((respose) => respose.json())
            .then((respose) => {
                // With the data from the respones fill the elements. u could also store it
                setDataForElements(respose);
                // Stop loading
                setIsLoading(false);
            });
    };

    // Function to set the data for Paired wines and Product Matches
    const setDataForElements = (data) => {
        console.log(data);
        //If search fails or no good match
        if (data.status === "failure") {
            setPairedWines({
                winesArr: [
                    `Not good pair found for ${foodText} Please enter a different food`,
                ],
                pairText: "",
            });

            setProductMatches([noMatchObj]);
        } else {
            // No failure but no product matches
            if (data.productMatches.length === 0) {
                setPairedWines({
                    winesArr: data.pairedWines,
                    pairText: data.pairingText,
                });
                setProductMatches([
                    {
                        title: "Adjust the price",
                        img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                    },
                ]);
            } else {
                setPairedWines({
                    winesArr: data.pairedWines,
                    pairText: data.pairingText,
                });
                setProductMatches(data.productMatches);
            }
        }
    };

    // Variable to display the elements on screen. Build the elements with the data collected
    const displayResults = (
        <div className="overall-search-result-wrapper">
            {initialPage ? (
                "Welcome :)"
            ) : (
                <div>
                    <ResultsBox
                        wineInfo={pairedWines}
                        searchQuery={searchQuery}
                    />
                    <RecomendationsBox matches={productMatches} />
                </div>
            )}
        </div>
    );

    return (
        <div className="overall-wrapper">
            <form className="search-bar-container" onSubmit={handleFetch}>
                <input
                    id="food"
                    name="food"
                    type="text"
                    onChange={(event) => setFoodText(event.target.value)}
                    value={foodText}
                    placeholder={"Example: Salmon, Steak, Apple"}
                    autoComplete="off"
                />

                <div className="btn-container">
                    <button
                        disabled={isLoading}
                        className="btn cta-btn"
                        type="submit"
                    >
                        Search
                    </button>
                    <button className="btn more-btn">More Examples</button>
                </div>
            </form>

            <div className="slider">
                <p>{`Recomendation Max Price $${maxPrice}`}</p>
                {/* handleChange prop calls a function that updates the state of max price with the value passed from the child */}
                <SliderEl
                    handleChange={(e) => {
                        setMaxPrice(e.target.value);
                    }}
                />
            </div>

            <div className="search-results-container">
                {isLoading ? "LOADING" : displayResults}
            </div>
        </div>
    );
}
