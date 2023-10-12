import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!userInfo.id) {
      navigate({
        pathname: 'login',
        search: `?${createSearchParams({ redirectUrl: pathname })}`,
      });
    }
  }, [navigate, pathname, userInfo.id]);

  if (userInfo.id) return children;
}

export default ProtectedRoute;
