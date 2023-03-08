import axios from "axios";

const handleError = (error) => console.error(error);

export const fetchPopularRepos = (language) => {
  const _endpoint = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`;
  //encodeURI
  return axios
    .get(_endpoint)
    .then((response) => response.data.items)
    .catch(handleError);
};

const getProfile = (username) => {
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then((user) => user.data)
    .catch(handleError);
};

const getRepos = (username) => {
  return axios
    .get(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then((user) => user.data)
    .catch(handleError);
};

const getStarCount = (repos) => {
  return repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
};

const calculateScore = (profile, repos) => {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);
  return followers * 3 + totalStars;
};

const getUserData = (username) => {
  return Promise.all([getProfile(username), getRepos(username)])
    .then(([profile, repos]) => ({
      profile,
      scope: calculateScore(profile, repos),
    }))
    .catch(handleError);
};

const sortPlayers = (players) => players.sort((a, b) => b.scope - a.scope);

// export const battle = (players) => {
//   return Promise.all(players.map(getUserData))
//     .then(sortPlayers)
//     .catch(handleError);
// };
export const battle = (players) => {
  return Promise.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError);
};

// battle(["bob", "fd"]);
