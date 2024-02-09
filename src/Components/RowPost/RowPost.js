import React, { useEffect, useState } from "react";
import "./RowPost.css";
import { imageUrl, API_KEY } from "../../Constants/constants";
import Youtube from "react-youtube";
import axios from "../../axios";

function RowPost(props) {
  const [movieRow, setMovieRow] = useState([]);
  const [urlId, setUrlId] = useState("");
  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        console.log(response.data);
        setMovieRow(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovieTrailer = (id) => {
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          console.log(response.data.results[0]);
          setUrlId(response.data.results[0]);
        } else {
          console.log("Array empty");
          setUrlId("");
        }
      })
      .catch((error) => {
        console.log("Error fetching movie videos:", error);
        setUrlId("");
      });
  };
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movieRow.map((obj) => (
          <img
            onClick={() => handleMovieTrailer(obj.id)}
            className={props.isSmall ? "smallPoster" : "poster"}
            alt="poster"
            src={`${obj && imageUrl + obj.backdrop_path}`}
          />
        ))}
      </div>
      {urlId ? (
        <div>
          <button
            style={{
              float: "right",
              background: "red", // Background color
              color: "white", // Text color
              border: "none", // Remove border
              borderRadius: "5px", // Rounded corners
              padding: "8px 16px", // Padding
              cursor: "pointer",
            }}
            onClick={() => setUrlId("")}
          >
            Close Trailer
          </button>
          <Youtube opts={opts} videoId={urlId.key} />
        </div>
      ) : null}
    </div>
  );
}

export default RowPost;
