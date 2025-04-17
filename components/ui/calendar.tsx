"use client";

import * as React from "react";
import { DatePicker } from "@heroui/react";
import {
  parseDate,
  CalendarDate,
  getLocalTimeZone,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

export type CalendarProps = {
  defaultDate?: string; // format: "YYYY-MM-DD"
  label?: string;
};

export function Calendar({
  defaultDate = "2024-04-04",
  label = "Select date",
}: CalendarProps) {
  const [value, setValue] = React.useState<CalendarDate | null>(
    parseDate(defaultDate)
  );
  const formatter = useDateFormatter({ dateStyle: "full" });

  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <DatePicker
        className="max-w-full"
        label={label}
        value={value}
        onChange={setValue}
      />
      <p className="text-default-500 text-sm">
        Selected date:{" "}
        {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
      </p>
    </div>
  );
}
