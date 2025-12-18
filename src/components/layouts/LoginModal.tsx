'use client';

import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './LoginModal.module.scss';
import { useTranslations } from 'next-intl';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { axiosInstance, API_ENDPOINTS } from '@/lib/config';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
  show: boolean;
  onHide: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal = ({ show, onHide, onSwitchToRegister }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const t = useTranslations('auth');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      if (response.data.success && response.data.data?.token) {
        await login(response.data.data.token);
        setEmail('');
        setPassword('');
        onHide();
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = API_ENDPOINTS.AUTH.GOOGLE;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop={true}
      dialogClassName={styles.modalDialog}
    >
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={onHide}
        >
          <FaTimes />
        </button>

        <h2 className={styles.modalHeader}>
          {t('loginTitle')}
        </h2>

        <p className={styles.modalSubtitle}>
          {t('loginSubtitle')}.
        </p>

        {error && (
          <div className={styles.errorMessage} style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <Form>
          <Form.Group className={styles.formGroup}>
            <Form.Control
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              className={styles.formInput}
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className={styles.formGroup} style={{ marginBottom: '1rem' }}>
            <div className={styles.passwordInputGroup}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder={t('passwordPlaceholder')}
                className={styles.formInput}
                disabled={isLoading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={t(showPassword ? 'hidePassword' : 'showPassword')}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </Form.Group>

          <div className={styles.checkboxGroup}>
            <Form.Check
              type="checkbox"
              checked={rememberMe}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
              id="rememberMe"
              className={styles.formCheckInput}
            />
            <label htmlFor="rememberMe" className={styles.checkboxLabel}>
              {t('rememberMe')}
            </label>
          </div>

          <Button
            className={styles.loginButton}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? t('loading') || 'Loading...' : t('login')}
          </Button>

          <div className={styles.dividerContainer}>
            <div className={styles.dividerLine}></div>
            <span className={styles.dividerText}>{t('orLoginWith')}</span>
            <div className={styles.dividerLine}></div>
          </div>

          <div className={styles.socialButtons}>
            <button 
              type="button" 
              className={`${styles.socialButton} ${styles.google}`} 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <FcGoogle />
            </button>
          </div>

          <div className={styles.signupLink}>
            {t('noAccount')}{' '}
            <a href="#" onClick={(e) => {
              e.preventDefault();
              onSwitchToRegister();
            }}>
              {t('signupLink')}
            </a>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default LoginModal; 