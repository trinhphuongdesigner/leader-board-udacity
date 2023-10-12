import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Heading, Select, Skeleton, Stack } from '@chakra-ui/react';
import { fetchAllUsers } from '@/features/user/usersSlice';
import { login } from './authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { userList, loading } = useSelector((state) => {
    return state.users;
  });
  const [userLogin, setUserLogin] = useState('');

  const userInfo = Object.values(userList).find(
    (item) => item.id === userLogin
  );

  const handleLogin = () => {
    if (userInfo) {
      dispatch(login(userInfo));
    }
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <Stack align="center" justify="center" width="100%" height="100%" gap={8}>
      <Heading as="h3">Login</Heading>

      <Stack gap={4}>
        <Skeleton
          startColor="teal.100"
          endColor="teal.500"
          height="40px"
          width="200px"
          isLoaded={!loading}
        >
          <Select
            placeholder="Select user"
            data-testid="select-input"
            value={userLogin}
            onChange={(e) => {
              setUserLogin(e.target.value);
            }}
          >
            {userList &&
              Object.values(userList).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Select>
        </Skeleton>

        <Button
          colorScheme="teal"
          variant="solid"
          isLoading={loading}
          isDisabled={!userInfo}
          loadingText="Waiting"
          onClick={() => handleLogin()}
          data-testid="submit-button"
        >
          Login
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
