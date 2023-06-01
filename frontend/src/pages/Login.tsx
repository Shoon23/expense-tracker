import { Link } from "react-router-dom";
import authQuery from "../services/api/authQuery";
import { useState } from "react";
import { iLoginCredentials } from "../types/user";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<iLoginCredentials>({
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
  });

  const { mutation, errorRes, setErrorRes } = authQuery.login();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setValidationError((prev) => ({ ...prev, [e.target.name]: "" }));
    setErrorRes("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email) {
      return setValidationError((prev) => ({
        ...prev,
        email: "Missing Email",
      }));
    }

    if (!formData.password) {
      return setValidationError((prev) => ({
        ...prev,
        password: "Missing Password",
      }));
    }
    mutation.mutateAsync(formData);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Expense
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            {errorRes && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errorRes}</span>
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={handleOnChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  className={
                    validationError?.email
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                      : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  }
                />
                {validationError?.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {validationError?.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={handleOnChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={
                    validationError?.password
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
                      : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  }
                />
                {validationError?.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>{" "}
                    {validationError?.password}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
