import { Descriptions, DescriptionsProps } from "antd";
import * as dfd from "danfojs";
import * as stats from "simple-statistics";

interface DescriptionProps {
  t: (key: string) => string;
  datas: number[];
}

export function Description({ t, datas }: DescriptionProps) {
  const s = new dfd.Series(datas);

  console.log(stats.mean(datas), s.mean());

  s.mul;

  const items: DescriptionsProps["items"] = [
    {
      key: "count",
      label: t("count"),
      children: datas.length.toString(),
    },
    {
      key: "sum",
      label: t("sum"),
      children: stats.sum(datas).toString(),
    },
    // {
    //   key: "product",
    //   label: t("product"),
    //   children: stats.product(datas).toString,
    // },
    {
      key: "max",
      label: t("max"),
      children: stats.max(datas).toString(),
    },
    {
      key: "min",
      label: t("min"),
      children: stats.min(datas).toString(),
    },
    {
      key: "mean",
      label: t("mean"),
      children: stats.mean(datas).toFixed(2),
    },
    {
      key: "harmonic_mean",
      label: t("harmonic_mean"),
      children: harmonicMean(t, datas),
    },
    {
      key: "median ",
      label: t("median"),
      children: stats.median(datas).toString(),
    },
    {
      key: "median_absolute_deviation",
      label: t("median_absolute_deviation"),
      children: stats.medianAbsoluteDeviation(datas).toFixed(2),
    },
    {
      key: "mode",
      label: t("mode"),
      children: s.mode().toString(),
    },
    {
      key: "range",
      label: t("range"),
      children: (stats.max(datas) - stats.min(datas)).toFixed(2),
    },
    {
      key: "interquartile_range",
      label: t("interquartile_range"),
      children: stats.interquartileRange(datas).toFixed(2),
    },

    // {
    //   key: "geometric_mean",
    //   label: t("geometric_mean"),
    //   children: stats.geometricMean(datas).toString(),
    // },
    {
      key: "root_mean_square",
      label: t("root_mean_square"),
      children: stats.rootMeanSquare(datas).toFixed(2),
    },
    {
      key: "standard_deviation",
      label: t("standard_deviation"),
      children: stats.standardDeviation(datas).toFixed(2),
    },
    {
      key: "sample_standard_deviation",
      label: t("sample_standard_deviation"),
      children: stats.sampleStandardDeviation(datas).toFixed(2),
    },
    {
      key: "variance",
      label: t("variance"),
      children: stats.variance(datas).toFixed(2),
    },
    {
      key: "sample_variance",
      label: t("sample_variance"),
      children: stats.sampleVariance(datas).toFixed(2),
    },
    {
      key: "sample_skewness",
      label: t("sample_skewness"),
      children: stats.sampleSkewness(datas).toFixed(2),
    },
    {
      key: "sample_kurtosis",
      label: t("sample_kurtosis"),
      children: stats.sampleKurtosis(datas).toFixed(2),
    },
  ];

  return <Descriptions bordered items={items}></Descriptions>;
}

function harmonicMean(t: (key: string) => string, datas: number[]) {
  for (const data of datas) {
    if (data <= 0) {
      return t("need_gt_zero");
    }
  }
  return stats.harmonicMean(datas).toFixed(2);
}
