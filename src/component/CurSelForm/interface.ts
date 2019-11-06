import { IMyCurSelFormParam } from '../../interface';

export interface ICurSelForm {
  curveId?: number;
  updateCurveById?: (curveId: number) => void;
  updateCurveByAdvanced?: (formData: IMyCurSelFormParam) => void;
  maxQuantity: number;
}
