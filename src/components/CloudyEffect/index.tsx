import React from "react";
import CloudyThreeCurve from "./CloudyThreeCurves";
import CloudyTenCurve from "./CloudyTenCurves";

type Props = {
  CANVAS_RATIO2: number
  color: string
  type: "threeCurve" | "tenCurve"
}
export default function CloudyEffect({color, CANVAS_RATIO2, type }: Props) {
  const CloudStyleCollection = {
    "threeCurve" : <CloudyThreeCurve color={color} CANVAS_RATIO2={CANVAS_RATIO2}/>,
    "tenCurve" : <CloudyTenCurve color={color} CANVAS_RATIO2={CANVAS_RATIO2}/>
  }
  return (
    CloudStyleCollection[type]
  )
}