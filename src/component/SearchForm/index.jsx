import React from 'react';
import { Form, Radio, Button } from 'zent';

const { createForm, FormDateRangeQuickPickerField, FormRadioGroupField } = Form;

class SearchForm extends React.Component {
  onSubmit = event => {
    const { zentForm: tool, updateFormValue } = this.props;
    const { getFormValues } = tool;
    updateFormValue(getFormValues());
  };

  onClear = () => {
    const { zentForm } = this.props;
    const { resetFieldsValue } = zentForm;
    resetFieldsValue();
  };

  render() {
    const { dataMode = {}, loading } = this.props;
    const { initialValue = '', radioList = [] } = dataMode;

    return (
      <>
        <Form horizontal>
          <FormDateRangeQuickPickerField
            name="timeRange"
            label="时间区间选择:"
            value={[]}
            dateFormat="YYYY-MM-DD HH:mm:ss"
            required
            validations={{
              required(values, value) {
                return !!value[0] && !!value[1];
              }
            }}
            validationErrors={{
              required: '请输入有效时间'
            }}
          ></FormDateRangeQuickPickerField>
          <FormRadioGroupField
            name="mode"
            label="数据类型"
            value={initialValue}
            required
          >
            {radioList.map((elem, index) => (
              <Radio value={elem.value} key={`radio-${index}`}>
                {elem.name}
              </Radio>
            ))}
          </FormRadioGroupField>
        </Form>
        <Button
          type="primary"
          onClick={this.onSubmit.bind(this)}
          loading={loading}
          icon="search"
          style={{ marginLeft: '20px' }}
        >
          查询
        </Button>
        <Button
          type="danger"
          onClick={this.onClear.bind(this)}
          loading={loading}
          icon="close"
          style={{ marginLeft: '20px' }}
          outline
        >
          清空
        </Button>
      </>
    );
  }
}

const MyForm = createForm()(SearchForm);
export { MyForm };
