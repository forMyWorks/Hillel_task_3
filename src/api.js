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
