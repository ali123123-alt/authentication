import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import HeaderComp from "./HeaderComp";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SecondStep = (props) => {
  const { user } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_email: user.user_email,
      user_password: user.user_password,
    },
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    props.updateUser(data);
    navigate("/third");
  };

  return (
    <>
      <HeaderComp />
      <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          className="col-md-6 offset-md-3"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ stiffness: 150 }}
        >
          <Form.Group controlId="user_email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              autoComplete="off"
              {...register("user_email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid.",
                },
              })}
              className={`${errors.user_email ? "input-error" : ""}`}
            />
            {errors.user_email && (
              <p className="errorMsg">{errors.user_email.message}</p>
            )}
          </Form.Group>

          <Form.Group controlId="user_password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Choose a password"
              autoComplete="off"
              {...register("user_password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password should have at least 6 characters.",
                },
              })}
              className={`${errors.user_password ? "input-error" : ""}`}
            />
            {errors.user_password && (
              <p className="errorMsg">{errors.user_password.message}</p>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Next
          </Button>
        </motion.div>
      </Form>
    </>
  );
};

export default SecondStep;
