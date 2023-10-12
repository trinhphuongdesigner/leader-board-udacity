import React from 'react';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Flex,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { sortUser } from '@/helper';

const Leaderboard = () => {
  const { userList } = useSelector((state) => state.users);

  const leaderboardList = sortUser(userList);

  return (
    <TableContainer width="70%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Users</Th>
            <Th>Answered</Th>
            <Th>Created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {leaderboardList.map((item) => (
            <Tr key={item.id}>
              <Td>
                <Flex alignItems="center" gap="4">
                  <Avatar size="sm" src={item.avatarURL} />
                  <Stack>
                    <Text as="b">{item.name}</Text>
                    <Text>{item.id}</Text>
                  </Stack>
                </Flex>
              </Td>
              <Td>{item.numOfAnswered}</Td>
              <Td>{item.numOfQuestions}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
