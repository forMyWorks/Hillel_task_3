import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { fetchPopularRepos } from "./api";
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
  }, [searchParams]);

  useEffect(() => {
    // if (reposFilter) {
    //   setReposFilter(reposFilter.replace(/\W|\d/g, ""));
    // }
    searchEmp(reposFilter, repos);
    // {
    // console.log(reposFilter);
    // }
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
    if (searchStr.length === 0) {
      setReposCopy(repos);
      return;
    }

    setReposCopy(
      dataFilter.filter(
        (item) => item.name.toLowerCase().indexOf(searchStr.toLowerCase()) > -1
      )
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
        <>
          <Search reposFilter={reposFilter} onChangeSearch={setReposFilter} />
          <List repos={reposCopy} />
        </>
      ) : null}
    </>
  );
};
