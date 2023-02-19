import axios from "axios";

const handleError = (error) => console.error(error);

export const fetchPopularRepos = (language) => {
  const _endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return axios
    .get(_endpoint)
    .then((response) => response.data.items)
    .catch(handleError);
};
