import { useState, FC } from 'react';
import axios, { AxiosError } from 'axios';
import { User, AuthResponse, ApiError } from '../../models';
import { Button, ButtonVariant } from '../Button';
import styles from './Signup.module.scss';

interface SignupProps {
  onSignup: (token: string, user: User) => void;
}

const Signup: FC<SignupProps> = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.post<AuthResponse>('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password
      });
      
      const { token, user } = response.data;
      onSignup(token, user);
    } catch (err) {
      const error = err as AxiosError<ApiError>;
      setError(error.response?.data?.message ?? 'Error signing up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Sign Up</h2>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username:</label>
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup; 