import React, { useEffect, useState } from "react";
import diceIcon from "./assets/images/icon-dice.svg";
import deskPatterIcon from "./assets/images/pattern-divider-desktop.svg";
import mobPatterIcon from "./assets/images/pattern-divider-mobile.svg";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [advice, setAdvice] = useState();

    const fetchAdvice = async () => {
        try {
            setIsError(false);
            setIsLoading(true);

            const res = await fetch("https://api.adviceslip.com/advice");

            const data = await res.json();
            setAdvice(data.slip);
        } catch (error) {
            console.log(error);
            setIsError(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAdvice();
    }, []);
    console.log(advice, isError, isLoading);
    return (
        <>
            <div className="container">
                {isError && <p className="error">Something went wrong!</p>}
                {isLoading && <p className="loading">Loading...</p>}
                {!isLoading && !isError && advice && (
                    <>
                        <h3 className="title">Advice #{advice?.id}</h3>
                        <blockquote className="quote">{advice?.advice}</blockquote>
                        <div className="separator">
                            <div className="pattern-icon">
                                <img src={mobPatterIcon} alt="pattern devider" />
                            </div>
                        </div>
                        <div onClick={fetchAdvice} className="dice">
                            <img src={diceIcon} alt="dice" />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default App;
