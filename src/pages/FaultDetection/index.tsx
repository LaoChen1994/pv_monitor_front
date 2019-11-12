import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../store/AppContext';

interface Props {}

export const FaultDetection: React.FC<Props> = () => {
  const { handleNavChange } = useAppContext();

  useEffect(() => {
    handleNavChange && handleNavChange(3)();
  }, []);

  return <div>Fault Detection</div>;
};
