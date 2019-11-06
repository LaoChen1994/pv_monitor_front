import Axios from 'axios';
import {
  TGetPlotCurve,
  GetMoDataNumber,
  TGetTableInfo,
  TGetToken,
  TGetCurvesQuantity,
  TGetCurvesAdvanced,
  TGetSampleCurve
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

// @ts-ignore
export const getAdvanceRes: TGetCurvesAdvanced = async (
  temp_low,
  temp_upper,
  irr_low,
  irr_upper,
  fault_type,
  data_type
) => {
  let param = new URLSearchParams();
  param.append('temp_low', temp_low.toString());
  param.append('temp_upper', temp_upper.toString());
  param.append('irr_low', irr_low.toString());
  param.append('irr_upper', irr_upper.toString());
  param.append('fault_type', fault_type.toString());
  param.append('data_type', data_type.toString());

  return Axios({
    method: 'post',
    url: `${HOST}/advanced_serach/`,
    data: param
  });
};

export const getDownsampleCurve: TGetSampleCurve = async (
  pk: number,
  num: number
) => {
  const { data } = await getToken();
  const { token: csrfmiddlewaretoken } = data;
  return Axios.get(`${HOST}/down_sample/`, {
    params: {
      pk,
      num,
      csrfmiddlewaretoken
    }
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
