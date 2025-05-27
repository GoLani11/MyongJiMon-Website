import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../pages/DataContext';

// 개발 모드 플래그 - 개발 중에는 true로 설정
const DEVELOPMENT_MODE = true;

// 로그인이 필요한 페이지를 보호하는 컴포넌트
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAppContext();

  // 개발 모드일 때는 로그인 체크를 건너뜀
  if (DEVELOPMENT_MODE) {
    return children;
  }

  // 프로덕션 모드에서 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 로그인한 경우 요청된 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute; 