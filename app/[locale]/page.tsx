"use client";
import { Button, Form } from "antd";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  IRecord,
  ITable,
  IView,
  bitable,
  checkers,
} from "@lark-base-open/js-sdk";
import { useState, useEffect } from "react";
import { FieldSelect, TableSelect, ViewSelect } from "@/components/select";
import { Description } from "@/components/description";

interface FormValues {
  tableId: string;
  viewId: string;
  fieldId: string;
}

export default function Home() {
  const t = useTranslations();
  const [table, setTable] = useState<ITable | null>(null);
  const [view, setView] = useState<IView | null>(null);
  // const [field, setField] = useState<IField | null>(null);
  const [datas, setDatas] = useState<number[]>([]);

  const router = useRouter();
  const locale = useLocale();

  // check language and locale, if not match, redirect to the right page
  useEffect(() => {
    const setLocale = async () => {
      const language = await bitable.bridge.getLanguage();
      if (language !== locale && (language === "en" || language === "zh")) {
        router.push("/" + language);
      }
    };
    setLocale();
  }, [router, locale]);

  const onFinish = async (values: FormValues) => {
    if (table === null || view === null) {
      return;
    }
    const records = await getAllRecords(table, values.viewId);
    const newDatas = new Array<number>();
    for (const record of records) {
      const value = record.fields[values.fieldId];
      if (checkers.isNumber(value)) {
        newDatas.push(value);
      }
    }
    setDatas(newDatas);
  };

  return (
    <main className="">
      <Form className="flex flex-col items-center" onFinish={onFinish}>
        <TableSelect t={t} setTable={setTable} />
        <ViewSelect t={t} table={table} setView={setView} />
        <FieldSelect t={t} table={table} view={view} />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t("calculate")}
          </Button>
        </Form.Item>
      </Form>
      {datas.length > 0 && <Description t={t} datas={datas} />}
    </main>
  );
}

async function getAllRecords(table: ITable, viewId: string) {
  const records = new Array<IRecord>();
  const res = await table.getRecords({ viewId: viewId, pageSize: 5000 });
  records.push(...res.records);
  let hasMore = res.hasMore;
  let pageToken = res.pageToken;
  while (hasMore) {
    const res = await table.getRecords({
      viewId: viewId,
      pageSize: 5000,
      pageToken: pageToken,
    });
    records.push(...res.records);
    pageToken = res.pageToken;
    hasMore = res.hasMore;
  }
  return records;
}
