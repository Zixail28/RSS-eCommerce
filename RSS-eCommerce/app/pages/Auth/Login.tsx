import { FC, useEffect } from "react";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import style from "../Auth/Auth.module.scss";
import authImg from "../../assets/images/auth.jpg";
import { authenticate } from "../../services/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { validateEmail } from "../../utils/validate/validateEmail";
import { validatePassword } from "../../utils/validate/validatePassword";
import { Link } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
  });

  const { isAuth, firstName, lastName } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
      toast.success(`Welcome back ${firstName} ${lastName}`);
    }
  }, [isAuth, navigate]);

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const { email, password } = data;

    await dispatch(authenticate({ email, password }));
  };

  return (
    <>
      <div className={style.wrapper}>
        <img src={authImg} className={style.img} alt="cart" />
        <div className={style.login__wrapper}>
          <h1 className={style.login__title}>Log in to Exclusive</h1>
          <p className={style.login__subtitle}>Enter your details below</p>
          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
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
                      type="text"
                      placeholder="Email"
                      value={field.value}
                      error={errors.email?.message}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
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
            <Button type="submit">Log in</Button>
            <div className={style.link}>
              Don't have an account yet?
              <Link to="/registration">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
