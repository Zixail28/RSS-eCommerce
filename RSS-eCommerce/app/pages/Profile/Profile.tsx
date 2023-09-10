import { FC, useState } from "react";
import style from "./Profile.module.scss";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import { useAppSelector } from "../../hooks/hooks";
import { validateName } from "../../utils/validate/validateName";
import { validateDateOfBirth } from "../../utils/validate/validateDate";
import { validateEmail } from "../../utils/validate/validateEmail";
import { validatePassword } from "../../utils/validate/validatePassword";
import { changePassword } from "../../services/auth/changePasswordThunk";
import { useAppDispatch } from "../../hooks/hooks";
import { isFulfilled } from "@reduxjs/toolkit";
import { changeInfo } from "../../services/auth/changeInfoThunk";
import { validateCountry } from "../../utils/validate/validateCountry";
import { validatePostalCode } from "../../utils/validate/validatePostalCode";
import { deleteAddress } from "../../services/auth/deleteAddressThunk";
import { changeAddress } from "../../services/auth/changeAddressThunk";
import { addNewAddress } from "../../services/auth/addNewAddressThunk";

type FormInfoValues = {
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  email: string | null;
};

type FormPasswordValues = {
  password: string;
  newPassword: string | null;
  confirmNewPassword: string;
};

type FormAddressValues = {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  defaultShippingAddressId: boolean;
  defaultBillingAddressId: boolean;
};

type FormNewAddressValues = {
  newStreetName: string;
  newCity: string;
  newPostalCode: string;
  newCountry: string;
  newShippingAddress: boolean;
  newBillingAddress: boolean;
  newDefaultShippingAddress: boolean;
  newDefaultBillingAddress: boolean;
};

const Profile: FC = () => {
  const [isInfoEditing, setIsInfoEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState("");
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const dispatch = useAppDispatch();

  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    addresses,
    billingAddressIds,
    shippingAddressIds,
    defaultShippingAddressId,
    defaultBillingAddressId,
  } = useAppSelector((state) => state.auth);

  const {
    handleSubmit: handleInfoSubmit,
    control: controlInfo,
    formState: { errors: errorsInfo },
  } = useForm<FormInfoValues>({
    mode: "onChange",
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      email: email,
    },
  });

  const {
    handleSubmit: handlePasswordSubmit,
    control: controlPassword,
    watch,
    reset,
    formState: { errors: errorsPassword },
  } = useForm<FormPasswordValues>({
    mode: "onChange",
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { handleSubmit: handleAddressSubmit, control: controlAddress } =
    useForm({
      mode: "onChange",
    });

  useFieldArray({
    name: "address",
    control: controlAddress,
  });

  const {
    handleSubmit: handleAddNewAddress,
    control: controlNewAddress,
    watch: newWatch,
    reset: newReset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      newCountry: "",
      newCity: "",
      newPostalCode: "",
      newStreetName: "",
      newBillingAddress: false,
      newDefaultBillingAddress: false,
      newShippingAddress: false,
      newDefaultShippingAddress: false,
    },
  });

  const validatePasswordMatch = async (value: string | null) => {
    const newPassword = watch("newPassword");

    if (newPassword !== value) {
      return "Passwords don't match";
    }

    return true;
  };

  const onInfoSubmit = async (data: FormInfoValues) => {
    const { firstName, lastName, dateOfBirth, email } = data;

    const response = await dispatch(
      changeInfo({ firstName, lastName, dateOfBirth, email }),
    );

    if (isFulfilled(response)) {
      setIsInfoEditing(!isInfoEditing);
      reset();
    }
  };

  const onPasswordSubmit = async (data: FormPasswordValues) => {
    const { password, confirmNewPassword } = data;

    const response = await dispatch(
      changePassword({ password, confirmNewPassword }),
    );

    if (isFulfilled(response)) {
      setIsPasswordEditing(!isPasswordEditing);
      reset();
    }
  };

  const onSubmitWrapper = async (
    addressId: string,
    formData: FormAddressValues,
  ) => {
    console.log("Address ID:", addressId);
    console.log("Address Data:", formData);

    const {
      defaultShippingAddressId,
      defaultBillingAddressId,
      country,
      city,
      postalCode,
      streetName,
    } = formData;

    const response = await dispatch(
      changeAddress({
        addressId,
        country,
        city,
        postalCode,
        streetName,
        defaultShippingAddressId,
        defaultBillingAddressId,
      }),
    );

    setIsAddressEditing("");

    if (isFulfilled(response)) {
      reset();
    }
  };

  const confirmDeleteAddress = async (addressId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );
    if (isConfirmed) {
      await dispatch(deleteAddress({ addressId }));
    }
  };

  const newAddress = async (data: FormNewAddressValues) => {
    const {
      newCity,
      newCountry,
      newStreetName,
      newPostalCode,
      newDefaultShippingAddress,
      newDefaultBillingAddress,
      newShippingAddress,
      newBillingAddress,
    } = data;
    console.log(data);

    await dispatch(
      addNewAddress({
        newCity,
        newCountry,
        newStreetName,
        newPostalCode,
        newDefaultShippingAddress,
        newDefaultBillingAddress,
        newShippingAddress,
        newBillingAddress,
      }),
    );

    setIsAddingAddress(!isAddingAddress);
    newReset();
  };

  return (
    <div className={style.wrapper}>
      <div>
        <form
          onSubmit={handleInfoSubmit(onInfoSubmit)}
          className={`${style.form} ${isInfoEditing ? style.form__edit : ""}`}
        >
          <h4 className={style.form__subtitle}>Personal information</h4>
          <div className={style.form__wrapper}>
            <div className={style.form__row + " " + style.form_col_2}>
              <Controller
                name="firstName"
                control={controlInfo}
                rules={{
                  required: "First Name is required",
                  validate: validateName,
                }}
                render={({ field }) => (
                  <>
                    <label htmlFor="firstName" className={style.input__label}>
                      First Name: {isInfoEditing ? "✏️" : ""}
                    </label>
                    {isInfoEditing ? (
                      <div className={isInfoEditing ? style.input_edit : ""}>
                        <Input
                          {...field}
                          id="firstName"
                          type="text"
                          placeholder="Your first name"
                          value={field.value}
                          error={errorsInfo.firstName?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                      </div>
                    ) : (
                      <div className={style.form__text}>{firstName}</div>
                    )}
                  </>
                )}
              />
            </div>
            <div className={style.form__row + " " + style.form_col_2}>
              <Controller
                name="lastName"
                control={controlInfo}
                rules={{
                  required: "Last Name is required",
                  validate: validateName,
                }}
                render={({ field }) => (
                  <>
                    <label htmlFor="lastName" className={style.input__label}>
                      Last Name: {isInfoEditing ? "✏️" : ""}
                    </label>
                    {isInfoEditing ? (
                      <Input
                        {...field}
                        id="lastName"
                        type="text"
                        placeholder="Your last Name"
                        value={field.value}
                        error={errorsInfo.lastName?.message}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                      />
                    ) : (
                      <div className={style.form__text}>{lastName}</div>
                    )}
                  </>
                )}
              />
            </div>
            <div className={style.form__row + " " + style.form_col_2}>
              <Controller
                name="dateOfBirth"
                control={controlInfo}
                rules={{
                  required: "Date of birth is required",
                  validate: validateDateOfBirth,
                }}
                render={({ field }) => (
                  <>
                    <label htmlFor="dateOfBirth" className={style.input__label}>
                      Date of birth: {isInfoEditing ? "✏️" : ""}
                    </label>
                    {isInfoEditing ? (
                      <Input
                        {...field}
                        id="dateOfBirth"
                        type="date"
                        placeholder="Date of birth"
                        value={field.value}
                        error={errorsInfo.dateOfBirth?.message}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                      />
                    ) : (
                      <div className={style.form__text}>{dateOfBirth}</div>
                    )}
                  </>
                )}
              />
            </div>
            <div className={style.form__row + " " + style.form_col_2}>
              <Controller
                name="email"
                control={controlInfo}
                rules={{
                  required: "Email is required",
                  validate: validateEmail,
                }}
                render={({ field }) => (
                  <>
                    <label htmlFor="email" className={style.input__label}>
                      Email: {isInfoEditing ? "✏️" : ""}
                    </label>
                    {isInfoEditing ? (
                      <Input
                        {...field}
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={field.value}
                        error={errorsInfo.email?.message}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                      />
                    ) : (
                      <div className={style.form__text}>{email}</div>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <Button
            type="button"
            color={isInfoEditing ? "red" : "blue"}
            onClick={() => setIsInfoEditing(!isInfoEditing)}
          >
            {isInfoEditing ? "Cancel" : "Edit information"}
          </Button>
          {isInfoEditing ? (
            <Button type="submit" color="green">
              Save Changes
            </Button>
          ) : null}
        </form>
      </div>

      <div>
        <form
          onSubmit={handlePasswordSubmit(onPasswordSubmit)}
          className={`${style.form} ${
            isPasswordEditing ? style.form__edit : ""
          }`}
        >
          <h4 className={style.form__subtitle}>Password</h4>
          <div className={style.form__wrapper}>
            <div className={style.form__row + " " + style.form_col_3}>
              <Controller
                name="password"
                control={controlPassword}
                rules={{
                  required: "Current password is required",
                  validate: validatePassword,
                }}
                render={({ field }) => (
                  <>
                    <label htmlFor="password" className={style.input__label}>
                      Current Password: {isPasswordEditing ? "✏️" : ""}
                    </label>

                    <div className={isPasswordEditing ? style.input_edit : ""}>
                      {isPasswordEditing ? (
                        <>
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            placeholder="Current password"
                            showPasswordIcon={true}
                            value={field.value}
                            error={errorsPassword.password?.message}
                            onChange={(e) => field.onChange(e.target.value)}
                            onBlur={field.onBlur}
                          />
                        </>
                      ) : (
                        <div className={style.form__text}>*******</div>
                      )}
                    </div>
                  </>
                )}
              />
            </div>
            {isPasswordEditing ? (
              <div className={style.form__row + " " + style.form_col_3}>
                <Controller
                  name="newPassword"
                  control={controlPassword}
                  rules={{
                    required: "New password is required",
                    validate: {
                      validatePassword,
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <label
                        htmlFor="newPassword"
                        className={style.input__label}
                      >
                        New Password: {isPasswordEditing ? "✏️" : ""}
                      </label>

                      <div
                        className={isPasswordEditing ? style.input_edit : ""}
                      >
                        <Input
                          {...field}
                          id="newPassword"
                          type="password"
                          placeholder="Type new password"
                          showPasswordIcon={true}
                          value={field.value}
                          error={errorsPassword.newPassword?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                      </div>
                    </>
                  )}
                />
              </div>
            ) : (
              ""
            )}

            {isPasswordEditing ? (
              <div className={style.form__row + " " + style.form_col_3}>
                <Controller
                  name="confirmNewPassword"
                  control={controlPassword}
                  rules={{
                    required: "Confirm new password is required",
                    validate: {
                      validatePassword,
                      confirmPasswordMatch: validatePasswordMatch,
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <label
                        htmlFor="confirmNewPassword"
                        className={style.input__label}
                      >
                        Confirm new password: {isPasswordEditing ? "✏️" : ""}
                      </label>

                      <div
                        className={isPasswordEditing ? style.input_edit : ""}
                      >
                        <Input
                          {...field}
                          id="confirmNewPassword"
                          type="password"
                          placeholder="Confirm new password"
                          showPasswordIcon={true}
                          value={field.value}
                          error={errorsPassword.confirmNewPassword?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                      </div>
                    </>
                  )}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <Button
            type="button"
            color={isPasswordEditing ? "red" : "blue"}
            onClick={() => setIsPasswordEditing(!isPasswordEditing)}
          >
            {isPasswordEditing ? "Cancel" : "Change password"}
          </Button>
          {isPasswordEditing ? (
            <Button type="submit" color="green">
              Save password
            </Button>
          ) : null}
        </form>
      </div>

      <div className={style.wrapper}>
        {addresses?.map((address, index) => (
          <form
            key={address.id}
            onSubmit={handleAddressSubmit((data) => {
              onSubmitWrapper(address.id, data.address[index]);
            })}
            className={`${style.form} ${
              isAddressEditing === address.id ? style.form__edit : ""
            }`}
          >
            <h4 className={style.form__subtitle}>Address №{index + 1}</h4>

            <div className={style.form__type_wrapper}>
              Address Type:
              {billingAddressIds?.includes(address.id) && (
                <div className={style.form__type}>
                  <span>Billing</span>
                </div>
              )}
              {shippingAddressIds?.includes(address.id) && (
                <div className={style.form__type}>
                  <span>Shipping</span>
                </div>
              )}
              {defaultBillingAddressId?.includes(address.id) && (
                <div className={style.form__type}>
                  <span className={style.form__type_blue}>Default Billing</span>
                </div>
              )}
              {defaultShippingAddressId?.includes(address.id) && (
                <div className={style.form__type}>
                  <span className={style.form__type_blue}>
                    Default Shipping
                  </span>
                </div>
              )}
            </div>

            <div className={style.form__wrapper}>
              <div className={style.form__row + " " + style.form_col_2}>
                <Controller
                  name={`address[${index}].country`}
                  control={controlAddress}
                  rules={{
                    required: "country is required",
                    validate: validateCountry,
                  }}
                  defaultValue={address.country}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={`country-${address.id}`}
                        className={style.input__label}
                      >
                        Country: {isAddressEditing === address.id ? "✏️" : ""}
                      </label>
                      {isAddressEditing === address.id ? (
                        <div className={style.input_edit}>
                          <Input
                            {...field}
                            id={`country-${address.id}`}
                            type="text"
                            placeholder="country"
                            value={field.value}
                            error={fieldState.error?.message}
                            onChange={(e) => field.onChange(e.target.value)}
                            onBlur={field.onBlur}
                          />
                        </div>
                      ) : (
                        <div className={style.form__text}>
                          {address.country}
                        </div>
                      )}
                    </>
                  )}
                />
              </div>
              <div className={style.form__row + " " + style.form_col_2}>
                <Controller
                  name={`address[${index}].postalCode`}
                  control={controlAddress}
                  rules={{
                    required: "Postal code is required",
                    validate: (value) => {
                      if (`address[${index}].country` === "US") {
                        const isValid = validatePostalCode("US", value);
                        return (
                          isValid ||
                          "Invalid postal code format. Example: 12345 or 12345-6789"
                        );
                      }
                      if (`address[${index}].country` === "CA") {
                        const isValid = validatePostalCode("CA", value);
                        return (
                          isValid ||
                          "Invalid postal code format. Example: A1B 2C3"
                        );
                      }
                      return true;
                    },
                  }}
                  defaultValue={address.postalCode}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={`postalCode${address.id}`}
                        className={style.input__label}
                      >
                        Postal Code:
                        {isAddressEditing === address.id ? "✏️" : ""}
                      </label>
                      {isAddressEditing === address.id ? (
                        <Input
                          {...field}
                          id={`postalCode${address.id}`}
                          type="text"
                          placeholder="postal Code"
                          value={field.value}
                          error={fieldState.error?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                      ) : (
                        <div className={style.form__text}>
                          {address.postalCode}
                        </div>
                      )}
                    </>
                  )}
                />
              </div>
              <div className={style.form__row + " " + style.form_col_2}>
                <Controller
                  name={`address[${index}].city`}
                  control={controlAddress}
                  rules={{
                    required: "city is required",
                    validate: validateName,
                  }}
                  defaultValue={address.city}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={`city${address.id}`}
                        className={style.input__label}
                      >
                        City: {isAddressEditing === address.id ? "✏️" : ""}
                      </label>
                      {isAddressEditing === address.id ? (
                        <Input
                          {...field}
                          id={`city${address.id}`}
                          type="text"
                          placeholder="city"
                          value={field.value}
                          error={fieldState.error?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                      ) : (
                        <div className={style.form__text}>{address.city}</div>
                      )}
                    </>
                  )}
                />
              </div>
              <div className={style.form__row + " " + style.form_col_2}>
                <Controller
                  name={`address[${index}].streetName`}
                  control={controlAddress}
                  rules={{
                    required: "Must contain at least one character",
                  }}
                  defaultValue={address.streetName}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={`streetName${address.id}`}
                        className={style.input__label}
                      >
                        Street Name:
                        {isAddressEditing === address.id ? "✏️" : ""}
                      </label>
                      {isAddressEditing === address.id ? (
                        <Input
                          {...field}
                          id={`streetName${address.id}`}
                          type="text"
                          placeholder="street"
                          value={field.value}
                          error={fieldState.error?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                      ) : (
                        <div className={style.form__text}>
                          {address.streetName}
                        </div>
                      )}
                    </>
                  )}
                />
              </div>

              {isAddressEditing === address.id ? (
                <div className={style.form__row + " " + style.form_col_2}>
                  <div className={style.checkbox}>
                    <Controller
                      name={`address[${index}].defaultBillingAddressId`}
                      control={controlAddress}
                      defaultValue={defaultBillingAddressId === address.id}
                      render={({ field }) => (
                        <>
                          <label
                            htmlFor={`defaultBillingAddressId${address.id}`}
                            className={style.input__label}
                          >
                            Set default billing address:
                            <Input
                              {...field}
                              id={`defaultBillingAddressId${address.id}`}
                              type="checkbox"
                              defaultChecked={
                                defaultBillingAddressId === address.id
                              }
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(e.target.checked ? true : false)
                              }
                              onBlur={field.onBlur}
                            />
                          </label>
                        </>
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {isAddressEditing === address.id ? (
                <div className={style.form__row + " " + style.form_col_2}>
                  <div className={style.checkbox}>
                    <Controller
                      name={`address[${index}].defaultShippingAddressId`}
                      control={controlAddress}
                      defaultValue={defaultShippingAddressId === address.id}
                      render={({ field }) => (
                        <>
                          <label
                            htmlFor={`defaultShippingAddressId${address.id}`}
                            className={style.input__label}
                          >
                            Set default shipping address:
                            <Input
                              {...field}
                              id={`defaultShippingAddressId${address.id}`}
                              type="checkbox"
                              defaultChecked={field.value}
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(e.target.checked ? true : false)
                              }
                              onBlur={field.onBlur}
                            />
                          </label>
                        </>
                      )}
                    />
                  </div>
                </div>
              ) : null}

              <div className={style.form__buttons}>
                <Button
                  type="button"
                  color={isAddressEditing === address.id ? "red" : "blue"}
                  onClick={() => {
                    setIsAddressEditing(address.id);

                    if (isAddressEditing === address.id) {
                      setIsAddressEditing("");
                    } else {
                      setIsAddressEditing(address.id);
                    }
                  }}
                >
                  {isAddressEditing === address.id ? "Cancel" : "Edit address"}
                </Button>

                <Button
                  type="button"
                  onClick={() => confirmDeleteAddress(address.id)}
                  color="red"
                >
                  Delete address
                </Button>

                {isAddressEditing === address.id ? (
                  <Button type="submit" color="green">
                    Save Changes
                  </Button>
                ) : null}
              </div>
            </div>
          </form>
        ))}

        <div className={style.form__container}>
          <Button
            type="button"
            color="blue"
            onClick={() => setIsAddingAddress(!isAddingAddress)}
          >
            Add new address
          </Button>

          {isAddingAddress && (
            <form
              onSubmit={handleAddNewAddress(newAddress)}
              className={style.form}
            >
              <div className={style.form__wrapper}>
                <div className={style.form__row + " " + style.form_col_2}>
                  <Controller
                    name="newCountry"
                    control={controlNewAddress}
                    rules={{
                      required: "country is required",
                      validate: validateCountry,
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <label
                          htmlFor="newCountry"
                          className={style.input__label}
                        >
                          Country: 🅽🅴🆆
                        </label>

                        <div className={style.input_edit}>
                          <Input
                            {...field}
                            id="newCountry"
                            type="text"
                            placeholder="country"
                            value={field.value}
                            error={fieldState.error?.message}
                            onChange={(e) => field.onChange(e.target.value)}
                            onBlur={field.onBlur}
                          />
                        </div>
                      </>
                    )}
                  />
                </div>
                <div className={style.form__row + " " + style.form_col_2}>
                  <Controller
                    name="newPostalCode"
                    control={controlNewAddress}
                    rules={{
                      required: "Postal code is required",
                      validate: () =>
                        validatePostalCode(
                          newWatch("newCountry"),
                          newWatch("newPostalCode"),
                        ),
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <label
                          htmlFor="newPostalCode"
                          className={style.input__label}
                        >
                          Postal Code: 🅽🅴🆆
                        </label>
                        <Input
                          {...field}
                          id="newPostalCode"
                          type="text"
                          placeholder="postal Code"
                          value={field.value}
                          error={fieldState.error?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                      </>
                    )}
                  />
                </div>
                <div className={style.form__row + " " + style.form_col_2}>
                  <Controller
                    name="newCity"
                    control={controlNewAddress}
                    rules={{
                      required: "city is required",
                      validate: validateName,
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <label htmlFor="newCity" className={style.input__label}>
                          City: 🅽🅴🆆
                        </label>
                        <Input
                          {...field}
                          id="newCity"
                          type="text"
                          placeholder="city"
                          value={field.value}
                          error={fieldState.error?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                      </>
                    )}
                  />
                </div>
                <div className={style.form__row + " " + style.form_col_2}>
                  <Controller
                    name="newStreetName"
                    control={controlNewAddress}
                    rules={{
                      required: "Must contain at least one character",
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <label
                          htmlFor="newStreetName"
                          className={style.input__label}
                        >
                          Street Name: 🅽🅴🆆
                        </label>
                        <Input
                          {...field}
                          id="newStreetName"
                          type="text"
                          placeholder="street"
                          value={field.value}
                          error={fieldState.error?.message}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                      </>
                    )}
                  />
                </div>

                <div className={style.form__row + " " + style.form_col_2}>
                  <div className={style.checkbox}>
                    <Controller
                      name="newBillingAddress"
                      control={controlNewAddress}
                      render={({ field }) => (
                        <>
                          <label
                            htmlFor="newBillingAddress"
                            className={style.input__label}
                          >
                            Set billing address:
                            <Input
                              {...field}
                              id="newBillingAddress"
                              type="checkbox"
                              defaultChecked={false}
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(e.target.checked ? true : false)
                              }
                              onBlur={field.onBlur}
                            />
                          </label>
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className={style.form__row + " " + style.form_col_2}>
                  <div className={style.checkbox}>
                    <Controller
                      name="newDefaultBillingAddress"
                      control={controlNewAddress}
                      render={({ field }) => (
                        <>
                          <label
                            htmlFor="newDefaultBillingAddress"
                            className={style.input__label}
                          >
                            Set default billing address:
                            <Input
                              {...field}
                              id="newDefaultBillingAddress"
                              type="checkbox"
                              defaultChecked={false}
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(e.target.checked ? true : false)
                              }
                              onBlur={field.onBlur}
                            />
                          </label>
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className={style.form__row + " " + style.form_col_2}>
                  <div className={style.checkbox}>
                    <Controller
                      name="newShippingAddress"
                      control={controlNewAddress}
                      render={({ field }) => (
                        <>
                          <label
                            htmlFor="newShippingAddress"
                            className={style.input__label}
                          >
                            Set shipping address:
                            <Input
                              {...field}
                              id="newShippingAddress"
                              type="checkbox"
                              defaultChecked={false}
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(e.target.checked ? true : false)
                              }
                              onBlur={field.onBlur}
                            />
                          </label>
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className={style.form__row + " " + style.form_col_2}>
                  <div className={style.checkbox}>
                    <Controller
                      name="newDefaultShippingAddress"
                      control={controlNewAddress}
                      render={({ field }) => (
                        <>
                          <label
                            htmlFor="newDefaultShippingAddress"
                            className={style.input__label}
                          >
                            Set default shipping address:
                            <Input
                              {...field}
                              id="newDefaultShippingAddress"
                              type="checkbox"
                              defaultChecked={false}
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(e.target.checked ? true : false)
                              }
                              onBlur={field.onBlur}
                            />
                          </label>
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className={style.form__buttons}>
                  <Button type="submit" color="green">
                    Save new address
                  </Button>

                  <Button
                    type="button"
                    onClick={() => setIsAddingAddress(false)}
                    color="red"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
