import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../pages/DataContext';

// 로그인이 필요한 페이지를 보호하는 컴포넌트
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAppContext();

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 로그인한 경우 요청된 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute; 