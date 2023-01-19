import './App.css'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

function App() {
  const schema = yup.object().shape({
    fullName: yup.string().required('Your full name is required!'),
    email: yup.string().email().required('Your e-mail is required!'),
    age: yup
      .number()
      .positive()
      .integer()
      .min(18)
      .required('Valid age is required!'),
    password: yup.string().min(4).max(20).required('Your password is invalid!'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords don't match")
      .required(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form
      className="text-center relative border mt-20 space-y-1 space-x-5 pb-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-bold text-2xl my-3">Register</h1>
      <input
        type="text"
        placeholder="Full Name..."
        className="border-2"
        {...register('fullName')}
      />
      <p>{errors.fullName?.message}</p>
      <input
        type="email"
        placeholder="Email..."
        className="border-2"
        {...register('email')}
      />
      <p>{errors.email?.message}</p>
      <input
        type="number"
        placeholder="Age..."
        className="border-2"
        {...register('age')}
      />
      <p>{errors.age?.message}</p>
      <input
        type="password"
        placeholder="Password..."
        className="border-2"
        {...register('password')}
      />
      <p>{errors.password?.message}</p>
      <input
        type="password"
        placeholder="Confirm Password..."
        className="border-2"
        {...register('confirmPassword')}
      />
      <p>{errors.confirmPassword?.message}</p>
      <input
        type="submit"
        className="bg-slate-400 px-2 rounded-md hover:bg-slate-300 active:scale-90"
      />
    </form>
  )
}

export default App
