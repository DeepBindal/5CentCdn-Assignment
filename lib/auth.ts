export interface User {
  id: string;
  email: string;
  name: string;
}

export const login = async (email: string, password: string): Promise<User> => {
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user: User = {
    id: '1',
    email,
    name: email.split('@')[0],
  };

  // Store token and user data only on the client side
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('user', JSON.stringify(user));
  }

  return user;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const getUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return !!localStorage.getItem('token');
};
