"use client";

import React, { createContext, useContext, useState } from 'react';

type ModalType = 'login' | 'register' | null;

interface AuthModalContextType {
    modalType: ModalType;
    openModal: (type: 'login' | 'register') => void;
    openLoginModal: () => void;
    openRegisterModal: () => void;
    closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
    const [modalType, setModalType] = useState<ModalType>(null);

    const openModal = (type: 'login' | 'register') => setModalType(type);
    const openLoginModal = () => setModalType('login');
    const openRegisterModal = () => setModalType('register');
    const closeModal = () => setModalType(null);

    return (
        <AuthModalContext.Provider value={{ modalType, openModal, openLoginModal, openRegisterModal, closeModal }}>
            {children}
        </AuthModalContext.Provider>
    );
}

export function useAuthModal() {
    const context = useContext(AuthModalContext);
    if (context === undefined) {
        throw new Error('useAuthModal must be used within an AuthModalProvider');
    }
    return context;
} 