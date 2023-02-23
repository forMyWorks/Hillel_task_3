import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { fetchPopularRepos } from "../api";
import List from "./List";
import Search from "./Search";

const tabsLanguage = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
const lowerTabsLanguage = tabsLanguage.map((item) => {
  return item.toLocaleLowerCase();
});

// eslint-disable-next-line
export default () => {
  const [searchParams, setSearchParams] = useSearchParams({ tab: "all" });
  const [reposFilter, setReposFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [reposCopy, setReposCopy] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPopularRepos(searchParams.get("tab"))
      .then((data) => {
        setRepos(data);
        setReposCopy(data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [searchParams.get("tab")]);

  useEffect(() => {
    searchEmp(reposFilter, repos);
  }, [reposFilter]);

  function handleSubmit(event) {
    event.preventDefault();
    setSearchParams({ tab: event.target.textContent.toLowerCase() });
  }

  const active =
    lowerTabsLanguage.indexOf(searchParams.get("tab")) !== -1
      ? lowerTabsLanguage.indexOf(searchParams.get("tab"))
      : null;

  const searchEmp = (searchStr, dataFilter) => {
    if (searchStr.length <= 1) {
      setReposCopy(repos);
      return;
    }
    setReposCopy(
      dataFilter.filter((item) => {
        return item.name.toLowerCase().indexOf(searchStr) !== -1;
      })
    );
  };

  return (
    <>
      <Tabs defaultIndex={active || 0}>
        <TabList>
          {tabsLanguage.map((item, index) => {
            return (
              <Tab
                key={index}
                onClick={(event) => {
                  handleSubmit(event);
                }}
              >
                {item}
              </Tab>
            );
          })}
        </TabList>

        {tabsLanguage.map((item, index) => (
          <TabPanel key={index}>
            {!loading ? null : <h3>Wait, soon the list of {item}...</h3>}
            {!error ? null : <h3>{error}</h3>}
          </TabPanel>
        ))}
      </Tabs>

      {!loading ? (
        <>
          <Search onChangeSearch={setReposFilter} />
          <List repos={reposCopy} />
        </>
      ) : null}
    </>
  );
};
