import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Input } from '../input';
import Button from '../button';
import FooterIMG from '../../components/svg/website-images/footer-bg.png';
import { footerContent } from './footer';
import { ImperatusLink } from '../imperatus-link';

interface FormData {
    email: string;
}

export const Footer = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
    });

    const [errors, setErrors] = useState({
        email: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear previous errors on input change
    };

    const validateForm = () => {
        const newErrors = { ...errors };
        let valid = true;

        if (!formData.email) {
            newErrors.email = 'Email address is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle form submission (currently logging the email)
            console.log('Email submitted:', formData.email);
            // You can add further handling like sending data to server, etc.
            // Reset form after submission if needed:
            // setFormData({ email: '' });
        }
    };

    return (
        <FooterContainer>
            <ImageContainer img={FooterIMG}>
                <FooterWrapper>
                    <SignUpSection>
                        <ImperatusLink />
                        <SignUpText>
                            Sign up for our information about our <br /> latest
                            deals and product releases!
                        </SignUpText>
                        <SignUpForm onSubmit={handleSubmit}>
                            <Input
                                name="email"
                                value={formData.email}
                                variant="primary"
                                type="email"
                                placeholder="Enter your email"
                                onChange={handleInputChange}
                            />
                            {errors.email && (
                                <StyledParagraph>
                                    {errors.email}
                                </StyledParagraph>
                            )}
                            <Button
                                variant="primary"
                                size="xsmall"
                                label="SIGN UP"
                                type="submit"
                            />
                        </SignUpForm>
                    </SignUpSection>
                    <FooterSections>
                        {footerContent.map((section, index) => (
                            <FooterSection key={index}>
                                {section.sectionTitle && (
                                    <SectionTitle>
                                        {section.sectionTitle}
                                    </SectionTitle>
                                )}
                                <FooterContent>
                                    {section.items.map((item, subIndex) => (
                                        <ContentItem key={subIndex}>
                                            {item.type === 'text' &&
                                                (Array.isArray(item.content) ? (
                                                    item.content.map(
                                                        (line, lineIndex) => (
                                                            <p key={lineIndex}>
                                                                {line}
                                                            </p>
                                                        ),
                                                    )
                                                ) : (
                                                    <>
                                                        <FooterLink
                                                            to={`/${item.content
                                                                .replace(
                                                                    / /g,
                                                                    '-',
                                                                )
                                                                .toLowerCase()}`}
                                                        >
                                                            {item.content}
                                                        </FooterLink>
                                                    </>
                                                ))}
                                        </ContentItem>
                                    ))}
                                </FooterContent>
                            </FooterSection>
                        ))}
                    </FooterSections>
                </FooterWrapper>
            </ImageContainer>
        </FooterContainer>
    );
};

const FooterLink = styled(Link)`
    color: white;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Cinzel, serif;
`;

const ImageContainer = styled.div<{ img: any }>`
    position: relative;
    width: 100%;
    height: 509px;
    background-image: ${({ img }) => `url(${img})`};
    background-repeat: no-repeat;
    background-size: cover;
    filter: brightness(90%);
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SignUpSection = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    color: white;
    padding-bottom: 2rem;
`;

const SignUpText = styled.p`
    font-family: Barlow;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    text-align: left;
`;

const SignUpForm = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #d4b05f;
    background: #130a30;
    padding: 0.25rem;
`;

const StyledParagraph = styled.p`
    color: red;
`;

const FooterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    padding: 3rem 1rem;
`;

const FooterSections = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FooterSection = styled.section`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
    color: #d4b05f;
    font-family: Cinzel;
    font-size: 24px;
    font-weight: 400;
    line-height: 28px;
`;

const FooterContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const ContentItem = styled.div`
    color: white;
    margin-bottom: 0.5rem;
    p {
        font-size: 1.2rem;
        padding: 0.25rem;
    }
`;
