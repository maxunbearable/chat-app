import { useState, FC } from 'react';
import axios, { AxiosError } from 'axios';
import { User, AuthResponse, ApiError } from '../../models';
import { Button, ButtonVariant } from '../Button';
import styles from './Login.module.scss';

interface LoginProps {
  onLogin: (token: string, user: User) => void;
}

const Login: FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.post<AuthResponse>('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      
      const { token, user } = response.data;
      onLogin(token, user);
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      setError(error.response?.data?.message ?? 'Error logging in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Login</h2>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password:</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            variant={ButtonVariant.Primary}
            isLoading={isLoading}
            className={styles.submitButton}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login; 