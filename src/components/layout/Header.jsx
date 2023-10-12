import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  LinkBox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  // Text,
} from '@chakra-ui/react';

import { logout } from '@/features/auth/authSlice';

const LINK = [
  { route: '/questions', content: 'Home' },
  { route: '/leaderboard', content: 'Leaderboard' },
  { route: '/add', content: 'New' },
];

const Header = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={4} display="flex">
            {LINK.map((link) => (
              <LinkBox
                key={link.content}
                as={Link}
                to={link.route}
                px={2}
                py={1}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  bg: 'gray.200',
                }}
              >
                {link.content}
              </LinkBox>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
              alignItems="center"
              justifyContent="center"
            >
              <Flex alignItems="center" gap={3}>
                {userInfo.name}
                <Avatar size="md" src={userInfo.avatarURL} />
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
