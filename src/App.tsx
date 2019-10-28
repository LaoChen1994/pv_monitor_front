import React, { useEffect, useState } from 'react';
import { getPlotCurve, getModuleDataNumber } from './api';
import { plotData } from './interface';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
  const [curveId, setCurveId] = useState<number>(1);
  const [curveData, setCurveData] = useState<plotData[]>([]);

  useEffect(() => {
    async function getCurveInfo(id: number) {
      const { data: plotData } = await getPlotCurve(id);
      const { temperature, irradiance, plot_data, work_status, pk } = plotData;
      setCurveData(plot_data);
    }
    getCurveInfo(curveId);
  }, [curveId]);

  useEffect(() => {
    async function getNumber(moduleTypes: string) {
      const { data } = await getModuleDataNumber(moduleTypes);
      const { count } = data;
      console.log(count);
    }

    getNumber('xSi11246');
  }, []);

  const addCurveId = () => {
    const id = curveId + 1;
    setCurveId(id);
  };

  return (
    <div className="App">
      <button onClick={addCurveId}>+1</button>
      <ul>
        {curveData.map((elem, index) => (
          <li key={index}>
            {elem[0]} / {elem[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
