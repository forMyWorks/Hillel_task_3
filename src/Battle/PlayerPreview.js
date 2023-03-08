import { useState } from "react";

const PlayerPreview = ({
  avatar,
  setShowPlayerPreview,
  setBattleReady,
  battleReady,
  index,
  winner,
  profile,
  scope,
}) => {
  const [reset, setReser] = useState(false);

  return (
    <>
      {reset ? null : (
        <div className="column">
          <h2>{winner}</h2>
          <img
            className="avatar"
            src={`https://github.com/${avatar}.png?size=200`}
            alt="Avatar"
          />
          <h2>{avatar}</h2>
          {!winner ? (
            <button
              className="button"
              onClick={() => {
                setReser(true);
                setShowPlayerPreview(false);
                setBattleReady([
                  ...battleReady.slice(0, index),
                  false,
                  ...battleReady.slice(index, -1),
                ]);
              }}
            >
              Reset
            </button>
          ) : (
            <ul>
              {profile.name ? (
                <li className="winner" key={profile.name}>
                  Name: {profile.name}
                </li>
              ) : null}
              {profile.location ? (
                <li className="winner" key={profile.location}>
                  Location: {profile.location}
                </li>
              ) : null}
              {profile.company ? (
                <li className="winner" key={profile.company}>
                  Company: {profile.company}
                </li>
              ) : null}
              {profile.followers ? (
                <li className="winner" key={profile.followers}>
                  Followers: {profile.followers}
                </li>
              ) : null}
              {profile.following ? (
                <li className="winner" key={profile.following}>
                  Following: {profile.following}
                </li>
              ) : null}
              {profile.public_repos ? (
                <li className="winner" key={profile.public_repos}>
                  Public Repos: {profile.public_repos}
                </li>
              ) : null}
              {profile.blog ? (
                <li className="winner" key={profile.blog}>
                  Blog: {profile.blog}
                </li>
              ) : null}
              <li className="winner" key={profile.id}>
                Scores: {scope}
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default PlayerPreview;
