import React, { useEffect, useState, useRef } from 'react';
import {
  IModelingForm,
  IOptions,
  ISelectionOpt,
  IDataTypeOpt,
  ICommonForm
} from '../../interface';
import styles from './style.module.scss';
import { getModeOptions } from '../../api';
import { MyInput, IInputRef } from '../../component/FormComponent/MyInput';
import {
  MySelect,
  ISelectData,
  IRefObj
} from '../../component/FormComponent//MySelect';
import { Button } from 'zent';

interface Props extends ICommonForm<IModelingForm> {
  initFormValue?: IModelingForm;
  getCurveNum?: () => void;
  getModelData?: () => void;
  clearTopChart?: () => void;
}

export const ModelForm: React.FC<Props> = props => {
  const { getFormValue, setFormValue, getModelData, clearTopChart } = props;
  const [modelSelection, setModelSelection] = useState<ISelectData>([]);
  const [dataTyeOptions, setDataTypeOptions] = useState<ISelectData>([]);
  const cRef1 = useRef({} as IRefObj);
  const cRef2 = useRef({} as IRefObj);
  const cRef3 = useRef({} as IInputRef);

  const clearForm = () => {
    const { clearSelct: c1 } = cRef1.current;
    const { clearSelct: c2 } = cRef2.current;
    const { clearInput: c3 } = cRef3.current;
    c1();
    c2();
    c3();
    clearTopChart && clearTopChart();
  };

  useEffect(() => {
    const getOptions = async () => {
      const { data } = await getModeOptions();
      const { selectionOpions, dataTypeOptions } = data;
      const selectData = selectionOpions.reduce<ISelectData>((prev, _curr) => {
        const curr = _curr as IOptions<ISelectionOpt>;
        const { fields } = curr;
        prev.push({ value: fields.modelType, text: fields.modelName });
        return prev;
      }, []);
      const dataTypeData = dataTypeOptions.reduce<ISelectData>(
        (prev, _curr) => {
          const curr = _curr as IOptions<IDataTypeOpt>;
          const { fields } = curr;
          const { dataType } = fields;
          dataType && prev.push({ value: dataType, text: dataType });

          return prev;
        },
        []
      );

      setModelSelection(selectData);
      setDataTypeOptions(dataTypeData);
    };

    getOptions();
  }, []);

  const getModelRes = () => {
    getModelData && getModelData();
  };

  return (
    <div className={styles.wrapper}>
      <MySelect
        label="模型类别"
        data={modelSelection}
        //@ts-ignore
        _onChange={setFormValue}
        name="modelSelection"
        placeholder="请选择训练模型"
        margin="10px 0"
        cRef={cRef1}
        width="200px"
      ></MySelect>

      <MySelect
        label="组件材质"
        name="modulesSelection"
        data={dataTyeOptions}
        // @ts-ignore
        _onChange={setFormValue}
        placeholder="请选择组件的材质"
        cRef={cRef2}
        width="200px"
      ></MySelect>

      <MyInput
        name="curveID"
        // @ts-ignore
        _onChange={setFormValue}
        label="曲线序号"
        cRef={cRef3}
        margin="10px 0"
        hasColon={true}
        width="200px"
        placeholder="请输入曲线编号"
        type="number"
        min={0}
        caption={`该模型数据库中曲线数据为${getFormValue('curveQuantity')}`}
      ></MyInput>
      <div className={styles.control}>
        <Button type="primary" icon="link" onClick={getModelRes}>
          建模
        </Button>
        <Button type="primary" outline icon="remove-o" onClick={clearForm}>
          清空
        </Button>
      </div>
    </div>
  );
};
