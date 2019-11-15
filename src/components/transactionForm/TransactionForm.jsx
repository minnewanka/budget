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
import { getFirstDayOfMonth, getLastDayOfMonth } from "../../utils/utils";

const TransactionForm = () => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  return (
    <Segment>
      <Form>
        <Form.Group>
          <Form.Field>
            <DayPickerInput
              value={date}
              format={DATE_FORMAT_DD_MM_YYYY}
              placeholder={DATE_FORMAT_DD_MM_YYYY}
              formatDate={formatDate}
              parseDate={parseDate}
              onDayChange={date => setDate(date)}
            />
          </Form.Field>
          <Form.Input
            width={7}
            placeholder="Description"
            onChange={e => setTitle(e.target.value)}
          />
          <Form.Input
            type="number"
            placeholder="Amount"
            onChange={e => setAmount(parseFloat(e.target.value))}
          />
          <Mutation
            mutation={POST_TRANSACTION}
            variables={{ title, date, amount }}
          >
            {postMutation => (
              <Form.Button color="blue" onClick={postMutation}>
                {"create transaction"}
              </Form.Button>
            )}
          </Mutation>
        </Form.Group>
      </Form>
    </Segment>
  );
};

export default TransactionForm;
