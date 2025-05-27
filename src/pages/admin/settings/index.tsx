import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useApplicationSettings } from '../../../context/settings';

export const Settings = () => {
    const { settings, updateSettings, loading } = useApplicationSettings();
    const [comingSoon, setComingSoon] = useState(false);
    const [maintenance, setMaintenance] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (settings) {
            setComingSoon(settings.comingSoon);
            setMaintenance(settings.maintenance);
        }
    }, [settings]);

    const handleChange = async (field: 'comingSoon' | 'maintenance') => {
        try {
            setError('');
            setSuccess('');

            const newState =
                field === 'comingSoon'
                    ? { comingSoon: !comingSoon, maintenance: false }
                    : { maintenance: !maintenance, comingSoon: false };

            await updateSettings(newState);
            setComingSoon(newState.comingSoon);
            setMaintenance(newState.maintenance);
            setSuccess('Settings updated successfully!');
        } catch {
            setError('Failed to update settings.');
        }
    };

    if (loading || settings === null) return null;

    return (
        <SettingsContainer>
            <FormTitle>Application Settings</FormTitle>
            <SettingsWrapper>
                <SettingsDetails>
                    <FormGroup>
                        <CheckboxContainer>
                            <input
                                type="checkbox"
                                id="comingSoon"
                                checked={comingSoon}
                                onChange={() => handleChange('comingSoon')}
                            />
                            <Label htmlFor="comingSoon">Coming Soon Mode</Label>
                        </CheckboxContainer>
                    </FormGroup>

                    <FormGroup>
                        <CheckboxContainer>
                            <input
                                type="checkbox"
                                id="maintenance"
                                checked={maintenance}
                                onChange={() => handleChange('maintenance')}
                            />
                            <Label htmlFor="maintenance">
                                Maintenance Mode
                            </Label>
                        </CheckboxContainer>
                    </FormGroup>

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <SuccessMessage>{success}</SuccessMessage>}
                </SettingsDetails>
            </SettingsWrapper>
        </SettingsContainer>
    );
};

const SettingsContainer = styled.div`
    color: white;
    width: 100%;
`;

const SettingsWrapper = styled.div`
    border: 1px solid #ac8fff;
    border-radius: 4px;
    background-color: #160d35;
    padding: 1.5rem;
    display: flex;
`;

const SettingsDetails = styled.div`
    font-family: Barlow;
    font-size: 16px;
    color: white;
`;

const FormTitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 24px;
    margin-bottom: 1rem;
    color: white;
`;

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

const Label = styled.label`
    font-family: Barlow, sans-serif;
    font-size: 14px;
`;

const ErrorMessage = styled.p`
    color: #e74c3c;
    font-size: 16px;
    font-family: Barlow;
`;

const SuccessMessage = styled.p`
    color: green;
    font-size: 16px;
    font-family: Barlow;
`;
