// src/components/scroll-to-top/index.test.tsx
import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ScrollToTop } from './index';

const TestComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/new-page');
    }, [navigate]);

    return null;
};

describe('ScrollToTop', () => {
    it('scrolls to top on route change', () => {
        window.scrollTo = jest.fn();

        render(
            <MemoryRouter initialEntries={['/initial']}>
                <ScrollToTop />
                <Routes>
                    <Route path="/initial" element={<TestComponent />} />
                    <Route path="/new-page" element={<div>New Page</div>} />
                </Routes>
            </MemoryRouter>,
        );

        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
});
