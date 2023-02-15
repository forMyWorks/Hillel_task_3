import { useSearchParams } from "react-router-dom";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const tabsLanguage = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
const lowerTabsLanguage = tabsLanguage.map((item) => {
  return item.toLocaleLowerCase();
});
export default () => {
  let [searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(event) {
    event.preventDefault();
    setSearchParams({ tab: event.target.textContent.toLowerCase() });
  }

  const active =
    lowerTabsLanguage.indexOf(searchParams.get("tab")) !== -1
      ? lowerTabsLanguage.indexOf(searchParams.get("tab"))
      : null;
  //
  //
  return (
    <Tabs defaultIndex={active || 0}>
      <TabList>
        {tabsLanguage.map((item, index) => {
          return (
            <Tab key={index} onClick={handleSubmit}>
              {item}
            </Tab>
          );
        })}
      </TabList>

      {tabsLanguage.map((item, index) => {
        return (
          <TabPanel key={index}>
            <h2>{item} content</h2>
          </TabPanel>
        );
      })}
    </Tabs>
  );
};
