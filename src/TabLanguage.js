import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { fetchPopularRepos } from "./api";

const tabsLanguage = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
const lowerTabsLanguage = tabsLanguage.map((item) => {
  return item.toLocaleLowerCase();
});

// eslint-disable-next-line
export default () => {
  const [searchParams, setSearchParams] = useSearchParams({ tab: "all" });
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetchPopularRepos(searchParams.get("tab"))
      .then((data) => setRepos(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [searchParams]);
  //   lowerTabsLanguage.forEach((item) => {
  //     fetchPopularRepos(item)
  //       .then((data) => setRepos([...repos, data]))
  //       .catch((error) => setError(error))
  //       .finally(() => setLoading(false));
  //   }, []);
  // });

  function handleSubmit(event, language) {
    event.preventDefault();
    setSearchParams({ tab: event.target.textContent.toLowerCase() });
  }

  const active =
    lowerTabsLanguage.indexOf(searchParams.get("tab")) !== -1
      ? lowerTabsLanguage.indexOf(searchParams.get("tab"))
      : null;

  return (
    <>
      <Tabs defaultIndex={active || 0}>
        <TabList>
          {tabsLanguage.map((item, index) => {
            return (
              <Tab
                key={index}
                onClick={(event) => {
                  handleSubmit(event, item);
                }}
              >
                {item}
              </Tab>
            );
          })}
        </TabList>

        {tabsLanguage.map((item, index) => (
          <TabPanel key={index}>
            {loading ? <h2>Wait, soon the list of {item}...</h2> : null}
          </TabPanel>
        ))}
      </Tabs>
      {!loading ? (
        <ul className="popular-list">
          {repos.map((repo, index) => {
            return (
              <li key={repo.name} className="popular-item">
                <div className="popular-rank">#{index + 1}</div>
                <ul className="space-list-items">
                  <li>
                    <img
                      className="avatar"
                      src={repo.owner.avatar_url}
                      alt="Avatar"
                    />
                  </li>
                  <li>
                    <a href={repo.html_url} rel="noreferrer" target="_blank">
                      {repo.name}
                    </a>
                  </li>
                  <li>@{repo.owner.login}</li>
                  <li>{repo.stargazers_count}</li>
                </ul>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};
