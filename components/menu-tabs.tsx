import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import FoldersList from "./folders-list";
import TagsList from "./tags-list";

export default function MenuTabs() {
  return (
    <Tabs className="w-full grow">
      <TabList className="grid h-12 w-full grid-cols-[1fr_1fr] border-b-thin border-dark-4 text-center dark:border-light-4">
        <Tab
          className="flex w-full items-center justify-center"
          selectedClassName="rounded-tr-lg dark:bg-dark-2 bg-light-3 border-t-thin border-r-thin border-dark-4 dark:border-light-4"
        >
          Folders
        </Tab>
        <Tab
          className="flex w-full items-center justify-center"
          selectedClassName="rounded-tl-lg dark:bg-dark-2 bg-light-3 border-t-thin border-l-thin border-dark-4 dark:border-light-4"
        >
          Tags
        </Tab>
      </TabList>

      <TabPanel>
        <FoldersList />
      </TabPanel>
      <TabPanel>
        <TagsList />
      </TabPanel>
    </Tabs>
  );
}
