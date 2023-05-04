import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

const ShowSummary = () => {
    const { id } = useParams();
    const [data, setData] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        showName: "",
    });
    const [ticket, setTicket] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, [id]);

    const handleSubmit = (event) => {
        // add show name to formData
        formData.showName = data.name;
        localStorage.setItem("formData", JSON.stringify(formData));
    };

    const getSummary = (summary) => {
        const regex = /(<([^>]+)>)/gi;
        const result = summary.replace(regex, "");

        return result;
    };

    function movieCard(movie) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4 px-1">
                        {movie.image ? (
                            <img
                                src={movie.image.original}
                                className="card-img-top"
                                alt={movie.name}
                            />
                        ) : (
                            <img
                                src="https://via.placeholder.com/210x295?text=No+Image"
                                className="card-img-top"
                                alt={movie.name}
                            />
                        )}
                    </div>
                    <div
                        className="col-6 
                    align-self-center d-flex  flex-column
                    "
                    >
                        <p className="card-text">
                            <span className="fw-bold">Summary:</span>
                            {getSummary(movie.summary)}
                        </p>
                        <p className="card-text">
                            <span className="fw-bold">Language:</span>
                            {movie.language}
                        </p>
                        <p className="card-text">
                            <span className="fw-bold">Genres:</span>
                            {movie.genres.join(", ")}
                        </p>
                        <p className="card-text">
                            <span className="fw-bold">Status:</span>
                            {movie.status}
                        </p>
                        <p className="card-text">
                            <span className="fw-bold">Runtime:</span>
                            {movie.runtime}
                        </p>
                        <p className="card-text">
                            <span className="fw-bold">Premiered:</span>
                            {movie.premiered}
                        </p>
                        <p className="card-text">
                            <span className="fw-bold">Rating:</span>
                            {movie.rating.average}
                        </p>
                        <p className="card-text">
                            <span className="fw-bold">Official Site:</span>
                            <a href={movie.officialSite}>
                                {movie.officialSite}
                            </a>
                        </p>
                        <p className="card-text">
                            <span className="fw-bold">Schedule:</span>
                            {movie.schedule.days.join(", ")} at{" "}
                            {movie.schedule.time}
                        </p>
                        <p className="card-text">
                            <span className="fw-bold">Network:</span>
                            {movie.network.name}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* show details */}
            <h5 className="card-title fw-bold text-center fw-bolder fs-1 mt-2">
                {data.name}
            </h5>
            {data && movieCard(data)}

            {/* button to ask book a movie ticket */}
            {!ticket && (
                <div className="container d-flex justify-content-center m-3">
                    <div className="row">
                        <div className="col">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setTicket(true)}
                            >
                                Book a ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* form */}

            {ticket && (
                <div className="container d-flex justify-content-center m-3 mt-5">
                    <div className="row border border-2 border-dark rounded-1 p-3">
                        <h5 className="card-title fw-bold text-center fs-3 mb-2">
                            Book a ticket
                        </h5>
                        <div className="col">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="showName"
                                        className="form-label"
                                    >
                                        Show Name : {data.name}
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="form-label"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                name: event.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                email: event.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="phone"
                                        className="form-label"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                phone: event.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    onClick={() => {
                                        handleSubmit();

                                        setTicket(false);

                                        setFormData({
                                            name: "",
                                            email: "",
                                            phone: "",
                                        });

                                        alert(
                                            "Your ticket has been booked successfully"
                                        );
                                    }}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowSummary;
