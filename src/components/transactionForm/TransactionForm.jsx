import React, { useState } from "react";
import { Grid, Input, Button } from "semantic-ui-react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const POST_TRANSACTION = gql`
  mutation PostTransaction($title: String!, $amount: Float!, $date: String!) {
    post(title: $title, date: $date, amount: $amount) {
      id
    }
  }
`;

const TransactionForm = () => {
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  return (
    <Grid columns={4}>
      <Grid.Row>
        <Grid.Column>
          <DayPickerInput onDayChange={date => setDate(date)} />
        </Grid.Column>
        <Grid.Column>
          <Input
            placeholder="Description"
            onChange={e => setTitle(e.target.value)}
          />
        </Grid.Column>
        <Grid.Column>
          <Input
            type="number"
            placeholder="Amount"
            onChange={e => setAmount(parseFloat(e.target.value))}
          />
        </Grid.Column>
        <Grid.Column>
          <Mutation
            mutation={POST_TRANSACTION}
            variables={{ title, date, amount }}
          >
            {postMutation => (
              <Button color="blue" fluid size="large" o onClick={postMutation}>
                {"create transaction"}
              </Button>
            )}
          </Mutation>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TransactionForm;
