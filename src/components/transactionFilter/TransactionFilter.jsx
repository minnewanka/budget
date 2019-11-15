import React, { useState } from "react";
import { Segment, Form } from "semantic-ui-react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../../utils/utils";
import { DATE_FORMAT_DD_MM_YYYY } from "../../utils/constants";

const TransactionFilter = ({ setFilter, setBegin, setEnd }) => {
  var firstDay = getFirstDayOfMonth();
  var lastDay = getLastDayOfMonth();

  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(lastDay);
  const [title, setTitle] = useState("");

  const filtering = () => {
    setFilter(title);
    setBegin(startDate);
    setEnd(endDate);
  };

  const clear = () => {
    setTitle("");
    setStartDate(firstDay);
    setEndDate(lastDay);

    setFilter("");
    setBegin(firstDay);
    setEnd(lastDay);
  };

  return (
    <Segment>
      <Form>
        <Form.Group>
          <Form.Field width={4}>
            <DayPickerInput
              value={startDate}
              format={DATE_FORMAT_DD_MM_YYYY}
              placeholder={DATE_FORMAT_DD_MM_YYYY}
              formatDate={formatDate}
              parseDate={parseDate}
              onDayChange={date => setStartDate(date)}
            />
          </Form.Field>
          <Form.Field width={4}>
            <DayPickerInput
              value={endDate}
              format={DATE_FORMAT_DD_MM_YYYY}
              placeholder={DATE_FORMAT_DD_MM_YYYY}
              formatDate={formatDate}
              parseDate={parseDate}
              onDayChange={date => setEndDate(date)}
            />
          </Form.Field>
          <Form.Input
            value={title}
            width={6}
            placeholder="Description"
            onChange={e => setTitle(e.target.value)}
          />
          <Form.Button color="blue" onClick={filtering}>
            Filter
          </Form.Button>
          <Form.Button color="red" onClick={clear}>
            Clear
          </Form.Button>
        </Form.Group>
      </Form>
    </Segment>
  );
};

export default TransactionFilter;
