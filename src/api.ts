import Axios from 'axios';
import { TGetPlotCurve, GetMoDataNumber, TGetTableInfo } from './interface';
import { filterParamInObj } from './utils';

const HOST = 'http://127.0.0.1:8000/iv';

// const getPlotCurve = async function()

export const getPlotCurve: TGetPlotCurve = async num =>
  Axios.get(`${HOST}/curve_search`, {
    params: {
      num,
      csrfmiddlewaretoken:
        '41dM9FXicUIxwYmAigEMxdtmoSACYDo0Co7W2pEvIVI7Cmp4RvbKAA3Sk8WpVBCk'
    }
  });

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
