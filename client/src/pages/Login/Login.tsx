import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button';
import { FormGroup, FormLabel, FormInput, FormError } from '../../components/Form/Form';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    onLogin(email, password);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Please sign in to continue</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
            />
          </FormGroup>

          {error && <FormError>{error}</FormError>}

          <Button type="submit" className={styles.submitButton}>
            Sign In
          </Button>
        </form>

        <div className={styles.footer}>
          <Link to="/signup" className={styles.link}>
            Don't have an account? Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}; 