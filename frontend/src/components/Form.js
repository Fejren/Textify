import React, {useState} from "react";
import { Form, Button, Select } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {API_URL} from "../settings";
import * as messageActions from "../actions/message";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const HorizontalAddChatForm = ({ access, user }) => {
  const [emails, setEmails] = useState([])
  const [errors, setErrors] = useState()

  const handleChange = value => {
    setEmails(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let currentUser = {...user}
      if (!err) {
        const combined = [...emails, currentUser.email];
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `JWT ${access}`
        };
        axios
          .post(`${API_URL}/chat/create/`, {
            messages: [],
            participants: combined
          })
          .then(res => {
            this.props.history.push(`/${res.data.id}`);
            this.props.closeAddChatPopup();
            this.props.getUserChats(currentUser.id, access);
          })
          .catch(err => {
            console.error(err);
            setErrors({
              error: err
            });
          });
      }
    });
  };
  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched
  } = this.props.form;

    const userNameError =
      isFieldTouched("userName") && getFieldError("userName");
    return (
      <Form layout="inline" onSubmit={handleSubmit}>
        {errors ? `${errors}` : null}
        <FormItem
          validateStatus={userNameError ? "error" : ""}
          help={userNameError || ""}
        >
          {getFieldDecorator("userName", {
            rules: [
              {
                required: true,
                message:
                  "Wpisz email osoby, z którą chcesz zacząć pisać"
              }
            ]
          })(
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Tags Mode"
              onChange={handleChange}
            >
              {[]}
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Zacznij chat
          </Button>
        </FormItem>
      </Form>
    );
}

const AddChatForm = Form.create()(HorizontalAddChatForm);

const mapStateToProps = state => {
  return {
    access: state.auth.access,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
    getUserChats: (userId, token) =>
      dispatch(messageActions.getUserChats(userId, token))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddChatForm)
);
