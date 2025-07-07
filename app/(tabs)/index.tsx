import AdminDashboard from '@/components/AdminDashboard';
import LoginScreen from '@/components/LoginScreen';
import UserDashboard from '@/components/UserDashboard_New';
import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}
