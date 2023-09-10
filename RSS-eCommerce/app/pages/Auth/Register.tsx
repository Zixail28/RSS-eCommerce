import { FC, useEffect, useState } from "react";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import authImg from "../../assets/images/auth.jpg";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import style from "../Auth/Auth.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { useAppSelector } from "../../hooks/hooks";
import { toast } from "react-toastify";
import { validateDateOfBirth } from "../../utils/validate/validateDate";
import { validatePassword } from "../../utils/validate/validatePassword";
import { validateCountry } from "../../utils/validate/validateCountry";
import { validateName } from "../../utils/validate/validateName";
import { validateEmail } from "../../utils/validate/validateEmail";
import { validatePostalCode } from "../../utils/validate/validatePostalCode";
import { register } from "../../services/auth/registerThunk";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  shippingCountry: string;
  shippingPostalCode: string;
  shippingCity: string;
  shippingStreet: string;
  billingCountry: string;
  billingPostalCode: string;
  billingCity: string;
  billingStreet: string;
  useSameAddress: boolean;
  useDefaultAddress: boolean;
}

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, firstName, lastName } = useAppSelector((state) => state.auth);

  const [useSameAddress, setUseSameAddress] = useState(false);
  const [useDefaultAddress, setUseDefaultAddress] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: "onChange",
  });

  const shippingCountry = watch("shippingCountry");
  const billingCountry = watch("billingCountry");

  useEffect(() => {
    if (isAuth) {
      navigate("/");
      toast.success(
        `You have successfully registered ${firstName} ${lastName}`,
      );
    }
  }, [isAuth, firstName, lastName, navigate]);

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    data.useDefaultAddress = useDefaultAddress;

    if (useSameAddress) {
      data.billingCountry = data.shippingCountry;
      data.billingPostalCode = data.shippingPostalCode;
      data.billingCity = data.shippingCity;
      data.billingStreet = data.shippingStreet;
    }

    await dispatch(register(data));
  };

  return (
    <>
      <div className={style.wrapper}>
        <img src={authImg} className={style.img} alt="cart" />
        <div className={style.login__wrapper}>
          <h1 className={style.login__title}>Create an account</h1>
          <p className={style.login__subtitle}>Enter your details below</p>
          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <div className={style.form_col_2}>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: "First name is required",
                  validate: validateName,
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      placeholder="First name"
                      error={errors.firstName?.message}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                    />
                  </>
                )}
              />
            </div>
            <div className={style.form_col_2}>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: "Last name is required",
                  validate: validateName,
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Last name"
                      error={errors.lastName?.message}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                    />
                  </>
                )}
              />
            </div>
            <div className={style.form_col_2}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  validate: validateEmail,
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      error={errors.email?.message}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </>
                )}
              />
            </div>
            <div className={style.form_col_2}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  validate: validatePassword,
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password"
                      showPasswordIcon={true}
                      error={errors.password?.message}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </>
                )}
              />
            </div>
            <div className={style.form_col_2}>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{
                  required: "Date is required",
                  validate: validateDateOfBirth,
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="date"
                      placeholder="Date of birth"
                      error={errors.dateOfBirth?.message}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                    />
                  </>
                )}
              />
            </div>

            <h4 className={style.heading}>Shipping address 🚚</h4>

            <div className={style.checkbox}>
              <Controller
                name="useDefaultAddress"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="defaultAddress"
                    type="checkbox"
                    checked={useDefaultAddress}
                    onChange={(e) => setUseDefaultAddress(e.target.checked)}
                    onBlur={(e) => setUseDefaultAddress(e.target.checked)}
                  />
                )}
              />
              <label htmlFor="defaultAddress" className={style.label}>
                Set as the default address
              </label>
            </div>

            <div className={style.form_col_2}>
              <Controller
                name="shippingCountry"
                control={control}
                rules={{
                  required: "Country is required",
                  validate: validateCountry,
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Country"
                      error={errors.shippingCountry?.message}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                    />
                  </>
                )}
              />
            </div>

            <div className={style.form_col_2}>
              <Controller
                name="shippingPostalCode"
                control={control}
                rules={{
                  required: "Postal code is required",
                  validate: (value) => {
                    if (shippingCountry === "US") {
                      const isValid = validatePostalCode("US", value);
                      return (
                        isValid ||
                        "Invalid postal code format. Example: 12345 or 12345-6789"
                      );
                    }
                    if (shippingCountry === "CA") {
                      const isValid = validatePostalCode("CA", value);
                      return (
                        isValid ||
                        "Invalid postal code format. Example: A1B 2C3"
                      );
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Postal code"
                      error={errors.shippingPostalCode?.message}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                    />
                  </>
                )}
              />
            </div>
            <div className={style.form_col_2}>
              <Controller
                name="shippingCity"
                control={control}
                rules={{
                  required: "City is required",
                  validate: validateName,
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      placeholder="City"
                      error={errors.shippingCity?.message}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                    />
                  </>
                )}
              />
            </div>
            <div className={style.form_col_2}>
              <Controller
                name="shippingStreet"
                control={control}
                rules={{
                  required: "Must contain at least one character",
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Street"
                      error={errors.shippingStreet?.message}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                    />
                  </>
                )}
              />
            </div>

            <div className={style.checkbox}>
              <Controller
                name="useSameAddress"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="checkbox"
                    type="checkbox"
                    checked={useSameAddress}
                    onChange={(e) => setUseSameAddress(e.target.checked)}
                    onBlur={(e) => setUseSameAddress(e.target.checked)}
                  />
                )}
              />
              <label htmlFor="checkbox" className={style.label}>
                Use shipping address for billing
              </label>
            </div>
            {!useSameAddress && (
              <>
                <h4 className={style.heading}>Billing address 💳</h4>
                <div className={style.form_col_2}>
                  <Controller
                    name="billingCountry"
                    control={control}
                    rules={{
                      required: "Country is required",
                      validate: validateCountry,
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Country"
                          error={errors.billingCountry?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                      </>
                    )}
                  />
                </div>

                <div className={style.form_col_2}>
                  <Controller
                    name="billingPostalCode"
                    control={control}
                    rules={{
                      required: "Postal code is required",
                      validate: (value) => {
                        if (billingCountry === "US") {
                          const isValid = validatePostalCode("US", value);
                          return (
                            isValid ||
                            "Invalid postal code format. Example: 12345 or 12345-6789"
                          );
                        }
                        if (billingCountry === "CA") {
                          const isValid = validatePostalCode("CA", value);
                          return (
                            isValid ||
                            "Invalid postal code format. Example: A1B 2C3"
                          );
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Postal code"
                          error={errors.billingPostalCode?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                      </>
                    )}
                  />
                </div>

                <div className={style.form_col_2}>
                  <Controller
                    name="billingCity"
                    control={control}
                    rules={{
                      required: "City is required",
                      validate: validateName,
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          type="text"
                          placeholder="City"
                          error={errors.billingCity?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                      </>
                    )}
                  />
                </div>
                <div className={style.form_col_2}>
                  <Controller
                    name="billingStreet"
                    control={control}
                    rules={{
                      required: "Must contain at least one character",
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Street"
                          error={errors.billingStreet?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                      </>
                    )}
                  />
                </div>
              </>
            )}

            <Button type="submit">Create account</Button>
            <div className={style.link}>
              Already have account?
              <Link to="/login">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
