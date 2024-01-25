import { Descriptions, DescriptionsProps } from "antd";
import * as dfd from "danfojs";

interface DescriptionProps {
  t: (key: string) => string;
  datas: (number | null)[];
}

export function Description({ t, datas }: DescriptionProps) {
  const s = new dfd.Series(datas);
  const items: DescriptionsProps["items"] = [
    { key: "count", label: t("count"), children: s.count().toString() },
    { key: "sum", label: t("sum"), children: s.sum().toFixed(2) },
    { key: "mean", label: t("mean"), children: s.mean().toFixed(2) },
    { key: "median ", label: t("median"), children: s.median().toString() },
    { key: "mode", label: t("mode"), children: s.mode().toString() },
    {
      key: "range",
      label: t("range"),
      children: (s.max() - s.min()).toFixed(2),
    },
    { key: "max", label: t("max"), children: s.max().toString() },
    { key: "min", label: t("min"), children: s.min().toString() },
    { key: "std", label: t("std"), children: s.std().toFixed(2) },
    { key: "var", label: t("var"), children: s.var().toFixed(2) },
  ];

  return <Descriptions bordered items={items}></Descriptions>;
}
