import React, { useState } from "react";
import { Segment, Form } from "semantic-ui-react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { Mutation } from "react-apollo";
import { formatDate, parseDate } from "react-day-picker/moment";
import {
  GET_TRANSACTIONS_QUERY,
  POST_TRANSACTION
} from "../../queries/transactionsQuery";
import { DATE_FORMAT_DD_MM_YYYY } from "../../utils/constants";

const TransactionFilter = () => {
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState("");
  const [amount] = useState(0);
  return (
    <Segment>
      <Form>
        <Form.Group>
          <Form.Field width={4}>
            <DayPickerInput
              format={DATE_FORMAT_DD_MM_YYYY}
              placeholder={DATE_FORMAT_DD_MM_YYYY}
              formatDate={formatDate}
              parseDate={parseDate}
              onDayChange={date => setDate(date)}
            />
          </Form.Field>
          <Form.Field width={4}>
            <DayPickerInput
              format={DATE_FORMAT_DD_MM_YYYY}
              placeholder={DATE_FORMAT_DD_MM_YYYY}
              formatDate={formatDate}
              parseDate={parseDate}
              onDayChange={date => setDate(date)}
            />
          </Form.Field>
          <Form.Input
            width={6}
            placeholder="Description"
            onChange={e => setTitle(e.target.value)}
          />
          <Mutation
            mutation={POST_TRANSACTION}
            variables={{ title, date, amount }}
            refetchQueries={[{ query: GET_TRANSACTIONS_QUERY }]}
          >
            {postMutation => (
              <Form.Button color="blue" onClick={postMutation}>
                Filter
              </Form.Button>
            )}
          </Mutation>
        </Form.Group>
      </Form>
    </Segment>
  );
};

export default TransactionFilter;
