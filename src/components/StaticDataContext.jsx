import React, { createContext, useContext } from 'react';
import { CLASSES, RAIDS } from './constants';

const StaticDataContext = createContext();

export const StaticDataProvider = ({ children }) => {
    // Since we're importing constants directly, we don't need useState or useEffect anymore
    const data = {
        classes: CLASSES,
        raids: RAIDS
    };

    return (
        <StaticDataContext.Provider value={data}>
            {children}
        </StaticDataContext.Provider>
    );
};

export const useStaticData = () => useContext(StaticDataContext);
