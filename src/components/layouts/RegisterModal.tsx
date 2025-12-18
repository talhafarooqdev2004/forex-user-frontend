'use client';

import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './RegisterModal.module.scss';
import { useTranslations } from 'next-intl';
import { FaFacebookF, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import AppleIcon from '../icons/AppleIcon';
import { axiosInstance } from '@/lib/config';

interface RegisterModalProps {
  show: boolean;
  onHide: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal = ({ show, onHide, onSwitchToLogin }: RegisterModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const t = useTranslations('auth');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!isFormValid) {
      return;
    }
    try {
      const response = await axiosInstance.post('/users/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        gender: formData.gender,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      console.log('Registration successful:', response.data);
      alert('Registration successful!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        password: '',
        confirmPassword: '',
        referralCode: '',
      });
      onHide();
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:5000/api/v1/users/auth/google';
  };

  const isFormValid = formData.firstName && formData.lastName &&
    formData.email && formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const passwordsMatch = formData.password === formData.confirmPassword;

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
          {t('signupTitle')}
        </h2>

        <p className={styles.modalSubtitle}>
          {t('signupSubtitle')}
        </p>

        <Form>
          <div className={styles.formRow}>
            <Form.Group className={styles.formGroupHalf}>
              <Form.Control
                value={formData.firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('firstName', e.target.value)}
                placeholder={t('firstName')}
                className={styles.formInput}
              />
            </Form.Group>

            <Form.Group className={styles.formGroupHalf}>
              <Form.Control
                value={formData.lastName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('lastName', e.target.value)}
                placeholder={t('lastName')}
                className={styles.formInput}
              />
            </Form.Group>
          </div>

          <div className={styles.formRow}>
            <Form.Group className={styles.formGroupHalf}>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                placeholder={t('email')}
                className={styles.formInput}
              />
            </Form.Group>

            <Form.Group className={styles.formGroupHalf}>
              <Form.Select
                value={formData.gender}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange('gender', e.target.value)}
                className={styles.formSelect}
              >
                <option value="">{t('genderOptions.placeholder')}</option>
                <option value="male">{t('genderOptions.male')}</option>
                <option value="female">{t('genderOptions.female')}</option>
                <option value="other">{t('genderOptions.other')}</option>
              </Form.Select>
            </Form.Group>
          </div>

          <Form.Group className={styles.formGroup}>
            <div className={styles.passwordInputGroup}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
                placeholder={t('password')}
                className={styles.formInput}
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

          <Form.Group className={styles.formGroup}>
            <div className={styles.passwordInputGroup}>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('confirmPassword', e.target.value)}
                placeholder={t('confirmPassword')}
                className={`${styles.formInput} ${!passwordsMatch && formData.confirmPassword ? styles.error : ''}`}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={t(showConfirmPassword ? 'hidePassword' : 'showPassword')}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {!passwordsMatch && formData.confirmPassword && (
              <div className={styles.errorText}>
                {t('passwordsDoNotMatch')}
              </div>
            )}
          </Form.Group>
          <Button
            className={styles.registerButton}
            onClick={handleRegister}
            disabled={!isFormValid}
          >
            {t('signup')}
          </Button>

          <div className={styles.loginLink}>
            {t('hasAccount')}{' '}
            <a href="#" onClick={onSwitchToLogin}>
              {t('loginLink')}
            </a>
          </div>

          <div className={styles.dividerContainer}>
            <div className={styles.dividerLine}></div>
            <span className={styles.dividerText}>{t('orLoginWith')}</span>
            <div className={styles.dividerLine}></div>
          </div>

          <div className={styles.socialButtons}>
            <button className={`${styles.socialButton} ${styles.facebook}`}>
              <FaFacebookF style={{ background: '#1877F2', color: 'white', borderRadius: '50%', padding: '5px', fontSize: '24px' }} />
            </button>

            <button type="button" className={`${styles.socialButton} ${styles.google}`} onClick={handleGoogleSignUp}>
              <FcGoogle />
            </button>

            <button className={`${styles.socialButton} ${styles.apple}`}>
              <AppleIcon />
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default RegisterModal;