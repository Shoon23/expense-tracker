import { useState } from "react";
import { Link } from "react-router-dom";
import { FinalForm, Form } from "../components/Register";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import auth from "../services/api/auth";
const Register = () => {
  const [isNext, setIsNext] = useState(false);
  const { mutation, errorRes } = auth.register();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleNext = () => {
    if (!formData.firstName) {
      return setValidationError((prev) => ({
        ...prev,
        firstName: "Missing Field",
      }));
    }
    if (!formData.lastName) {
      return setValidationError((prev) => ({
        ...prev,
        lastName: "Missing Field",
      }));
    }
    setIsNext(true);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setValidationError((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email) {
      return setValidationError((prev) => ({
        ...prev,
        email: "Missing Field",
      }));
    }
    if (!formData.password) {
      return setValidationError((prev) => ({
        ...prev,
        password: "Missing Password",
      }));
    }
    if (!formData.confirmPassword) {
      return setValidationError((prev) => ({
        ...prev,
        confirmPassword: "Missing Confirm Password",
      }));
    }
    if (formData.password !== formData.confirmPassword) {
      return setValidationError((prev) => ({
        ...prev,
        confirmPassword: "Password dont match",
      }));
    }
    const { confirmPassword, ...other } = formData;
    mutation.mutateAsync(other);
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
            <h1 className="text-xl flex items-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isNext && (
                <IconArrowNarrowLeft
                  onClick={() => setIsNext(false)}
                  className="cursor-pointer hover:stroke-blue-600"
                  size={40}
                  color="gray"
                />
              )}
              Create an account
            </h1>
            {errorRes && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errorRes}</span>
              </p>
            )}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              {!isNext ? (
                <Form
                  formData={formData}
                  handleNext={handleNext}
                  validationError={validationError}
                  handleOnChange={handleOnChange}
                />
              ) : (
                <FinalForm
                  formData={formData}
                  validationError={validationError}
                  handleOnChange={handleOnChange}
                />
              )}
            </form>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
