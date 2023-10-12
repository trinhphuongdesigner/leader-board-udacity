import React from 'react';
import {
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import QuestionShow from './QuestionShow';
import { useQuestion } from './useQuestion';

const QuestionList = () => {
  const { loading, questionFilteredByStatus } = useQuestion();

  return loading ? (
    <Spinner />
  ) : (
    <Tabs isFitted defaultIndex={0}>
      <TabList>
        <Tab>New Questions</Tab>
        <Tab>Done</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <QuestionShow
            status="New Questions"
            questions={questionFilteredByStatus.unAnswered}
          />
        </TabPanel>
        <TabPanel>
          <QuestionShow
            status="Done"
            questions={questionFilteredByStatus.answered}
          />
        </TabPanel>
      </TabPanels>
      <Stack gap={8} paddingTop={8} />
    </Tabs>
  );
};

export default QuestionList;
