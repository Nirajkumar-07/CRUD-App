import React, { useActionState, useEffect, useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Auth } from "../../actions/auth.action";
import { useNavigate } from "react-router";

function Login() {
  const [state, formAction] = useActionState(Auth, undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.success === true) {
      localStorage.setItem("user", JSON.stringify(state.data));
      navigate("/");
    }
  }, [state]);

  return (
    <div className="w-full h-screen flex justify-center items-center px-2 lg:px-4">
      <div className="w-full md:w-3/4 lg:w-1/2 flex justify-center items-center flex-col border rounded-md shadow-md px-2 lg:px-4 py-4">
        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl mb-4">
          Welcome
        </h2>
        <span className="text-sm">Enter your credentials for signup.</span>
        <form
          action={formAction}
          className="w-full lg:w-3/4 grid gap-4 text-sm"
        >
          <div className="grid gap-1">
            <Label htmlFor="username" className="flex gap-[2px]">
              Username
              <sup className="text-red-500">*</sup>
            </Label>
            <Input
              id="username"
              name="username"
              defaultValue="emilys"
              type="text"
              placeholder="Enter Username"
              // className="form-control"
              required
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password" className="flex gap-[2px]">
              Password
              <sup className="text-red-500">*</sup>
            </Label>
            <Input
              type="password"
              id="password"
              defaultValue="emilyspass"
              name="password"
              placeholder="Enter Password"
              // className="form-control"
              required
            />
            {state && !state.success && (
              <p className="my-2 text-xs">{state.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant={"default"}
              className="bg-blue-500 border-0 rounded-lg w-fit lg:w-full px-4 py-2 text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
