// src/pages/verification-success.js
import React from 'react';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { FancyContainer } from '../../components/fancy-container';

export const VerificationSuccess = () => {
    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Verification Success" />
            <FancyContainer variant="login" size="login">
                <div>
                    <h1>Email Verification Successful</h1>
                    <p>
                        Your email has been successfully verified. You can now
                        log in.
                    </p>
                </div>
            </FancyContainer>
        </>
    );
};
