import {
  FieldType,
  IField,
  ITable,
  IView,
  bitable,
} from "@lark-base-open/js-sdk";
import { useEffect, useState } from "react";
import { Select, Form, Descriptions, Badge, DescriptionsProps } from "antd";
interface Option {
  value: string;
  label: string;
}

interface TableSelectProps {
  t: (key: string) => string;
  setTable: (table: ITable) => void;
}

export function TableSelect({ t, setTable }: TableSelectProps) {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tables = await bitable.base.getTableMetaList();
      const tableOptions = tables.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setOptions(tableOptions);
    };
    fetchData();
  }, []);

  const onSelect = async (tableId: string) => {
    const table = await bitable.base.getTableById(tableId);
    setTable(table);
  };

  return (
    <Form.Item
      className="w-full max-w-80"
      label={t("table")}
      name="tableId"
      rules={[{ required: true, message: t("table_required") }]}
    >
      <Select options={options} onSelect={onSelect} />
    </Form.Item>
  );
}

interface ViewSelectProps {
  t: (key: string) => string;
  table: ITable | null;
  setView: (view: IView) => void;
}

export function ViewSelect({ t, table, setView }: ViewSelectProps) {
  const [options, setOptions] = useState<Option[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (table === null) {
        return;
      }
      const views = await table.getViewMetaList();
      const viewOptions = views.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setOptions(viewOptions);
    };
    fetchData();
  }, [table]);
  const onSelect = async (viewId: string) => {
    if (table === null) {
      return;
    }
    const view = await table.getViewById(viewId);
    setView(view);
  };

  return (
    <Form.Item
      className="w-full max-w-80"
      label={t("view")}
      name="viewId"
      rules={[{ required: true, message: t("view_required") }]}
    >
      <Select options={options} onSelect={onSelect} />
    </Form.Item>
  );
}

interface FieldSelectProps {
  t: (key: string) => string;
  table: ITable | null;
  view: IView | null;
  // setField: (field: IField) => void;
}

export function FieldSelect({ t, table, view }: FieldSelectProps) {
  const [options, setOptions] = useState<Option[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (view === null) {
        return;
      }
      const fields = await view.getFieldMetaList();

      const fieldOptions = new Array<Option>();
      for (const field of fields) {
        if (field.type === FieldType.Number) {
          fieldOptions.push({
            value: field.id,
            label: field.name,
          });
        }
      }
      setOptions(fieldOptions);
    };
    fetchData();
  }, [view]);
  // const onSelect = async (fieldId: string) => {
  //   if (table === null) {
  //     return;
  //   }
  //   const field = await table.getFieldById(fieldId);
  //   setField(field);
  // };

  return (
    <Form.Item
      className="w-full max-w-80"
      label={t("field")}
      name="fieldId"
      rules={[{ required: true, message: t("field_required") }]}
    >
      <Select options={options} />
    </Form.Item>
  );
}
