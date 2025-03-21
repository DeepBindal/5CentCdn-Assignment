export interface User {
  id: string;
  email: string;
  name: string;
}

export const login = async (email: string, password: string): Promise<User> => {
  // Mock login - in production, this would call your auth API
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = {
    id: '1',
    email,
    name: email.split('@')[0],
  };

  // Store mock JWT token
  localStorage.setItem('token', 'mock-jwt-token');
  localStorage.setItem('user', JSON.stringify(user));

  return user;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};