import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

function PublicRoute({ children }) {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (userInfo.id) {
      const redirectUrl = searchParams.get('redirectUrl');
      navigate(redirectUrl || '/questions');
    }
  }, [userInfo.id, navigate, searchParams]);

  if (!userInfo.id) return children;
}

export default PublicRoute;
