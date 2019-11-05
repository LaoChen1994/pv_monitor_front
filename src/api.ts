import Axios from 'axios';
import {
  TGetPlotCurve,
  GetMoDataNumber,
  TGetTableInfo,
  TGetToken,
  TGetCurvesQuantity
} from './interface';
import { filterParamInObj } from './utils';

const HOST = 'http://127.0.0.1:8000/iv';
Axios.defaults.headers.post['Content-Type'] =
  'application/x-www-fromurlencodeed';

Axios.defaults.headers.get['Content-Type'] = 'application/json';

export const getPlotCurve: TGetPlotCurve = async num => {
  const token = await getToken();
  const { token: csrfmiddlewaretoken } = token.data;

  return Axios.get(`${HOST}/curve_search`, {
    params: {
      num,
      csrfmiddlewaretoken
    }
  });
};

export const getCurveQuantity: TGetCurvesQuantity = async () => {
  const token = await getToken();
  const { token: csrfmiddlewaretoken } = token.data;

  return Axios.get(`${HOST}/query_fault_number`, {
    params: { csrfmiddlewaretoken }
  });
};

export const getModuleDataNumber: GetMoDataNumber = async (module: string) =>
  Axios.get(`${HOST}/query_modules_data_quantity`, {
    params: {
      module
    }
  });

export const getSearchTableData: TGetTableInfo = async (
  start,
  end,
  low,
  high,
  mode
) => {
  const params = filterParamInObj({ start, end, low, high, mode });

  return Axios.get(`${HOST}/info_search`, { params });
};

export const getToken: TGetToken = async () => Axios.get(`${HOST}/getToken/`);
