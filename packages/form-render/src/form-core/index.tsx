import React, { useEffect, useMemo } from 'react';
import { Form, Row, Button } from 'antd';
import { widgets as defaultWidgets } from '../widgets';

import RenderCore from '../render-core';
import extractFormProps from '../utils/extractFormProps';
import { FormContext } from '../utils/context';
import { useStore } from './useForm';

const FR = (props) => {
  const { properties, type, ...otherSchema } = props.schema || {};
  const { formProps, onMount, schema, column, widgets } = extractFormProps({ ...props, ...otherSchema });
  console.log(props, 'formProps------');

  useEffect(() => {
    onMount && onMount();
  }, []);


  const labelCol = { span : 6 };
  // if (schema?.labelWidth) {
  //   labelCol.flex = schema.labelWidth + 'px';
  // } else {
  //   labelCol.span = schema?.labelSpan || 6;
  // }

  const wrapperCol = { span: 18 };

  const context = {
    column: column || schema?.column || 1,
    labelCol,
    wrapperCol,
    readyOnly: true,
    widgets: {
      ...defaultWidgets,
      widgets
    }
  };

  return (
    <FormContext.Provider value={context}>
      <Form
        labelWrap={true} 
        onFinish={(values) => {
          debugger;
          console.log(values);
        }}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        {...formProps}
        initialValues={{
          a: "1",
          b: "2",
          c: "online",
          e: [{
            input_3XWgl7: '1111'
          }]
        }}
      >
        <Row gutter={8}>
          <RenderCore schema={schema} />
        </Row>
        <Row>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Row>
      </Form>
    </FormContext.Provider>
  );
};

export default FR;
