import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const ShowList = () => {
    const [showsArray, setShows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "https://api.tvmaze.com/search/shows?q=all"
            );
            const data = await response.json();
            setShows(data);
        };

        fetchData();
    }, []);

    const getSummary = (summary) => {
        const regex = /(<([^>]+)>)/gi;
        const result = summary.replace(regex, "");

        // cutting off the summary at 100 characters
        return result.substring(0, 100) + "...";
    };

    function movieCard(movie) {
        return (
            <div
                className="card"
                style={{
                    width: "18rem",
                    height: "100%",
                }}
            >
                <div>
                    {movie.show.image ? (
                        <img
                            src={movie.show.image.medium}
                            className="card-img-top"
                            alt={movie.show.name}
                        />
                    ) : (
                        <img
                            src="https://via.placeholder.com/210x295?text=No+Image"
                            className="card-img-top"
                            alt={movie.show.name}
                        />
                    )}
                </div>

                <div className="card-body">
                    <h5 className="card-title fw-bold">{movie.show.name}</h5>
                    <p className="card-text">
                        <span className="fw-bold">Summary:</span>
                        {getSummary(movie.show.summary)}
                    </p>

                    {/* display language*/}
                    {movie.show.language && (
                        <p className="card-text">
                            <span className="fw-bold">Language:</span>
                            {movie.show.language}
                        </p>
                    )}
                    {/* rating */}
                    {movie.show.rating && (
                        <p className="card-text">
                            <span className="fw-bold">Rating:</span>{" "}
                            {movie.show.rating.average}
                            {/* runtime */}
                        </p>
                    )}
                    {movie.show.runtime && (
                        <p className="card-text">
                            <span className="fw-bold">Runtime:</span>{" "}
                            {movie.show.runtime} minutes
                        </p>
                    )}

                    {/* genres */}
                    <p className="card-text">
                        <span className="fw-bold">Genres:</span>{" "}
                        {movie.show.genres.join(", ")}
                    </p>

                    <Link to={`/summary/${movie.show.id}`}>
                        <button className="btn btn-outline-primary">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-5">
            {/* header */}
            <h1 className="text-center fs-1 fw-bolder my-4">Shows List</h1>
            {/* using map function to iterate over array and display each movie */}
            <div className="row row-cols-2 row-cols-md-4 g-4 px-4 justify-content-center">
                {showsArray.map((show) => (
                    <div key={show.show.id}>{movieCard(show)}</div>
                ))}
            </div>
        </div>
    );
};

export default ShowList;
