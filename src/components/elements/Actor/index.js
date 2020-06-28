import React from "react";
import { IMAGE_BASE_URL } from "../../../config";

const Actor = (prosp) => {
  const POSTER_SIZE = "w154";

  return (
    <div className="rmdb-actor">
      <img
        src={
          props.movie.profile_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.movie.profile_path}`
            : "./images/no_image.jpg"
        }
        alt="actorthumb"
      />
      <span className="rmdb-actor-name">{props.actor.name}</span>
      <span className="rmdb-actor-character">{props.actor.character}</span>
    </div>
  );
};

export default Actor;
